const outputDiv = document.getElementById("convertedAmount");
const usdInput = document.getElementById("usdAmount");

let usdToGhsRate = 0;

async function fetchRate() {
  const ApiKey = "35410f8d5fa64deba6cd50fba009137d";
  const apiUrl = `https://api.currencyfreaks.com/v2.0/rates/latest?apikey=${ApiKey}&symbols=USD,GHS`;
  try {
    const response = await fetch(apiUrl);
    const data = await response.json();
    console.log(data);
    usdToGhsRate = data.rates.GHS / data.rates.USD;

    outputDiv.innerHTML = `Current rate: 1 USD = ${usdToGhsRate.toFixed(
      2
    )} GHS`;
  } catch (error) {
    outputDiv.textContent = "Failed to load exchange rate.";
    console.error("Fetch error:", error);
  }
}

function convertCurrency() {
  const amount = parseFloat(usdInput.value);
  if (!usdToGhsRate) {
    outputDiv.textContent = "Rate not loaded yet.";
    return;
  }
  if (isNaN(amount) || amount <= 0) {
    outputDiv.textContent = "Please enter a valid USD amount.";
    outputDiv.style.color = "red";
    return;
  }

  const usdC = `<img src="https://flagcdn.com/us.svg" width="50" height="30"; />`;
  const ghsD = `<img src="https://flagcdn.com/gh.svg" width="50" height="30"; />`;
  setTimeout(() => {
    const ghs = (amount * usdToGhsRate).toFixed(2);
    outputDiv.innerHTML = `<h2 style="color:green;"> ${usdC} USD ${amount}  =   ${ghsD}  GHS ${ghs} </h2> <br> Date  ${new Date().toLocaleDateString()} Time ${new Date().toLocaleTimeString()}`;
  }, 2000);
}

fetchRate();
