const router = require('express').Router();
const userRoutes = require('./api/user-routes');

router.use(userRoutes);

module.exports = router;