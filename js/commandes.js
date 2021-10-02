const produitLocalStorage = localStorage.getItem("produit");
const dataProduitLocalStorage = JSON.parse(produitLocalStorage);

let produitsDansCommande = [];

for(let i = 0; i < dataProduitLocalStorage.length; i++) {
    let commandePanier = dataProduitLocalStorage[i].nomProduit;
    produitsDansCommande.push(commandePanier);
}


const dataLocalStorage = localStorage.getItem("userInformationFormulaire");
const dataLocalStorageObjet = JSON.parse(dataLocalStorage);


/////////////////////////////////Page confirmation commande/////////////////////////

const messageConfirmation = document.querySelector("#message_confirmation");



const contenuMessageConfirmation = `
<p>Merci pour votre commande <strong>${dataLocalStorageObjet.prenom}</strong> !</p>
<p>Votre commande des articles :<br> <strong>${produitsDansCommande.join("<br>")}<br></strong>a été bien prise en compte. 
Votre colis sera envoyé au <strong>${dataLocalStorageObjet.adresse}, ${dataLocalStorageObjet.codePostal}, ${dataLocalStorageObjet.ville}</strong>.</p>
<p>Merci de nous avoir choisi !`;

messageConfirmation.innerHTML = contenuMessageConfirmation;

