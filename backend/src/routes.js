const express = require("express");
const authMiddleware = require("./middlewares/auth");

const AuthController = require("./controllers/AuthController");
const UserController = require("./controllers/UserController");
const EventController = require("./controllers/EventController");

const routes = express.Router();

routes.post("/auth/register", AuthController.register);
routes.post("/auth/login", AuthController.login);

routes.get("/users", authMiddleware, UserController.getUsers);
routes.delete("/users/:userId", authMiddleware, UserController.deleteUser);
routes.get("/user", UserController.getUser);

routes.post("/events/add", EventController.store);
routes.get("/events", EventController.getEvents);
routes.put(
  "/event/:eventId/updateCoordinate",
  EventController.updateCoordinate
);
routes.delete("/events/:eventId", EventController.deleteEvent);

module.exports = routes;
