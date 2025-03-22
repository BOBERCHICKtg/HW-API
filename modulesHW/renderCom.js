import { comment } from "./comments.js";
import { likeListeners, replyListeners } from "./listeners.js";

export const renderCom = () => {
  const list = document.querySelector(".comments");

  if (Array.isArray(comment)) {
    list.innerHTML = comment
      .map((comment, index) => {
        return `
     <li id="commentBox" data-index="${index}" class="comment">
         <div class="comment-header">
             <div>${comment.author.name}</div>
             <div>${comment.date}</div>
         </div>
         <div class="comment-body">
             <div class="comment-text">
                 ${comment.text}
             </div>
         </div>
         <div class="comment-footer">
             <div class="likes">
                 <span class="likes-counter">${comment.likes}</span>
                 <button data-index='${index}' class="like-button ${
          comment.isLiked ? "-active-like" : ""
        }"></button>
             </div>
         </div>
     </li>
     `;
      })
      .join("");

    // Проверяем, что функции существуют перед вызовом
    if (likeListeners) {
      likeListeners(renderCom);
    }
    if (replyListeners) {
      replyListeners();
    }
  } else {
    console.error("Комментарии не определены или не являются массивом");
  }
};
