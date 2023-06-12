import { getDataWorks, getDataCategory } from "./api.js";

const dataWorks = await getDataWorks();

const dataCategory = await getDataCategory();








async function checkLocal() {
  const modifyContainer = document.querySelectorAll(".icons_modify");
    
    function changeStyle(){
      modifyContainer.forEach(function (modif) {
        modif.classList.replace("inactive", "active")
        modif.style.cursor = "pointer"
        
      })
    }

    const login = await document.querySelector(".login");
    const navUl = document.querySelector(".nav_ul");
    const logout = await document.createElement("li");

    
    logout.textContent = "logout";
    const imgLi = await document.querySelector(".imgLi");
    const account = await document.querySelector(".account");

    navUl.insertBefore(logout, imgLi);
    navUl.appendChild(logout);
    logout.classList.add("inactive");

    logout.classList.add("btn_logout");
    const localStatus = localStorage.getItem("status");

    if (localStatus === "200") {
        // code 200
        logout.classList.remove("inactive");
        logout.classList.add("visible");
        login.classList.add("inactive");
        changeStyle()
        account.classList.remove("account");
        account.classList.add("connected");
    } else {
        // code error
        login.classList.add("visible");
    }
      logout.addEventListener("click", function () {
        localStorage.clear();
        location.reload();
    
    });


    const modalContainer = document.querySelector(".modal_container");
    const modalTriggers = document.querySelectorAll(".modal_trigger");
    const modalOne = document.querySelector(".modal_one");
    const closeUpdateModal = document.querySelectorAll(".close_update_modal")

    closeUpdateModal.forEach((closeUp) => closeUp.addEventListener("click", toggleUpdateModal));

    function toggleUpdateModal(){
        const modalUpdate = document.querySelector(".modal_update");
        const modalOne = document.querySelector(".modal_one");

        modalUpdate.classList.toggle("inactive")
        modalOne.classList.toggle("inactive")

    } ; 

    modalTriggers.forEach((trigger) => trigger.addEventListener("click", toggleModal));


    function toggleModal() {
        const modalUpdate = document.querySelector(".modal_update");
        const btnAdd = document.querySelector(".add_work");

        modalContainer.classList.toggle("active");
        modalOne.classList.remove("inactive");

        
        btnAdd.addEventListener("click", function(){
            modalOne.classList.remove("active");
            modalOne.classList.add("inactive");
            modalUpdate.classList.remove("inactive");
            modalUpdate.classList.add("active");
        })
    }
};
checkLocal();

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

// Generate Category option 

const select = document.querySelector("#category")

dataCategory.forEach(category => {
  select.innerHTML += `<option categoryId="${category.id}" value="${category.id}">${category.name}</option>`   
})

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

function tryPreview() {
  window.previewImage = (event) => {
    
    const imageFiles = event.target.files;
    
    const imageFilesLength = imageFiles.length;
    
    const hiddenBtn = document.querySelectorAll(".hidden");

    const picElements = document.querySelectorAll(".pic");

    picElements.forEach(elements => {
      elements.classList.add("inactive")
      elements.classList.remove("active")
    })
    if (imageFilesLength > 0) {
      hiddenBtn.forEach(elements => {
        
        elements.classList.add("inactive")
      })  
        const imageSrc = URL.createObjectURL(imageFiles[0]);

        const imagePreviewElement = document.querySelector("#preview-selected-image");
     
        imagePreviewElement.src = imageSrc;
      
        imagePreviewElement.classList.add("active");
        
    }
 
  };
  

}
tryPreview()


////////////////////////////////////////////////////////////////////////////////////////////////////////////////////


