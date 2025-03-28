const host = " https://wedev-api.sky.pro/api/v2/danil-bersenev";
const authHost = "https://wedev-api.sky.pro/api/user";

export let token = "";

export const setToken = (newToken) => {
  token = newToken;
};

export let name = "";

export const setName = (newName) => {
  name = newName;
};

export const fetchCom = () => {
  return fetch(host + "/comments")
    .then((res) => {
      return res.json();
    })
    .then((responseData) => {
      const appComments = responseData.comments.map((comment) => {
        return {
          name: comment.author.name,
          date: new Date(comment.date),
          text: comment.text,
          likes: comment.likes,
          isLiked: false,
        };
      });

      return appComments;
    });
};

export const postCom = (text, name) => {
  return fetch(host + "/comments", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({
      text,
      name,
    }),
  })
    .then((response) => {
      if (response.status === 500) {
        throw new Error("Ошибка сервера");
      }

      if (response.status === 400) {
        throw new Error("Неверный запрос");
      }

      if (response.status === 200) {
        return response.json();
      }
    })
    .then(() => {
      return fetchCom();
    });
};

export const login = (login, password) => {
  return fetch(authHost + "/login", {
    method: "POST",
    body: JSON.stringify({ login: login, password: password }),
  });
};

export const registration = (name, login, password) => {
  return fetch(authHost, {
    method: "POST",
    body: JSON.stringify({ name: name, login: login, password: password }),
  });
};
