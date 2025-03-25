import { comments } from "./comments.js";
import { likeListeners, replyListeners } from "./listeners.js";

export const renderCom = () => {
  const list = document.querySelector(".comments");

  list.innerHTML = comments
    .map((comment, index) => {
      return `
     <li id="commentBox" data-index="${index}" class="comment">
         <div class="comment-header">
             <div>${comment.name}</div>
             <div>${new Date(comment.date).toLocaleDateString()}</div>
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

  likeListeners(renderCom);
  replyListeners();
};
