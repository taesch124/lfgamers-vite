import { Pool } from 'pg';
import config from '@config/config';

class DatabaseHandler {
    static instance: DatabaseHandler;
    readonly pool: Pool;

    constructor() {
        const PORT = parseInt(config.database.port, 10);

        this.pool = new Pool({
            database: config.database.databaseName,
            host: config.database.host,
            password: config.database.password,
            port: PORT,
            user: config.database.username,
        });
    };

    static getInstance = (): DatabaseHandler => {
        if (!DatabaseHandler.instance) {
            DatabaseHandler.instance = new DatabaseHandler();
        }

        return DatabaseHandler.instance;
    };
}

export default DatabaseHandler;