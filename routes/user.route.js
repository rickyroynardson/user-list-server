const express = require('express');
const { GetAllUsers } = require('../controllers/user.controller');
const { AuthToken } = require('../middlewares/shared.middleware');
const router = express.Router();

router.get('/', AuthToken, GetAllUsers);

module.exports = router;
