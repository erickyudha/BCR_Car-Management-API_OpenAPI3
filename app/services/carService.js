const carRepository = require("../repositories/carRepository");
const userRepository = require("../repositories/userRepository");
const imageRepository = require("../repositories/imageRepository");


const formatCarData = async (car) => {
    const [img, creator, updater] = await Promise.all([
        imageRepository.find(car.image_id),
        userRepository.attributesFind(car.createdByUser, ["id", "name"]),
        userRepository.attributesFind(car.lastUpdatedByUser, ["id", "name"])
    ])

    return {
        id: car.id,
        name: car.name,
        size: car.size,
        rent_per_day: car.rent_per_day,
        image: img,
        createdBy: creator,
        createdAt: car.createdAt,
        updatedBy: updater,
        updatedAt: car.updatedAt
    }
}

module.exports = {
    create(requestBody) {
        return carRepository.create(requestBody);
    },

    update(id, requestBody) {
        return carRepository.update(id, requestBody);
    },

    delete(id) {
        return carRepository.delete(id);
    },

    async list() {
        try {
            const cars = await carRepository.findAll();
            const formattedCar = await Promise.all(cars.map(car => formatCarData(car)))
            const carCount = await carRepository.getTotalCar();

            return {
                data: formattedCar,
                count: carCount,
            };
        } catch (err) {
            throw err;
        }
    },

    get(id) {
        return carRepository.find(id);
    },
};
