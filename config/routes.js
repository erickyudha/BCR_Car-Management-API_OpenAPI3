const express = require("express");
const controllers = require("../app/controllers");
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

// * Superadmin auth    
apiRouter.post("/api/v1/admins",
    controllers.api.v1.authController.authorizeSuper,
    controllers.api.v1.userController.registerAdmin)

// car routes
/* 
apiRouter.get("/api/v1/cars", controllers.api.v1.carController.list);
apiRouter.post("/api/v1/cars", controllers.api.v1.carController.create);
apiRouter.put("/api/v1/cars/:id", controllers.api.v1.carController.update);
apiRouter.get("/api/v1/cars/:id", controllers.api.v1.carController.show);
apiRouter.delete("/api/v1/cars/:id", controllers.api.v1.carController.destroy);
apiRouter.post("/api/v1/cars/image", upload.single("image"), controllers.api.v1.carController.uploadImage);
 */

// test routes
// apiRouter.post("/test", controllers.api.v1.userController.checkEmail)

apiRouter.use(controllers.api.main.onLost);
apiRouter.use(controllers.api.main.onError);

module.exports = apiRouter;
