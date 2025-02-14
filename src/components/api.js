const PATH = 'https://nomoreparties.co/v1/cohort-mag-4';
const TOKEN = '3b65291a-52e2-4249-830d-12a46e6d06bd';

const handleResponse = (res) => {
  if (res.ok) {
    return res.json();
  };
  return Promise.reject(`Ошибка: ${res.status}`)
}

export const getUserInfo = () => {
  return fetch(`${PATH}/users/me`, {
    method: 'GET',
    headers: {
      authorization: TOKEN
    }
  })
    .then(handleResponse);
}

export const getAllCards = () => {
  return fetch(`${PATH}/cards`, {
    method: 'GET',
    headers: {
      authorization: TOKEN
    }
  })
    .then(handleResponse);
}

export const editUserInfo = (name, about) => {
  return fetch(`${PATH}/users/me`, {
    method: 'PATCH',
    headers: {
      authorization: TOKEN,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      name,
      about,
    })
  })
    .then(handleResponse);
}

export const createNewCard = (name, link) => {
  return fetch(`${PATH}/cards`, {
    method: 'POST',
    headers: {
      authorization: TOKEN,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      name,
      link,
    })
  })
    .then(handleResponse);
}

export const removeCard = (idCard) => {
  return fetch(`${PATH}/cards/${idCard}`, {
    method: 'DELETE',
    headers: {
      authorization: TOKEN
    }
  })
    .then(handleResponse);
}

export const likeCardDev = (idCard) => {
  return fetch(`${PATH}/cards/likes/${idCard}`, {
    method: 'PUT',
    headers: {
      authorization: TOKEN
    }
  })
    .then(handleResponse);
}

export const likeCardDevDel = (idCard) => {
  return fetch(`${PATH}/cards/likes/${idCard}`, {
    method: 'DELETE',
    headers: {
      authorization: TOKEN
    }
  })
    .then(handleResponse);
}

export const changeAvatar = (avatar) => {
  return fetch(`${PATH}/users/me/avatar`, {
    method: 'PATCH',
    headers: {
      authorization: TOKEN,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      avatar,
    })

  })
    .then(handleResponse)
}
