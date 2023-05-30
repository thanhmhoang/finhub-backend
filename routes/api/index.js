const router = require('express').Router();
const userRoutes = require('./userRoutes');
const stockRoutes = require('./stockRoutes');
const stockSearchRoutes = require('./stockSearchRoutes');

router.use('/users', userRoutes);
router.use('/stocks', stockRoutes);
router.use('/stocksearch', stockSearchRoutes);

module.exports = router;