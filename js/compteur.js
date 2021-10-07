const compteurArticlesPanier = document.querySelector(".nombre_total_articles");

const produitLocalStorage = localStorage.getItem("products");
const dataProduitLocalStorage = JSON.parse(produitLocalStorage);

compteurArticlesPanier.innerHTML = "(" + dataProduitLocalStorage.length + ")";
