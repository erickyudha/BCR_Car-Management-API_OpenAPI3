const { User } = require("../models");

module.exports = {
    create(createArgs) {
        return User.create(createArgs);
    },

    delete(id) {
        return User.destroy(id);
    },

    find(id) {
        return User.findByPk(id);
    },

    findByEmail(email) {
        return User.findOne({ where: { email } })
    },

    findAll() {
        return User.findAll();
    },

    getTotalUser() {
        return User.count();
    },
};
