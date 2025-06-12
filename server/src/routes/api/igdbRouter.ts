import IgdbGames from '@api/igdb/games';
import IgdbAPIError from '@app/errors/IgdbAPIError';
import TwitchAPIError from '@app/errors/TwitchAPIError';
import { HttpStatusCode } from 'axios';
import { type Request, type Response, Router } from 'express';

const igdbRouter: Router = Router();

igdbRouter.get('/games', async (_req: Request, res: Response): Promise<any> => {
    try {
        const games = await IgdbGames.searchPopularGames();
        res.status(HttpStatusCode.Ok).json(games);
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