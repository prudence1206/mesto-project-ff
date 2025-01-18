const config = {
    baseUrl: 'https://nomoreparties.co/v1/cohort-mag-4',
    headers: {
        authorization: '20cc3fa3-110b-404f-bb05-b443e190c079',
        'Content-Type': 'application/json'
    }
}

const checkResponse = (res) => {
    if (res.ok) {
        return res.json();
    }
    return Promise.reject(`Что-то пошло не так: ${res.status}`)
};

export const getInitialCardsAPI = () => {
    return fetch(`${config.baseUrl}/cards`, {
        method: 'GET',
        headers: config.headers,
      })
      .then(res => checkResponse(res))
};

export function getUserInfoAPI() {
    return fetch(`${config.baseUrl}/users/me`, {
        method: 'GET',
        headers: config.headers,
      })
      .then(res => checkResponse(res))
}

export function setUserInfoAPI(name, description) {
    return fetch(`${config.baseUrl}/users/me`, {
        method: 'PATCH',
        headers: config.headers,
        body: JSON.stringify({
            name: name,
            about: description,
        }),
    })
    .then(res => checkResponse(res))
}

export function addNewCardAPI(newCard) {
    return fetch(`${config.baseUrl}/cards`, {
        method: 'POST',
        headers: config.headers,
        body: JSON.stringify({
            name: newCard.name,
            link: newCard.link,
        }),
    })
    .then(res => checkResponse(res))
}

export function putCardLikeAPI(cardID) {
    return fetch(`${config.baseUrl}/cards/${cardID}/likes`, {
        method: 'PUT',
        headers: config.headers,
    })
    .then(res => checkResponse(res))
}

export function deleteCardLikeAPI(cardID) {
    return fetch(`${config.baseUrl}/cards/${cardID}/likes`, {
        method: 'DELETE',
        headers: config.headers,
    })
    .then(res => checkResponse(res));
}

export function deleteCardAPI(cardID) {
    return fetch(`${config.baseUrl}/cards/${cardID}`, {
        method: 'DELETE',
        headers: config.headers,
    })
    .then(res => checkResponse(res))
}

export function setAvatarAPI(avatar) {
    return fetch(`${config.baseUrl}/users/me/avatar`, {
        method: 'PATCH',
        headers: config.headers,
        body: JSON.stringify({
            avatar: avatar,
        }),
    })
    .then(res => checkResponse(res))
}
