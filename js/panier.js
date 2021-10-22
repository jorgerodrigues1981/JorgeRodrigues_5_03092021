//Permet de acceder au DOM
const articlesPanier = document.getElementById("articles_panier");
const totalPanier = document.getElementById("panier_montant_total");
const btnSupprimer = document.getElementsByClassName("btn_supprimer");
const containerBtnSupprimer = document.getElementById("container_btn_supprimer");
const btnConfirmerCommande = document.getElementById("btn_confirmer_commande");
const formulaireCommande = document.getElementById("formulaire_commande");
const btnViderPanier = document.getElementById("btn_vider_panier");
//Accéder aux champs du formulaire
const nomUser = document.querySelector("#nom");
const prenomUser = document.querySelector("#prenom");
const adresseUser = document.querySelector("#adresse");
const villeUser = document.querySelector("#ville");
const mailUser = document.querySelector("#mail");
const btnEnvoyerCommande = document.querySelector("#btn_envoyer_commande");

//Envoie les produits dans le local storage
let products = JSON.parse(localStorage.getItem("productsOurs"));

//Function pour vérifier si le panier est vide 
function panierVide() {
    if(products === null || products == 0) {
        console.log("Le panier est vide !");
        return false;
    } else {
        console.log("Le panier est pas vide !");
        return true;
    };
}
//Affichage de message quand le panier est vide 
function afficherProduitsPanier(){
    if(panierVide() == false) {
        const panierVide = `<div id="panier_vide"><p>Le panier est vide !</p></div>`; 
        articlesPanier.innerHTML = panierVide;
        btnViderPanier.style.visibility = "hidden";
        btnConfirmerCommande.style.visibility = "hidden";
    } else {
        let structurePanier = [];
        for(let i = 0; i < products.length; i++) {
        structurePanier = structurePanier + 
        `<div id="panier_table"><div class="item_table" id="nom_produit"><p><span class="text_souligne">${products[i].nomProduit}</span> [${products[i].optionProduit}]</p></div><div class="item_table"><p>Quantité : <span class="text_souligne">${products[i].quantiteProduit}</span></p></div><div class="item_table" id="prix_produit"><p>Prix/unité : <strong>${products[i].prixProduit} €</strong><br>Prix total : <span class="text_souligne">${products[i].prixProduit * products[i].quantiteProduit} €</span></p></div><button class="btn_supprimer">Supprimer</button></div>`;
        articlesPanier.innerHTML = structurePanier;
    
///////////////////////////Bouton supprimer l'article////////////////////////////
    //Boucle pour acceder a tous les boutons supprimer
        for(let x = 0; x < btnSupprimer.length; x++ ) {
            
            btnSupprimer[x].addEventListener("click", (event) => {
            event.preventDefault();
            
            let idSupression = products[x].idProduit;
            products = products.filter (
                (el) => el.idProduit !== idSupression
            );
                localStorage.setItem ("productsOurs", JSON.stringify(products));
                window.location.href = "panier.html"; //Refresh de la page
            });
        }
    }
    };
}
//Appel de la function
afficherProduitsPanier();

///////////////////////////////Bouton pour vider le panier///////////////////////
function viderPanier() {
    //Vider le localStorage
    localStorage.removeItem("productsOurs");
    //Refresh de la page
    window.location.href = "panier.html"; 
}
//Event Listener du bouton "vider le panier"
btnViderPanier.addEventListener("click", viderPanier);

//////////////////////////////Total du panier///////////////////////////////
function prixTotalPanier() {
    let prixTotalPanier = [];

    for(let m = 0; m < products.length; m++) {
        let prixProduitPanier = products[m].prixProduit * products[m].quantiteProduit;
    
        prixTotalPanier.push(prixProduitPanier);
    }
    
    const reducer = (previousValue, currentValue) => previousValue + currentValue;
    
    //Afficher le montant total a payer
    const containerTotalPanierHtml = `
    <div id="container_total_panier" class="data_panier">
    <p id="panier_montant_total"><strong>Montant total à payer : </strong><span id="total_prix_panier">${prixTotalPanier.reduce(reducer)} €</span></p>
    </div>`
    
    //Envoyer le prix total du panier dans le local storage
    localStorage.setItem("prixPanier", JSON.stringify(prixTotalPanier.reduce(reducer)));
    let prixTotalProduits = JSON.parse(localStorage.getItem("prixPanier"));
    
    //Ajoute le HTML du containerTotalPanierHtml
    articlesPanier.insertAdjacentHTML("beforeend", containerTotalPanierHtml);
}

prixTotalPanier();

