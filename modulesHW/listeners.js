import { comment } from "./comments.js";
import { sanitize } from "./sanitizeHW.js";

export const likeListeners = (renderCom) => {
  const likeBtns = document.querySelectorAll(".like-button");

  for (const likeBtn of likeBtns) {
    likeBtn.addEventListener("click", (event) => {
      event.stopPropagation();
      const index = likeBtn.dataset.index;

      // Проверка на существование комментария
      if (comment[index]) {
        const currentComment = comment[index];

        currentComment.likes = currentComment.isLiked
          ? currentComment.likes - 1
          : currentComment.likes + 1;

        currentComment.isLiked = !currentComment.isLiked;

        renderCom();
      }
    });
  }
};

export const replyListeners = () => {
  const text = document.getElementById("comment");
  const commentsEl = document.querySelectorAll(".comment");

  for (const commentEl of commentsEl) {
    commentEl.addEventListener("click", () => {
      const index = commentEl.dataset.index;

      if (comment[index]) {
        const currentComment = comment[index];
        text.value = `${currentComment.name}: ${currentComment.text}`;
      }
    });
  }
};

/* export const addCommentListener = (renderCom) => {
  const buttonEl = document.querySelector(".add-form-button");
  const name = document.getElementById("name");
  const text = document.getElementById("comment");

  if (buttonEl && name && text) {
    buttonEl.addEventListener("click", () => {
      if (name.value === "" || text.value === "") {
        document.getElementById("name").placeholder =
          "Это обязательное поле!!!";
        document.getElementById("comment").placeholder =
          "Это обязательное поле!!!";
      } else {
        const newComment = {
          name: sanitize(name.value),
          date: new Date(),
          text: sanitize(text.value),
          likes: 0,
          isLiked: false,
        };

        /*         comment.push(newComment); */

/*         renderCom(); */

/*  name.value = "";
        text.value = "";
      }
    });
  }
};
 */
