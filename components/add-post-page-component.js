import { renderHeaderComponent } from "./header-component.js";
import { renderUploadImageComponent } from "./upload-image-component.js";
import { onAddPostClick } from "../api.js";
import { getToken, goToPage } from "../index.js";
import { POSTS_PAGE } from "../routes.js";
import { isUploadImage } from "./header-component.js";

let imageUrl = "";

export function renderAddPostPageComponent({ appEl }) {
  const render = () => {
    // TODO: Реализовать страницу добавления поста
    const appHtml = `
    <div class="page-container">
      <div class="header-container"></div>
      <div class="form">
        <h3 class="form-title">Добавить пост</h3>
        <div class="form-inputs">
          <div class="upload-image-container">
</div>
          <label>
            Опишите фотографию:
            <textarea class="input textarea" rows="4"></textarea>
            </label>
            <button class="button" id="add-button">Добавить</button>
        </div>
  `;

    appEl.innerHTML = appHtml;

    renderHeaderComponent({
      element: document.querySelector(".header-container"),
    });

    const uploadImageContainer = appEl.querySelector(".upload-image-container");

    if (uploadImageContainer) {
      renderUploadImageComponent({
        element: appEl.querySelector(".upload-image-container"),
        onImageUrlChange(newImageUrl) {
          imageUrl = newImageUrl;
        },
      });
    }

    document.getElementById("add-button").addEventListener("click", () => {
      const description = document.querySelector(".input.textarea").value;

      if (isUploadImage) {
        if (navigator.onLine) {
          onAddPostClick({
            description,
            imageUrl,
            token: getToken(),
          }).then(() => {
            goToPage(POSTS_PAGE);
          });
        } else {
          alert("Отсутствует подключение к интернету.");
        }
      } else {
        alert('Загрузите фотографию!');
      }
    });
  };

  render();
}
