const compteurArticlesPanier = document.querySelector(".nombre_total_articles");

const produitLocalStorage = localStorage.getItem("products");
const dataProduitLocalStorage = JSON.parse(produitLocalStorage);


//Function pour vérifier s'il ya des produits dans le panier
function verifierPanier() {
    if(dataProduitLocalStorage === null || dataProduitLocalStorage == 0) {
        console.log("panier vide = true");
        return false;
    } else {
        console.log("panier vide = false");
        return true;
    };
}

//Montre le nombre d'articles dans le panier dans le menu "panier"
if(verifierPanier() == true) {
    compteurArticlesPanier.innerHTML = "(" + dataProduitLocalStorage.length + ")";
} else {
    compteurArticlesPanier.innerHTML = "(0)"; //Si le panier est vide affiche 0
};

