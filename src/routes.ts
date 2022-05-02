import express from 'express';
import * as UserController from './modules/user.controller'

const expressHealthCheck = require('express-healthcheck');

const router: express.Router = express.Router();

router.get('/up', expressHealthCheck())

router.post('/register',UserController.signup);
router.post('/login',UserController.login)

export default router;