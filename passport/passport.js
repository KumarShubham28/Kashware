const bcrypt = require('bcrypt');
const user_data = require('../models').user_data;
const passportJWT = require("passport-jwt");
const JWTStrategy = passportJWT.Strategy;
const ExtractJWT = passportJWT.ExtractJwt;
const LocalStrategy = require('passport-local').Strategy;

module.exports = function (passport) {
    passport.use('user-signup', new LocalStrategy(
        {
            usernameField: 'email',
            passwordField: 'password',
            passReqToCallback: true
        }, function (req, email, password, done) {
            const generateHash = function (password) {
                return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
            }
            user_data.findOne({
                where: {
                    email: email
                }
            }).then(function (user) {
                if (user) {
                    return done(null, false, {
                        message: 'email is already taken'
                    })
                }
                const userPassword = generateHash(password);
                    const data = {
                        email: req.body.email,
                        password: userPassword,
                        name: req.body.name,
                    }
                    user_data.create(data)
                        .then(function (newUser, created) {
                            if (!newUser) {
                                return done(null, false);
                            }
                            if (newUser) {
                                return done(null, newUser);
                            }
                        })
                        .catch(async function (err) {
                            return done(null, false, {
                                message: 'Something went wrong with your SignUp'
                            });
                        });
            });
        }
    ))

    passport.use('user-signin', new LocalStrategy(
        {
            usernameField: 'email',
            passwordField: 'password',
            passReqToCallback: true
        },
        function (req, email, password, done) {
            const isValidPassword = function (userpass, password) {
                return bcrypt.compareSync(password, userpass);
            }
            user_data.findOne({
                where: {
                    email: email
                }
            }).then(async function (user) {
                if (!user) {
                    return done(null, false, {
                        message: 'email or password is incorrect.'
                    });
                }
                if (!isValidPassword(user.password, password)) {
                    return done(null, false, {
                        message: 'email or password is incorrect.'
                    });
                } else {
                    const userinfo = user.get();
                    return done(null, userinfo);
                }
            }).catch(function (err) {
                console.log("Error:", err);
                return done(null, false, {
                    message: 'Failed to login.'
                });
            });
        }
    ));

    passport.use(new JWTStrategy({
        jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken(),
        secretOrKey: 'your_jwt_secret'
    },
        function (jwtPayload, done) {
            return user_data.findByPk(jwtPayload.id)
                .then(user => {
                    return done(null, user);
                })
                .catch(err => {
                    return done(err);
                });
        }
    ));

    passport.serializeUser(function (user, done) {
        done(null, user.id);
    });

    passport.deserializeUser(function (id, done) {
        user_data.findByPk(id).then(function (user) {
            done(null, user);
        }).catch(function (err) {
            done(err, null);
        });
    });
}