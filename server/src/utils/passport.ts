import config from '@app/config/config';
import AuthenticationError from '@app/errors/AuthenticationError';
import Logger from '@app/utils/logger';
import { Request } from 'express';
import jwt from 'jsonwebtoken';
import passport from 'passport';
import { Strategy as JwtStrategy, StrategyOptions } from 'passport-jwt';

const passportLogger = Logger.createLogger('passportLogger');

const cookieExtractor = (req: Request): string | null => {
    let token = null;
    if (req?.cookies) {
        token = req.cookies.access_token;
    } else {
        passportLogger.warn('Cookie not found.', { cookies: req.cookies });
    }

    return token;
};

const passportJwtOptions: StrategyOptions = {
    jwtFromRequest: cookieExtractor,
    secretOrKey: config.server.jwtSecret ?? 'lfgamers',
};

passport.use(
    new JwtStrategy(passportJwtOptions, (token: any, done: any) => {
        passportLogger.info('JWT', { jwt });
        if (!token) {
            return done(new AuthenticationError('Token not found'));
        }

        const currentTime = new Date().getTime() / 1000;
        passportLogger.info('Time check', { currentTime, exp: token.exp });
        if (currentTime > token.exp) {
            return done (new AuthenticationError('Token Expired'));
        }

        return done(null, jwt);
    }),
);