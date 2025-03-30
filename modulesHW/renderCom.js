import { comments } from "./comments.js";
import {
  addCommentListener,
  likeListeners,
  replyListeners,
} from "./listeners.js";
import { renderLog } from "./renderLog.js";
import { name, token } from "./api.js";

export const renderCom = () => {
  const container = document.querySelector(".container");

  const commentsHtml = comments
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

  const addCommentsHtml = `
      <div class="add-form">
        <input
          id="name"
          type="text"
          class="add-form-name"
          placeholder="Введите ваше имя"
          readonly
          value="${name}"
        />
        <textarea
          id="comment"
          type="textarea"
          class="add-form-text"
          placeholder="Введите ваш коментарий"
          rows="4"
        ></textarea>
        <div class="add-form-row">
          <button id="button" class="add-form-button">Написать</button>
        </div>
      </div>
      <div class="loading-com" style="display: none; margin-top: 20px">
        Добавляю комментарий
      </div>
    `;

  const loginText = `<p>чтобы отправить комментарий, <span class='link-login'>войдите</span></p>`;

  const baseHtml = `<ul class='comments'>${commentsHtml}</ul>
    ${token ? addCommentsHtml : loginText}
  `;

  container.innerHTML = baseHtml;

  if (token) {
    likeListeners(renderCom);
    replyListeners();
    addCommentListener(renderCom);
  } else {
    document.querySelector(".link-login").addEventListener("click", () => {
      renderLog();
    });
  }
};
