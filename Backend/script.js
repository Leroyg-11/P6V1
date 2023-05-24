import { getDataWorks, getDataCategory } from "./api.js";
// import coucou from './imprtgetGata'////////LOL//

const dataWorks = await getDataWorks();

const dataCategory = await getDataCategory();


function generateFilters(dataCategory) {
    for (let i = 0; i < dataCategory.length; i++) {
        const container = document.getElementById("filters");
        container.innerHTML += `<div selector="${dataCategory[i].id}" class="filter ${dataCategory[i].id} ${dataCategory[i].name}" id="${dataCategory[i].id}"> ${dataCategory[i].name} </div>`;
    }
}

generateFilters(dataCategory);


function generateDataWorks(dataWorks) {
    for (let i = 0; i < dataWorks.length; i++) {
      const figure = dataWorks[i];

      const sectionGallery = document.querySelector(".gallery");

      const workElement = document.createElement("figure");

      const imageElement = document.createElement("img");

      imageElement.src = figure.imageUrl;
      const nomElement = document.createElement("p");
      nomElement.innerText = figure.title;

      // On rattache la balise figure a la section gallery
      sectionGallery.appendChild(workElement);
      // On rattache l’image à workElement (la balise figure)
      workElement.appendChild(imageElement);
      workElement.appendChild(nomElement);
    }
}
generateDataWorks(dataWorks);


function generateGalleryFilter () {
    const btnAll = document.querySelector(".filter_All");
    // console.log(btnAll)
    const btnOne = document.querySelector('div[selector="1"]');
    // console.log(btnOne)
    const btnTwo = document.querySelector('div[selector="2"]');
    // console.log(btnTwo)
    const btnThree = document.querySelector('div[selector="3"]');
    // console.log(btnThree)
    
    btnAll.addEventListener("click", function () {
        const trier = dataWorks.filter(function (dataWork) {
            return dataWork;
        });
        document.querySelector("#gallery").innerHTML = "";
        generateDataWorks(trier);
    });
    
    btnOne.addEventListener("click", function () {
        const trier = dataWorks.filter(function (dataWork) {
            return dataWork.categoryId == 1;
        });
        document.querySelector("#gallery").innerHTML = "";
        generateDataWorks(trier);
    });
    
    btnTwo.addEventListener("click", function () {
        const trier = dataWorks.filter(function (dataWork) {
            return dataWork.categoryId == 2;
        });
        document.querySelector("#gallery").innerHTML = "";
        generateDataWorks(trier);
    });
    
    btnThree.addEventListener("click", function () {
        const trier = dataWorks.filter(function (dataWork) {
            return dataWork.categoryId == 3;
        });
        document.querySelector("#gallery").innerHTML = "";
        generateDataWorks(trier);
    });
}
generateGalleryFilter();


    
