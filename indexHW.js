import { renderCom } from "./modulesHW/renderCom.js";
import { updateCom } from "./modulesHW/comments.js";
import { sanitize } from "./modulesHW/sanitizeHW.js";

fetch("https://wedev-api.sky.pro/api/v1/danil-bersenev/comments")
  .then((response) => response.json())
  .then((data) => {
    if (Array.isArray(data.comments)) {
      updateCom(data.comments);
      renderCom();
    } else {
      console.error("Неверный формат данных от сервера:", data);
    }
  });

export const addCommentListener = (renderCom) => {
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
        return;
      }

      const newComment = {
        name: sanitize(name.value),
        author: { "name": "Глеб Фокин" },
        date: new Date(),
        text: sanitize(text.value),
        likes: 0,
        isLiked: false,
      };

      buttonEl.disabled = true;
      buttonEl.textContent = "Комментарий отправляется...";

      fetch("https://wedev-api.sky.pro/api/v1/danil-bersenev/comments", {
        method: "POST",
        body: JSON.stringify(newComment),
      })
        .then((response) => {
          return fetch(
            "https://wedev-api.sky.pro/api/v1/danil-bersenev/comments"
          );
        })
        .then((response) => response.json())
        .then((data) => {
          fetch("https://wedev-api.sky.pro/api/v1/danil-bersenev/comments")
            .then((response) => response.json())
            .then((commentsData) => {
              if (Array.isArray(commentsData.comments)) {
                buttonEl.disabled = false;
                buttonEl.textContent = "Написать";

                updateCom(commentsData.comments);
                renderCom();
              }
            });
        })
        .catch((error) => {
          console.error("Ошибка при добавлении комментария:", error);
        });

      name.value = "";
      text.value = "";
    });
  }
};

addCommentListener(renderCom);
