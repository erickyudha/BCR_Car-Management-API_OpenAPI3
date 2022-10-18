const { CarArchive } = require("../models");

module.exports = {
    create(createArgs) {
        return CarArchive.create(createArgs);
    },
}