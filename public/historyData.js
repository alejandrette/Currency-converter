import { currencyObj } from "./currencyCodes.js";
import { API_HISTORY } from "./apiKeys.js";

// Obtener todos las variables del DOM
let firstCurrencyGraph = document.getElementById("firstCurrencyGraph"),
    secondCurrencyGraph = document.getElementById("secondCurrencyGraph");

// Las variables para el título
let firstCurrencyTitleGraph = document.getElementById("firstCurrencyTitleGraph"),
    secondCurrencyTitleGraph = document.getElementById("secondCurrencyTitleGraph");

// Añadimos al DOM los valores por defecto evitando escribir en el propio HTML
window.addEventListener("load", () => {
  firstCurrencyTitleGraph.textContent = "USD";
  secondCurrencyTitleGraph.textContent = "JPY";
  secondCurrencyGraph.value = "JPY";
});

// Cuando cambie el select se cambiara el titulo y simbolo
firstCurrencyGraph.addEventListener("change", () => {
  firstCurrencyTitleGraph.innerHTML = firstCurrencyGraph.value;
});

// Cambia el título al cambiar el select
secondCurrencyGraph.addEventListener("change", () => {
  secondCurrencyTitleGraph.innerHTML = secondCurrencyGraph.value;
});

// Recorremos el obj creando en cada itineración un option con 
// el valor indicado y mostrando por pantalla otros datos
currencyObj.forEach((obj) => {
  let optionCurrencyGraphFirst = document.createElement("option");
  optionCurrencyGraphFirst.value = obj.currency;
  optionCurrencyGraphFirst.innerHTML = `${obj.currency} - ${obj.country}`;
  firstCurrencyGraph.appendChild(optionCurrencyGraphFirst);

  let optionCurrencyGraphSecond = document.createElement("option");
  optionCurrencyGraphSecond.value = obj.currency;
  optionCurrencyGraphSecond.innerHTML = `${obj.currency} - ${obj.country}`;
  secondCurrencyGraph.appendChild(optionCurrencyGraphSecond);
});



const multipleCallApi = () => {
  // Sacar fecha actual
  const dateCurrent = new Date();
  // La fecha de hace un año
  let yearAgo = new Date(dateCurrent);
  yearAgo.setFullYear(yearAgo.getFullYear() - 1);

  // Array para almacenar los resultados de la API
  let apiResponses = [];

  // Ciclo para recorrer cada mes desde hace un año hasta la fecha actual
  for (let i = 0; yearAgo < dateCurrent; i++) {
    let apis = `https://api.exchangeratesapi.io/v1/${yearAgo.toISOString().split('T')[0]}?access_key=${API_HISTORY}&base=EUR&symbols=USD,JPY`;
    yearAgo.setMonth(yearAgo.getMonth() + 1);

    // Hacemos la llamada a la API y almacenamos los datos en el array
    fetch(apis)
      .then(resp => resp.json())
      .then(data => {
        apiResponses.push(data); // Agregamos la respuesta de la API al array
        renderModelChart(apiResponses);
      })
      .catch(error => console.log('Error fetching data', error));
  }
}

// Función para renderizar el gráfico con los datos obtenidos
const renderModelChart = apiResponses => {
  const data = {
      labels: ['uno', 'dos', 'tres'], //labels es un array con la etiquetas que vamos a renderizar
      datasets: [{ //datasets son array de objs para poder jugar con varios objs
          data: [10, 20, 30],
          borderColor: ['red', 'green', 'blue'],
          backgroundColor: ['blue', 'green',]
      }]
  }
  new Chart('modelsChart', {type: 'line', data}) // crear una nueva instancia de un obj 
};

// Al cargar la página, generar la primera gráfica
window.addEventListener("load", () => {
  multipleCallApi(); // Fetch de la api los ultimos 12 meses
  //printCharts(); // Cargar gráfica inicial
});

// Actualizar la gráfica cuando se cambien las monedas
/* firstCurrencyGraph.addEventListener("change", printCharts);
secondCurrencyGraph.addEventListener("change", printCharts); */
