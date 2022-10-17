const { use } = require("../../config/routes");
const userRepository = require("../repositories/userRepository");

module.exports = {
    create(requestBody) {
        return userRepository.create(requestBody);
    },

    update(id, requestBody) {
        return userRepository.update(id, requestBody);
    },

    delete(id) {
        return userRepository.delete(id);
    },

    async list() {
        try {
            const users = await userRepository.findAll();
            const userCount = await userRepository.getTotalCar();

            return {
                data: users,
                count: userCount,
            };
        } catch (err) {
            throw err;
        }
    },

    get(id) {
        return userRepository.find(id);
    },

    getByEmail(email) {
        return userRepository.findByEmail(email);
    }
};
