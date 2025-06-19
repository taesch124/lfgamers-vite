import axios, { AxiosError, HttpStatusCode } from 'axios';
import applicationConfig from '@config/config';
import TwitchAPIError from '@errors/TwitchAPIError';
import Logger from '@app/utils/logger';

const logger = Logger.createLogger('twitchAPI');

type TwitchAPITokens = {
    access_token: string;
    expires_in: number;
    token_type: string;
    expires_at: number;
};

export class TwitchAPI {
    private static instance : TwitchAPI | null = null;
    private static tokens: TwitchAPITokens | null = null;

    public static getInstance = (): TwitchAPI => {
        if (TwitchAPI.instance === null) {
            TwitchAPI.instance = new TwitchAPI();

            return TwitchAPI.instance;
        }

        return TwitchAPI.instance;
    };

    private static setTokens = (tokens: TwitchAPITokens)  => {
        const currentTime = Math.floor(Date.now() / 1000);
        TwitchAPI.tokens = tokens;
        // eslint-disable-next-line camelcase
        TwitchAPI.tokens.expires_at = currentTime + TwitchAPI.tokens.expires_in;
    };

    public static getAccessToken = async (): Promise<string> => {
        if (TwitchAPI.tokens === null || !TwitchAPI.checkTokens()) {
            return (await TwitchAPI.login()).access_token;
        }

        return TwitchAPI.tokens.access_token;
    };

    public static checkTokens = () : boolean => {
        if (TwitchAPI.tokens === null) {
            return false;
        }

        const currentTime = Math.floor(Date.now() / 1000);
        return currentTime < TwitchAPI.tokens.expires_at;
    };

    public static async login(): Promise<TwitchAPITokens> {
        const {
            clientId,
            clientSecret,
        } = applicationConfig.twitch,
        baseUrl: string = `https://id.twitch.tv/oauth2/token?client_id=${clientId}&client_secret=${clientSecret}&grant_type=client_credentials`;

        logger.info('Retrieving Twitch access_token');
        try {
            const params = new URLSearchParams({
                clientId, 
                clientSecret,
                grantType: 'client_credentials',
            }),
            response = await axios.post<TwitchAPITokens>(baseUrl, params);
            TwitchAPI.setTokens(response.data);
            return response.data;
        } catch (error) {
            if (error instanceof AxiosError) {
                throw new TwitchAPIError(`Failed to authenticate with Twitch API. ${error.status}|${error.message}`, error.status ?? HttpStatusCode.InternalServerError);
            }
            throw new TwitchAPIError(`Failed to authenticate with Twitch API. ${error}`, HttpStatusCode.InternalServerError);
        }

    }
};