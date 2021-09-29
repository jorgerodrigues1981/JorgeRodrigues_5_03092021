const containerProduit = document.getElementById("affichage_produit");
const listeOptions = document.getElementById("selectOption");
const quantiteProduits = document.getElementById("quantite");
const buttonAjouter = document.getElementById("btn_ajouter");
const typeOption = document.getElementById("type_option");

const monPanier = document.getElementById("mon_panier");

////////////////////////////////////Ours en Peluche/////////////////////////////////////////////

const url="http://localhost:3000/api/teddies";
const productId = window.location.search.substring(1);
const urlOurs=`${url}/${productId}`; 

fetch(urlOurs)
.then(res => {
  if(res.ok) {
    return res.json();
  } 
})
.then(data => {
  
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

///////////////////////////////////////////////////////////////////////////////////

//GESTION DES OPTIONS DU PRODUIT

//Boucle pour les choisir options du produit données par l'API
  const choisirCouleur = data.colors;

  let listeOptionsOurs = [];

  for(let j = 0; j < choisirCouleur.length; j++) {
    listeOptionsOurs = listeOptionsOurs + 
    `<option value="${choisirCouleur[j]}">${choisirCouleur[j]}</option>`
  }

  //Injecter la boucle dans le HTML
  listeOptions.innerHTML = listeOptionsOurs;
  //Change le texte pour les options du produit
  typeOption.innerHTML = " la couleur :" 

  ///////////////////////////////////////////////////
  //Ajouter le produit au panier

  buttonAjouter.addEventListener("click", (event) => {
    event.preventDefault();

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

let produitLocalStorage = JSON.parse(localStorage.getItem("produit"));

console.log(produitLocalStorage);

if(produitLocalStorage) {
  produitLocalStorage.push(dataProduit);
  localStorage.setItem("produit", JSON.stringify(produitLocalStorage));

} else {
  produitLocalStorage = [];
  produitLocalStorage.push(dataProduit);
  localStorage.setItem("produit", JSON.stringify(produitLocalStorage));
  
 
 console.log(produitLocalStorage);
 
}

    monPanier.innerHTML = `<div id="tableau_options"><p>Une quantité de <span class="text_souligne">${dataProduit.quantiteProduit}</span> article(s) <span class="text_souligne">"${dataProduit.nomProduit}"</span> de couleur <span class="text_souligne">${dataProduit.optionProduit}</span>
    au prix total de <span class="text_souligne">${dataProduit.prixProduit * dataProduit.quantiteProduit}</span> € a été ajouté au panier !</p></div>`;

  });

})
.catch(err => { 
});


////////////////////////////////////Caméras Vintage/////////////////////////////////////////////

const urlItemCamera="http://localhost:3000/api/cameras";
const urlCamera=`${urlItemCamera}/${productId}`; 

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

  typeOption.innerHTML = " le lens :"

///////////////////////////////////////////////////////////////////////////////////

//GESTION DES OPTIONS DU PRODUIT

//Boucle pour les choisir options du produit données par l'API
  const choisirLens = data.lenses;

  let listeOptionsCamera = [];

  for(let j = 0; j < choisirLens.length; j++) {
    listeOptionsCamera = listeOptionsCamera + 
    `<option value="${choisirLens[j]}">${choisirLens[j]}</option>`
  }

  //Injecter la boucle dans le HTML
  listeOptions.innerHTML = listeOptionsCamera;

  ///////////////////////////////////////////////////
  //Ajouter le produit au panier

  buttonAjouter.addEventListener("click", (event) => {
    event.preventDefault();

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

let produitLocalStorage = JSON.parse(localStorage.getItem("produit"));

console.log(produitLocalStorage);


if(produitLocalStorage) {
  produitLocalStorage.push(dataProduit);
  localStorage.setItem("produit", JSON.stringify(produitLocalStorage));

} else {
  produitLocalStorage = [];
  produitLocalStorage.push(dataProduit);
  localStorage.setItem("produit", JSON.stringify(produitLocalStorage));
  
 
 console.log(produitLocalStorage);
 
}

monPanier.innerHTML = `<div id="tableau_options"><p>Une quantité de <span class="text_souligne">${dataProduit.quantiteProduit}</span> article(s) <span class="text_souligne">"${dataProduit.nomProduit}"</span> avec l'option lens de <span class="text_souligne">${dataProduit.optionProduit}</span>
au prix total de <span class="text_souligne">${dataProduit.prixProduit * dataProduit.quantiteProduit}</span> € a été ajouté au panier !</p></div>`;

  });

})
.catch(err => { 
  console.log("Une erreur est survenue !");
});


////////////////////////////////////Meubles en chêne/////////////////////////////////////////////

const urlItemMeuble="http://localhost:3000/api/furniture";
const urlMeuble=`${urlItemMeuble}/${productId}`; 

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

  for(let j = 0; j < choisirVernis.length; j++) {
    listeOptionsMeuble = listeOptionsMeuble + 
    `<option value="${choisirVernis[j]}">${choisirVernis[j]}</option>`
  }

  //Injecter la boucle dans le HTML
  listeOptions.innerHTML = listeOptionsMeuble;


  ///////////////////////////////////////////////////
  //Ajouter le produit au panier

  buttonAjouter.addEventListener("click", (event) => {
    event.preventDefault();

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

let produitLocalStorage = JSON.parse(localStorage.getItem("produit"));

console.log(produitLocalStorage);


if(produitLocalStorage) {
  produitLocalStorage.push(dataProduit);
  localStorage.setItem("produit", JSON.stringify(produitLocalStorage));

} else {
  produitLocalStorage = [];
  produitLocalStorage.push(dataProduit);
  localStorage.setItem("produit", JSON.stringify(produitLocalStorage));
  
 
 console.log(produitLocalStorage);
 
}

monPanier.innerHTML = `<div id="tableau_options"><p>Une quantité de <span class="text_souligne">${dataProduit.quantiteProduit}</span> article(s) <span class="text_souligne">"${dataProduit.nomProduit}"</span> de couleur <span class="text_souligne">${dataProduit.optionProduit}</span>
au prix total de <span class="text_souligne">${dataProduit.prixProduit * dataProduit.quantiteProduit}</span> € a été ajouté au panier !</p></div>`;

  });

})
.catch(err => { 
  console.log("Une erreur est survenue !");
});





