import { fetchCom } from "./modulesHW/api.js";
import { updateCom } from "./modulesHW/comments.js";
import { addCommentListener } from "./modulesHW/listeners.js";
import { renderCom } from "./modulesHW/renderCom.js";

document.querySelector(".comments").innerHTML = "Загружаю комментарий...";

fetchCom().then(data => {
  updateCom(data)
  renderCom()
});

addCommentListener(renderCom);


