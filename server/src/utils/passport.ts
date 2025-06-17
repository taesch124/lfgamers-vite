import UserModel from '@app/database/models/userModel';
import Logger from '@app/utils/logger';
import { UserDTO } from '@shared-types';
import passport from 'passport';
import { Strategy as LocalStrategy } from 'passport-local';

const passportLogger = Logger.createLogger('passportLogger');
const userModelLogger = Logger.createLogger('userModel');
const userModel = new UserModel(userModelLogger);

passport.use(
    new LocalStrategy(async (username, password, done) => {
        passportLogger.info('Logging in user', { password, username });
        try {
            const user = await userModel.getUserByUsername(username);
            if (!user) {
                return done(new Error('Invalid credentials'));
            }

            if (user.password === password) {
                passportLogger.info('passwords match', { password, userPassword: user.password });
                return done(null, user);
            }

            return done(new Error('Invalid credentials'));
        } catch (err) {
            done(err);
        }
    },
));

passport.serializeUser((user, done) => {
    process.nextTick(() => {
        passportLogger.info('Serializing user', { user });
        return done(null, (user as UserDTO).uuid);
    });
});

passport.deserializeUser((user: string, done) => {
    passportLogger.info('Deserializing user', { user });
    userModel.getUserByUserId(user)
        .then((userResult) => done(null, userResult))
        .catch((error) => done(error));
});