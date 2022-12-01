const config = require('../config/config.js');
const authRoutes = require('./auth.route.js');
const taskRoutes = require('./task.route.js');

const defaultRoutes = [
  {
    path: '/auth',
    route: authRoutes
  },
  {
    path: '/tasks',
    route: taskRoutes
  }
];

const mountRoutes = (app) => {
  defaultRoutes.forEach((router) => {
    app.use(`${config.BASE_PATH}${router.path}`, router.route);
  });
};

module.exports = mountRoutes;
