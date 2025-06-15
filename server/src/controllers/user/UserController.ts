import UserModel from '@app/database/models/userModel';
import DatabaseError from '@app/errors/DatabaseError';
import { UserDTO } from '@shared-types';
import { Logger } from 'winston';

class UserController {
    constructor(
        private userModel: UserModel,
        private logger: Logger,
    ) {
        this.userModel = userModel;
        this.logger = logger;
    }

    public async getUser(user: Partial<Pick<UserDTO, 'uuid' | 'username'>>): Promise<UserDTO> {
        if (!user.uuid && !user.username) {
            throw new DatabaseError('Must provide either user ID or username', this.constructor.name);
        }

        if (user.uuid && typeof user.uuid !== 'string') {
            throw new TypeError('User ID must be a string');
        } else if (user.uuid) {
            return await this.userModel.getUserByUserId(user.uuid);
        }

        if (user.username && typeof user.username !== 'string') {
            throw new TypeError('Username must be a string');
        } else if (user.username) {
            return await this.userModel.getUserByUsername(user.username);
        }

        throw new Error ('Something went wrong with UserController.getUser()');
    }
}

export default UserController;