import { getDataWorks, getDataCategory } from "./api.js";
// import coucou from './imprtgetGata'////////LOL//

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

    navUl.appendChild(logout);
    navUl.insertBefore(logout, imgLi);
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


window.previewImage = (event) => {
  /**
   * Get the selected files.
   */
  const imageFiles = event.target.files;
  /**
   * Count the number of files selected.
   */
  const imageFilesLength = imageFiles.length;
  /**
   * If at least one image is selected, then proceed to display the preview.
   */

  const hiddenBtn = document.querySelectorAll(".hidden");
  
  if (imageFilesLength > 0) {
    hiddenBtn.forEach(elements => {
      elements.classList.add("inactive")
    })  

      /**
       * Get the image path.
       */
      const imageSrc = URL.createObjectURL(imageFiles[0]);
      /**
       * Select the image preview element.
       */
      const imagePreviewElement = document.querySelector("#preview-selected-image");
      /**
       * Assign the path to the image preview element.
       */
      imagePreviewElement.src = imageSrc;
      /**
       * Show the element by changing the display value to "block".
       */
      imagePreviewElement.classList.add("active");
      
      
  }
};

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////


async function initModal() {
  const dataWorks = await getDataWorks();
  
  function modalDataWorkRefresh(dataWorks) {
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
  modalDataWorkRefresh(dataWorks);


  const trashIcone = document.querySelectorAll(".icone_modal")

  trashIcone.forEach((trashI) => trashI.addEventListener("click", trashCard));

    async function trashCard(){
      const modalFigureId = this.getAttribute('id'); // Récupère l'ID de la modal figure
      const id = modalFigureId;
      const localToken = await localStorage.getItem("token");

      const response = await fetch(`http://localhost:5678/api/works/${id}`, {
    method: 'DELETE',
    headers: {
      Authorization: `Bearer ${localToken}`, 
      
      "Content-Type": "application/json;charset=utf-8",
    }
  });

  if (response.status === "200" || "204") {
    // Suppression réussie
    
    const modalFigureElement = document.getElementById(modalFigureId);
    modalFigureElement.remove();
    modalDataWorkRefresh();
    

    

  } else if (response.status !== "200" || "204") {
    console.log("Unauthorized");
  } else {
    // Erreur inattendue
    console.log("Unexpected Error");
  }

      

  } ; 

  

}

initModal();








// async function initModal() {
//   const dataWorks = await getDataWorks();

//   function genererModalDataWorks(dataWorks) {
//     for (let i = 0; i < dataWorks.length; i++) {
//       const modalFigure = dataWorks[i];

//       const sectionModalGallery = document.querySelector(".modal_gallery");
//       const workModalElement = document.createElement("modal_figure");
//       workModalElement.classList.add("modal_card");
//       workModalElement.setAttribute('id', `${dataWorks[i].id}`)
//       const imageModalElement = document.createElement("img");

//       imageModalElement.src = modalFigure.imageUrl;
//       const editModalElement = document.createElement("p");
//       editModalElement.innerText = "éditer";

//       const iconeModal = document.createElement("div");
//       iconeModal.classList.add("icone_modal");
//       iconeModal.innerHTML = `<i class="fa-solid fa-trash-can"></i>`;
//       iconeModal.setAttribute('id', `${dataWorks[i].id}`)

//       // <i class="fa-solid fa-arrows-up-down-left-right"></i> MULTIFLECHES

//       sectionModalGallery.appendChild(workModalElement);
//       workModalElement.appendChild(imageModalElement);
//       workModalElement.appendChild(editModalElement);
//       workModalElement.appendChild(iconeModal);


//       iconeModal.addEventListener("click", async function() {
          
          
//           const modalFigureId = this.getAttribute('id'); // Récupère l'ID de la modal figure
//           const id = modalFigureId;
//           const localToken = await localStorage.getItem("token");
//           // console.log(localToken)
        
        
//         const response = await fetch(`http://localhost:5678/api/works/${id}`, {
//           method: 'DELETE',
//           headers: {
//             Authorization: `Bearer ${localToken}`, 
//             // ${localToken.replace(/['"]+/g, '')} ==> Supprime les quotes qui entoure le token et qui bloque l'authentification
//             "Content-Type": "application/json;charset=utf-8",
//           }
//         });
        
//         if (response.status === "200") {
//           // Suppression réussie
          
//           const modalFigureElement = document.getElementById(modalFigureId);
//           modalFigureElement.remove();
//           modalFigure.classList.add("inactive")

          

//         } else if (response.status !== 200) {
//           console.log("Unauthorized");
//         } else {
//           // Erreur inattendue
//           console.log("Unexpected Error");
//         }
//       });

      

//     }
//   }
//   genererModalDataWorks(dataWorks);
// }
























const form = document.querySelector("#add_work_form");


form.addEventListener('submit', async (e) => {
    e.preventDefault();
    // const url = "http://localhost:5678/api/works";
    const localToken = localStorage.getItem("token");
    const htmlForm = e.currentTarget;
    const formData = new FormData(htmlForm);

    const createNewPost = async () => {
      
      

      // function required(){
      //   const form_img = e.target[0].value;
      //   const form_title = e.target[1].value;
      //   const form_category = e.target[2].value;
      //   if(form_img || form_title || form_category == ""){
          
      //     alert("heyyyyyyyyyyy stopppp")

      //     return;

      //   }else{
      //     alert("c'est OKKKKKK")
      //   }
      // }




        try {
          

            const response =  await fetch("http://localhost:5678/api/works", {
            method: "POST",
            body: formData,
            headers: { Authorization: `Bearer ${localToken}`}
            })
            // required();

            

            

          

            

        }catch (error){
          console.log(error)

        }
    }
    
    await createNewPost()


})


    
    //TRY CATCH !!!!!! 


    