async function initModal() {
  const dataWorks = await getDataWorks();
  
  function modalDataWork(dataWorks) {
  for (let i = 0; i < dataWorks.length; i++) {
    const modalFigure = dataWorks[i];

    const sectionModalGallery = document.querySelector(".modal_gallery");
    const workModalElement = document.createElement("modal_figure");
    workModalElement.classList.add("modal_card");
    workModalElement.setAttribute('id', `${dataWorks[i].id}`)
    const imageModalElement = document.createElement("img");

    imageModalElement.src = modalFigure.imageUrl;
    const editModalElement = document.createElement("p");
    editModalElement.innerText = "éditer";

    const iconeModal = document.createElement("div");
    iconeModal.classList.add("icone_modal");
    iconeModal.innerHTML = `<i class="fa-solid fa-trash-can"></i>`;
    iconeModal.setAttribute('id', `${dataWorks[i].id}`)

    // <i class="fa-solid fa-arrows-up-down-left-right"></i> MULTIFLECHES

    sectionModalGallery.appendChild(workModalElement);
    workModalElement.appendChild(imageModalElement);
    workModalElement.appendChild(editModalElement);
    workModalElement.appendChild(iconeModal);
  }
  }
  modalDataWork(dataWorks);

  function modalDataWorkRefresh(dataWorks) {
    const sectionModalGallery = document.querySelector(".modal_gallery");
    // Supprimer tous les projets existants
    while (sectionModalGallery.firstChild) {
      sectionModalGallery.removeChild(sectionModalGallery.firstChild);
    }
    dataWorks = dataWorks || getDataWorks();

    for (let i = 0; i < dataWorks.length; i++) {
      const modalFigure = dataWorks[i];
  
      const workModalElement = document.createElement("modal_figure");
      workModalElement.classList.add("modal_card");
      workModalElement.setAttribute('id', `${dataWorks[i].id}`)
      const imageModalElement = document.createElement("img");
  
      imageModalElement.src = modalFigure.imageUrl;
      const editModalElement = document.createElement("p");
      editModalElement.innerText = "éditer";
  
      const iconeModal = document.createElement("div");
      iconeModal.classList.add("icone_modal");
      iconeModal.innerHTML = `<i class="fa-solid fa-trash-can"></i>`;
      iconeModal.setAttribute('id', `${dataWorks[i].id}`)
  
      sectionModalGallery.appendChild(workModalElement);
      workModalElement.appendChild(imageModalElement);
      workModalElement.appendChild(editModalElement);
      workModalElement.appendChild(iconeModal);
    }
  }

  function generateGalleryDataWorks(dataWorks) {
    const sectionGallery = document.querySelector(".gallery");
  
    while (sectionGallery.firstChild) {
      sectionGallery.removeChild(sectionGallery.firstChild);
    }
    dataWorks = dataWorks || getDataWorks();
  
  
    for (let i = 0; i < dataWorks.length; i++) {
      const figure = dataWorks[i];
  
  
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

  generateGalleryDataWorks(dataWorks);

  const trashIcone = document.querySelectorAll(".icone_modal")

  trashIcone.forEach((trashI) => trashI.addEventListener("click", trashCard));

  async function trashCard(){
    const modalFigureId = this.getAttribute('id'); // Récupère l'ID de la modal figure
    const id = modalFigureId;
    const localToken = await localStorage.getItem("token");

    try {
      const response = await fetch(`http://localhost:5678/api/works/${id}`, {
      method: 'DELETE',
      headers: {
      Authorization: `Bearer ${localToken}`, 
      "Content-Type": "application/json;charset=utf-8",
      }
        });
        const newDataWork = await getDataWorks()
        const modalFigureElement = document.getElementById(modalFigureId);
        modalFigureElement.remove();
        generateGalleryDataWorks(newDataWork)
    }
    catch(error) {
      console.log(error)
    }
  }







  const form = document.querySelector("#add_work_form");




  form.addEventListener('submit', async (e) => {
    
      e.preventDefault();
      const localToken = await localStorage.getItem("token");
      const htmlForm = e.currentTarget;
      const formData = new FormData(htmlForm);
      const modalOne = document.querySelector(".modal_one");
      const modalUpdate = document.querySelector(".modal_update");
      const modalContainer = document.querySelector(".modal_container")

      // const resetInputImg = document.getElementById("#preview-selected-image") 

      const createNewPost = async () => {
          try {
              const response =  await fetch("http://localhost:5678/api/works", {
              method: "POST",
              body: formData,
              headers: { Authorization: `Bearer ${localToken}`}
              })
              // const dataWorks = await getDataWorks();
              const newDataWork = await getDataWorks();
              modalDataWorkRefresh(newDataWork)
              
              modalOne.classList.replace("inactive", "active");
              modalUpdate.classList.replace("active", "inactive");
              

              const imagePreviewElement = document.querySelector("#preview-selected-image");
      
              imagePreviewElement.src = "";
              imagePreviewElement.classList.remove("active")

              const picElements = document.querySelectorAll(".pic");


              picElements.forEach(elements => {
                elements.classList.remove("hidden")
                elements.classList.remove("inactive")
                elements.classList.add("active")
              })
              tryPreview()

          }
          catch (error){
            console.log(error)
          }
          htmlForm.reset();
      }
      createNewPost()
  })

}
initModal();






////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////



