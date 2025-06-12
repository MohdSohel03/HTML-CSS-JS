function swapCurrencies() {
    const fromCurrency = document.getElementById('from-currency');
    const toCurrency = document.getElementById('to-currency');
    [fromCurrency.value, toCurrency.value] = [toCurrency.value, fromCurrency.value];
}

async function convertCurrency() {
    const amount = document.getElementById('amount').value;
    const from = document.getElementById('from-currency').value;
    const to = document.getElementById('to-currency').value;
    const resultElement = document.getElementById('result');

    if (!amount || amount <= 0) {
        resultElement.textContent = 'Please enter a valid amount';
        return;
    }

    try {
        const response = await fetch(`https://api.exchangerate-api.com/v4/latest/${from}`);
        const data = await response.json();
        const rate = data.rates[to];

        if (!rate) {
            resultElement.textContent = 'Exchange rate not available for selected currency pair.';
            return;
        }

        const convertedAmount = (amount * rate).toFixed(2);
        resultElement.textContent = `${amount} ${from} = ${convertedAmount} ${to}`;
    } catch (error) {
        resultElement.textContent = 'Error fetching exchange rate';
        console.error('Error:', error);
    }
}