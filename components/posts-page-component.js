import { POSTS_PAGE, USER_POSTS_PAGE } from "../routes.js";
import { renderHeaderComponent } from "./header-component.js";
import { posts, goToPage, getToken, userPosts } from "../index.js";

export function renderPostsPageComponent({ appEl }) {
  // TODO: реализовать рендер постов из api
  console.log("Актуальный список постов:", posts);

  /**
   * TODO: чтобы отформатировать дату создания поста в виде "19 минут назад"
   * можно использовать https://date-fns.org/v2.29.3/docs/formatDistanceToNow
   */
  const appHtml = `
              <div class="page-container">
                <div class="header-container"></div>
                <ul class="posts">
                ${getComments()}
                </ul>
              </div>`;

  appEl.innerHTML = appHtml;

  renderHeaderComponent({
    element: document.querySelector(".header-container"),
  });

  for (let userEl of document.querySelectorAll(".post-header")) {
    userEl.addEventListener("click", () => {
      goToPage(USER_POSTS_PAGE, {
        userId: userEl.dataset.userId,
      });
    });
  }
}

export function renderUserPostsPageComponent({ appEl, posts }) {
  try {
    const postsHtml = renderUserPosts(posts);
    appEl.innerHTML = postsHtml;
    renderHeaderComponent({
      element: document.querySelector(".header-container"),
    });
  
  } catch (err) {
    console.error("Ошибка при получении постов", err);
    alert("Ошибка при получении постов");
    goToPage(POSTS_PAGE);
  }
}

const renderUserPosts = (posts) => {
  const postsBase = posts
    .map(
      (comment) => `
    <li class="post">
    <div class="post-image-container">
      <img class="post-image" src="${comment.imageUrl}">
    </div>
    <div class="post-likes">
      <button data-post-id="${comment.id}" class="like-button">
        <img src="./assets/images/like-active.svg">
      </button>
      <p class="post-likes-text">
        Нравится: <strong>${likesInStorage(comment.likes)}</strong>
      </p>
    </div>
    <p class="post-text">
      <span class="user-name">${comment.user.name}</span>
      ${comment.description}
    </p>
    <p class="post-date">
      ${comment.createdAt}
    </p>
  </li>
  `
    )
    .join("");
  return `
              <div class="page-container">
                <div class="header-container"></div>
                <div class="posts-user-header">
                    <img src="${posts[0].user.imageUrl}" class="posts-user-header__user-image">
                    <p class="posts-user-header__user-name">${posts[0].user.name}</p>
                </div>
                <ul class="posts">
                ${postsBase}
                </ul>
              </div>`;
};

export const getComments = () => {
  return posts
    .map((comment) => {
      return `
                  <li class="post">
                    <div class="post-header" data-user-id="${comment.user.id}">
                        <img src="${
                          comment.user.imageUrl
                        }" class="post-header__user-image">
                        <p class="post-header__user-name">${
                          comment.user.name
                        }</p>
                    </div>
                    <div class="post-image-container">
                      <img class="post-image" src="${comment.imageUrl}">
                    </div>
                    <div class="post-likes">
                      <button data-post-id="${comment.id}" class="like-button">
                        <img src="./assets/images/like-active.svg">
                      </button>
                      <p class="post-likes-text">
                        Нравится: <strong>${likesInStorage(
                          comment.likes
                        )}</strong>
                      </p>
                    </div>
                    <p class="post-text">
                      <span class="user-name">${comment.user.name}</span>
                      ${comment.description}
                    </p>
                    <p class="post-date">
                      ${comment.createdAt}
                    </p>
                  </li>
      `;
    })
    .join("");
};

const likesInStorage = (element) => {
  return element.length > 0 ? likesMap(element) : 0;
};

const likesMap = (element) => {
  return element.length > 1
    ? `${element[0].name} и ещё ${element.length - 1}`
    : element[0].name;
};
