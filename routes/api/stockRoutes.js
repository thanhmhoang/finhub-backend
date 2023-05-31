const router = require('express').Router();
var request = require('request');
require('dotenv').config()

const {
    getStocks,
    getSingleStock,
} = require('../../controllers/stockController.js');

// /api/stocks
router.route('/').get(getStocks);

// /api/stocks/:stockId
router
.route('/:stockId')
.get(getSingleStock);

module.exports = router;