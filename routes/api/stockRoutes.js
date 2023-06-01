const router = require('express').Router();
require('dotenv').config()

const {
    getStocks,
    getSingleStock,
    createStock,
} = require('../../controllers/stockController.js');

// /api/stocks
router.route('/').get(getStocks).post(createStock);

// /api/stocks/:stockId
router
.route('/:stockId')
.get(getSingleStock);

module.exports = router;