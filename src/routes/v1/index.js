const { Router } = require('express');

const router = Router();

const userRoute = require('./user.route');
const authRoute = require('./auth.route');

router.use('/auth', authRoute);
router.use('/users', userRoute);

module.exports = router;
