//Accéder au DOM
const containerProduit = document.getElementById("affichage_produit");
const listeOptions = document.getElementById("selectOption");
const quantiteProduits = document.getElementById("quantite");
const buttonAjouter = document.getElementById("btn_ajouter");
const typeOption = document.getElementById("type_option");
const monPanier = document.getElementById("mon_panier");
const btnVoirPanier = document.getElementById("voir_panier");

////////////////////////////////////Ours en Peluche/////////////////////////////////////////////
function fetchOurs() {
  const url="http://localhost:3000/api/teddies";
  const productId = window.location.search.substring(1);
  const urlOurs=`${url}/${productId}`; 
  //Récupère les données de la API pour les Ours en Peluche
  fetch(urlOurs)
  .then(res => {
    if(res.ok) {
      console.log("Le produit a été retrouvé !")
      return res.json();
    } 
  })
  .then(data => {
  //Affichage des informations du produit sélectionné dans la page produit.html
    let produitOurs = [];
    produitOurs = 
    `<div id="container_single_item">
            <h1>${data.name}</h1>
            <img src="${data.imageUrl}">
            <p><strong>Prix :</strong> ${data.price / 100} €<p>
            <p><strong>Description :</strong><br> ${data.description}</p>
    </div>`
  
  //Injection dans le HTML dans la div "affichage_produit"
  containerProduit.innerHTML = produitOurs;
  
  //GESTION DES OPTIONS DU PRODUIT
  
  //Boucle pour les choisir options du produit données par l'API
      const choisirCouleur = data.colors;
  
      let listeOptionsOurs = [];
    
      for(let i = 0; i < choisirCouleur.length; i++) {
        listeOptionsOurs = listeOptionsOurs + 
        `<option value="${choisirCouleur[i]}">${choisirCouleur[i]}</option>`
      };

    //Injecter la boucle dans le HTML
    listeOptions.innerHTML = listeOptionsOurs;
    //Change le texte pour les options du produit
    typeOption.innerHTML = " la couleur :" 
  
    //Bouton pour ajouter le produit au panier
    buttonAjouter.addEventListener("click", (event) => {
      event.preventDefault();
    //Recupère les options du produit et quantité
      const optionChoisi = listeOptions.value;
      const quantiteChoisi = quantiteProduits.value;
  
      let dataProduit = {
        idProduit: productId,
        nomProduit: data.name,
        optionProduit: optionChoisi,
        quantiteProduit: quantiteChoisi,
        prixProduit: data.price / 100
      }
  
  //////////////////////////////Local Storage//////////////////////////////////////////////////
  let produitLocalStorage = JSON.parse(localStorage.getItem("products"));
  
  if(produitLocalStorage) {
    produitLocalStorage.push(dataProduit);
    localStorage.setItem("products", JSON.stringify(produitLocalStorage));
  
  } else {
    produitLocalStorage = [];
    produitLocalStorage.push(dataProduit);
    localStorage.setItem("products", JSON.stringify(produitLocalStorage));
  }
      //Message de confirmation d'ajout du produit dans le panier
      monPanier.innerHTML = `<div id="tableau_options"><p>Une quantité de <span class="text_souligne">${dataProduit.quantiteProduit}</span> article(s) <span class="text_souligne">"${dataProduit.nomProduit}"</span> de couleur <span class="text_souligne">${dataProduit.optionProduit}</span>
      au prix total de <span class="text_souligne">${dataProduit.prixProduit * dataProduit.quantiteProduit}</span> € a été ajouté au panier !</p>
      <a href="panier.html"><p id="voir_panier">Voir panier<p></a></div></div>`;
    });
  })
  .catch(err => { 
    console.log("Produit été pas ajouté au panier !!")
  });
};
////////////////////////////////////Caméras Vintage/////////////////////////////////////////////
function fetchCameras() {
  const urlItemCamera="http://localhost:3000/api/cameras";
  const productId = window.location.search.substring(1);
  const urlCamera=`${urlItemCamera}/${productId}`; 
//Récupère les données de la API pour les Caméras
  fetch(urlCamera)
  .then(res => {
    if(res.ok) {
      return res.json();
    } 
  })
  .then(data => {
    let produitCameras = [];
    produitCameras = 
    `<div id="container_single_item">
            <h1>${data.name}</h1>
            <img src="${data.imageUrl}">
            <p><strong>Prix :</strong> ${data.price / 100} €<p>
            <p><strong>Description :</strong><br> ${data.description}</p>
    </div>`
  
    //Injection dans le HTML dans la div "affichage_produit"
    containerProduit.innerHTML = produitCameras;
  
    typeOption.innerHTML = " la lentille :"
  
  ///////////////////////////////////////////////////////////////////////////////////
  
  //GESTION DES OPTIONS DU PRODUIT
  
  //Boucle pour les choisir options du produit données par l'API
    const choisirLens = data.lenses;
  
    let listeOptionsCamera = [];
  
    for(let i = 0; i < choisirLens.length; i++) {
      listeOptionsCamera = listeOptionsCamera + 
      `<option value="${choisirLens[i]}">${choisirLens[i]}</option>`
    }
  
    //Injecter la boucle dans le HTML
    listeOptions.innerHTML = listeOptionsCamera;
  
    ///////////////////////////////////////////////////
    //Bouton pour ajouter le produit au panier
  
    buttonAjouter.addEventListener("click", (event) => {
      event.preventDefault();
    //Recupère les options du produit et quantité
      const optionChoisi = listeOptions.value;
      const quantiteChoisi = quantiteProduits.value;
  
      let dataProduit = {
        idProduit: productId,
        nomProduit: data.name,
        optionProduit: optionChoisi,
        quantiteProduit: quantiteChoisi,
        prixProduit: data.price / 100
      }
  
  //////////////////////////////Local Storage//////////////////////////////////////////////////
  
  let produitLocalStorage = JSON.parse(localStorage.getItem("products"));
  
  if(produitLocalStorage) {
    produitLocalStorage.push(dataProduit);
    localStorage.setItem("products", JSON.stringify(produitLocalStorage));
  
  } else {
    produitLocalStorage = [];
    produitLocalStorage.push(dataProduit);
    localStorage.setItem("products", JSON.stringify(produitLocalStorage));
  }
  //Message de confirmation d'ajout du produit dans le panier
  monPanier.innerHTML = `<div id="tableau_options"><p>Une quantité de <span class="text_souligne">${dataProduit.quantiteProduit}</span> article(s) <span class="text_souligne">"${dataProduit.nomProduit}"</span> avec l'option lens de <span class="text_souligne">${dataProduit.optionProduit}</span>
  au prix total de <span class="text_souligne">${dataProduit.prixProduit * dataProduit.quantiteProduit}</span> € a été ajouté au panier !</p>
  <a href="panier.html"><p id="voir_panier">Voir panier<p></a></div>`;
  
    });
  
  })
  .catch(err => { 
    console.log("Produit été pas ajouté au panier !!")
  });
}
////////////////////////////////////Meubles en chêne/////////////////////////////////////////////
function fetchMeubles() {
  const urlItemMeuble="http://localhost:3000/api/furniture";
  const productId = window.location.search.substring(1);
  const urlMeuble=`${urlItemMeuble}/${productId}`; 
  //Récupère les données de la API pour les Meubles
  fetch(urlMeuble)
  .then(res => {
    if(res.ok) {
      return res.json();
    } 
  })
  .then(data => {
    let produitMeubles = [];
    produitMeubles = 
    `<div id="container_single_item">
            <h1>${data.name}</h1>
            <img src="${data.imageUrl}">
            <p><strong>Prix :</strong> ${data.price / 100} €<p>
            <p><strong>Description :</strong><br> ${data.description}</p>
    </div>`
  
    //Injection dans le HTML dans la div "affichage_produit"
    containerProduit.innerHTML = produitMeubles;
  
    typeOption.innerHTML = " le type de vernis :"
  
  
  ///////////////////////////////////////////////////////////////////////////////////
  
  //GESTION DES OPTIONS DU PRODUIT
  
  //Boucle pour les choisir options du produit données par l'API
    const choisirVernis = data.varnish;
  
    let listeOptionsMeuble = [];
  
    for(let i = 0; i < choisirVernis.length; i++) {
      listeOptionsMeuble = listeOptionsMeuble + 
      `<option value="${choisirVernis[i]}">${choisirVernis[i]}</option>`
    }
  
    //Injecter la boucle dans le HTML
    listeOptions.innerHTML = listeOptionsMeuble;
  
  //Bouton pour ajouter le produit au panier
  buttonAjouter.addEventListener("click", (event) => {
    event.preventDefault();
  //Recupère les options du produit et quantité
    const optionChoisi = listeOptions.value;
    const quantiteChoisi = quantiteProduits.value;
  
      let dataProduit = {
        idProduit: productId,
        nomProduit: data.name,
        optionProduit: optionChoisi,
        quantiteProduit: quantiteChoisi,
        prixProduit: data.price / 100
      };
  
  //////////////////////////////Local Storage//////////////////////////////////////////////////
  
  let produitLocalStorage = JSON.parse(localStorage.getItem("products"));
  
  if(produitLocalStorage) {
    produitLocalStorage.push(dataProduit);
    localStorage.setItem("products", JSON.stringify(produitLocalStorage));
  
  } else {
    produitLocalStorage = [];
    produitLocalStorage.push(dataProduit);
    localStorage.setItem("products", JSON.stringify(produitLocalStorage));
  }
  
  //Message de confirmation d'ajout du produit dans le panier
  monPanier.innerHTML = `<div id="tableau_options"><p>Une quantité de <span class="text_souligne">${dataProduit.quantiteProduit}</span> article(s) <span class="text_souligne">"${dataProduit.nomProduit}"</span> de couleur <span class="text_souligne">${dataProduit.optionProduit}</span>
  au prix total de <span class="text_souligne">${dataProduit.prixProduit * dataProduit.quantiteProduit}</span> € a été ajouté au panier !</p>
  <a href="panier.html"><p id="voir_panier">Voir panier<p></a></div></div>`;
  
    });
  })
  .catch(err => { 
    console.log("Produit été pas ajouté au panier !!")
  });  
};

//On appelle les functions
fetchOurs();
fetchCameras();
fetchMeubles();