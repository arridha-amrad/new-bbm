declare global {
  namespace Express {
    interface Request {
      user?: {
        id: number;
        jti: string;
      };
    }
  }
}
export { };