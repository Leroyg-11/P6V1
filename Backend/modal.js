import { getDataWorks, getDataCategory } from "./api.js";

console.log("cocuou")


async function checkLocal() {
    const login = await document.querySelector(".login");
    const navUl = document.querySelector(".nav_ul");
    const logout = await document.createElement("li");


    // const modifyContainer = document.querySelectorAll(".icons_modify");
    // const modifyIcons = await document.createElement("p");
    // const test = "sdfsjdf"

    // modifyContainer.appendChild(modifyIcons)
    // modifyIcons.appendChild(test)
    

    // modifyContainer.forEach((modifyIcons) => {
    //     document.createElement("p").appendChild(modifyIcons); 
    //     item.className += "inactive"
    // })

    
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



    async function initModal() {
        const dataWorks = await getDataWorks();
    
        function genererModalDataWorks(dataWorks) {
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
    
    
            iconeModal.addEventListener("click", async function() {
                
                
                const modalFigureId = this.getAttribute('id'); // Récupère l'ID de la modal figure
                const id = modalFigureId;
                const localToken = await localStorage.getItem("token");
                // console.log(localToken)
              
              
              const response = await fetch(`http://localhost:5678/api/works/${id}`, {
                method: 'DELETE',
                headers: {
                  Authorization: `Bearer ${localToken}`, 
                  // ${localToken.replace(/['"]+/g, '')} ==> Supprime les quotes qui entoure le token et qui bloque l'authentification
                  "Content-Type": "application/json;charset=utf-8",
                }
              });
              
              if (response.status === "200") {
                // Suppression réussie
                
                const modalFigureElement = document.getElementById(modalFigureId);
                modalFigureElement.remove();
                

              } else if (response.status !== 200) {
                // Non autorisé
                console.log("Unauthorized");
              } else {
                // Erreur inattendue
                console.log("Unexpected Error");
              }
            });
            
    
          }
        }
        genererModalDataWorks(dataWorks);
    }
    
    initModal();

};

checkLocal();











const form = document.querySelector("#add_work_form");
const btn_submit = document.querySelector(".btn_submit")


form.addEventListener('submit', async (e) => {
    e.preventDefault();
    // const url = "http://localhost:5678/api/works";
    const localToken = localStorage.getItem("token");
    const htmlForm = e.currentTarget
    const formData = new FormData(htmlForm)

    const createNewPost = async () => {
        try {
            const response =  await fetch("http://localhost:5678/api/works", {
            method: "POST",
            body: formData,
            headers: { Authorization: `Bearer ${localToken}`}
            })

            

        }catch (error){
            console.log(error)
        }
    }
    e.preventDefault()
    await createNewPost()


})


    
    //TRY CATCH !!!!!! 


    



