const { Image } = require("../models");

module.exports = {
    create(createArgs) {
        return Image.create(createArgs);
    },

    delete(id) {
        return Image.destroy(id);
    },

    find(id) {
        return Image.findByPk(id);
    },
};
