import { NextFunction, type Request, type Response } from 'express';
import Logger from '@app/utils/logger';
import { HttpStatusCode } from 'axios';
import jwt, { TokenExpiredError } from 'jsonwebtoken';
import config from '@app/config/config';
import { ACCESS_TOKEN_LIFETIME, ACCESS_TOKEN_LIFETIME_STRING } from '@app/utils/constants';

const logger = Logger.createLogger('authMiddleware');

export default (req: Request, res: Response, next: NextFunction): void => {
    logger.info('User/Session', {
        cookies: req.cookies,
    });

    const {
        access_token: accessToken,
        refresh_token: refreshToken,
    } = req.cookies;

    const secret = config.server.jwtSecret ?? 'lfgamers';
    if (!accessToken) {
        if (!refreshToken) {
            logger.warn('No refresh token, unauthorized');
            res.status(HttpStatusCode.Unauthorized).json({ error: 'Invalid session' });
            return;
        }

        try {
            const decodedRefreshToken = jwt.verify(refreshToken, secret);
            const newAccessToken = jwt.sign(
                { user: { ...(decodedRefreshToken as any).user } },
                secret,
                { expiresIn: ACCESS_TOKEN_LIFETIME_STRING },
            );
            logger.info('Refresh token verified, sending new access token', { newAccessToken });
            res.cookie('access_token', newAccessToken, {
                httpOnly: true,
                maxAge: ACCESS_TOKEN_LIFETIME,
                sameSite: 'lax',
                secure: process.env.NODE_ENV === 'production',
            });
            req.user = (decodedRefreshToken as any).user;
            return next();
        } catch (refreshError) {
            logger.warn('Couldn\'t decode access token', { error: refreshError });
            res.status(HttpStatusCode.Unauthorized).json({ error: 'Invalid session' });
            return;
        }
    }

    try {
        const verifiedAccesstoken = jwt.verify(accessToken, secret);
        if ((verifiedAccesstoken as any).user) {
            req.user = (verifiedAccesstoken as any).user;
            return next();
        }
    } catch (err) {
        logger.warn('Couldn\'t decode access token', { error: err });
        if (!(err instanceof TokenExpiredError)) {
            res.status(HttpStatusCode.Unauthorized).json({ error: 'Invalid session' });
            return;
        }
    }
};