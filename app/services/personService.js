const personRepository = require("../repositories/personRepository");

module.exports = {
    create(requestBody) {
        return personRepository.create(requestBody);
    },

    update(id, requestBody) {
        return personRepository.update(id, requestBody);
    },

    delete(id) {
        return personRepository.delete(id);
    },

    async list() {
        try {
            const person = await personRepository.findAll();
            const personCount = await personRepository.getTotalCar();

            return {
                data: person,
                count: personCount,
            };
        } catch (err) {
            throw err;
        }
    },

    getByEmail(email) {
        return personRepository.findByEmail(email)
    },

    get(id) {
        return personRepository.find(id);
    },
};
