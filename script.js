const BASE_URL = "https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1/currencies"

const dropdowns = document.querySelectorAll(".dropdown select");
const exchangeButton = document.querySelector("form button");
const fromCurr = document.querySelector(".from select");
const toCurr = document.querySelector(".to select");
const msg = document.querySelector(".msg")




for (let select of dropdowns) {
    for (currCode in countryList) {
        let newOption = document.createElement("option");
        newOption.innerText = currCode;
        newOption.value = currCode;
        if (select.name === "from" && currCode === "USD") {
            newOption.selected = "selected";
        }

        else if (select.name === "to" && currCode === "INR") {
            newOption.selected = "selected";
        }

        select.append(newOption);
}

    select.addEventListener("change", (event) => {
        updateFlag(event.target)
    })
}

const updateExchangeRate = async () => {
    let amount = document.querySelector(".amount input");
    let amtValue = amount.value;
    
    if (amtValue === "" || amtValue < 1) {
        amtValue = 1;
        amount.value = 1;
    }

    let response = await fetch(`${BASE_URL}/${fromCurr.value.toLowerCase()}.json`);
    let jsonData = await response.json();
    let rate = jsonData[fromCurr.value.toLowerCase()][toCurr.value.toLowerCase()];

    let finalAmount = (rate * amtValue).toFixed(3);

    msg.innerText = `${amtValue} ${fromCurr.value} = ${finalAmount} ${toCurr.value}`;
}


const updateFlag = (element) => {
    let currCode = element.value;
    let countryCode = countryList[currCode];
    newSrc = `https://flagsapi.com/${countryCode}/flat/64.png`
    let img = element.parentElement.querySelector("img"); 
    img.src = newSrc;
}


exchangeButton.addEventListener("click", (event) => {
    event.preventDefault();
    updateExchangeRate();

})


window.addEventListener("load", () => {
    updateExchangeRate();
})

