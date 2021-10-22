//Accéder au DOM
const oursPeluche = document.getElementById("oursPeluche");
const camerasVintage = document.getElementById("camerasVintage");
const meublesChene = document.getElementById("meublesChene");

////////////////////////////////////OURS EN PELUCHE/////////////////////////////////////////////
//Récupère les données de la API pour les Ours en Peluche
function afficheOursPeluche() {
    fetch("http://localhost:3000/api/teddies")
    .then(res => {
        if(res.ok){ 
            return res.json(); //Réponse en format JSON
        } else {
            console.log("Une erreur est survenue ! Les ours de peluche sont pas disponibles pour le moment !"); //Message d'erreur en cas de problème avec la requête
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
        //Affichage des produit sur la page
        console.log("Les ours de peluche sont disponibles !");
        oursPeluche.innerHTML = listeOurs; 
    })
    // Message en cas d'erreur
    .catch(err => { 
        console.log("Une erreur est survenue ! Les ours de peluche sont pas disponibles pour le moment !");
        oursPeluche.innerHTML = "Une erreur est survenue ! Les ours de peluche sont pas disponibles pour le moment !"; 
    });
}

//On appelle la fonction
afficheOursPeluche();
