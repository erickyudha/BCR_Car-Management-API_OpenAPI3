const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const personService = require("../../../services/personService");
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
    return jwt.sign(payload, process.env.JWT_SIGNATURE_KEY || "Rahasia");
}

module.exports = {
    async register(req, res) {
        const email = req.body.email;
        const encrypted_pass = await encryptPassword(req.body.password);
        const role = "user";
        const user = await personService.create({ email, encrypted_pass, role });
        res.status(201).json({
            id: user.id,
            email: user.email,
            role: role,
            createdAt: user.createdAt,
            updatedAt: user.updatedAt,
        });
    },

    async login(req, res) {
        const email = req.body.email.toLowerCase(); // Biar case insensitive
        const password = req.body.password;

        const user = personService.getByEmail(email);

        if (!user) {
            res.status(404).json({
                status: "failed",
                message: "Email tidak ditemukan"
            });
            return;
        }

        const isPasswordCorrect = await checkPassword(
            user.encrypted_pass,
            password
        );

        if (!isPasswordCorrect) {
            res.status(401).json({ message: "Password salah!" });
            return;
        }

        const token = createToken({
            id: user.id,
            email: user.email,
            createdAt: user.createdAt,
            updatedAt: user.updatedAt,
        });

        res.status(201).json({
            id: user.id,
            email: user.email,
            token,
            createdAt: user.createdAt,
            updatedAt: user.updatedAt,
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
                process.env.JWT_SIGNATURE_KEY || "Rahasia"
            );

            req.user = await User.findByPk(tokenPayload.id);
            next();
        } catch (err) {
            console.error(err);
            res.status(401).json({
                message: "Unauthorized",
            });
        }
    },
};

