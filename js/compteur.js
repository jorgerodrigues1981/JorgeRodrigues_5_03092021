const compteurArticlesPanier = document.querySelector(".nombre_total_articles");


const produitLocalStorage = localStorage.getItem("produit");
const dataProduitLocalStorage = JSON.parse(produitLocalStorage);

console.log(dataProduitLocalStorage.length);

compteurArticlesPanier.innerHTML = "(" + dataProduitLocalStorage.length + ")";
