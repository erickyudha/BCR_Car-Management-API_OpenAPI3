const carService = require("../../../services/carService");
const cloudinary = require("../../../../config/cloudinary")

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

    uploadImage(req, res) {
        // require Multer middleware
        const public_id = Date.now() + "-" + Math.round(Math.random() * 1e9);
        const fileBase64 = req.file.buffer.toString("base64");
        const file = `data:${req.file.mimetype};base64,${fileBase64}`;
        const UPLOAD_DIR_NAME = "bcr_car-management-api_cars"

        cloudinary.uploader
            .upload(file, {
                height: 160, width: 270, crop: "fit",
                folder: UPLOAD_DIR_NAME, public_id: public_id
            })
            .then(result => {
                res.status(201).json({
                    status: "success",
                    message: "Upload image successfully",
                    data: {
                        url: result.url,
                        public_id: public_id
                    }
                });
            })
            .catch(err => {
                res.status(422)
                    .json({
                        status: "failed",
                        message: err.message
                    })
            })

    }
};
