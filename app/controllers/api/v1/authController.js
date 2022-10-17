const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const userService = require("../../../services/userService");
const SALT = 10;

function encryptPassword(password) {
    return new Promise((resolve, reject) => {
        bcrypt.hash(password, SALT, (err, encrypted_pass) => {
            if (!!err) {
                reject(err);
                return;
            }

            resolve(encrypted_pass);
        });
    });
}

function checkPassword(encrypted_pass, password) {
    return new Promise((resolve, reject) => {
        bcrypt.compare(password, encrypted_pass, (err, isPasswordCorrect) => {
            if (!!err) {
                reject(err);
                return;
            }

            resolve(isPasswordCorrect);
        });
    });
}

function createToken(payload) {
    return jwt.sign(payload, process.env.JWT_SIGNATURE_KEY || "Rahasiasss");
}

async function register(req, res, role) {
    const email = req.body.email;
    const name = req.body.name;
    const encrypted_pass = await encryptPassword(req.body.password);
    const user = await userService.create({ name, email, encrypted_pass, role });
    res.status(201).json({
        id: user.id,
        name: user.name,
        email: user.email,
        role: role,
        createdAt: user.createdAt,
        updatedAt: user.updatedAt,
    });
}

module.exports = {
    async registerUser(req, res) {
        register(req, res, "user");
    },

    async registerAdmin(req, res) {
        register(req, res, "admin");
    },

    async login(req, res) {
        const email = req.body.email.toLowerCase();
        const password = req.body.password;
        const user = await userService.getByEmail(email);

        if (!user) {
            res.status(404).json({
                status: "failed",
                message: "Email not found"
            });
            return;
        }

        const isPasswordCorrect = await checkPassword(
            user.encrypted_pass,
            password
        );

        if (!isPasswordCorrect) {
            res.status(401).json({
                status: "failed",
                message: "Wrong password"
            });
            return;
        }

        const token = createToken({
            id: user.id,
            email: user.email,
            createdAt: user.createdAt,
            updatedAt: user.updatedAt,
        });

        res.status(201).json({
            status: "success",
            message: "login successfully",
            data: {
                id: user.id,
                email: user.email,
                role: user.role,
                token,
                createdAt: user.createdAt,
                updatedAt: user.updatedAt,
            }
        });
    },

    async whoAmI(req, res) {
        res.status(200).json(req.user);
    },

    async authorize(req, res, next) {
        try {
            const bearerToken = req.headers.authorization;
            const token = bearerToken.split("Bearer ")[1];
            const tokenPayload = jwt.verify(
                token,
                process.env.JWT_SIGNATURE_KEY || "Rahasiasss"
            );

            req.user = await userService.get(tokenPayload.id);
            next();
        } catch (err) {
            console.error(err);
            res.status(401).json({
                message: "Unauthorized",
            });
        }
    },
}