import { uploadImage } from "../api.js";

export function renderUploadImageComponent({ element, onImageUrlChange }) {
  let imageUrl = "";

  const render = () => {
    element.innerHTML = `
  <div class="upload=image">
      ${
        imageUrl
          ? `
          <div class="file-upload-image-conrainer">
            <img class="file-upload-image" src="${imageUrl}">
            <button class="file-upload-remove-button button">Заменить фото</button>
          </div>
          `
          : `
            <label class="file-upload-label secondary-button">
                <input
                  type="file"
                  class="file-upload-input"
                  style="display:none"
                />
                Выберите фото
            </label>
          
      `
      }
  </div>
`;

    const fileInputElement = element.querySelector(".file-upload-input");

    fileInputElement?.addEventListener("change", () => {
      if (navigator.onLine) {
        const file = fileInputElement.files[0];
        if (file) {
          const lableEl = document.querySelector(".file-upload-label");
          lableEl.setAttribute("disabled", true);
          lableEl.textContent = "Загружаю файл...";
          uploadImage({ file }).then(({ fileUrl }) => {
            imageUrl = fileUrl;
            onImageUrlChange(imageUrl);
            render();
          });
        }
      } else {
        alert("Отсутствует подключение к интернету.");
      }
    });

    element
      .querySelector(".file-upload-remove-button")
      ?.addEventListener("click", () => {
        imageUrl = "";
        onImageUrlChange(imageUrl);
        render();
      });
  };

  render();
}
