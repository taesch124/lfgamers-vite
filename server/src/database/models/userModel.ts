import DatabaseError from '@errors/DatabaseError';
import DatabaseHandler from '@database/database';
import * as argon from 'argon2';
import { QueryResult, QueryResultRow } from 'pg';
import { UserDTO } from '@shared-types';
import { Logger } from 'winston';
import { v7 as uuid } from 'uuid';
import CryptoError from '@app/errors/CryptoError';

class UserModel {
    constructor (private logger: Logger) {
        this.logger = logger;
    }

    public getUserByUserId = async (userId: string): Promise<UserDTO> => {
       const queryText: string = 'SELECT * FROM users WHERE uuid = $1';
       const queryValues: [string] = [userId];
       this.logger.info(`Searching for user with id: ${userId}`);

        try {
            const client = await DatabaseHandler.getInstance().pool.connect(),
            dbResult: QueryResult<UserDTO> = await client.query(queryText, queryValues);
            // Release the client back to the pool
            client.release();

            if (dbResult.rowCount === 1) {
                return dbResult.rows[0];
            }

            throw new DatabaseError(`Could not find user with ID ${userId}`, this.constructor.name);

        } catch (error) {
            if (error instanceof Error) {
                throw new Error(error.message);
            }
            
            throw new DatabaseError('Something went wrong with getUserByUserId()', this.constructor.name);
        }
    };

    public getUserByUsername = async (username: string): Promise<UserDTO> => {
        const queryText: string = 'SELECT * FROM users WHERE username = $1';
        const queryValues: [string] = [username];

        try {
            const client = await DatabaseHandler.getInstance().pool.connect(),
                dbResult: QueryResult<UserDTO> = await client.query(queryText, queryValues);
            // Release the client back to the pool
            client.release();

            if (dbResult.rowCount === 1) {
                return dbResult.rows[0];
            }

            throw new DatabaseError(`Could not find user with Username ${username}`, this.constructor.name);

        } catch (error) {
            if (error instanceof Error) {
                throw new Error(error.message);
            }

            throw new DatabaseError('Something went wrong with getUserByUserId()', this.constructor.name);
        }
    };

    public registerUser = async (user: UserDTO): Promise<UserDTO> => {
        let hashedPassword;
        try {
            const password = user.password;
            hashedPassword = await argon.hash(password);
        } catch (error) {
            throw new CryptoError('Could no hash user registration password');
        }
        
        const queryText: string = 'INSERT INTO users ( uuid, username, email, password ) ' +
            'VALUES ($1, $2, $3, $4) ' +
            'ON CONFLICT (uuid) DO NOTHING ' +
            'RETURNING uuid, username, email, password;';
        const queryValues: Array<string> = [
            uuid(),
            user.username,
            user.email,
            hashedPassword,
        ];

        const client = await DatabaseHandler.getInstance().pool.connect();
        const dbResult: QueryResult<QueryResultRow> = await client.query(queryText, queryValues);
        // Release the client back to the pool
        client.release();

        if (dbResult.rowCount === 0) {
            throw new DatabaseError(`User with ID ${user.uuid} already exists`, this.constructor.name);
        }

        if (dbResult.rowCount === 1) {
            return dbResult.rows[0] as UserDTO;
        }
        
        throw new DatabaseError(`User ${user.username} could not be added`, this.constructor.name)
    };
};

export default UserModel;