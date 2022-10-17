const express = require("express");
const controllers = require("../app/controllers");
const { carController } = require("../app/controllers/api/v1");
const upload = require("./upload")

const apiRouter = express.Router();

// auth & user control routes
// * No auth
apiRouter.post("/api/v1/register", controllers.api.v1.userController.registerMember);
apiRouter.post("/api/v1/login", controllers.api.v1.authController.login);

// * Member auth
apiRouter.get("/api/v1/whoami",
    controllers.api.v1.authController.authorizeMember,
    controllers.api.v1.userController.whoAmI);

// * Admin auth
apiRouter.get("/api/v1/users",
    controllers.api.v1.authController.authorizeAdmin,
    controllers.api.v1.userController.list);

apiRouter.post("/api/v1/images",
    controllers.api.v1.authController.authorizeAdmin,
    upload.single("image"),
    controllers.api.v1.imageController.upload);

// * Superadmin auth    
apiRouter.post("/api/v1/admins",
    controllers.api.v1.authController.authorizeSuper,
    controllers.api.v1.userController.registerAdmin)


// car control routes
// * member auth
apiRouter.get("/api/v1/cars",
    controllers.api.v1.authController.authorizeMember,
    controllers.api.v1.carController.list);
apiRouter.get("/api/v1/cars/:id",
    controllers.api.v1.authController.authorizeMember,
    controllers.api.v1.carController.show)

// * admin auth
apiRouter.post("/api/v1/cars",
    controllers.api.v1.authController.authorizeAdmin,
    controllers.api.v1.carController.create)

// test routes
// apiRouter.post("/test", controllers.api.v1.userController.checkEmail)

apiRouter.use(controllers.api.main.onLost);
apiRouter.use(controllers.api.main.onError);

module.exports = apiRouter;
