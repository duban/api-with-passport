const passport = require('passport');
const jwt = require('jwt-simple');
// const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const dotenv = require('dotenv');
dotenv.config();

const LocalStrategy = require('passport-local').Strategy;
const BearerStrategy = require('passport-http-bearer').Strategy;

const User = require('../models/user.model');

const ADMIN = 'admin';
const ADMIN_PASSWORD = 'password';
const SECRET = 'mysecret';
const secretKey = process.env.SECRET_JWT || "";

function initialize(options) {
  return passport.initialize(options);
}

// passport.use(new BearerStrategy((token, done) => {
//   try {
//     const { username } = jwt.decode(token, SECRET);
//     if (username === ADMIN) {
//       done(null, username);
//       return;
//     }
//     done(null, false);
//   } catch (error) {
//     done(null, false);
//   }
// }));

passport.use(new BearerStrategy(function(token, done) {
User.findOne({
    where: {
        token: token
    }
}).then(function(resp) {
  if (!resp) {
      return done(null, false,'Token does not exist');
  }
  done(null, resp);
}).catch(function () {
  console.log("Something Wrong");
});
  
}));

// passport.use(new BasicStrategy(
//   function(userid, password, done) {
//     User.findOne({ username: userid }, function (err, user) {
//       if (err) { return done(err); }
//       if (!user) { return done(null, false); }
//       if (!user.verifyPassword(password)) { return done(null, false); }
//       return done(null, user);
//     });
//   }
// ));

// passport.use(new LocalStrategy((username, password, done) => {
//   if (username === ADMIN && password === ADMIN_PASSWORD) {
//     done(null, jwt.encode({ username }, SECRET));
//     return;
//   }
//   done(null, false);
// }));

passport.use(new LocalStrategy(
  {
    // by default, local strategy uses username and password, we will override with email
    usernameField: 'email',
    passwordField: 'password',
    passReqToCallback: true // allows us to pass back the entire request to the callback

},
function(req, email, password, done) {
  User.findOne({
    where: {
        email: email
    }
}).then(function(user) {
  // var User = user;
  // console.log(user) 
        var isValidPassword = function(userpass, password) {
            return bcrypt.compareSync(password, userpass);
        }

    if (!user) {
      console.log('kmapret')
        return done(null, false,'Email does not exist');
    }

    if (!isValidPassword(user.password, password)) {
        return done(null, false, 'Incorrect password.');

    }
    var username = user.username;
    console.log(user.username)
    done(null, user.token);
    // return done(null, userinfo);
    // return done(null, userinfo);
    // done(null, jwt.encode({ useri.username }, SECRET));

}).catch(function(err) {

    console.log("Error:", err);

    return done(null, false, {
        message: 'Something went wrong with your Signin'
    });

});
}
))



exports.initialize = initialize;
exports.authenticateLocal = passport.authenticate('local', { session: false });
exports.authenticateBearer = passport.authenticate('bearer', { session: false });
