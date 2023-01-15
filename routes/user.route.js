const express = require('express');
const {
  GetAllUsers,
  CreateUser,
  DeleteUser,
  UpdateUser,
} = require('../controllers/user.controller');
const { AuthToken } = require('../middlewares/shared.middleware');
const {
  CreateUserMiddleware,
  DeleteUserMiddleware,
  UpdateUserMiddleware,
} = require('../middlewares/user.middleware');
const router = express.Router();

router.get('/', AuthToken, GetAllUsers);
router.post('/', [AuthToken, CreateUserMiddleware], CreateUser);
router.put('/:id', [AuthToken, UpdateUserMiddleware], UpdateUser);
router.delete('/:id', [AuthToken, DeleteUserMiddleware], DeleteUser);

module.exports = router;
