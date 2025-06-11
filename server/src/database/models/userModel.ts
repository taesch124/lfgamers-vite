import DatabaseError from '@errors/DatabaseError';
import DatabaseHandler from '@database/database';
import { QueryResult } from 'pg';
import { UserDTO } from '@models/types/user';

class UserModel {
    static getUser = async (user: Partial<Pick<UserDTO, 'uuid' | 'username'>>): Promise<UserDTO> => {
        if (!user.uuid && !user.username) {
            throw new DatabaseError('Must provide either user ID or username', this.constructor.name);
        }

        let queryText: string = '',
        queryValues: [string] = [''],
        userSearchText: string | undefined = undefined;
        if (user.uuid) {
            userSearchText = 'user id';
            queryText = 'SELECT * FROM users WHERE uuid = $1';
            queryValues = [user.uuid];
        } else if (user.username) {
            userSearchText = 'username';
            queryText = 'SELECT * FROM users WHERE username = $1';
            queryValues = [user.username];
        }

        try {
            const client = await DatabaseHandler.getInstance().pool.connect(),
            dbResult: QueryResult<UserDTO> = await client.query(queryText, queryValues);
            // Release the client back to the pool
            client.release();

            if (dbResult.rowCount === 1) {
                return dbResult.rows[0];
            }

            throw new DatabaseError(
                `Could not find user with ${userSearchText} ${user.uuid ?? user.username}`,
                this.constructor.name,
            );

        } catch (error) {
            if (error instanceof Error) {
                throw new Error(error.message);
            }
            
            throw new DatabaseError('Something went wrong with getUser()', this.constructor.name);
        }
    };
}

export default UserModel;