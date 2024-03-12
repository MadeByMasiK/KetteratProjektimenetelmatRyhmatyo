var currentPage = 1;
var customersPerPage = 25;
var jsonData;

function fetchCustomers() {
    fetch('asiakasData.json')
        .then(response => response.json())
        .then(data => {
            jsonData = data;
            displayCustomers(currentPage);
        })
        .catch(error => console.error('Error fetching JSON:', error));
}
//ai function
function displayCustomers(page) {
    var startIndex = (page - 1) * customersPerPage;
    var endIndex = startIndex + customersPerPage;
    var paginatedData = jsonData.slice(startIndex, endIndex);

    var customerList = document.getElementById('customerList');
    customerList.innerHTML = '';

    // Adding titles
    var titles = Object.keys(paginatedData[0]);
    var titleRow = document.createElement('div');
    titleRow.classList.add('title-row');
    titles.forEach(title => {
        var titleCell = document.createElement('div');
        titleCell.textContent = title.charAt(0).toUpperCase() + title.slice(1);
        titleRow.appendChild(titleCell);
    });
    customerList.appendChild(titleRow);

    // Adding customer information
    paginatedData.forEach(customer => {
        var customerInfoRow = document.createElement('div');
        customerInfoRow.classList.add('customer-info-row');
        titles.forEach(title => {
            var customerInfoCell = document.createElement('div');
            customerInfoCell.textContent = customer[title];
            customerInfoRow.appendChild(customerInfoCell);
        });
        customerList.appendChild(customerInfoRow);
    });

    renderPagination();
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
//Henkilömäärä per sivu

function perSivu() {
    customersPerPage = parseInt(valinta.value);
    currentPage = 1;
    displayCustomers(currentPage);
}


document.addEventListener('DOMContentLoaded', fetchCustomers);