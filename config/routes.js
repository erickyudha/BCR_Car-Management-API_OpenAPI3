const express = require("express");
const controllers = require("../app/controllers");

const apiRouter = express.Router();

apiRouter.get("/api/v1/cars", controllers.api.v1.carController.list);
apiRouter.post("/api/v1/cars", controllers.api.v1.carController.create);
apiRouter.put("/api/v1/cars/:id", controllers.api.v1.carController.update);
apiRouter.get("/api/v1/cars/:id", controllers.api.v1.carController.show);
apiRouter.delete("/api/v1/cars/:id", controllers.api.v1.carController.destroy);


apiRouter.use(controllers.api.main.onLost);
apiRouter.use(controllers.api.main.onError);

module.exports = apiRouter;
