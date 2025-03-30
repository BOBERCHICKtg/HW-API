import { postCom } from "./api.js";
import { comments, updateCom } from "./comments.js";
import { renderCom } from "./renderCom.js";
import { sanitize } from "./sanitizeHW.js";

export const likeListeners = (renderCom) => {
  const likeBtns = document.querySelectorAll(".like-button");

  for (const likeBtn of likeBtns) {
    likeBtn.addEventListener("click", (event) => {
      event.stopPropagation();
      const index = likeBtn.dataset.index;

      const currentComment = comments[index];

      currentComment.likes = currentComment.isLiked
        ? currentComment.likes - 1
        : currentComment.likes + 1;

      currentComment.isLiked = !currentComment.isLiked;

      renderCom();
    });
  }
};

export const replyListeners = () => {
  const text = document.getElementById("comment");
  const commentsEl = document.querySelectorAll(".comment");

  for (const commentEl of commentsEl) {
    commentEl.addEventListener("click", () => {
      const currentComment = comments[commentEl.dataset.index];
      text.value = `${currentComment.name}: ${currentComment.text}`;
    });
  }
};

export const addCommentListener = (renderCom) => {
  const buttonEl = document.querySelector(".add-form-button");
  const name = document.getElementById("name");
  const text = document.getElementById("comment");

  if (buttonEl && name && text) {
    buttonEl.addEventListener("click", () => {
      const trimmedName = name.value.trim();
      const trimmedText = text.value.trim();

      if (trimmedName === "" || trimmedText === "") {
        document.getElementById("name").placeholder =
          "Это обязательное поле!!!";
        document.getElementById("comment").placeholder =
          "Это обязательное поле!!!";
        return;
      }

      document.querySelector(".loading-com").style.display = "block";
      document.querySelector(".add-form").style.display = "none";

      postCom(sanitize(text.value), sanitize(name.value))
        .then((data) => {
          document.querySelector(".loading-com").style.display = "none";
          document.querySelector(".add-form").style.display = "flex";

          updateCom(data);
          renderCom();
          name.value = "";
          text.value = "";
        })
        .catch((error) => {
          document.querySelector(".loading-com").style.display = "none";
          document.querySelector(".add-form").style.display = "flex";

          if (error.message === "Неверный запрос") {
            alert("Имя и комментарий дожны быть не короче 3-х символов");
          }

          if (error.message === "Failed to fetch") {
            alert("Проверьте подключеник");
          }
        });
    });
  }
};
