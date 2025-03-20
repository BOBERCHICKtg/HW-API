import { renderCom } from "./modulesHW/renderCom.js";
import { updateCom } from "./modulesHW/comments.js";

export const fetchAndRenderCom = () => {
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
}