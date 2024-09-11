document.addEventListener('DOMContentLoaded', () => {
    document.getElementById('stock-form').addEventListener('submit', fetchStockData);
});

function fetchStockData(event) {
    event.preventDefault();

    const symbol = document.getElementById('symbol').value.toUpperCase();
    const apiKey = '864269eb4a290e9eca0d559ec406110f'; // Replace with your actual Marketstack API key
    const apiUrl = `http://api.marketstack.com/v1/eod?access_key=${apiKey}&symbols=${symbol}`;

    fetch(apiUrl)
        .then(response => response.json())
        .then(data => {
            if (data.error || data.data.length === 0) {
                displayError('Unable to retrieve stock data. Please check the stock symbol and try again.');
            } else {
                displayStockData(data);
            }
        })
        .catch(error => displayError('An error occurred while fetching data.'));
}


function displayStockData(data) {
    const stockResult = document.getElementById('stock-result');
    const stock = data.data[0];

    stockResult.innerHTML = `
        <h3>${stock.symbol} - ${stock.exchange}</h3>
        <p><strong>Date:</strong> ${stock.date}</p>
        <p><strong>Open:</strong> $${stock.open.toFixed(2)}</p>
        <p><strong>Close:</strong> $${stock.close.toFixed(2)}</p>
        <p><strong>High:</strong> $${stock.high.toFixed(2)}</p>
        <p><strong>Low:</strong> $${stock.low.toFixed(2)}</p>
        <p><strong>Volume:</strong> ${stock.volume}</p>
    `;
}

function displayError(message) {
    const stockResult = document.getElementById('stock-result');
    stockResult.innerHTML = `<p class="text-danger">${message}</p>`;
}
