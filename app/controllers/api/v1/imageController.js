const imageService = require("../../../services/imageService");

module.exports = {
    upload(req, res) {
        const fileBase64 = req.file.buffer.toString("base64");
        const file = `data:${req.file.mimetype};base64,${fileBase64}`;
        imageService.upload(file)
            .then(result => {
                res.status(201).json({
                    status: "success",
                    message: "Upload image successfully",
                    data: {
                        url: result.url,
                        public_id: result.public_id
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
}