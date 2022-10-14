const { Person } = require("../models")

module.exports = {
    create(createArgs) {
        return Person.create(createArgs);
    },

    update(id, updateArgs) {
        return Person.update(updateArgs, {
            where: {
                id,
            },
        });
    },

    delete(id) {
        return Person.destroy(id);
    },

    find(id) {
        return Person.findByPk(id);
    },

    findByEmail(email) {
        return Person.findOne({
            where: { email }
        })
    },

    findAll() {
        return Person.findAll();
    },

    getTotalPerson() {
        return Person.count();
    },
};
