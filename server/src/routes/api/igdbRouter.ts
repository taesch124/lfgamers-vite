import IgdbGames from '@controllers/igdb/games';
import IgdbAPIError from '@app/errors/IgdbAPIError';
import TwitchAPIError from '@app/errors/TwitchAPIError';
import { HttpStatusCode } from 'axios';
import { type Request, type Response, Router } from 'express';
import Logger from '@app/utils/logger';
/* TEMP: type SessionData = {
    user: {
        id: string;
        username: string;
    }
};
*/

const logger = Logger.createLogger('igdbRouter');
const igdbRouter: Router = Router();

igdbRouter.get('/games', async (_req: Request, res: Response): Promise<void> => {
    try {
        const games = await IgdbGames.searchPopularGames();
        res.status(HttpStatusCode.Ok).json(games);

        return;
    } catch (error) {
        logger.error('Error fetching popular games from IGDB', { error });
        if (error instanceof Error) {
            res.status(HttpStatusCode.InternalServerError).json({ error: error.message });
        } else if (error instanceof TwitchAPIError) {
            res.status(error.statusCode).json({ error: error.message });
        } else if (error instanceof IgdbAPIError) {
            res.status(error.statusCode).json({ error: error.message });
        } else {
            res.status(HttpStatusCode.InternalServerError).json({ error: 'An unexpected error occurred.' });
        }
    }
});

igdbRouter.get('/games/poster/:id', async (req: Request, res: Response): Promise<void> => {
    const { id } = req.params;

    try {
        const gamePoster = await IgdbGames.getGamePoster(id);
        res.status(HttpStatusCode.Ok).json(gamePoster);
    } catch (error) {
        if (error instanceof Error) {
            res.status(HttpStatusCode.InternalServerError).json({ error: error.message });
        } else if (error instanceof TwitchAPIError) {
            res.status(error.statusCode).json({ error: error.message });
        } else if (error instanceof IgdbAPIError) {
            res.status(error.statusCode).json({ error: error.message });
        }

        res.status(HttpStatusCode.InternalServerError).json({ error: 'An unexpected error occurred.' });
    }
});

export { igdbRouter };