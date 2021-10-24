const User = require('../models/user.model');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
dotenv.config();

class UserController {
    findByUsername = (username,password) => {
        const salt = bcrypt.genSaltSync();
        const hash = bcrypt.hashSync(password, salt);
        return hash;
    }
    hashPassword = (password) => {
        const salt = bcrypt.genSaltSync();
        const hash = bcrypt.hashSync(password, salt);
        return hash;
    }
    comparePassword = (pw, hash) => (
        bcrypt.compareSync(pw, hash)
    );
    userLogin = async (req, res, next) => {
        const { email, password } = req.body;
        if (email && password) {
            try {
                const user = await User.findOne({
                    where: {
                        email,
                    },
                });

                if (!user) {
                    return res.status(400).json({
                        data: "",
                        message: "User not found"
                    });
                }
                const isMatch = this.comparePassword(password, user.password);
                if (!isMatch) {
                    return res.status(400).json({
                        data: "",
                        message: "Invalid email or password"
                    });
                }
                const secretKey = process.env.SECRET_JWT || "";
                const token = jwt.sign({ user_id: user.id.toString() }, secretKey, {
                    expiresIn: '24h'
                });
                // const { password, ...userWithoutPassword } = user;
                return res.status(201).json({
                    data: { token, username:user.username, role:user.role },
                    message: "Successfully Logged In"
                });

            } catch (err) {
                return res.status(500).json({ msg: 'Internal server error' });
            }
        }
    }
    validateToken = (req, res, next) => {
        const secretKey = process.env.SECRET_JWT || "";
        const { token } = req.body;
        try {
            const decoded = jwt.verify(token, secretKey);
            if (decoded) {
                return res.status(200).json({
                    data: { isValid: true },
                    message: "Valid Token"
                });
            }
        } catch(err) {
            return res.status(401).json({
                data: { isValid: false },
                message: "Inalid Token!"
            });
        }
    };
    createUser = async (req, res, next) => {
        const secretKey = process.env.SECRET_JWT || "";
        const token = jwt.sign({ username: req.body.username }, secretKey, {
                    expiresIn: '30d'
                });
        const { body } = req;
        console.log({
            username: body.username,
            password: this.hashPassword(body.password),
            token: jwt.sign({ username: body.username }, secretKey, {
                expiresIn: '30d'
            }),
            first_name: body.first_name,
            last_name: body.last_name,
            email: body.email,
            role: body.role,
        })
        try {
            const user = await User.create({
                username: body.username,
                password: this.hashPassword(body.password),
                token: token,
                first_name: body.first_name,
                last_name: body.last_name,
                email: body.email,
                role: body.role,
            });
            return res.status(201).json({
                data: [],
                message: "User was created!"
            });

        } catch (err) {
            console.error(err)
            return res.status(500).json({ msg: 'Internal server error' });
        }
    }
    getUserById = async (req, res, next) => {
        try {
            const { id } = req.params;
            const user = await User.findOne({ where: {id:id}});
            if (!user) {
                return res.status(404).json({
                    data: "",
                    message: "Users not found"
                });
            }

            return res.status(200).json({
                data: {user_id:user.id,username:user.username,first_name:user.first_name,last_name:user.last_name,email:user.email,role:user.role},
                message: "Success retrieve data."
            });
        } catch (err) {
            return res.status(500).json({ msg: 'Internal server error' });
        }

    };
    getAllUsers = async (req, res, next) => {
        try {
            let userList = await User.findAll({raw:true});
            if (!userList.length) {
                return res.status(404).json({
                    data: "",
                    message: "Users not found"
                });
            }

            userList = userList.map(user => {
                const { password, ...userWithoutPassword } = user;
                return userWithoutPassword;
            });

            res.send({data:userList});

        } catch (err) {
            return res.status(500).json({ msg: 'Internal server error' });
        }
    };
    getUserByuserName = async (req, res, next) => {
        try {
            const { username } = req.params;
            const user = await User.findOne({ where: {username:username}});
            if (!user) {
                return res.status(404).json({
                    data: "",
                    message: "Users not found"
                });
            }

            // const { password, ...userWithoutPassword } = user;

            // res.send(userWithoutPassword);
            return res.status(200).json({
                data: {user_id:user.id,username:user.username,first_name:user.first_name,last_name:user.last_name,email:user.email,role:user.role},
                message: "Success retrieve data."
            });

        } catch (err) {
            return res.status(500).json({ msg: 'Internal server error' });
        }
    };

}
module.exports = new UserController;
