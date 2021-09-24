const oursPeluche = document.getElementById("oursPeluche");
const camerasVintage = document.getElementById("camerasVintage");
const meublesChene = document.getElementById("meublesChene");




// Récupère les données de la API pour les Ours en Peluche
function itemOurs() {
    fetch("http://localhost:3000/api/teddies")
    .then (res => {
        return res.json();
    })
    .then(data => {
        const peluches = data.map(user => {
        return `<a href="produit.html"><div id="item"><p><strong>${user.name}</strong></p>
        <p>${user.price / 100} €<p>
        <img src="${user.imageUrl}">
        </div></a>`
        }).join('<br><br>');

        oursPeluche.innerHTML = peluches;

    }).catch(error => {
        console.log("Une erreur est survenue !");
    })
}

// Récupère les données de la API pour les Caméras
function itemCameras() {
    fetch("http://localhost:3000/api/cameras")
    .then (res => {
        return res.json();
    })
    .then(data => {
        const cameras = data.map(user => {
        return `<a href="produit.html"><div id="item"><p><strong>${user.name}</strong></p>
        <p>${user.price / 100} €<p>
        <img src="${user.imageUrl}">
        </div></a>`
        }).join('<br><br>');

        camerasVintage.innerHTML = cameras;

    }).catch(error => {
        console.log("Une erreur est survenue !");
    })
}

// Récupère les données de la API pour Meubles 
function itemMeubles() {
    fetch("http://localhost:3000/api/furniture")
    .then (res => {
        return res.json();
    })
    .then(data => {
        const meubles = data.map(user => {
        return `<a href="produit.html"><div id="item"><p><strong>${user.name}</strong></p>
        <p>${user.price / 100} €<p>
        <img src="${user.imageUrl}">
        </div></a>`
        }).join('<br><br>');

        meublesChene.innerHTML = meubles;

    }).catch(error => {
        console.log("Une erreur est survenue !");
    })
}

itemOurs();
itemCameras();
itemMeubles();