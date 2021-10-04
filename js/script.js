//Accéder au DOM
const oursPeluche = document.getElementById("oursPeluche");
const camerasVintage = document.getElementById("camerasVintage");
const meublesChene = document.getElementById("meublesChene");


////////////////////////////////////OURS EN PELUCHE/////////////////////////////////////////////

// Récupère les données de la API pour les Ours en Peluche
fetch("http://localhost:3000/api/teddies")
.then(res => {
    if(res.ok){
        return res.json();
    } else {
    }
}) 
.then(data => {
    let listeOurs = " ";

//Boucle pour récupérer les données des produits - Ours en Peluche
for(let i = 0; i < data.length; i++) {
    
    listeOurs +=
    `<div id="container_item">
    <a href="produit.html?${data[i]._id}">
    <h1>${data[i].name}</h1>
    <img src="${data[i].imageUrl}">
    <p>${data[i].price / 100} €<p>
    <p>
    </a></div>`
    };
    
    oursPeluche.innerHTML = listeOurs; 
})
// Message en cas d'erreur
.catch(err => { 
    oursPeluche.innerHTML = "Une erreur est survenue !"; 
    console.log("Une erreur est survenue !");
});

////////////////////////////////////CAMéRAS VINTAGE/////////////////////////////////////////////

// Récupère les données de la API pour les Caméras vintage
fetch("http://localhost:3000/api/cameras")
.then(res => {
    if(res.ok){
        return res.json();
    } else {
        console.log("erreur");
    }
}) 
.then(data => {
    
    let listeCameras = " ";

    //Boucle pour récupérer les données des produits - Caméras vintage
    for(let i = 0; i < data.length; i++) {
    
    listeCameras +=
    `<div id="container_item">
    <a href="produit.html?${data[i]._id}">
    <h1>${data[i].name}</h1>
    <img src="${data[i].imageUrl}">
    <p>${data[i].price / 100} €<p>
    <p>
    </a></div>`
    };
    
    camerasVintage.innerHTML = listeCameras; 
})
// Message en cas d'erreur
.catch(err => { 
    camerasVintage.innerHTML = "Une erreur est survenue !";
    console.log("Une erreur est survenue !");
});

////////////////////////////////////MEUBLES EN CHËNE/////////////////////////////////////////////

// Récupère les données de la API pour les Meubles en chêne
fetch("http://localhost:3000/api/furniture")
.then(res => {
    if(res.ok){
        return res.json();
    } else {
        console.log("erreur");
    }
}) 
.then(data => {
    let listeMeubles = " ";

    //Boucle pour récupérer les données des produits - Meubles en chêne
    for(let i = 0; i < data.length; i++) {
    
    listeMeubles +=
    `<div id="container_item">
    <a href="produit.html?${data[i]._id}">
    <h1>${data[i].name}</h1>
    <img src="${data[i].imageUrl}">
    <p>${data[i].price / 100} €<p>
    <p>
    </a></div>`
    };
    
    meublesChene.innerHTML = listeMeubles; 
})
// Message en cas d'erreur
.catch(err => { 
    meublesChene.innerHTML = "Une erreur est survenue !"; 
    console.log("Une erreur est survenue !");
});