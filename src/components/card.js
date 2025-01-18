import { cardTemplate } from "./config.js";
import { putCardLikeAPI, deleteCardLikeAPI, deleteCardAPI } from "./api.js";

export function deleteCard(cardElement, cardID) {
    deleteCardAPI(cardID)
    .then(() => {
        cardElement.remove();
    })
    .catch((err) => {
        console.error(`Ошибка при удалении карточки: ${err}`);
    });
}

export function likeCard(likeButton, cardID, likeCountElement) {
    const isLiked = likeButton.classList.contains('card__like-button_is-active');
    const toggleLike = isLiked ? deleteCardLikeAPI : putCardLikeAPI;

    toggleLike(cardID)
        .then((res) => {
            likeButton.classList.toggle('card__like-button_is-active');
            likeCountElement.textContent = res.likes.length;
        })
        .catch((err) => {
            console.error(`Ошибка при изменении лайка: ${err}`);
        });
}

export function createCard(card, user, handlers) {
    const cardElement = cardTemplate.querySelector('.card').cloneNode(true);
    const deleteButton = cardElement.querySelector('.card__delete-button');
    const likeButton = cardElement.querySelector('.card__like-button');
    const cardImage = cardElement.querySelector('.card__image');
    const cardTitle = cardElement.querySelector('.card__title'); 
    const likeCount = cardElement.querySelector('.card__like-count');
    const likes = card.likes;
    const owner = card.owner;
    cardImage.src = card.link;
    cardImage.alt = card.name;
    cardTitle.textContent = card.name;


    likeCount.textContent = likes.length;

    if (likes.some(like => like._id === user._id)) {
        likeButton.classList.add('card__like-button_is-active');
    }

    if (owner._id !== user._id) {
        deleteButton.remove();
    } else {
        deleteButton.addEventListener('click', function() {
            handlers.delete(cardElement, card._id);
        });
    }

    likeButton.addEventListener('click', function() {
        handlers.like(likeButton, card._id, likeCount);
    });

    cardImage.addEventListener('click', function() {
        handlers.open(card.link, card.name); 
    });
    return cardElement;
}

