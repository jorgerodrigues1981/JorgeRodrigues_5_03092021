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
    `<div id="panier_table"><div class="item_table" id="nom_produit"><p><span class="text_souligne">${produitLocalStorage[k].nomProduit}</span></p></div><div class="item_table"><p>Quantité : <span class="text_souligne">${produitLocalStorage[k].quantiteProduit}</span></p></div><div class="item_table" id="prix_produit"><p>Prix : <span class="text_souligne">${produitLocalStorage[k].prixProduit * produitLocalStorage[k].quantiteProduit} €</span></p></div></div>`
    
    articlesPanier.innerHTML = structurePanier;
}

};

//////////////////////////////Total du panier///////////////////////////////

let prixTotalPanier = [];

for(let m = 0; m < produitLocalStorage.length; m++) {
    let prixProduitPanier = produitLocalStorage[m].prixProduit * produitLocalStorage[m].quantiteProduit;

    prixTotalPanier.push(prixProduitPanier);
}

const reducer = (previousValue, currentValue) => previousValue + currentValue;

totalPanier.innerHTML = "<strong>Montant total a payer :</strong> " + prixTotalPanier.reduce(reducer) + " €";


//////////////////////////Formulaire de commande////////////////////////////////

const nomUser = document.querySelector("#nom");
const prenomUser = document.querySelector("#prenom");
const adresseUser = document.querySelector("#adresse");
const codePostalUser = document.querySelector("#code_postal");
const villeUser = document.querySelector("#ville");
const telephoneUser = document.querySelector("#telephone");
const mailUser = document.querySelector("#mail");
const btnEnvoyerCommande = document.querySelector("#btn_envoyer_commande");

//Functions pour validation du formulaire
const validationNom = document.querySelector("#validation_nom");
//Validation du nom
function valChampNom(){
    if(/^[A-Za-z]{3,20}$/.test(nomUser.value)) {
        document.getElementById("validation_nom").innerHTML = "";
    } else {
        document.getElementById("validation_nom").innerHTML = "Nom pas valide";
    }
};

//Validation du prénom
function valChampPrenom(){
    if(/^[A-Za-z]{3,20}$/.test(prenomUser.value)) {
        document.getElementById("validation_prenom").innerHTML = "";
    } else {
        document.getElementById("validation_prenom").innerHTML = "Prénom pas valide";
    }
};

//Validation de l'adresse
function valChampAdresse(){
    if(/^[A-Za-z0-9 _]{3,200}$/.test(adresseUser.value)) {
        document.getElementById("validation_adresse").innerHTML = "";
    } else {
        document.getElementById("validation_adresse").innerHTML = "Adresse pas valide";
    }
};

//Validation du code postal
function valChampCodePostal(){
    if(/^[0-9]{5}$/.test(codePostalUser.value)) {
        document.getElementById("validation_code_postal").innerHTML = "";
    } else {
        document.getElementById("validation_code_postal").innerHTML = "Code postal pas valide";
    }
};

//Validation de la ville
function valChampVille(){
    if(/^[A-Za-z]{3,20}$/.test(villeUser.value)) {
        document.getElementById("validation_ville").innerHTML = "";
    } else {
        document.getElementById("validation_ville").innerHTML = "Nom de ville pas valide";
    }
};

//Validation téléphone
function valChampTelephone(){
    if(/^[0-9]{9,20}$/.test(telephoneUser.value)) {
        document.getElementById("validation_telephone").innerHTML = "";
    } else {
        document.getElementById("validation_telephone").innerHTML = "Numéro de téléphone non valide";
    }
};

//Validation e-mail
function valChampMail(){
    if(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(mailUser.value)) {
        document.getElementById("validation_email").innerHTML = "";
    } else {
        document.getElementById("validation_email").innerHTML = "E-mail pas valide";
    }
};

nomUser.addEventListener("input", valChampNom);
prenomUser.addEventListener("input", valChampPrenom);
adresseUser.addEventListener("input", valChampAdresse);
codePostalUser.addEventListener("input", valChampCodePostal);
villeUser.addEventListener("input", valChampVille);
telephoneUser.addEventListener("input", valChampTelephone);
mailUser.addEventListener("input", valChampMail);
