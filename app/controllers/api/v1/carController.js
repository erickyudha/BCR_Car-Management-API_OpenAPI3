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
                res.status(400).json({
                    status: "FAIL",
                    message: err.message,
                });
            });
    },

    create(req, res) {
        carService
            .create(req.body)
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

    update(req, res) {
        carService
            .update(req.params.id, req.body)
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
    },

    show(req, res) {
        carService
            .get(req.params.id)
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
    },

    destroy(req, res) {
        carService
            .delete(req.params.id)
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
    },
};
