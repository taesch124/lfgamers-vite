import IgdbAPIError from '@app/errors/IgdbAPIError';
import TwitchAPIError from '@app/errors/TwitchAPIError';
import type { IGDBCoverDTO, IGDBGameDTO } from '@shared-types';
import Logger from '@app/utils/logger';
import { AxiosError, HttpStatusCode } from 'axios';
import { getUnixTime, subMonths } from 'date-fns';
import { DEFAULT_BACKWARD_TIME_WIND, igdbGameFieldList } from './constants';
import IgdbClient from './IgdbController';
import { apicalypse } from '../../utils/apicalypse';
import { IGDBCoverField } from '@lfgamers/shared-types/igdbDTO/covers';
import { IGDBGameField } from '@lfgamers/shared-types/igdbDTO/games';

const logger = Logger.createLogger('igdbApi-games');

class IgdbGames {
    public static searchPopularGames = async (): Promise<Array<IGDBGameDTO>> => {
        const currentDate = new Date();
        const endDate = getUnixTime(currentDate);
        const startDate = getUnixTime(subMonths(currentDate, DEFAULT_BACKWARD_TIME_WIND));
        const fields = igdbGameFieldList.join(',');
        const url = `${IgdbClient.baseUrl}/games`;

        const body = apicalypse(fields, {
            limit: 10,
            where: [
                {
                    field: IGDBGameField.FIRST_RELEASE_DATE,
                    operator: '>',
                    value: startDate,
                },
                {
                    field: IGDBGameField.FIRST_RELEASE_DATE,
                    operator: '<',
                    value: endDate, 
                },
                {
                    field: IGDBGameField.AGGREGATED_RATING,
                    operator: '>',
                    value: 80,
                },
                {
                    field: IGDBGameField.VERSION_PARENT,
                    operator: '=',
                    value: 'null',
                },
            ],
        });
        logger.info('Searching popular games');

        try {
            const response = await IgdbClient.request({
                data: body,
                method: 'POST',
                url,
            });
            return response as Array<IGDBGameDTO>;
        } catch (error) {
            logger.error('Error searching games in IGDB API', { error });
            if (error instanceof AxiosError) {
                throw new IgdbAPIError(`Failed to search games in IGDB API. ${error.message}`, error.status ?? HttpStatusCode.InternalServerError);
            } else if (error instanceof TwitchAPIError) {
                throw error;
            }
            throw new IgdbAPIError(`Failed to search games in IGDB API. ${error}`, HttpStatusCode.InternalServerError);
        }
    };

    public static searchGames = async (searchPhrase: string): Promise<any> => {
        const fields = igdbGameFieldList.join(',');
        const limit = 10;
        const body = `fields ${fields};
            limit ${limit};
            search "${searchPhrase}";
            where version_parent = null;`;
        const url = `${IgdbClient.baseUrl}/games`;

        try {
            const response = await IgdbClient.request({
                data: body,
                method: 'POST',
                url,
            });
            return response;
        } catch (error) {
            logger.error('Error searching games in IGDB API', { error });
            if (error instanceof AxiosError) {
                throw new IgdbAPIError(`Failed to search games in IGDB API. ${error.message}`, error.status ?? HttpStatusCode.InternalServerError);
            } else if (error instanceof TwitchAPIError) {
                throw error;
            }
            throw new IgdbAPIError(`Failed to search games in IGDB API. ${error}`, HttpStatusCode.InternalServerError);
        }
    };

    public static getGamePoster = async (gameId: string): Promise<IGDBCoverDTO> => {
        const body = apicalypse(
            'game, url',
            {
                where: {
                    field: IGDBCoverField.GAME,
                    operator: '=',
                    value: gameId,
                },
            },
        );
        const url = `${IgdbClient.baseUrl}/covers`;

        try {
            const response = await IgdbClient.request({
                data: body,
                method: 'POST',
                url,
            });
            return (response as Array<IGDBCoverDTO>)[0] ;
        } catch (error) {
            logger.error('Error searching games in IGDB API', { error });
            if (error instanceof AxiosError) {
                throw new IgdbAPIError(`Failed to search games in IGDB API. ${error.message}`, error.status ?? HttpStatusCode.InternalServerError);
            } else if (error instanceof TwitchAPIError) {
                throw error;
            }
            throw new IgdbAPIError(`Failed to search games in IGDB API. ${error}`, HttpStatusCode.InternalServerError);
        }
    };

};

export default IgdbGames;