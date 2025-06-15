import axios, { AxiosError, HttpStatusCode } from 'axios';
import applicationConfig from '@config/config';
import TwitchAPIError from '@errors/TwitchAPIError';

type TwitchAPITokens = {
    access_token: string;
    expires_in: number;
    token_type: string;
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
        TwitchAPI.tokens = tokens;
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

        // eslint-disable-next-line no-magic-numbers
        const currentTime = Math.floor(Date.now() / 1000);
        return currentTime < TwitchAPI.tokens.expires_in;
    };

    public static async login(): Promise<TwitchAPITokens> {
        const {
            clientId,
            clientSecret,
        } = applicationConfig.twitch,
        baseUrl: string = `https://id.twitch.tv/oauth2/token?client_id=${clientId}&client_secret=${clientSecret}&grant_type=client_credentials`;

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