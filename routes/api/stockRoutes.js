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

// To get intra day info
'use strict';

// replace the "demo" apikey below with your own key from https://www.alphavantage.co/support/#api-key
var url = `https://www.alphavantage.co/query?function=TIME_SERIES_INTRADAY&symbol=AAPL&interval=5min&apikey=${process.env.API_KEY}`;

request.get({
    url: url,
    json: true,
    headers: {'User-Agent': 'request'}
  }, (err, res, data) => {
    if (err) {
      console.log('Error:', err);
    } else if (res.statusCode !== 200) {
      console.log('Status:', res.statusCode);
    } else {
      // data is successfully parsed as a JSON object:
      console.log(data);
    }
});

module.exports = router;