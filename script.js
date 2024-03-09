let asiakkaat = [];

async function lataaAsiakasdata() {
    try {
        const vastaus = await fetch('asiakasdata.json');
        const data = await vastaus.json();
        asiakkaat = data;
        naytaAsiakkaat();
    } catch (error) {
        console.error('Virhe lataessa asiakasdataa:', error);
    }
}

lataaAsiakasdata();

function naytaLomake() {
    document.getElementById("lomake").style.display = "block";
}

function lisaaAsiakas() {
    const id = document.getElementById("id").value;
    const etunimi = document.getElementById("etunimi").value;
    const sukunimi = document.getElementById("sukunimi").value;
    const email = document.getElementById("email").value;
    const puhelin = document.getElementById("puhelin").value;
    const kaupunki = document.getElementById("kaupunki").value;
    const maa = document.getElementById("maa").value;
    const osoite = document.getElementById("osoite").value;

    if (id && etunimi && sukunimi && email && puhelin && kaupunki && maa && osoite) {
        const uusiAsiakas = { id, etunimi, sukunimi, email, puhelin, kaupunki, maa, osoite };
        asiakkaat.push(uusiAsiakas);
        naytaAsiakkaat();
        tyhjennaLomake();
    } else {
        alert("Täytä kaikki kentät!");
    }
}

function naytaAsiakkaat() {
    const asiakasLista = document.getElementById("asiakasLista");
    asiakasLista.innerHTML = "";

    asiakkaat.forEach((asiakas, indeksi) => {
        const listItem = document.createElement("li");
        listItem.innerHTML = `<strong>${asiakas.id} ${asiakas.etunimi} ${asiakas.sukunimi}</strong> - ${asiakas.email}, ${asiakas.puhelin}, ${asiakas.kaupunki}, ${asiakas.maa}, ${asiakas.osoite} <button onclick="poistaAsiakas(${indeksi})">Poista</button>`;
        asiakasLista.appendChild(listItem);
    });
}

function poistaAsiakas(indeksi) {
    asiakkaat.splice(indeksi, 1);
    naytaAsiakkaat();
}

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
