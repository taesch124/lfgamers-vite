import { HttpStatusCode } from 'axios';

export default class AuthenticationError extends Error {
    statusCode: number = HttpStatusCode.Unauthorized;
    constructor(message: string, statusCode?: number) {
        super(message);

        this.name = 'AuthenticationError';
        if (statusCode) {
            this.statusCode = statusCode;
        }
    }
};