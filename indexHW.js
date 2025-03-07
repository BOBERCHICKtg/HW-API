import { updateCom } from "./modulesHW/comments.js";
import { addCommentListener } from "./modulesHW/listeners.js";
import { renderCom } from "./modulesHW/renderCom.js";

addCommentListener(renderCom);

fetch("https://wedev-api.sky.pro/api/v1/danil-bersenev/comments")
  .then((response) => {
    return response.json();
  })
  .then((data) => {
    updateCom(data.comments);
    renderCom();
  });
