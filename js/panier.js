//Permet de acceder au DOM
const articlesPanier = document.getElementById("articles_panier");
const totalPanier = document.getElementById("panier_montant_total");
const btnSupprimer = document.getElementsByClassName("btn_supprimer");
const containerBtnSupprimer = document.getElementById("container_btn_supprimer");


//Envoie les produits dans le local storage
let products = JSON.parse(localStorage.getItem("products"));

//Function pour vérifier si le panier est vide
function panierVide() {
    if(products === null || products == 0) {
        console.log("panier vide = true");
        return false;
    } else {
        console.log("panier vide = false");
        return true;
    };
}


//Affichage de message quand le panier est vide 
if(panierVide() == false) {
    const panierVide = `<div id="panier_vide"><p>Le panier est vide !</p></div>`; 
    articlesPanier.innerHTML = panierVide;
    //Fait dispâraitre le bouton vider panier
    articlesPanier.removeChild(); 
} else {
    let structurePanier = [];
    for(let k = 0; k < products.length; k++) {
    structurePanier = structurePanier + 
    `<div id="panier_table"><div class="item_table" id="nom_produit"><p><span class="text_souligne">${products[k].nomProduit}</span></p></div><div class="item_table"><p>Quantité : <span class="text_souligne">${products[k].quantiteProduit}</span></p></div><div class="item_table" id="prix_produit"><p>Prix : <span class="text_souligne">${products[k].prixProduit * products[k].quantiteProduit} €</span></p></div><button class="btn_supprimer">Supprimer</button></div>`;
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
            localStorage.setItem ("products", JSON.stringify(products));
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
    localStorage.removeItem("products");
    //Refresh de la page
    window.location.href = "panier.html"; 
});

//////////////////////////////Total du panier///////////////////////////////

let prixTotalPanier = [];

for(let m = 0; m < products.length; m++) {
    let prixProduitPanier = products[m].prixProduit * products[m].quantiteProduit;

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
                            <label for="ville">Ville <span class="asterisque_form">*</span></label>
                            <input type="text" rows="5" id="ville" class="input_form" name="user_ville" placeholder="Ville" required="required"><br>    
                        </div>
                        <p id="validation_ville" class="texte_validation"></p>
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
    const codePostalUser = document.querySelector("#codePostal");
    const villeUser = document.querySelector("#ville");
    const mailUser = document.querySelector("#mail");
    const btnEnvoyerCommande = document.querySelector("#btn_envoyer_commande");


/////////////////BOUTON ENVOYER COMMANDE////////////////////////////////////////////////

btnEnvoyerCommande.addEventListener("click", (event) => {
    event.preventDefault();

//Recuperation des données du formulaire et les mettre dans localStorage
    const iDproducts = localStorage.getItem("products");
    const dataProduitLocalStorage = JSON.parse(iDproducts);

//Recupère les id's des produits
    const products = [];

    for(let y = 0; y < dataProduitLocalStorage.length; y++){
        let productId = dataProduitLocalStorage[y].idProduit;
        products.push(productId);
    };

//Recupère les info du formulaire
    const contact = {
        firstName: prenomUser.value,
        lastName: nomUser.value,
        address: adresseUser.value,
        city: villeUser.value,
        email: mailUser.value
    }

    localStorage.setItem("contact", JSON.stringify(contact));
    

//Informations a envoyer sur le server
    const order = {products, contact};

//Envoyer les informations sur le server

const urlApi = ['http://localhost:3000/api/teddies/order', 'http://localhost:3000/api/cameras/order', 'http://localhost:3000/api/furniture/order'];

//Boucle pour aller chercher les URL des produits : ours, cameras et fournitures
        for (let i = 0; i < urlApi.length; i++) {
        const boucleUrl = urlApi[i]; 
        const promisse01 = fetch(boucleUrl, {
            method: "POST",
            body: JSON.stringify(order),
            headers: {'Content-Type': 'application/json'},
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
                        console.log(`response du server:" ${res.status}`)
                    };  
                } catch(e) {
                };
            })     
        };
});

////////////////////////////Prè-remplissage des champs des formulaires avec les données du Local Storage////////////////////////////////////
const dataLocalStorage = localStorage.getItem("contact");
const dataLocalStorageObjet = JSON.parse(dataLocalStorage);

nomUser.value = dataLocalStorageObjet.lastName;
prenomUser.value = dataLocalStorageObjet.firstName;
adresseUser.value = dataLocalStorageObjet.address;
villeUser.value = dataLocalStorageObjet.city;
mailUser.value = dataLocalStorageObjet.email;
//////////////////////////////////////////////////////////////////////////////////////////////////////////

//////////////////////Validation du formulaire//////////////////////////////////////////

const validationNom = document.querySelector("#validation_nom");

//Validation du nom
function valChampNom(){
    if(/^(([a-zA-ZÀ-ÿ]+[\s\-]{1}[a-zA-ZÀ-ÿ]+)|([a-zA-ZÀ-ÿ]+))$/.test(nomUser.value)) {
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
    if(/^(([a-zA-ZÀ-ÿ]+[\s\-]{1}[a-zA-ZÀ-ÿ]+)|([a-zA-ZÀ-ÿ]+))$/.test(prenomUser.value)) {
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
    if(/[a-zA-ZÀ-ÿ-0-9 ]$/.test(adresseUser.value)) {
        document.getElementById("validation_adresse").innerHTML = "";
        adresseUser.style.border = "2px solid #62E74D";
        btnEnvoyerCommande.disabled = false;
    } else {
        document.getElementById("validation_adresse").innerHTML = "L'adresse est un champ obligatoire. Veuillez le renseigner.";
        adresseUser.style.border = "2px solid #E74D4D";
        btnEnvoyerCommande.disabled = true;
    }
};

//Validation de la ville
function valChampVille(){
    if(/^(([a-zA-ZÀ-ÿ]+[\s\-]{1}[a-zA-ZÀ-ÿ]+)|([a-zA-ZÀ-ÿ]+))$/.test(villeUser.value)) {
        document.getElementById("validation_ville").innerHTML = "";
        villeUser.style.border = "2px solid #62E74D";
        btnEnvoyerCommande.disabled = false;
    } else {
        document.getElementById("validation_ville").innerHTML = "Le nom de la ville est un champ obligatoire. Veuillez le renseigner.";
        villeUser.style.border = "2px solid #E74D4D";
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
        document.getElementById("validation_email").innerHTML = "Le e-mail est un champ obligatoire. Veuillez le renseigner. Veuillez respecter le format email : mon_email@gmail.com.";
        mailUser.style.border = "2px solid #E74D4D";
        btnEnvoyerCommande.disabled = true; 
    }
};

nomUser.addEventListener("input", valChampNom);
prenomUser.addEventListener("input", valChampPrenom);
adresseUser.addEventListener("input", valChampAdresse);
villeUser.addEventListener("input", valChampVille);
mailUser.addEventListener("input", valChampMail);

};

///////////////////////////////Bouton confirmer commande/////////////////////////////

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
//Exécuter l'action une seule fois
}, {once : true}); 

/////////////////////////////////////////////////////////////////////////////////////////