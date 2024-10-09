let amount = document.getElementById("amount"),
    fisrtCurrency = document.getElementById("fisrtCurrency"),
    secondCurrency = document.getElementById("secondCurrency");
    symbolCurrency = document.getElementById("symbolCurrency");

let amountNumberFloat = parseFloat(amount);

let amountTitle = document.getElementById("amountTitle"),
    fisrtCurrencyTitle = document.getElementById("fisrtCurrencyTitle"),
    secondCurrencyTitle = document.getElementById("secondCurrencyTitle");

amount.addEventListener("change", (event) => {
/*     let amountString = amount.toString(),
        amountSplit = amountString.split('.')[0]; */
    amountTitle.innerHTML = `${event.target.value}`;
});

fisrtCurrency.addEventListener("change", () => {
    fisrtCurrencyTitle.innerHTML = fisrtCurrency.value;
    
    if (fisrtCurrency.value === "EUR") {
        symbolCurrency.innerHTML = "€";
    } else if (fisrtCurrency.value === "USD") {
        symbolCurrency.innerHTML = "$";
    } else if (fisrtCurrency.value === "GBP") {
        symbolCurrency.innerHTML = "£";
    }
});

secondCurrency.addEventListener("change", () => {
    secondCurrencyTitle.innerHTML = secondCurrency.value;
});