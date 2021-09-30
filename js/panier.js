const articlesPanier = document.getElementById("articles_panier");
const totalPanier = document.getElementById("panier_montant_total");
const btnSupprimer = document.getElementsByClassName("btn_supprimer");
const containerBtnSupprimer = document.getElementById("container_btn_supprimer");

let produitLocalStorage = JSON.parse(localStorage.getItem("produit"));


//Affichage de message quand le panier est vide 
if(produitLocalStorage === null || produitLocalStorage == 0) {
    const panierVide = `<div id="panier_vide"><p>Le panier est vide !</p></div>`; 
    articlesPanier.innerHTML = panierVide;
    //Fait dispâraittre le bouton vider panier
    articlesPanier.removeChild(); 
} else {
    let structurePanier = [];
    
    for(let k = 0; k < produitLocalStorage.length; k++) {
    
    structurePanier = structurePanier + 
    `<div id="panier_table"><div class="item_table" id="nom_produit"><p><span class="text_souligne">${produitLocalStorage[k].nomProduit}</span></p></div><div class="item_table"><p>Quantité : <span class="text_souligne">${produitLocalStorage[k].quantiteProduit}</span></p></div><div class="item_table" id="prix_produit"><p>Prix : <span class="text_souligne">${produitLocalStorage[k].prixProduit * produitLocalStorage[k].quantiteProduit} €</span></p></div><button class="btn_supprimer">Supprimer</button></div>`
    
    articlesPanier.innerHTML = structurePanier;

///////////////////////////Bouton supprimer l'article////////////////////////////

//Boucle pour acceder a tous les boutons supprimer
    for(let x = 0; x < btnSupprimer.length; x++ ) {
        btnSupprimer[x].addEventListener("click", (event) => {
        event.preventDefault();
        
        let idSupression = produitLocalStorage[x].idProduit;
        
        produitLocalStorage = produitLocalStorage.filter (
            (el) => el.idProduit !== idSupression
        );
            localStorage.setItem ("produit", JSON.stringify(produitLocalStorage));
            window.location.href = "panier.html"; //Refresh de la page
        });
    }
}

};

///////////////////////////////Bouton pour vider le panier///////////////////////

//Injecter le bouton dans le HTML avec la methode insertAdjacentHTML
const supprimerPanier = 
`<div id="container_btn_supprimer"><button id="btn_vider_panier">Vider le panier</button></div>`;
articlesPanier.insertAdjacentHTML("beforeend", supprimerPanier);

//Acceder au bouton pour vider le panier
const btnViderPanier = document.getElementById("btn_vider_panier"); 

btnViderPanier.addEventListener("click", (e) => {
    e.preventDefault();
    //Vider le localStorage
    localStorage.removeItem("produit");
    //Refresh de la page
    window.location.href = "panier.html"; 
});


//////////////////////////////Total du panier///////////////////////////////

let prixTotalPanier = [];

for(let m = 0; m < produitLocalStorage.length; m++) {
    let prixProduitPanier = produitLocalStorage[m].prixProduit * produitLocalStorage[m].quantiteProduit;

    prixTotalPanier.push(prixProduitPanier);
}

const reducer = (previousValue, currentValue) => previousValue + currentValue;

totalPanier.innerHTML = "<strong>Montant total a payer :</strong> " + prixTotalPanier.reduce(reducer) + " €";


///////////////////////////////Total d'articles///////////////////////////////
const panierNombreTotal = document.querySelector(".nombre_total_articles");

let nombreTotalPanier = [];

for(let t = 0; t < produitLocalStorage.length; t++) {
    let nombreArticlePanier = produitLocalStorage[t].lenght;
    nombreTotalPanier.push(produitLocalStorage.length);
}

panierNombreTotal.innerHTML = "(" + nombreTotalPanier.length + ")";

