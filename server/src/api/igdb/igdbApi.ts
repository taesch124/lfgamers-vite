import axios, { AxiosError, HttpStatusCode } from 'axios';
import { getUnixTime, subMonths } from 'date-fns';
import { TwitchAPI } from '@api/twitch/twitchApi';
import { DEFAULT_BACKWARD_TIME_WIND, igdbGameFieldList } from '@api/igdb/constants';
import applicationConfig from '@config/config';
import Logger from '@app/utils/logger';
import IgdbAPIError from '@errors/IgdbAPIError';
import TwitchAPIError from '@app/errors/TwitchAPIError';

axios.defaults.headers.common['Client-ID'] = applicationConfig.twitch.clientId;
axios.defaults.headers.common.Accept = 'application/json';
axios.defaults.headers.common['Content-Type'] = 'application/apicalypse';

const logger = Logger.createLogger('igdbApi');

const baseUrl = 'https://api.igdb.com/v4',
getPoster = async (gameId: string): Promise<any> => {
    const body = `fields game,url;
    where game = ${gameId};`,
        url = `${baseUrl}/covers`;

    try {
        const response = await axios({
            data: body,
            method: 'POST',
            url,
        });
        return response.data;
    } catch (error) {
        return {
            error: true,
            message: error,
        };
    }
},
searchGames = async (searchPhrase: string): Promise<any> => {
    logger.info('Access Token', { token: TwitchAPI.getAccessToken() });
    
    const fields = igdbGameFieldList.join(','),
    limit = 10,
    // eslint-disable-next-line sort-vars
    body = `fields ${fields};
    limit ${limit};
    search "${searchPhrase}";
    where version_parent = null;`,
    url = `${baseUrl}/games`;

    try {
        const accessToken = await TwitchAPI.getAccessToken();
        axios.defaults.headers.common.Authorization = `Bearer ${accessToken}`;

        // eslint-disable-next-line one-var
        const response = await axios({
            data: body,
            method: 'POST',
            url,
        });
        return response.data;
    } catch (error) {
        logger.error('Error searching games in IGDB API', { error });
        if (error instanceof AxiosError) {
            throw new IgdbAPIError(`Failed to search games in IGDB API. ${error.message}`, error.status ?? HttpStatusCode.InternalServerError);
        } else if (error instanceof TwitchAPIError) {
            throw error;
        }
        throw new IgdbAPIError(`Failed to search games in IGDB API. ${error}`, HttpStatusCode.InternalServerError);
    }
},
searchPopularGames = async () => {
    const currentDate = new Date(),
    endDate = getUnixTime(currentDate),
    fields = igdbGameFieldList.join(','),
    limit = 10,
    startDate = getUnixTime(subMonths(currentDate, DEFAULT_BACKWARD_TIME_WIND)),
    twitchAccessToken = TwitchAPI.getAccessToken(),
    url = `${baseUrl}/games`;
    logger.info('Searching popular games', { currentDate, endDate, startDate });
    
    axios.defaults.headers.common.Authorization = `Bearer ${twitchAccessToken}`;
    // eslint-disable-next-line one-var
    const body = `fields ${fields};
    limit ${limit};
    where first_release_date > ${startDate} & first_release_date < ${endDate} & aggregated_rating > 80 & version_parent = null;`;

    try {
        const accessToken = await TwitchAPI.getAccessToken();
        logger.info('twitch token:', { accessToken });
        axios.defaults.headers.common.Authorization = `Bearer ${accessToken}`;

        // eslint-disable-next-line one-var
        const response = await axios({
            data: body,
            method: 'POST',
            url,
        });
        return response.data;
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

export {
    searchPopularGames,
    searchGames,
    getPoster,
};