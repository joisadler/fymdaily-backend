import pl from 'passport-local';
import bCrypt from 'bcrypt-nodejs';
import User from '../../../models/user';

const LocalStrategy = pl.Strategy;

const isValidPassword = (user, password) =>
  bCrypt.compareSync(password, user.password);

export default (passport) => {
  passport.use(
    'login',
    new LocalStrategy(
      {
        passReqToCallback: true,
        usernameField: 'usernameOrEmail',
      },
      (req, usernameOrEmail, password, done) => {
        User.findOne({ email: usernameOrEmail }, (error, user) => {
          if (error) throw error;
          if (!user) {
            User.findOne({ username: usernameOrEmail }, (err, usr) => {
              if (err) throw err;
              if (!usr) {
                return done(null, false, {
                  user: null,
                  message: 'User not found!',
                });
              }
              if (!isValidPassword(usr, password)) {
                return done(null, false, {
                  user: null,
                  message: 'Invalid Password!',
                });
              }
              usr = usr.toObject();
              delete usr.password;
              return done(null, usr);
            });
          } else if (!isValidPassword(user, password)) {
            return done(null, false, {
              user: null,
              message: 'Invalid Password!',
            });
          } else {
            user = user.toObject();
            delete user.password;
            return done(null, user);
          }
          return null;
        });
      }
    )
  );
};
