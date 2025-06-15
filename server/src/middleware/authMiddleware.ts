import { NextFunction, type Request, type Response } from 'express';

export default (req: Request, _res: Response, next: NextFunction): void => {
    if ((req.session as unknown as any)?.passport?.user) {
        return next();
    }

    return next(new Error('Invalid session'));
};