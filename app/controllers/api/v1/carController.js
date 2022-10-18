const carService = require("../../../services/carService");

module.exports = {
    list(req, res) {
        carService
            .list()
            .then(({ data, count }) => {
                res.status(200).json({
                    status: "success",
                    message: "Get cars data successfully",
                    data,
                    meta: { total: count },
                });
            })
            .catch((err) => {
                console.log(err);
                res.status(400).json({
                    status: "failed",
                    message: err.message,
                });
            });
    },

    async show(req, res) {
        const id = req.params.id;
        const car = await carService.get(id)
        if (!car) {
            res.status(404).json({
                status: "failed",
                message: "Car data not found"
            })
        } else {
            carService
                .get(id)
                .then((car) => {
                    res.status(200).json({
                        status: "success",
                        data: car,
                    });
                })
                .catch((err) => {
                    res.status(422).json({
                        status: "failed",
                        message: err.message,
                    });
                });
        }
    },

    create(req, res) {
        carService
            .create({
                ...req.body,
                createdByUser: req.user.id,
                lastUpdatedByUser: req.user.id
            })
            .then((car) => {
                res.status(201).json({
                    status: "success",
                    message: "Create car data successfully",
                    data: car,
                });
            })
            .catch((err) => {
                res.status(422).json({
                    status: "failed",
                    message: err.message,
                });
            });
    },

    async update(req, res) {
        const id = req.params.id;
        const car = await carService.get(id)
        if (!car) {
            res.status(404).json({
                status: "failed",
                message: "Car data not found"
            })
        } else {
            carService
                .update(req.params.id, {
                    ...req.body,
                    lastUpdatedByUser: req.user.id
                })
                .then(() => {
                    res.status(200).json({
                        status: "success",
                        message: "Update car data successfully"
                    });
                })
                .catch((err) => {
                    res.status(422).json({
                        status: "failed",
                        message: err.message,
                    });
                });
        }
    },

    async delete(req, res) {
        const id = req.params.id;
        const car = await carService.get(id)
        if (!car) {
            res.status(404).json({
                status: "failed",
                message: "Car data not found"
            })
        } else {
            carService.delete(id, req.user)
                .then(() => {
                    res.status(200).json({
                        status: "success",
                        message: "Delete car data successfully"
                    });
                })
                .catch((err) => {
                    res.status(422).json({
                        status: "failed",
                        message: err.message,
                    });
                });
        }
    }
}