const express = require('express');
const { RefreshToken } = require('../controllers/token.controller');
const { VerifyRefreshToken } = require('../middlewares/token.middleware');
const router = express.Router();

router.post('/refresh', VerifyRefreshToken, RefreshToken);

module.exports = router;
