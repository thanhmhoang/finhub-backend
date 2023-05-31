format.addElement('submit', function(event) {
    event.preventDefault();
    getStockInfo;
});

async function getStockInfo() {
    const tickerEl = tick.value;
    console.log("ticker", tickerEl);

    const symbol = tickerEl.toUpperCase();
    console.log("symbol", symbol);
    const api_url = `https://api.stockdata.org/v1/data/quote?symbols=${symbol}&api_token=${process.env.API_TOKEN}`

    const response = await fetch(api_url);
    const data = await response.json();

    const { name, ticker, price, day_high, day_low, day_open, market_cap, previous_close_price, day_change, volume } = data;
}



