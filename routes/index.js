const AuthRouter = require('./auth.route');
const UserRouter = require('./user.route');

module.exports = function (app) {
  const apiVersion = process.env.API_VERSION || 'v1';
  const preRoute = `/api/${apiVersion}`;

  app.use(`${preRoute}/auth`, AuthRouter);
  app.use(`${preRoute}/user`, UserRouter);
};
