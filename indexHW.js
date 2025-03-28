import { fetchCom } from "./modulesHW/api.js";
import { updateCom } from "./modulesHW/comments.js";
import { renderCom } from "./modulesHW/renderCom.js";

/* document.querySelector(".comments").innerHTML = ""; */

export const fetchAndRenderCom = (isFirstLoading) => {
  if (isFirstLoading) {
    document.querySelector(
      ".container"
    ).innerHTML = `<p>Загружаю комментарий...</p>`;
  }

  fetchCom().then((data) => {
    updateCom(data);
    renderCom();
  });
};

fetchAndRenderCom(true);
