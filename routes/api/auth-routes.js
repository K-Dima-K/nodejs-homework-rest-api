const express = require('express');

const router = express.Router();

const { validateBody } = require('../../utils');

const ctrl = require('../../controllers/auth');

const { authenticate, upload } = require('../../middlewares');

const { schemas } = require('../../models/user');

// signUp

router.post('/register', validateBody(schemas.registerSchema), ctrl.register);

router.get('/verify/:verificationCode', ctrl.verify);

router.post('/verify/', validateBody(schemas.emailSchema), ctrl.verify);

// signIn

router.post(
  '/login',
  validateBody(schemas.loginSchema),
  ctrl.resendVerifyEmail
);

router.get('/current', authenticate, ctrl.getCurrent);

router.post('/logout', authenticate, ctrl.logout);

router.patch(
  '/avatars',
  authenticate,
  upload.single('avatar'),
  ctrl.updateAvatar
);

module.exports = router;
