import { goToPage, logout, user } from "../index.js";
import { ADD_POSTS_PAGE, AUTH_PAGE, POSTS_PAGE } from "../routes.js";


export let isUploadImage;

export const setUploadImage = (status) => {
    isUploadImage = status;
}

export function renderHeaderComponent({ element }) {
  element.innerHTML = `
  <div class="page-header">
      <h1 class="logo">instapro</h1>
      <button class="header-button add-or-login-button">
      ${
        user
          ? `<div title="Добавить пост" class="add-post-sign"></div>`
          : "Войти"
      }
      </button>
      ${
        user
          ? `<button title="${user.name}" class="header-button logout-button">Выйти</button>`
          : ""
      }  
  </div>
  
`;

  element
    .querySelector(".add-or-login-button")
    .addEventListener("click", () => {
      if (user) {
        setUploadImage(false);
        goToPage(ADD_POSTS_PAGE);
      } else {
        goToPage(AUTH_PAGE);
      }
    });

  element.querySelector(".logo").addEventListener("click", () => {
    if (navigator.onLine) {
      goToPage(POSTS_PAGE);
    } else {
      alert("Отсутствует подключение к интернету");
    }
  });

  element.querySelector(".logout-button")?.addEventListener("click", logout);

  return element;
}
