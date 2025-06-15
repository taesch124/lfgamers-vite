import UserModel from '@app/database/models/userModel';
import Logger from '@app/utils/logger';
import { UserDTO } from '@shared-types';
import passport from 'passport';
import { Strategy as LocalStrategy } from 'passport-local';

const passportLogger = Logger.createLogger('passportLogger');
const userModelLogger = Logger.createLogger('userModel');
const userModel = new UserModel(userModelLogger);

passport.use(
    new LocalStrategy((username, password, done) => {
            userModel.getUserByUsername(username)
                .then((user) => {
                    // INFO: password hashing
                    if (user.password === password) {
                        return done(null, user);
                    }

                    return done(null, false, { message: 'Invalid credentials' });
                })
                .catch(() => done(null, false, { message: 'Invalid credentials' }));
            return done(null, false, { message: 'Invalid credentials' });
    },
));

passport.serializeUser((user, done) => {
    process.nextTick(() => {
        passportLogger.info('Serializing user', { user });
        return done(null, {
            username: (user as UserDTO).username,
            uuid: (user as UserDTO).uuid,
        });
    });
});

passport.deserializeUser((user: any, done) => {
    userModel.getUserByUserId(user.uuid as string)
        .then((userResult) => {
            passportLogger.info('Deserializing user', { user });
            return done(null, userResult);
        })
        .catch((error) => done(error));
});