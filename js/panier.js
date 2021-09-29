const articlesPanier = document.getElementById("articles_panier");
const totalPanier = document.getElementById("panier_montant_total");


let produitLocalStorage = JSON.parse(localStorage.getItem("produit"));



if(produitLocalStorage === null) {
    const panierVide = `<div id="panier_vide"><p>Le panier est vide !</p></div>`;
    articlesPanier.innerHTML = panierVide;

} else {
    let structurePanier = [];
    
    for(let k = 0; k < produitLocalStorage.length; k++) {
    
    structurePanier = structurePanier + 
    `<div id="panier_table"><div class="item_table" id="nom_produit"><p><span class="text_souligne">${produitLocalStorage[k].nomProduit}</span></p></div><div class="item_table"><p>Quantité : <span class="text_souligne">${produitLocalStorage[k].quantiteProduit}</span></p></div><div class="item_table" id="prix_produit"><p>Prix/Unité : <span class="text_souligne">${produitLocalStorage[k].prixProduit} €</span></p></div></div>`
    

    articlesPanier.innerHTML = structurePanier;
   
}

};

