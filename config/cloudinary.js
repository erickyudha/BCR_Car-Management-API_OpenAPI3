const cloudinary = require("cloudinary").v2;

cloudinary.config({
    cloud_name: "CHANGE THIS",
    api_key: "CHANGE THIS",
    api_secret: "CHANGE THIS",
    secure: true,
});

// Edit where picture will be saved in cloudinary (folder)
const config = {
    dir: "bcr_car-management-api"
}

module.exports = { cloudinary, config };
