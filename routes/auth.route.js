const express = require('express');
const { Login, Register } = require('../controllers/auth.controller');
const {
  LoginMiddleware,
  RegisterMiddleware,
} = require('../middlewares/auth.middleware');
const router = express.Router();

router.post('/login', LoginMiddleware, Login);
router.post('/register', RegisterMiddleware, Register);

module.exports = router;
