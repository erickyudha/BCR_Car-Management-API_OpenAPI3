

module.exports = {

    create(req, res) {
        // TODO: ADD USER THAT USE THIS
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
        // TODO: ADD USER THAT USE THIS
        carService.get(req.params.id)
            .then(car => {
                // Delete image from cloudinary to prevent storage bloating
                cloudinary.uploader.destroy(`${CLOUDINARY_DIR}/${car.image_id}`)
            })
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
        // TODO: ADD USER THAT USE THIS
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
        // TODO: ADD USER THAT USE THIS
        // TODO: DELETE CAR MOVE TO ARCHIVE TABLE
        carService.get(req.params.id)
            .then(car => {
                // Delete image from cloudinary to prevent storage bloating
                cloudinary.uploader.destroy(`${CLOUDINARY_DIR}/${car.image_id}`)
            })
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
