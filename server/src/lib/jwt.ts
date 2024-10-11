import { NextFunction, Request, Response } from 'express';
import fs from 'fs';
import jwt from 'jsonwebtoken';
import path from 'path';

const privateKey = fs.readFileSync(
	path.join(process.cwd(), './keys/private.pem'),
);
const publicKey = fs.readFileSync(
	path.join(process.cwd(), './keys/public.pem'),
);
export type TokenTypes = 'link' | 'auth' | 'refresh';
export interface IVerifyTokenPayload {
	userId: string;
	tokenId: string | null;
	type: TokenTypes;
	iat: number;
	exp: number;
}

const setExpiration = (type: TokenTypes) => {
	switch (type) {
		case 'auth':
			return '2h';
		default:
			return '1d';
	}
};

type Param = {
	userId: string;
	type: TokenTypes;
	tokenId?: string;
};
export const createToken = async ({ tokenId, type, userId }: Param) => {
	const result: string = await new Promise((resolve, reject) => {
		jwt.sign(
			{ userId, type, tokenId: tokenId ?? null },
			privateKey,
			{
				algorithm: 'RS256',
				expiresIn: setExpiration(type),
			},
			(err, token) => {
				if (err !== null) {
					reject(
						new Error(`Failure on creating token : ${err.message}`),
					);
				}
				resolve(token as string);
			},
		);
	});
	return result;
};

type Param2 = {
	token: string;
	type: TokenTypes;
	ignoreExpiration?: boolean;
};
export const verifyToken = async ({
	token,
	type,
	ignoreExpiration,
}: Param2): Promise<IVerifyTokenPayload> => {
	const result: IVerifyTokenPayload = await new Promise((resolve, reject) => {
		jwt.verify(
			token,
			publicKey,
			{
				algorithms: ['RS256'],
				ignoreExpiration: !!ignoreExpiration,
				maxAge: setExpiration(type),
			},
			(err, payload) => {
				if (err) {
					reject(new Error(err.message));
				}
				resolve(payload as IVerifyTokenPayload);
			},
		);
	});
	return result;
};

export const verifyAuthToken = async (
	req: Request,
	res: Response,
	next: NextFunction,
): Promise<void> => {
	const bearerToken = req.headers.authorization;
	if (bearerToken === undefined) {
		res.sendStatus(401);
		return;
	}
	const token = bearerToken.split(' ')[1];
	jwt.verify(
		token,
		publicKey,
		{
			algorithms: ['RS256'],
			maxAge: '2h',
		},
		(err, payload) => {
			if (err !== null) {
				if (err.message === 'jwt expired') {
					return res.status(401).send('token expired');
				} else {
					return res.status(500).send(err.message);
				}
			}
			const { userId, type } = payload as IVerifyTokenPayload;
			if (type !== 'auth') {
				return res.status(403).json({ error: 'invalid token' });
			}
			req.app.locals.userId = userId;
			next();
		},
	);
};
