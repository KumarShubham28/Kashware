const passport = require("passport");
const jwt = require("jsonwebtoken");
const jsonpatch = require("jsonpatch");
const user_data = require('../models').user_data;

exports.create =
    (req, res, next) => {
        passport.authenticate('user-signup', (err, user, info) => {
            if (err) {
                res.status(500).send(error);
            } if (!user) {
                res.status(409).send(info)
            }
            else {
                req.logIn(user, { session: false }, async (err) => {
                    if (err) {
                        res.status(500).send(err);
                    } else {
                        res.status(200).send({
                            name: user.name,
                            email: user.email
                        })
                    }
                });
            }
        }
        )(req, res, next)
    }

exports.login = (req, res, next) => {
    passport.authenticate('user-signin', (err, user, info) => {
        if (err) {
            res.status(500).send(error);
        } if (!user) {
            res.status(401).send(info)
        }
        else {
            req.logIn(user, { session: false }, (err) => {
                if (err) {
                    res.status(500).send(err);
                } else {
                    const token = jwt.sign(user, 'your_jwt_secret', { expiresIn: "10h" });
                    res.status(200).json({ name: user.name, email: user.email, token: token })
                }
            });
        }
    }
    )(req, res, next)
}

exports.update = async (req, res, next) => {
    try {
        const user = await user_data.findOne({
            where: {
                id: req.params.id
            }
        })
        var document = user.dataValues
        // console.log(document)
        var patch = [
            { op: "add", path: "/name", value: req.body.name },
        ];
        patcheddoc = jsonpatch.apply_patch(document, patch);
        res.status(200).send(patcheddoc)
    } catch (error) {
        // console.log(error)
        res.status(400).send(error)
    }
}