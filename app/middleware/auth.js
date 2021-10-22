const passport = require('passport');
const jwt = require('jwt-simple');
const dotenv = require('dotenv');
dotenv.config();

const LocalStrategy = require('passport-local').Strategy;
const BearerStrategy = require('passport-http-bearer').Strategy;

const ADMIN = 'admin';
const ADMIN_PASSWORD = 'password';
const SECRET = 'mysecret';

function initialize(options) {
  return passport.initialize(options);
}

passport.use(new BearerStrategy((token, done) => {
  try {
    const { username } = jwt.decode(token, SECRET);
    if (username === ADMIN) {
      done(null, username);
      return;
    }
    done(null, false);
  } catch (error) {
    done(null, false);
  }
}));

passport.use(new LocalStrategy((username, password, done) => {
  if (username === ADMIN && password === ADMIN_PASSWORD) {
    done(null, jwt.encode({ username }, SECRET));
    return;
  }
  done(null, false);
}));

exports.initialize = initialize;
exports.authenticateLocal = passport.authenticate('local', { session: false });
exports.authenticateBearer = passport.authenticate('bearer', { session: false });
