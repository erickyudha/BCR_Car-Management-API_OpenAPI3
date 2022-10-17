const bcrypt = require("bcryptjs");
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

// Register base handler
async function register(req, res, role) {
    const email = req.body.email;
    const userAlreadyExist = await userService.isUserExist(email);
    if (userAlreadyExist) {
        res.status(409).json({
            status: "failed",
            message: "email already registered"
        })
        return
    }

    const name = req.body.name;
    const encrypted_pass = await encryptPassword(req.body.password);
    const user = await userService.create({ name, email, encrypted_pass, role });
    res.status(201).json({
        status: "success",
        message: "create user successfully",
        data: {
            id: user.id,
            name: user.name,
            email: user.email,
            role: role,
            createdAt: user.createdAt,
            updatedAt: user.updatedAt,
        }
    });
}

module.exports = {
    async registerMember(req, res) {
        register(req, res, "member");
    },

    async registerAdmin(req, res) {
        register(req, res, "admin");
    },

    async whoAmI(req, res) {
        res.status(200).json(req.user);
    },

    async list(req, res) {
        userService
            .list()
            .then(({ data, count }) => {
                res.status(200).json({
                    status: "success",
                    message: "Get user list successfully",
                    data,
                    meta: { total: count },
                });
            })
            .catch((err) => {
                res.status(400).json({
                    status: "FAIL",
                    message: err.message,
                });
            });
    }
}