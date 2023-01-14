const express = require('express');
const {
  GetAllUsers,
  CreateUser,
  DeleteUser,
} = require('../controllers/user.controller');
const { AuthToken } = require('../middlewares/shared.middleware');
const {
  CreateUserMiddleware,
  DeleteUserMiddleware,
} = require('../middlewares/user.middleware');
const router = express.Router();

router.get('/', AuthToken, GetAllUsers);
router.post('/', [AuthToken, CreateUserMiddleware], CreateUser);
router.delete('/:id', [AuthToken, DeleteUserMiddleware], DeleteUser);

module.exports = router;
