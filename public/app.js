//import { apiKey } from "./apiKey.js";
import { currencyObj } from "./currencyCodes.js";

//let api = `https://v6.exchangerate-api.com/v6/${apiKey}/latest/USD`;

// Obtener todos las variables del DOM
let amount = document.getElementById("amount"),
    firstCurrency = document.getElementById("firstCurrency"),
    secondCurrency = document.getElementById("secondCurrency"),
    symbolCurrency = document.getElementById("symbolCurrency"),
    btn = document.querySelector(".btn"),
    message = document.getElementById("message");

// Las variables para el título
let amountTitle = document.getElementById("amountTitle"),
    firstCurrencyTitle = document.getElementById("firstCurrencyTitle"),
    secondCurrencyTitle = document.getElementById("secondCurrencyTitle");

// Añadimos al DOM los valores por defecto evitando escribir en el propio HTML
window.addEventListener("load", () => {
    amountTitle.textContent = 1;
    firstCurrencyTitle.textContent = "USD";
    secondCurrencyTitle.textContent = "EUR";
    symbolCurrency.textContent = "$";

    secondCurrency.value = "EUR";
})

// Cuando cambien el input de la cantidad cambiará el título
amount.addEventListener("change", (event) => {
    amountTitle.innerHTML = `${event.target.value}`;
});

// Cuando cambie el select se cambiara el titulo y simbolo
firstCurrency.addEventListener("change", () => {
    firstCurrencyTitle.innerHTML = firstCurrency.value;
    // Con un blucle recorremos todo el obj y dependiendo del valor del select añadimos el simbolo asociado a ese
    currencyObj.forEach(obj => {firstCurrency.value === obj.currency ? symbolCurrency.innerHTML = obj.symbol : "?";});
});

// Cambia el título al cambiar el select
secondCurrency.addEventListener("change", () => {
    secondCurrencyTitle.innerHTML = secondCurrency.value;
});

// Recorremos el obj creando en cada itineración un option con 
// el valor indicado y mostrando por pantalla otros datos
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

// En el momento que hacemos click creamos 2 variables con
// el valor del select que seleccionemos 
btn.addEventListener("click", () => {
    let firstCurrencyAmount = firstCurrency.value;
    let secondCurrencyAmount = secondCurrency.value;
    let firstNamePlural;
    let secondNamePlural;
    // Hacemos una petición a la api mediante una solicitud HTTP asíncrona
    fetch('/api/rates')
        // Convierte la respuesta JSON a un objeto de JS
        .then(resp => resp.json())
        .then(data => {
            // una vez que los datos estan en un obj podremos acceder a ellos 
            let fromExchangeRate = data.conversion_rates[firstCurrencyAmount];
            let toExchangeRate = data.conversion_rates[secondCurrencyAmount];
            
            // Y solamente tenemos que hacer el cálculo para la conversión
            const convertedAmount = (amount.value / fromExchangeRate) * toExchangeRate,
                  replaceAmount = convertedAmount.toString().replace(".",","),
                  indexComa = replaceAmount.indexOf(",") + 3;

            let units = replaceAmount.slice(0, indexComa); 
            let decimals = replaceAmount.slice(indexComa, replaceAmount.length);                                   

            currencyObj.forEach(obj => {firstCurrency.value === obj.currency ? firstNamePlural = obj.plural : "?";});
            currencyObj.forEach(obj => {secondCurrency.value === obj.currency ? secondNamePlural = obj.plural : "?";});
            message.innerHTML = `<span style="color: gray;">${amount.value} ${firstNamePlural} = </span> <br> 
                                <span style=" font-weight: bold; font-size: 24px;">${units}<span style="color: gray; font-weight: bold">${decimals}</span> ${secondNamePlural}</span>`;
        });
});

/* 
    '/api/rates': Está haciendo una solicitud a la URL /api/rates, que devuelve las tasas de cambio de las monedas.

    ¿Por qué asíncrona?: El código no se detiene mientras espera la respuesta de la API, 
                        lo que hace que la página siga funcionando sin congelarse. 
*/
