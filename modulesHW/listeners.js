import { comment } from './comments.js'
import { sanitize } from './sanitizeHW.js'

export const likeListeners = (renderCom) => {
    const likeBtns = document.querySelectorAll('.like-button')

    for (const likeBtn of likeBtns) {
        likeBtn.addEventListener('click', (event) => {
            event.stopPropagation()
            const index = likeBtn.dataset.index
            const comment = comment[index]

            comment.likes = comment.isLiked
                ? comment.likes - 1
                : comment.likes + 1

            comment.isLiked = !comment.isLiked

            renderCom()
        })
    }
}

export const replyListeners = () => {
    const text = document.getElementById('comment')
    const commentsEl = document.querySelectorAll('.comment')

    for (const commentEl of commentsEl) {
        commentEl.addEventListener('click', () => {
            const currentComment = comments[commentEl.dataset.index]
            text.value = `${currentComment.name}: ${currentComment.text}`
        })
    }
}

export const addCommentListener = (renderCom) => {
    const buttonEl = document.querySelector('.add-form-button')
    const name = document.getElementById('name')
    const text = document.getElementById('comment')

    buttonEl.addEventListener('click', () => {
        if (name.value === '' || text.value === '') {
            document.getElementById('name').placeholder =
                'Это обязательное поле!!!'
            document.getElementById('comment').placeholder =
                'Это обязательное поле!!!'
        } else {
            const newComment = {
                name: sanitize(name.value),
                date: new Date(),
                text: sanitize(text.value),
                likes: 0,
                isLiked: false,
            }

            comments.push(newComment)

            renderCom()

            name.value = ''
            text.value = ''
        }
    })
}
