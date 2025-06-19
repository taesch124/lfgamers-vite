export type ServerEnvironmentVariables = {
    PORT?: string;
    DB_HOSTNAME: string;
    DB_PORT: string;
    DB_DATABASE: string;
    DB_USERNAME: string;
    DB_PASSWORD: string;
    IGDB_KEY: string;
    TWITCH_CLIENT_ID: string;
    TWITCH_CLIENT_SECRET: string;
}

export type ServerConfig = {
    allowedOrigins?: string | Array<string>;
    port?: string;
    cookieSecret?: string;
    jwtSecret?: string;
};

export type DatabaseConfig = {
    host: string;
    port: string;
    databaseName: string;
    username: string;
    password: string;
};

export type TwitchConfig = {
    clientId: string;
    clientSecret: string;
}

export type LoggerConfig = { logLevel?: string }

export type ApplicationConfig = {
    server: ServerConfig;
    database: DatabaseConfig;
    twitch: TwitchConfig;
    log?: LoggerConfig;
}

export type ConfigRecord = Record<
    string,
    Array<string> | string | undefined
>;