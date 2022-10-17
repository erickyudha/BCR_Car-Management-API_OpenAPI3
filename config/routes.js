const express = require("express");
const controllers = require("../app/controllers");
const upload = require("./upload")

const apiRouter = express.Router();

// car routes
apiRouter.get("/api/v1/cars", controllers.api.v1.carController.list);
apiRouter.post("/api/v1/cars", controllers.api.v1.carController.create);
apiRouter.put("/api/v1/cars/:id", controllers.api.v1.carController.update);
apiRouter.get("/api/v1/cars/:id", controllers.api.v1.carController.show);
apiRouter.delete("/api/v1/cars/:id", controllers.api.v1.carController.destroy);
apiRouter.post("/api/v1/cars/image", upload.single("image"), controllers.api.v1.carController.uploadImage);

// auth routes
apiRouter.post("/api/v1/users", controllers.api.v1.authController.registerUser);
apiRouter.post("/api/v1/users/login", controllers.api.v1.authController.login);
apiRouter.get(
    "/api/v1/whoami",
    controllers.api.v1.authController.authorize,
    controllers.api.v1.authController.whoAmI
);



apiRouter.use(controllers.api.main.onLost);
apiRouter.use(controllers.api.main.onError);

module.exports = apiRouter;
