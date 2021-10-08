
/////////////Local Storage - Produits dans le panier//////////////////
/*
const dataProductsObjet = JSON.parse(localStorage.getItem("products"));

//Boucle pour afficher l'information des produits dans la page de confirmation de commande
const produitsDansCommande = [];

for(let i = 0; i < dataProductsObjet.length; i++) {
    let commandePanier = dataProductsObjet[i].nomProduit;
   produitsDansCommande.push(commandePanier);
};
*/
/////////////Local Storage - Données de l'utilisateur//////////////////

const dataUtilisateurObjet = JSON.parse(localStorage.getItem("contact"));

//////////////Local Storage - Prix total du panier/////////////////////
let prixTotalProduits = JSON.parse(localStorage.getItem("prixPanier"));

//////////////Local Storage - ID commande/////////////////////////////
const commande = localStorage.getItem("commande");

//Message de confirmation de commande

const messageConfirmation = document.querySelector("#message_confirmation");

const contenuMessageConfirmation = `
<p>Merci pour votre commande <strong>${dataUtilisateurObjet.lastName}, ${dataUtilisateurObjet.firstName}</strong> !</p>
<p>Numéro de la commande: <strong>${commande}</strong> 
<p>Votre commande des articles dans la valeur total de <strong>${prixTotalProduits} €</strong> a été bien prise en compte. 
<p>Merci de nous avoir choisi !<br><br>`;


messageConfirmation.innerHTML = contenuMessageConfirmation;

////////////////////////////////////////////////////////

function effacerCleLocalStorage(key) {
  localStorage.removeItem(key);
};

effacerCleLocalStorage("prixPanier");
effacerCleLocalStorage("products");
effacerCleLocalStorage("commande");

if(commande == null || prixPanier == null) {
  window.location.href="index.html";
}