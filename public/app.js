import { apiKey } from "./apiKey.js";
import { currencyObj } from "./currencyCodes.js";

let api = `https://v6.exchangerate-api.com/v6/${apiKey}/latest/USD`;

let amount = document.getElementById("amount"),
    firstCurrency = document.getElementById("firstCurrency"),
    secondCurrency = document.getElementById("secondCurrency"),
    symbolCurrency = document.getElementById("symbolCurrency"),
    btn = document.querySelector(".btn"),
    message = document.getElementById("message");

let amountTitle = document.getElementById("amountTitle"),
    firstCurrencyTitle = document.getElementById("firstCurrencyTitle"),
    secondCurrencyTitle = document.getElementById("secondCurrencyTitle");

amount.addEventListener("change", (event) => {
    amountTitle.innerHTML = `${event.target.value}`;
});

firstCurrency.addEventListener("change", () => {
    firstCurrencyTitle.innerHTML = firstCurrency.value;
    currencyObj.forEach(obj => {firstCurrency.value === obj.currency ? symbolCurrency.innerHTML = obj.symbol : "?";});
});

secondCurrency.addEventListener("change", () => {
    secondCurrencyTitle.innerHTML = secondCurrency.value;
});

currencyObj.forEach((obj) => {
    let optionCurrencyFirst = document.createElement("option");
    optionCurrencyFirst.value = obj.currency;
    optionCurrencyFirst.innerHTML = `${obj.currency} - ${obj.country}`;
    firstCurrency.appendChild(optionCurrencyFirst);

    let optionCurrencySecond = document.createElement("option");
    optionCurrencySecond.value = obj.currency;
    optionCurrencySecond.innerHTML = `${obj.currency} - ${obj.country}`;
    secondCurrency.appendChild(optionCurrencySecond);
});

btn.addEventListener("click", () => {
    let firstCurrencyAmount = firstCurrency.value;
    let secondCurrencyAmount = secondCurrency.value;
    fetch(api)
        .then(resp => resp.json())
        .then(data => {
            let fromExchangeRate = data.conversion_rates[firstCurrencyAmount];
            let toExchangeRate = data.conversion_rates[secondCurrencyAmount];
            const convertedAmount = (amount.value / fromExchangeRate) * toExchangeRate;
            message.innerHTML = `${amount.value} ${firstCurrencyAmount} = ${convertedAmount} ${secondCurrencyAmount}`;
        });
})