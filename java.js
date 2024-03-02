document.addEventListener("DOMContentLoaded", function () {
    fetch('tiedot.json')
        .then(response => response.json())
        .then(data => {
            const dataDisplay = document.getElementById("dataDisplay");

            // Create HTML elements to display the JSON data
            const nameElement = document.createElement("p");
            nameElement.textContent = "Name: " + data.id;

            const ageElement = document.createElement("p");
            ageElement.textContent = "Age: " + data.etunimi;

            const cityElement = document.createElement("p");
            cityElement.textContent = "City: " + data.sukunimi;

            // Append the elements to the "dataDisplay" div
            dataDisplay.appendChild(nameElement);
            dataDisplay.appendChild(ageElement);
            dataDisplay.appendChild(cityElement);
        })
});