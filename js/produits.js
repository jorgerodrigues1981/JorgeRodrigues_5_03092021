const containerProduit = document.getElementById("affichage_produit");
const containerOptions = document.getElementById("options");



////////////////////////////////////Ours en Peluche/////////////////////////////////////////////

const url="http://localhost:3000/api/teddies";
const productIdOurs = window.location.search.substring(1);
const urlOurs=`${url}/${productIdOurs}`; 

fetch(urlOurs)
.then(res => {
  if(res.ok) {
    return res.json();
  } 
})
.then(data => {

  let produitOurs = "";
  produitOurs = 
  `<div id="container_single_item">
          <h1>${data.name}</h1>
          <img src="${data.imageUrl}">
          <p><strong>Prix :</strong> ${data.price / 100} €<p>
          <p><strong>Description :</strong><br> ${data.description}</p>
  </div>`


  let produitOptions = "";
  produitOptions =
  `<form>
      <label for="couleur"><h4>Choisir la couleur</h4></label><br>
          <select id="couleur" name="couleur">
            <option value="${data.colors[0]}">${data.colors[0]}</option>
            <option value="${data.colors[1]}">${data.colors[1]}</option>
            <option value="${data.colors[2]}">${data.colors[2]}</option>
            <option value="${data.colors[3]}">${data.colors[3]}</option>
          </select>
          <p id="affichageCouleur"></p>
          <br>
          <label for="quantite"><h4>Choisir la quantité</h4></label><br>
          <input type="number" value="1" id="quantite" name="quantite" min="1" max="99">
          <br>
          <p id="affichageQuantite"></p>
          <br>
          <button id="btn_ajouter" type="button">Ajouter au pannier</button>
    </form>`

    

  containerProduit.innerHTML = produitOurs;
  containerOptions.innerHTML = produitOptions;

  let quantiteData = document.getElementById("quantite");
  let couleurData = document.getElementById("couleur");
  const btnAjouter = document.getElementById("btn_ajouter");
  const affichageCouleur = document.getElementById("affichageCouleur");
  const affichageQuantite = document.getElementById("affichageQuantite");

  //Affichage de la couleur choisi
  couleurData.addEventListener('change', (event) => {
  const couleurCapture = event.target.value;
  affichageCouleur.innerHTML = `Couleur choisi : <strong>${event.target.value}</strong>`
  });

  //Affichage de la quantité choisi
  quantiteData.addEventListener('change', (event) => {
    const quantiteCapture = event.target.value;
    affichageQuantite.innerHTML = `Quantité choisi : <strong>${event.target.value}</strong>`
  });

})
.catch(err => { 
  console.log("Une erreur est survenue !");
});



////////////////////////////////////Caméras Vintage/////////////////////////////////////////////

const urlItemCamera="http://localhost:3000/api/cameras";
const productIdCamera = window.location.search.substring(1);
const urlCamera=`${urlItemCamera}/${productIdCamera}`; 

fetch(urlCamera)
.then(res => {
  if(res.ok) {
    console.log("url ok");
    return res.json();
  } 
})
.then(data => {
  let produitCamera = "";
  
  produitCamera = `<div id="container_single_item">
  <h1>${data.name}</h1>
  <img src="${data.imageUrl}">
  <p>${data.price / 100} €<p>
  <p>${data.description}</p>
  </div>`


  let produitOptions = "";
  produitOptions =
  `<form>
      <label for="lenses"><h4>Choisir la lense</h4></label><br>
          <select id="couleur" name="lenses">
            <option value="${data.lenses[0]}">${data.lenses[0]}</option>
            <option value="${data.lenses[1]}">${data.lenses[1]}</option>
            <option value="${data.lenses[2]}">${data.lenses[2]}</option>
            <option value="${data.lenses[3]}">${data.lenses[3]}</option>
          </select>
          <br><br>
          <label for="quantite"><h4>Choisir la quantité<h4></label><br>
          <input type="number" value="1" id="quantite" name="quantite" min="1" max="99">
          <br><br>
          <button id="btn_ajouter" type="button">Ajouter au pannier</button>
    </form>`

  containerProduit.innerHTML = produitCamera;
  containerOptions.innerHTML = produitOptions;

})
.catch(err => { 
  console.log("Une erreur est survenue !");
});


////////////////////////////////////Meubles en chêne/////////////////////////////////////////////

const urlItemMeuble="http://localhost:3000/api/furniture";
const productIdMeuble = window.location.search.substring(1);
const urlMeuble=`${urlItemMeuble}/${productIdMeuble}`; 

fetch(urlMeuble)
.then(res => {
  if(res.ok) {
    return res.json();
  } 
})
.then(data => {
  let produitMeuble = "";
  
  produitMeuble = `<div id="container_single_item">
  <h1>${data.name}</h1>
  <img src="${data.imageUrl}">
  <p>${data.price / 100} €<p>
  <p>${data.description}</p>
  </div>`

  let produitOptions = "";
  produitOptions =
  `<form>
      <label for="vernis"><h4>Choisir la couleur</h4></label><br>
          <select id="vernis" name="vernis">
            <option value="${data.varnish[0]}">${data.varnish[0]}</option>
            <option value="${data.varnish[1]}">${data.varnish[1]}</option>
            <option value="${data.varnish[2]}">${data.varnish[2]}</option>
            <option value="${data.varnish[3]}">${data.varnish[3]}</option>
          </select>
          <br><br>
          <label for="quantite"><h4>Choisir la quantité<h4></label><br>
          <input type="number" value="1" id="quantite" name="quantite" min="1" max="99">
          <br><br>
          <button id="btn_ajouter" type="button">Ajouter au pannier</button>
    </form>`

  containerProduit.innerHTML = produitMeuble;
  containerOptions.innerHTML = produitOptions;

})
.catch(err => { 
  console.log("Une erreur est survenue !");
});
