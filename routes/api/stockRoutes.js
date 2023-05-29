const router = require('express').Router();

const {
    getStocks,
    getSingleStock,
    addStock,
    updateStock,
    deleteStock,
} = require('../../controllers/stockController.js');

// /api/stocks
router.route('/').get(getStocks).post(addStock);

// /api/stocks/:stockId
router
.route('/:stockId')
.get(getSingleStock)
.put(updateStock)
.delete(deleteStock);

module.exports = router;