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

    console.log("produitLocalStorage");

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

const containerTotalPanierHtml = `
<div id="container_total_panier" class="data_panier">
<p id="panier_montant_total"><strong>Montant total a payer : </strong><span id="total_prix_panier">${prixTotalPanier.reduce(reducer)} €</span></p>
</div>`

//Envoyer le prix total du panier dans le local storage
localStorage.setItem("prixPanier", JSON.stringify(prixTotalPanier.reduce(reducer)));
let prixTotalProduits = JSON.parse(localStorage.getItem("prixPanier"));
console.log(prixTotalProduits);

//Ajoute le HTML du containerTotalPanierHtml
articlesPanier.insertAdjacentHTML("beforeend", containerTotalPanierHtml);



/////////////////////////////////Formulaire commande////////////////////////////

const afficherFormulaireCommande = () => {

    const containerFormulaire = document.getElementById("articles_panier");

    const formulaireHtml = `
    <div id="formulaire_commande">
                    <h2>Formulaire de commande</h2>
                    <form id="form_donnees_commande">
                        <div class="champ_form">
                            <label for="nom">Nom <span class="asterisque_form">*</span></label>
                            <input type="text" id="nom" class="input_form" name="user_nom" placeholder="Nom" required="required">
                        </div>
                        <p id="validation_nom" class="texte_validation"></p>
                        <div class="champ_form">
                            <label for="prenom">Prénom <span class="asterisque_form">*</span></label>
                            <input type="text" id="prenom" class="input_form" name="user_prenom" placeholder="Prenom" required="required"><br>
                        </div>
                        <p id="validation_prenom" class="texte_validation"></p>
                        <div class="champ_form">
                            <label for="adresse">Adresse<span class="asterisque_form">*</span></label>
                            <textarea type="text" id="adresse" class="input_form" name="user_adresse" placeholder="Adresse" required="required"></textarea><br>    
                        </div>
                        <p id="validation_adresse" class="texte_validation"></p>
                        <div class="champ_form">
                            <label for="code_postal">Code postal <span class="asterisque_form">*</span></label>
                            <input type="text" id="code_postal" class="input_form" name="user_code_postal" placeholder="Code Postal" required="required"><br>    
                        </div>
                        <p id="validation_code_postal" class="texte_validation"></p>
                        <div class="champ_form">
                            <label for="ville">Ville <span class="asterisque_form">*</span></label>
                            <input type="text" id="ville" class="input_form" name="user_ville" placeholder="Ville" required="required"><br>    
                        </div>
                        <p id="validation_ville" class="texte_validation"></p>
                        <div class="champ_form">
                            <label for="telephone">Téléphone <span class="asterisque_form">*</span></label>
                            <input type="text" id="telephone" class="input_form" name="user_telephone" placeholder="Téléphone" required="required"><br>    
                        </div>
                        <p id="validation_telephone" class="texte_validation"></p>
                        <div class="champ_form">
                            <label for="mail">E-mail <span class="asterisque_form">*</span></label>
                            <input type="email" id="mail" class="input_form" name="user_mail" placeholder="E-mail" required="required">  
                        </div>
                        <p id="validation_email" class="texte_validation"></p> 
                        
                        <br><p id="info_validation">Les champs indiqués par une * sont obligatoires</p>
                        <button type="submit" id="btn_envoyer_commande">Envoyer la commande</button>
                    </form>
                </div>`;

               articlesPanier.insertAdjacentHTML("beforeend", formulaireHtml);

//Acceder aux champs du formulaire
const nomUser = document.querySelector("#nom");
const prenomUser = document.querySelector("#prenom");
const adresseUser = document.querySelector("#adresse");
const codePostalUser = document.querySelector("#code_postal");
const villeUser = document.querySelector("#ville");
const telephoneUser = document.querySelector("#telephone");
const mailUser = document.querySelector("#mail");
const btnEnvoyerCommande = document.querySelector("#btn_envoyer_commande");

btnEnvoyerCommande.addEventListener("click", (event) => {
    event.preventDefault();

/////////////////Recuperation des données du formulaire et les mettre dans localStorage
const userInformationFormulaire = {
    nom: nomUser.value,
    prenom: prenomUser.value,
    adresse: adresseUser.value,
    codePostal: codePostalUser.value,
    ville: villeUser.value,
    telephone: telephoneUser.value,
    mail: mailUser.value
};

//if(valChampNom() && valChampPrenom() && valChampAdresse() && valChampCodePostal() && valChampVille() && valChampTelephone() && valChampMail()) {

localStorage.setItem("userInformationFormulaire", JSON.stringify(userInformationFormulaire));

//Informations a envoyer
const donneesEnvoyer = {
    produitLocalStorage,
    userInformationFormulaire
}

/////////////////////////////////////////////////////////////////
//Envoyer les informations sur le server
//const urlApi = ['http://localhost:3000/api/teddies', 'http://localhost:3000/api/cameras', 'http://localhost:3000/api/furnitures'];

//for (let l = 0; l < urlApi.length; l++) {
    //const boucleUrl = urlApi[l];  

    //const promesse01 = fetch(boucleUrl + '/order', {
    const promesse01 = fetch('https://jsonplaceholder.typicode.com/users', {
        method: "POST",
        body: JSON.stringify(donneesEnvoyer),
        headers: {"Content-Type" : "application/json",},
        })
        
        promesse01.then(async(response) => {
           try {
               console.log("response");
               const contenu = await response.json();
                    console.log("contenu");
                    console.log(contenu);
                    console.log(contenu.id);

                    //Mettre le ID dans le local storage
                    localStorage.setItem('response_id', contenu.id);

                    if(response.ok) {
                        console.log(`Resultat response.ok : ${response.ok}`);
                    } else {
                        console.log(`Réponse du server : ${response.status}`);
                    }

          } catch(e) {
                console.log('ERREUR du catch');
                console.log(e);
            }
        })
//}
    //};
//////////////////////////////////////////////////////////

//Envoie sur la page confirmation commande
window.location.href = "confirmation_commande.html"

});

const dataLocalStorage = localStorage.getItem("userInformationFormulaire");
const dataLocalStorageObjet = JSON.parse(dataLocalStorage);

nomUser.value = dataLocalStorageObjet.nom;
prenomUser.value = dataLocalStorageObjet.prenom;
adresseUser.value = dataLocalStorageObjet.adresse;
codePostalUser.value = dataLocalStorageObjet.codePostal;
villeUser.value = dataLocalStorageObjet.ville;
telephoneUser.value = dataLocalStorageObjet.telephone;
mailUser.value = dataLocalStorageObjet.mail;


//////////////////////Functions pour validation du formulaire//////////////////////////////////////////

const validationNom = document.querySelector("#validation_nom");

//Validation du nom
function valChampNom(){
    if(/^[A-Za-z _àâæçéèêëîïôœùûüÿ-]{3,50}$/.test(nomUser.value)) {
        document.getElementById("validation_nom").innerHTML = "";
        nomUser.style.border = "2px solid #62E74D";
        btnEnvoyerCommande.disabled = false;
    } else {
        document.getElementById("validation_nom").innerHTML = "Le nom est un champ obligatoire. Veuillez le renseigner. Minimum de trois caractères.";
        nomUser.style.border = "2px solid #E74D4D";
        btnEnvoyerCommande.disabled = true;
    }
};

//Validation du prénom
function valChampPrenom(){
    if(/^[A-Za-z _àâæçéèêëîïôœùûüÿ-]{3,50}$/.test(prenomUser.value)) {
        document.getElementById("validation_prenom").innerHTML = "";
        prenomUser.style.border = "2px solid #62E74D";
        btnEnvoyerCommande.disabled = false;
    } else {
        document.getElementById("validation_prenom").innerHTML = "Le prénom est un champ obligatoire. Veuillez le renseigner. Minimum de trois caractères.";
        prenomUser.style.border = "2px solid #E74D4D";
        btnEnvoyerCommande.disabled = true;
    }
};

//Validation de l'adresse
function valChampAdresse(){
    if(/^[A-Za-z0-9 _àâæçéèêëîïôœùûüÿ-]{3,200}$/.test(adresseUser.value)) {
        document.getElementById("validation_adresse").innerHTML = "";
        adresseUser.style.border = "2px solid #62E74D";
        btnEnvoyerCommande.disabled = false;
    } else {
        document.getElementById("validation_adresse").innerHTML = "L'adresse est un champ obligatoire. Veuillez le renseigner.";
        adresseUser.style.border = "2px solid #E74D4D";
        btnEnvoyerCommande.disabled = true;
    }
};

//Validation du code postal
function valChampCodePostal(){
    if(/^[0-9]{5}$/.test(codePostalUser.value)) {
        document.getElementById("validation_code_postal").innerHTML = "";
        codePostalUser.style.border = "2px solid #62E74D";
        btnEnvoyerCommande.disabled = false;
    } else {
        document.getElementById("validation_code_postal").innerHTML = "Le code postal est un champ obligatoire. Veuillez le renseigner. Le code postal doit contenir 5 chiffres.";
        codePostalUser.style.border = "2px solid #E74D4D";
        btnEnvoyerCommande.disabled = true;
    }
};

//Validation de la ville
function valChampVille(){
    if(/^[A-Za-z _àâæçéèêëîïôœùûüÿ-]{3,100}$/.test(villeUser.value)) {
        document.getElementById("validation_ville").innerHTML = "";
        villeUser.style.border = "2px solid #62E74D";
        btnEnvoyerCommande.disabled = false;
    } else {
        document.getElementById("validation_ville").innerHTML = "Le nom de la ville est un champ obligatoire. Veuillez le renseigner.";
        villeUser.style.border = "2px solid #E74D4D";
        btnEnvoyerCommande.disabled = true;
    }
};

//Validation téléphone
function valChampTelephone(){
    if(/^[0-9]{9,20}$/.test(telephoneUser.value)) {
        document.getElementById("validation_telephone").innerHTML = "";
        telephoneUser.style.border = "2px solid #62E74D";
        btnEnvoyerCommande.disabled = false;
    } else {
        document.getElementById("validation_telephone").innerHTML = "Le téléphone est un champ obligatoire. Veuillez le renseigner. Le numéro de téléphone ne doit contenir que des chiffres.";
        telephoneUser.style.border = "2px solid #E74D4D";
        btnEnvoyerCommande.disabled = true;
    }
};

//Validation e-mail
function valChampMail(){
    if(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(mailUser.value)) {
        document.getElementById("validation_email").innerHTML = "";
        mailUser.style.border = "2px solid #62E74D";
        btnEnvoyerCommande.disabled = false;
    } else {
        document.getElementById("validation_email").innerHTML = "Le téléphone est un champ obligatoire. Veuillez le renseigner. Veuillez respecter le format email : mon_email@gmail.com.";
        mailUser.style.border = "2px solid #E74D4D";
        btnEnvoyerCommande.disabled = true; 
    }
};

nomUser.addEventListener("input", valChampNom);
prenomUser.addEventListener("input", valChampPrenom);
adresseUser.addEventListener("input", valChampAdresse);
codePostalUser.addEventListener("input", valChampCodePostal);
villeUser.addEventListener("input", valChampVille);
telephoneUser.addEventListener("input", valChampTelephone);
mailUser.addEventListener("input", valChampMail);

};

///////////////////////////////Bouton confirmer commande///////////////////////

//Injecter le bouton dans le HTML avec la methode insertAdjacentHTML
const confirmerCommande = 
`<div id="container_btn_supprimer"><button id="btn_confirmer_commande">Confirmer la commande</button></div>`;
articlesPanier.insertAdjacentHTML("beforeend", confirmerCommande);

//Acceder au bouton pour vider le panier
const btnConfirmerCommande = document.getElementById("btn_confirmer_commande"); 
const containerFormulaireCommande = document.getElementById("formulaire_confirmation");

btnConfirmerCommande.addEventListener("click", (e) => {
    e.preventDefault();
    containerFormulaireCommande.innerHTML = afficherFormulaireCommande();
   
}, {once : true}); //Exécuter l'action une seule fois