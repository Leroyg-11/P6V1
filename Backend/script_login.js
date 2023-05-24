const form = document.querySelector(".container_log");
const errorHtml = document.querySelector(".form_error");

const errorForm = "Email ou mot de passe incorrect";
// const url = await fetch("http://localhost:5678/api/users/login")

async function postUser(form_mail, form_password) {
  const body = {
    email: form_mail,
    password: form_password,
  };
  const url = "http://localhost:5678/api/users/login";

  const fetchHandler = async () => {
    try {
      const response = await fetch(url, {
        method: "POST",
        body: JSON.stringify(body),
        headers: {
          "Content-Type": "application/json;charset=utf-8",
        },
      });
      const dataResponse = await response.json();
      tokenAuth(dataResponse.userId, dataResponse.token, response.status);
      console.log(dataResponse);
    } catch (error) {
      console.log(error);
    }
  };

  await fetchHandler();
  await checkLocal();
}

async function handleSubmit(event) {
  event.preventDefault();

  const form_mail = event.target[0].value;
  const form_password = event.target[1].value;

  if (!form_password || !form_mail) {
    errorHtml.innerHTML = "Veuillez entrer un mot de passe valide";
    return;
  }
  await postUser(form_mail, form_password);
}

function tokenAuth(userId, token, status) {
  localStorage.setItem("token", (token));
    localStorage.setItem("userId", (userId));
  localStorage.setItem("status", (status));
}

async function checkLocal() {
  const localToken = await localStorage.getItem("token");
  console.log(localToken);

  if (localToken === "undefined") {
    errorHtml.innerHTML = errorForm;
  } else {
    document.location = "index.html";
  }
}

form.addEventListener("submit", handleSubmit);
