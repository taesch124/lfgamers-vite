import IgdbAPIError from '@app/errors/IgdbAPIError';
import TwitchAPIError from '@app/errors/TwitchAPIError';
import * as argon from 'argon2';
import { HttpStatusCode } from 'axios';
import { type Request, type Response, Router } from 'express';
import jwt from 'jsonwebtoken';
import Logger from '@app/utils/logger';
import { UserDTO, UserRegisterReqSchema } from '@shared-types';
import UserModel from '@app/database/models/userModel';
import zod from 'zod/v4';
import config from '@app/config/config';
import { ACCESS_TOKEN_LIFETIME, ACCESS_TOKEN_LIFETIME_STRING, REFRESH_TOKEN_LIFETIME, REFRESH_TOKEN_LIFETIME_STRING } from '@app/utils/constants';

const logger = Logger.createLogger('authRouter');
const userModelLogger = Logger.createLogger('userModel');
const authRouter: Router = Router();
const userModel = new UserModel(userModelLogger);

authRouter.post('/login', async (req: Request, res: Response): Promise<any> => {
    const { username, password } = req.body;
    logger.info('Logging in user', { password, username });
    try {
        const user = await userModel.getUserByUsername(username);
        if (!user) {
            return res.status(HttpStatusCode.Unauthorized)
                .json({ error: 'Invalid credentials' });
        }

        if (await argon.verify(user.password, password)) {
            logger.info('passwords match', { password, userPassword: user.password });

            const secret = config.server.jwtSecret ?? 'lfgamers';            
            const accessToken = jwt.sign({ user }, secret, { expiresIn: ACCESS_TOKEN_LIFETIME_STRING });
            const refreshToken = jwt.sign({ user }, secret, { expiresIn: REFRESH_TOKEN_LIFETIME_STRING });

            res.cookie('access_token', accessToken,  {
                httpOnly: true,
                maxAge: ACCESS_TOKEN_LIFETIME,
                sameSite: 'lax',
                secure: process.env.NODE_ENV === 'production',
            });

            res.cookie('refresh_token', refreshToken, {
                httpOnly: true,
                maxAge: REFRESH_TOKEN_LIFETIME,
                sameSite: 'lax',
                secure: process.env.NODE_ENV === 'production',
            });

            return res.status(HttpStatusCode.Ok)
                .json({ success: true });
        }

        return res.status(HttpStatusCode.Unauthorized)
            .json({ error: 'Invalid credentials' });
    } catch (err) {
        logger.error('Could not log in', { error: err });
        return res.status(HttpStatusCode.Unauthorized)
            .json({ error: 'Invalid credentials' });
    }
});

authRouter.post('/register', async (_req: Request, res: Response): Promise<void> => {
    try {
        const user = UserRegisterReqSchema.parse(_req.body);

        logger.info('Registering user in IGDB', { user });

        // Register the user in IGDB
        await userModel.registerUser(user as UserDTO);

        res.status(HttpStatusCode.Ok).json({ message: 'User registered successfully in IGDB.' });
    } catch (error) {
        logger.error('Error registering user in IGDB', { error });
        if (error instanceof Error) {
            res.status(HttpStatusCode.InternalServerError)
                .json({ error: error.message });
        } else if (error instanceof TwitchAPIError) {
            res.status(error.statusCode)
                .json({ error: error.message });
        } else if (error instanceof IgdbAPIError) {
            res.status(error.statusCode)
                .json({ error: error.message });
        } else if (error instanceof zod.ZodError) {
            const errorMessage = error.issues.join(', ');
            res.status(HttpStatusCode.BadRequest)
                .json({ error: errorMessage });
        } else {
            res.status(HttpStatusCode.InternalServerError).json({ error: 'An unexpected error occurred.' });
        }
    }
});

export { authRouter };