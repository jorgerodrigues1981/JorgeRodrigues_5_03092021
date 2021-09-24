const oursPeluche = document.getElementById("oursPeluche");
const camerasVintage = document.getElementById("camerasVintage");
const meublesChene = document.getElementById("meublesChene");


////////////////////////////////////Ours en Peluche/////////////////////////////////////////////

// Récupère les données de la API pour les Ours en Peluche
fetch("http://localhost:3000/api/teddies")
.then(res => {
    if(res.ok){
        console.log("fetch ok");
        return res.json();
    } else {
        console.log("erreur");
    }
}) 
.then(data => {
    console.log(data);
    let listeOurs = " ";

    //Boucle pour récupérer les données des produits - Ours en Peluche
    for(let i = 0; i < data.length; i++) {
        console.log(data[i].name);
    
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
    console.log("Une erreur est survenue !");
});

////////////////////////////////////Caméras Vintage/////////////////////////////////////////////

// Récupère les données de la API pour les Caméras vintage
fetch("http://localhost:3000/api/cameras")
.then(res => {
    if(res.ok){
        console.log("fetch ok");
        return res.json();
    } else {
        console.log("erreur");
    }
}) 
.then(data => {
    console.log(data);
    let listeCameras = " ";

    //Boucle pour récupérer les données des produits - Caméras vintage
    for(let i = 0; i < data.length; i++) {
        console.log(data[i].name);
    
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
    console.log("Une erreur est survenue !");
});

////////////////////////////////////Meubles en chêne/////////////////////////////////////////////

// Récupère les données de la API pour les Meubles en chêne
fetch("http://localhost:3000/api/furniture")
.then(res => {
    if(res.ok){
        console.log("fetch ok");
        return res.json();
    } else {
        console.log("erreur");
    }
}) 
.then(data => {
    console.log(data);
    let listeMeubles = " ";

    //Boucle pour récupérer les données des produits - Meubles en chêne
    for(let i = 0; i < data.length; i++) {
        console.log(data[i].name);
    
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
    console.log("Une erreur est survenue !");
});



