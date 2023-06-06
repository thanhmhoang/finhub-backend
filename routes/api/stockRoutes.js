const router = require('express').Router();
require('dotenv').config()

const {
    getStocks,
    getSingleStock,
    createStock,
    getStockTicker,
    updateStock
} = require('../../controllers/stockController.js');

// /api/stocks
router.route('/').get(getStocks).post(createStock);

// /api/stocks/:stockId
router.route('/:stockId').get(getSingleStock);

router.route('/ticker/:tickerName').get(getStockTicker).put(updateStock)



module.exports = router;