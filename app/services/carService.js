const carRepository = require("../repositories/carRepository");
const userRepository = require("../repositories/userRepository");
const imageRepository = require("../repositories/imageRepository");
const carArchiveRepository = require("../repositories/carArchiveRepository");


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

    async delete(id, user) {
        try {
            const car = await carRepository.find(id);
            const creator = await userRepository.find(car.createdByUser);
            const data = {
                old_id: car.id,
                name: car.name,
                size: car.size,
                rent_per_day: car.rent_per_day,
                createdBy: creator.name,
                createdAt: car.createdAt,
                deletedBy: user.name,
                deletedAt: new Date(),
            }
            carArchiveRepository.create(data)
                .then(() => {
                    console.log("Archive car data success");
                }).catch(err => {
                    console.log("Archive data error: " + err.message);
                    throw err
                })
            return carRepository.delete(id);
        } catch (error) {
            throw error
        }
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

    async get(id) {
        const car = await carRepository.find(id)
        if (car) {
            const formattedCar = await formatCarData(car)
            return formattedCar;
        }
        return null
    },
};
