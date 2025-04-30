// Define supported currencies for Frankfurter API
const supportedCurrencies = {
  AUD: "Australian Dollar",
  BGN: "Bulgarian Lev",
  BRL: "Brazilian Real",
  CAD: "Canadian Dollar",
  CHF: "Swiss Franc",
  CNY: "Chinese Yuan",
  CZK: "Czech Republic Koruna",
  DKK: "Danish Krone",
  EUR: "Euro",
  GBP: "British Pound Sterling",
  HKD: "Hong Kong Dollar",
  HUF: "Hungarian Forint",
  IDR: "Indonesian Rupiah",
  ILS: "Israeli New Sheqel",
  INR: "Indian Rupee",
  ISK: "Icelandic Króna",
  JPY: "Japanese Yen",
  KRW: "South Korean Won",
  MXN: "Mexican Peso",
  MYR: "Malaysian Ringgit",
  NOK: "Norwegian Krone",
  NZD: "New Zealand Dollar",
  PHP: "Philippine Peso",
  PLN: "Polish Zloty",
  RON: "Romanian Leu",
  SEK: "Swedish Krona",
  SGD: "Singapore Dollar",
  THB: "Thai Baht",
  TRY: "Turkish Lira",
  USD: "US Dollar",
  ZAR: "South African Rand"
};

const BASE_URL = "https://api.frankfurter.app";
const dropdowns = document.querySelectorAll(".dropdown select");
const btn = document.querySelector("form button");
const fromCurr = document.querySelector(".from select");
const toCurr = document.querySelector(".to select");
const msg = document.querySelector(".msg");

// Update dropdowns to only show supported currencies
for (let select of dropdowns) {
  for (let currCode in supportedCurrencies) {
    let newOption = document.createElement("option");
    newOption.innerText = `${currCode} - ${supportedCurrencies[currCode]}`;
    newOption.value = currCode;
    if (select.name === "from" && currCode === "USD") {
      newOption.selected = "selected";
    } else if (select.name === "to" && currCode === "EUR") {
      newOption.selected = "selected";
    }
    select.append(newOption);
  }

  select.addEventListener("change", (evt) => {
    updateFlag(evt.target);
  });
}

const updateExchangeRate = async () => {
  let amount = document.querySelector(".amount input");
  let amtVal = amount.value;
  if (amtVal === "" || amtVal < 1) {
    amtVal = 1;
    amount.value = "1";
  }

  try {
    // Show loading state
    msg.innerText = "Converting...";

    // If currencies are same, display the same amount
    if (fromCurr.value === toCurr.value) {
      msg.innerText = `${amtVal} ${fromCurr.value} = ${amtVal} ${toCurr.value}`;
      return;
    }

    // Check if both currencies are supported
    if (!supportedCurrencies[fromCurr.value] || !supportedCurrencies[toCurr.value]) {
      throw new Error("One or both currencies are not supported");
    }

    const response = await fetch(`${BASE_URL}/latest?amount=${amtVal}&from=${fromCurr.value}&to=${toCurr.value}`);
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    const data = await response.json();
    
    if (data.rates && data.rates[toCurr.value]) {
      const rate = data.rates[toCurr.value];
      msg.innerText = `${amtVal} ${fromCurr.value} = ${rate.toFixed(2)} ${toCurr.value}`;
    } else {
      throw new Error("Invalid response format");
    }
  } catch (error) {
    console.error("Conversion error:", error);
    msg.innerText = "Error: Could not perform currency conversion. Please try again.";
  }
};

const updateFlag = (element) => {
  let currCode = element.value;
  let countryCode = currCode.slice(0, 2); // Use first two characters of currency code
  let newSrc = `https://flagsapi.com/${countryCode}/flat/64.png`;
  let img = element.parentElement.querySelector("img");
  img.src = newSrc;
};

btn.addEventListener("click", (evt) => {
  evt.preventDefault();
  updateExchangeRate();
});

window.addEventListener("load", () => {
  updateExchangeRate();
});