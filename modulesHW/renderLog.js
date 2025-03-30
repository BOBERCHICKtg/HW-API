import { fetchAndRenderCom } from "../indexHW.js";
import { login, setName, setToken } from "./api.js";
import { renderReg } from "./renderReg.js";

export const renderLog = () => {
  const container = document.querySelector(".container");

  const logHtml = `
      <section class="add-form">
    <h1>Форма входа</h1>
    <input
      type="text"
      class="add-form-name"
      placeholder="Введите логин"
      id="login"
      required
    />
    <input
      type="text"
      class="add-form-name"
      placeholder="Введите пароль"
      id="password"
      required
    />
    <fieldset class="add-form-registry">
      <button class="add-form-button-main button-main" type="submit">
        Войти
      </button>
      <u class="add-form-button-link registry">Зарегистрироваться</u>
    </fieldset>
  </section>
  `;

  container.innerHTML = logHtml;
  document.querySelector('.registry').addEventListener('click', () => {
    renderReg()
  })
  const loginEl = document.querySelector("#login");
  const passwordEl = document.querySelector("#password");
  const sumbitButtonEl = document.querySelector(".button-main");

  sumbitButtonEl.addEventListener("click", () => {
    login(loginEl.value, passwordEl.value)
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        setToken(data.user.token);
        setName(data.user.name);
        fetchAndRenderCom();
      });
  });
};
