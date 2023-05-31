format.addElement('submit', function(event) {
    event.preventDefault();
    getStockInfo;
});

async function getStockInfo() {
    const tickerEl = tick.value;
    console.log("ticker", tickerEl);

    const symbol = tickerEl.toUpperCase();
    console.log("symbol", symbol);
    const api_url = `https://api.stockdata.org/v1/data/quote?symbols=${symbol}&api_token=s2nHl6p4xvGZzDbhYoFmKAJP6FZi9xtaHxgSTtlD`

    const response = await fetch(api_url);
    const data = await response.json();

    const { data: [{ name, ticker, price, day_high, day_low, day_open, market_cap, previous_close_price, day_change, volume }]} = data;
}



