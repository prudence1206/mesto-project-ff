import { likeCardDev, likeCardDevDel, removeCard } from '../components/api.js';

const cardTemplate = document.querySelector('#card-template').content;
const placeElement = cardTemplate.querySelector(".places__item");

// Функция создания карточки
export function createCard(cardParams, meId, deleteFunction, likeFunction, openImageFunction) {
  const cardElement = placeElement.cloneNode(true);
  const cardImage = cardElement.querySelector('.card__image');
  const likeButton = cardElement.querySelector('.card__like-button');
  const deleteButton = cardElement.querySelector('.card__delete-button');
  const cardTitle = cardElement.querySelector('.card__title');
  const likeCounter = cardElement.querySelector('.card__like-quantity');

  cardTitle.textContent = cardParams.name;
  cardImage.src = cardParams.link;
  cardImage.alt = cardParams.name;

  // Показываем кнопку удаления, если карточка пользователя
  if (cardParams.owner._id === meId) {
    deleteButton.classList.add('card__delete-button-visible');
  }

  // Лайки
  likeCounter.textContent = cardParams.likes.length;
  if (cardParams.likes.some((like) => like._id === meId)) {
    likeButton.classList.add('card__like-button_is-active');
  }

  // Обработчики событий
  deleteButton.addEventListener('click', () => deleteFunction(cardParams._id, cardElement));
  likeButton.addEventListener('click', () => likeFunction(cardParams._id, likeButton, likeCounter));
  cardImage.addEventListener('click', () => openImageFunction(cardParams.name, cardParams.link));

  return cardElement;
}

export function likeCardListener(cardId, likeButton, likeCounter) {
  const likeRequest = likeButton.classList.contains('card__like-button_is-active')
    ? likeCardDevDel(cardId)
    : likeCardDev(cardId);

  likeRequest
    .then((result) => {
      likeCounter.textContent = result.likes.length;
      likeButton.classList.toggle('card__like-button_is-active');
    })
    .catch((err) => console.error(err));
}

export function deleteCard(cardId, cardElement) {
  removeCard(cardId)
    .then(() => cardElement.remove())
    .catch((err) => console.error(err));
}
