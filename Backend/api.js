async function getDataWorks() {
try {
    const response = await fetch("http://localhost:5678/api/works/");
    const dataWorks = await response.json();
    return dataWorks;
} catch (error) {
    console.log(error);
}
}
  
  
  
async function getDataCategory() {
try {
    const response = await fetch("http://localhost:5678/api/categories/");
    const dataCategory = await response.json();
    return dataCategory;
} catch (error) {
    console.log(error);
}
}

async function generateDataWorks(dataWorks) {
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




export { getDataCategory, getDataWorks }
export {generateDataWorks};