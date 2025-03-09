import { renderCom } from "./modulesHW/renderCom.js";
import { updateCom } from "./modulesHW/comments.js";
import { sanitize } from "./modulesHW/sanitizeHW.js";

fetch("https://wedev-api.sky.pro/api/v1/danil-bersenev/comments")
  .then((response) => {
    return response.json();
  })
  .then((data) => {
    updateCom(data.comments);
    renderCom();
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
      }

      const newComment = {
        name: sanitize(name.value),
        date: new Date(),
        text: sanitize(text.value),
        likes: 0,
        isLiked: false,
      };

      fetch("https://wedev-api.sky.pro/api/v1/danil-bersenev/comments", {
        method: "POST",
        body: JSON.stringify(newComment),
      })
        .then((response) => {
          return response.json();
        })
        .then((data) => {
          updateCom(data.comments);
          renderCom();
        });

      renderCom();

      name.value = "";
      text.value = "";
    });
  }
};

addCommentListener(renderCom);
