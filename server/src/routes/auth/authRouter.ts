import IgdbAPIError from '@app/errors/IgdbAPIError';
import TwitchAPIError from '@app/errors/TwitchAPIError';
import { HttpStatusCode } from 'axios';
import { type Request, type Response, Router } from 'express';
import Logger from '@app/utils/logger';
import { UserDTO, UserRegisterReqSchema } from '@shared-types';
import UserModel from '@app/database/models/userModel';
import passport from 'passport';
import zod from 'zod/v4';

const logger = Logger.createLogger('authRouter');
const userModelLogger = Logger.createLogger('userModel');
const authRouter: Router = Router();
const userModel = new UserModel(userModelLogger);

authRouter.post('/login', passport.authenticate('local', {
    failureMessage: 'Invalid credentials',
    successRedirect: '/games',
}));

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