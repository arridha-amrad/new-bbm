import { IFieldError } from '@/validators/auth';

export class CustomError extends Error {
	status: number;
	constructor(message: string, status: number) {
		super(message);
		this.status = status;
	}
}

export class ValidationError extends Error {
	errors: IFieldError[];
	status: number;
	constructor(errors: IFieldError[]) {
		super();
		this.errors = errors;
		this.status = 403;
	}
}
