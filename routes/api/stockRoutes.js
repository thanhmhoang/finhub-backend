const router = require('express').Router();
require('dotenv').config()

const {
    getStocks,
    getSingleStock,
    createStock,
    getStockTicker
} = require('../../controllers/stockController.js');

// /api/stocks
router.route('/').get(getStocks).post(createStock);

// /api/stocks/:stockId
router.route('/:stockId').get(getSingleStock);

router.route('/ticker/:tickerName').get(getStockTicker)



module.exports = router;