////////////////////////////Button aficher formulaire/////////////////////////
btnConfirmerCommande.addEventListener("click", (e) => {
    e.preventDefault();
    formulaireCommande.style.visibility = "visible";
}); 

/////////////////BOUTON ENVOYER COMMANDE////////////////////////////////////////////////
btnEnvoyerCommande.addEventListener("click", (event) => {
    event.preventDefault();

//Recupère les info du formulaire

const contact = {
    firstName: prenomUser.value,
    lastName: nomUser.value,
    address: adresseUser.value,
    city: villeUser.value,
    email: mailUser.value
}

//Envoie des données du formulaire dans le Local Storage
localStorage.setItem("contact", JSON.stringify(contact));

//Va chercher les produits dans le Local Storage
const oursPeluche = JSON.parse(localStorage.getItem("productsOurs"));
//Tableau vide pour récuperer les numéros d'Id 
const oursPelucheId = [];
//Boucle pour récupérer les numéros d'Id des produits
if(oursPeluche != null) {
    for(let i = 0; i < oursPeluche.length; i++) {
        oursPelucheId.push(oursPeluche[i].idProduit);
    }
};

let products = oursPelucheId;
localStorage.setItem("products", products);
const order = {products, contact};

//////////////////////////////Méthode POST///////////////////////////////////

function fetchOurs() {
        
        //Envoie de requête POST pour en retour avoir le numéro de la commande
        const promisse01 = fetch('http://localhost:3000/api/teddies/order', {
                method: "POST",
                body: JSON.stringify(order),
                headers: {'Content-Type': 'application/json'},
                mode: 'cors'
                })
                promisse01.then(async(res) => {
                    try {
                        const contenu = await res.json();
                        console.log("contenu.orderId");
                        console.log(contenu.orderId);
                        if(res.ok) {
                            console.log(`contenu de la response: ${res.ok}`);
                            localStorage.setItem("commande", contenu.orderId);
                            window.location.href = "confirmation_commande.html"; 
                        } else {
                            console.log(`response du server: ${res.status}`);
                        };  
                    } catch(e) {
                        console.log("Erreur!!");
                    };
                });  
    }
fetchOurs();
});

//////////////////////Validation du formulaire//////////////////////////////////////////
const inputForm = document.querySelector("#form_donnees_commande");
const validationForm = document.querySelector("#validation_form");

function validateForm(regex, input, errorTag, message) {
    if(regex.test(input)) {
        validationForm.innerHTML = "";
        btnEnvoyerCommande.disabled = false;
    } else {
        validationForm.innerHTML = message;
        btnEnvoyerCommande.disabled = true;
    }
};

//Validation du nom
function valChampNom(){
    validateForm(/^(([a-zA-ZÀ-ÿ]){3,20})$/, nomUser.value, validationForm, "Le nom est un champ obligatoire. Veuillez le renseigner. Minimum de trois caractères.")
};

//Validation du prénom
function valChampPrenom(){
    validateForm(/^(([a-zA-ZÀ-ÿ]){3,20})$/, prenomUser.value, validationForm, "Le prénom est un champ obligatoire. Veuillez le renseigner. Minimum de trois caractères.")
}

//Validation de l'adresse
function valChampAdresse(){
    validateForm(/[a-zA-ZÀ-ÿ-0-9 ]{3,20}$/, adresseUser.value, validationForm, "L'adresse est un champ obligatoire. Veuillez le renseigner. Minimum de trois caractères.")
}
//Validation de la ville
function valChampVille(){
    validateForm(/^(([a-zA-ZÀ-ÿ -]){3,50})$/, villeUser.value, validationForm, "Le nom de la ville est un champ obligatoire. Veuillez le renseigner. Minimum de trois caractères.")
};
//Validation e-mail
function valChampMail(){
    validateForm(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/, mailUser.value, validationForm, "Le e-mail est un champ obligatoire. Veuillez le renseigner. Veuillez respecter le format email : mon_email@gmail.com.")
};

nomUser.addEventListener("input", valChampNom);
prenomUser.addEventListener("input", valChampPrenom);
adresseUser.addEventListener("input", valChampAdresse);
villeUser.addEventListener("input", valChampVille);
mailUser.addEventListener("input", valChampMail);

/////////////Prè-remplissage des champs des formulaires avec les données du Local Storage///////////////
const dataLocalStorage = localStorage.getItem("contact");
const dataLocalStorageObjet = JSON.parse(dataLocalStorage);

nomUser.value = dataLocalStorageObjet.lastName;
prenomUser.value = dataLocalStorageObjet.firstName;
adresseUser.value = dataLocalStorageObjet.address;
villeUser.value = dataLocalStorageObjet.city;
mailUser.value = dataLocalStorageObjet.email;