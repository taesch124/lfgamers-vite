import axios, { Axios, AxiosError, AxiosRequestConfig, HttpStatusCode } from 'axios';
import { TwitchAPI } from '@api/twitch/twitchApi';
import applicationConfig from '@config/config';
import Logger from '@app/utils/logger';
import IgdbAPIError from '@errors/IgdbAPIError';
import TwitchAPIError from '@app/errors/TwitchAPIError';

axios.defaults.headers.common['Client-ID'] = applicationConfig.twitch.clientId;
axios.defaults.headers.common.Accept = 'application/json';
axios.defaults.headers.common['Content-Type'] = 'application/apicalypse';

const logger = Logger.createLogger('igdbApi');

class IgdbClient {
    public static readonly baseUrl: string = 'https://api.igdb.com/v4';
    private static readonly cliendId: string = applicationConfig.twitch.clientId;
    private static accessToken: string | null = null;
    private static axiosInstance: Axios = axios.create({
        baseURL: IgdbClient.baseUrl,
        headers: {
            'Accept': 'application/json',
            'Client-ID': IgdbClient.cliendId,
            'Content-Type': 'application/apicalypse',
        },
    });

    public static async request<T>(request: AxiosRequestConfig): Promise<T> {
        try {
            if (!IgdbClient.accessToken || !TwitchAPI.checkTokens()) {
                const newToken = await TwitchAPI.getAccessToken();
                logger.info('Updating IGDB access token');
                // Double-check to avoid race condition
                if (!IgdbClient.accessToken || !TwitchAPI.checkTokens()) {
                    IgdbClient.accessToken = newToken;
                }
            }

            IgdbClient.axiosInstance.defaults.headers.common.Authorization = `Bearer ${IgdbClient.accessToken}`;
            logger.info('Making IGDB API request', { request });

            const response = await IgdbClient.axiosInstance.request<T>(request);
            return response.data;
        } catch (error) {
            logger.error('Error in IGDB API request', { error });
            if (error instanceof AxiosError) {
                throw new IgdbAPIError(`Failed to make request to IGDB API. ${error.message}`, error.status ?? HttpStatusCode.InternalServerError);
            } else if (error instanceof TwitchAPIError) {
                throw error;
            }
            throw new IgdbAPIError(`Failed to make request to IGDB API. ${error}`, HttpStatusCode.InternalServerError);
        }
    }

}

const baseUrl = 'https://api.igdb.com/v4';
export const getPoster = async (gameId: string): Promise<any> => {
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
};

export default IgdbClient;