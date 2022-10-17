const carService = require("../../../services/carService");

module.exports = {
    list(req, res) {
        carService
            .list()
            .then(({ data, count }) => {
                res.status(200).json({
                    status: "success",
                    message: "Get cars data successfully",
                    data: { cars: data },
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

    create(req, res) {
        // TODO: ADD USER THAT USE THIS
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


}