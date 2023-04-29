const express = require('express');

const router = express.Router();

const { validateBody } = require('../../utils');

const ctrl = require('../../controllers/auth');

const { authenticate } = require('../../middlewares');

const { schemas } = require('../../models/user');

router.post('/register', validateBody(schemas.registerSchema), ctrl.register);

router.post('/login', validateBody(schemas.loginSchema), ctrl.login);

router.get('/current', authenticate, ctrl.getCurrent);

router.post('/logout', authenticate, ctrl.logout);

module.exports = router;