
/////////////Local Storage - Produits dans le panier//////////////////

const produitLocalStorage = localStorage.getItem("produit");
const dataProduitLocalStorage = JSON.parse(produitLocalStorage);


//Boucle pour afficher l'information des produits dans la page de confirmation de commande
let produitsDansCommande = [];

for(let i = 0; i < dataProduitLocalStorage.length; i++) {
    let commandePanier = dataProduitLocalStorage[i].nomProduit;
    produitsDansCommande.push(commandePanier);
}

/////////////Local Storage - Données de l'utilisateur//////////////////

const dataLocalStorage = localStorage.getItem("userInformationFormulaire");
const dataLocalStorageObjet = JSON.parse(dataLocalStorage);


//////////////Local Storage - Prix total du panier/////////////////////
let prixTotalProduits = JSON.parse(localStorage.getItem("prixPanier"));

//////////////Local Storage - ID commande/////////////////////////////
let idCommande = JSON.parse(localStorage.getItem("response_id"));


//Message de confirmation de commande

const messageConfirmation = document.querySelector("#message_confirmation");

const randomNumber = Math.floor(Math.random() * 90000) + 10000;

const contenuMessageConfirmation = `
<p>Merci pour votre commande <strong>${dataLocalStorageObjet.prenom} ${dataLocalStorageObjet.nom} </strong> !</p>

<p>Votre commande <strong>(ID: ${idCommande})</strong> des articles :<br> <strong>${produitsDansCommande.join("<br>")}<br></strong> dans la valeur total de <strong>${prixTotalProduits} €</strong> a été bien prise en compte. 
<br><br>Votre colis sera envoyé au <strong>${dataLocalStorageObjet.adresse}, ${dataLocalStorageObjet.codePostal}, ${dataLocalStorageObjet.ville}</strong>.</p>
<p>Merci de nous avoir choisi !<br><br>
<svg class="barcode"
  jsbarcode-format="EAN5"
  jsbarcode-value="${randomNumber}"
  jsbarcode-textmargin="0"
  jsbarcode-fontoptions="bold">
</svg>`;


messageConfirmation.innerHTML = contenuMessageConfirmation;

//Effacer local storage
function effacerCleLocalStorage(key){
    localStorage.removeItem(key);
};

effacerCleLocalStorage("produit");
effacerCleLocalStorage("prixPanier");
effacerCleLocalStorage("response_id");