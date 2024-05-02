import { getToken, renderApp } from "./index.js";
import { likesApi } from "./api.js";
//import { format } from "date-fns";

export function saveUserToLocalStorage(user) {
  window.localStorage.setItem("user", JSON.stringify(user));
}

export function getUserFromLocalStorage(user) {
  try {
    return JSON.parse(window.localStorage.getItem("user"));
  } catch (error) {
    return null;
  }
}

export function saveCodeOnError(anything = "") {
    return anything.replaceAll("<", "&lt;").replaceAll(">", "&gt;");
  }

export function removeUserFromLocalStorage(user) {
  window.localStorage.removeItem("user");
}
// export const createDate = (element) => {
//     return format(new Date(element), 'yyyy-MM-dd hh.mm.ss');
// }
export const dataFormat = (commentDate) => {
  const dateComment = new Date(commentDate);
  const formatDate =
    dateComment.getDate().toString().padStart(2, "0") +
    "." +
    (dateComment.getMonth() + 1).toString().padStart(2, "0") +
    "." +
    dateComment.getFullYear().toString().slice(-2) +
    " " +
    dateComment.getHours().toString().padStart(2, "0") +
    ":" +
    dateComment.getMinutes().toString().padStart(2, "0");
  return formatDate;
};

export function userLike(arr) {
  const token = getToken();
  const likeButton = document.querySelectorAll(".like-button");

  for (const element of likeButton) {
    element.addEventListener("click", () => {
      if (token) {
        element.classList.add("loadLikes");
        const index = element.dataset.index;
        return likesApi({
          likeId: element.dataset.postId,
          token: getToken(),
          activityLike: arr[index].isLiked,
        }).then((newPost) => {
          arr[index] = newPost;
          renderApp();
        });
      } else {
        alert("Ставить лайки могут только автоизированные пользователи");
      }
    });
  }
}
