const express = require('express');
const authMiddleware = require('./middlewares/auth');

const AuthController = require('./controllers/AuthController');
const UserController = require('./controllers/UserController');

const routes = express.Router();

routes.post('/auth/register', AuthController.register);
routes.post('/auth/login', AuthController.login);

routes.get('/users', authMiddleware, UserController.getUsers);

module.exports = routes;