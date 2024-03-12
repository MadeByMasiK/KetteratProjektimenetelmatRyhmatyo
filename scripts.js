var currentPage = 1;
var customersPerPage = 25;
var jsonData = []; // Initialize jsonData as an array
var sortBy = 'id'; // Default sorting attribute
var sortOrder = 'asc'; // Default sorting order

function fetchCustomers() {
    fetch('asiakasData.json')
        .then(response => response.json())
        .then(data => {
            jsonData = data; // Assign JSON data to jsonData array
            displayCustomers(currentPage);
        })
        .catch(error => console.error('Error fetching JSON:', error));
}

// Modified displayCustomers function to work with the array
function displayCustomers(page) {
    sortCustomers(); // Sort customers before displaying

    var startIndex = (page - 1) * customersPerPage;
    var endIndex = Math.min(startIndex + customersPerPage, jsonData.length);

    var customerList = document.getElementById('customerList');
    customerList.innerHTML = '';

    // Adding titles
    var titles = Object.keys(jsonData[0]);
    var titleRow = document.createElement('div');
    titleRow.classList.add('title-row');
    titles.forEach(title => {
        var titleCell = document.createElement('div');
        titleCell.textContent = title.charAt(0).toUpperCase() + title.slice(1);
        titleRow.appendChild(titleCell);
    });
    customerList.appendChild(titleRow);

    // Adding customer information
    for (var i = startIndex; i < endIndex; i++) {
        var customer = jsonData[i];
        var customerInfoRow = document.createElement('div');
        customerInfoRow.classList.add('customer-info-row');
        titles.forEach(title => {
            var customerInfoCell = document.createElement('div');
            customerInfoCell.textContent = customer[title];
            customerInfoRow.appendChild(customerInfoCell);
        });
        customerList.appendChild(customerInfoRow);
    }

    renderPagination();
}

// Function to sort customers based on the chosen attribute and order
function sortCustomers() {
    jsonData.sort((a, b) => {
        var comparison = 0;
        if (a[sortBy] > b[sortBy]) {
            comparison = 1;
        } else if (a[sortBy] < b[sortBy]) {
            comparison = -1;
        }
        return sortOrder === 'asc' ? comparison : -comparison;
    });
}

// Function to handle sorting attribute change
function changeSortingAttribute(attribute) {
    sortBy = attribute;
    displayCustomers(currentPage); // Refresh the displayed customers
}

// Function to handle sorting order change
function changeSortingOrder(order) {
    sortOrder = order;
    displayCustomers(currentPage); // Refresh the displayed customers
}

//Sivu valikko napit
function renderPagination() {
    var totalCustomers = jsonData.length;
    var totalPages = Math.ceil(totalCustomers / customersPerPage);
    var pagination = document.getElementById('pagination');
    pagination.innerHTML = '';

    for (var i = 1; i <= totalPages; i++) {
        var pageLink = document.createElement('span');
        pageLink.textContent = i;
        pageLink.classList.add('page-link');
        if (i === currentPage) {
            pageLink.classList.add('active');
        }
        pageLink.addEventListener('click', function() {
            currentPage = parseInt(this.textContent);
            displayCustomers(currentPage);
        });
        pagination.appendChild(pageLink);
    }
}

function naytaLomake() {
    document.getElementById("lomake").style.display = "block";
}

// Function to add new customer data to the array
function addCustomer(id, etunimi, sukunimi, email, puhelin, kaupunki, maa, osoite) {
    jsonData.push({
        id: id,
        etunimi: etunimi,
        sukunimi: sukunimi,
        email: email,
        puhelin: puhelin,
        kaupunki: kaupunki,
        maa: maa,
        osoite: osoite
    });
}

function handleAddCustomer() {
    var id = document.getElementById('id').value;
    var etunimi = document.getElementById('etunimi').value;
    var sukunimi = document.getElementById('sukunimi').value;
    var email = document.getElementById('email').value;
    var puhelin = document.getElementById('puhelin').value;
    var kaupunki = document.getElementById('kaupunki').value;
    var maa = document.getElementById('maa').value;
    var osoite = document.getElementById('osoite').value;

    addCustomer(id, etunimi, sukunimi, email, puhelin, kaupunki, maa, osoite);
    displayCustomers(currentPage); // Refresh the displayed customers
    tyhjennaLomake()
}

//Henkilömäärä per sivu
function perSivu() {
    customersPerPage = parseInt(valinta.value);
    currentPage = 1;
    displayCustomers(currentPage);
}

// Function to clear the form
function tyhjennaLomake() {
    document.getElementById("id").value = "";
    document.getElementById("etunimi").value = "";
    document.getElementById("sukunimi").value = "";
    document.getElementById("email").value = "";
    document.getElementById("puhelin").value = "";
    document.getElementById("kaupunki").value = "";
    document.getElementById("maa").value = "";
    document.getElementById("osoite").value = "";
    document.getElementById("lomake").style.display = "none";
}

// Function to search for customers based on input value
function searchCustomers() {
    var searchTerm = document.getElementById('searchInput').value.toLowerCase().trim();
    var filteredData = jsonData.filter(customer => {
        for (var key in customer) {
            if (customer.hasOwnProperty(key) && customer[key].toString().toLowerCase().includes(searchTerm)) {
                return true;
            }
        }
        return false;
    });

    displayFilteredCustomers(filteredData);
}

// Function to display filtered customers
function displayFilteredCustomers(filteredData) {
    var customerList = document.getElementById('customerList');
    customerList.innerHTML = '';

    var titles = Object.keys(filteredData[0]);
    var titleRow = document.createElement('div');
    titleRow.classList.add('title-row');
    titles.forEach(title => {
        var titleCell = document.createElement('div');
        titleCell.textContent = title.charAt(0).toUpperCase() + title.slice(1);
        titleRow.appendChild(titleCell);
    });
    customerList.appendChild(titleRow);

    filteredData.forEach(customer => {
        var customerInfoRow = document.createElement('div');
        customerInfoRow.classList.add('customer-info-row');
        titles.forEach(title => {
            var customerInfoCell = document.createElement('div');
            customerInfoCell.textContent = customer[title];
            customerInfoRow.appendChild(customerInfoCell);
        });
        customerList.appendChild(customerInfoRow);
    });
}

// Function to reset search and display all customers
function resetSearch() {
    document.getElementById('searchInput').value = '';
    displayCustomers(currentPage);
}


document.addEventListener('DOMContentLoaded', fetchCustomers);
