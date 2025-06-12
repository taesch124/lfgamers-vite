import IgdbAPIError from '@app/errors/IgdbAPIError';
import TwitchAPIError from '@app/errors/TwitchAPIError';
import Logger from '@app/utils/logger';
import { AxiosError, HttpStatusCode } from 'axios';
import { getUnixTime, subMonths } from 'date-fns';
import { DEFAULT_BACKWARD_TIME_WIND, igdbGameFieldList } from './constants';
import IgdbClient from './igdbApi';
import { apicalypse } from './apicalypse';

const logger = Logger.createLogger('igdbApi-games');

class IgdbGames {
    public static searchPopularGames = async () => {
        const currentDate = new Date();
        const endDate = getUnixTime(currentDate);
        const startDate = getUnixTime(subMonths(currentDate, DEFAULT_BACKWARD_TIME_WIND));
        const fields = igdbGameFieldList.join(',');
        const url = `${IgdbClient.baseUrl}/games`;

        const body = apicalypse(fields, {
            limit: 10,
            where: [
                {
                    field: 'first_release_date',
                    operator: '>',
                    value: startDate,
                },
                {
                   field: 'first_release_date',
                    operator: '<',
                    value: endDate, 
                },
                {
                    field: 'aggregated_rating',
                    operator: '>',
                    value: 80,
                },
                {
                    field: 'version_parent',
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

};

export default IgdbGames;