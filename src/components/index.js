import { createCard, deleteCard, likeCard } from "./card.js";
import { closePopup, openPopup } from './modal.js';
import { placesList, popupNewCard, popupEditProfile, popupOpenImage, profileAddButton, profileEditButton, 
    popupImage, popupCaption, editNameInput, editDescriptionInput, currentProfileName, currentProfileDescription, 
    formEditProfile, formAddCard, addNameInput, addLinkInput, popupAvatar, editUrlInput, currentProfileAvatar, formAvatar,
    profileAvatarButton, popupEditButton, popupAvatarButton, popupAddButton } from './config.js'
import '../pages/index.css';
import { clearValidation, enableValidation } from "./validation.js";
import { getInitialCardsAPI, getUserInfoAPI, setUserInfoAPI, addNewCardAPI, setAvatarAPI } from "./api.js";

const cardHandlers = {
    create: createCard,
    delete: deleteCard,
    like: likeCard,
    open: openImage,
};

let currentUser;

Promise.all([getInitialCardsAPI(), getUserInfoAPI()])
    .then(([cards, user]) => {
        currentUser = user;
        setUserInfo(user.name, user.about);
        setAvatarInfo(user.avatar);
        renderCards(cards, user, cardHandlers);
    })
    .catch((err) => {
        console.error(`Ошибка при загрузке данных: ${err}`);
    })

const popups = document.querySelectorAll('.popup');

enableValidation({
    formSelector: '.popup__form',
    inputSelector: '.popup__input',
    submitButtonSelector: '.popup__button',
    inactiveButtonClass: 'popup__button_disabled',
    inputErrorClass: 'popup__input_type_error',
    errorClass: 'popup__error_visible'
});

export function renderCards(cards, user, cardHandlers) {
    cards.forEach(function (card) {
        console.log(placesList.length);
        placesList.append(
            cardHandlers.create(card, user, {
                delete: cardHandlers.delete, 
                like : cardHandlers.like, 
                open: cardHandlers.open,
            })
        );
    });
}

export function openImage(link, alt) {
    popupImage.src = link;
    popupImage.alt = alt;
    popupCaption.textContent = alt;


    openPopup(popupOpenImage);
}

export function setUserInfo(name, about) {
    currentProfileName.textContent = name;
    currentProfileDescription.textContent = about;
}

export function setAvatarInfo(avatar) {
    currentProfileAvatar.src = avatar;
}

export function fillEditPopup() {
    editNameInput.value = currentProfileName.textContent;
    editDescriptionInput.value = currentProfileDescription.textContent;
}

export function handleProfileFormSubmit(evt) {
    evt.preventDefault();
    currentProfileName.textContent = editNameInput.value;
    currentProfileDescription.textContent = editDescriptionInput.value;
    popupEditButton.textContent = 'Сохранение...';

    setUserInfoAPI(currentProfileName.textContent, currentProfileDescription.textContent)
        .then(() => {
            closePopup(popupEditProfile);
        })
        .catch((err) => {
            console.error('Ошибка при обновлении данных:', err);
        })
        .finally(() => {
            popupEditButton.textContent = 'Сохранить';
        })
}

export function handleAvatarFormSubmit(evt) {
    evt.preventDefault();
    currentProfileAvatar.src = editUrlInput.value;
    popupAvatarButton.textContent = 'Сохранение...';

    setAvatarAPI(currentProfileAvatar.src)
        .then(() => {
            closePopup(popupAvatar);
        })
        .catch((err) => {
            console.error('Ошибка при обновлении данных:', err);
        })
        .finally(() => {
            popupAvatarButton.textContent = 'Сохранить';
        })
}

export function saveNewCard(evt) {
    evt.preventDefault();

    const newCard = {
        name: addNameInput.value,
        link: addLinkInput.value,
    };;

    popupAddButton.textContent = 'Сохранение...';

    addNewCardAPI(newCard)
        .then((card) => {    
            placesList.prepend(cardHandlers.create(card, currentUser, {
                delete: cardHandlers.delete, 
                like : cardHandlers.like, 
                open: cardHandlers.open,
            }));
            closePopup(popupNewCard);
            formAddCard.reset();
        })
        .catch((err) => {
            console.error('Ошибка при обновлении данных:', err);
        })
        .finally(() => {
            popupAddButton.textContent = 'Сохранить';
            clearValidation(
                popupNewCard, {
                inputSelector: '.popup__input',
                submitButtonSelector: '.popup__button',
                inactiveButtonClass: 'popup__button_disabled'
            });
        })
}

profileAddButton.addEventListener('click', function() {
    openPopup(popupNewCard);
});

profileEditButton.addEventListener('click', function(evt) {
    openPopup(popupEditProfile);
    fillEditPopup();
});

profileAvatarButton.addEventListener('click', function() {
    openPopup(popupAvatar);
});

popups.forEach(function(popup) {
    popup.addEventListener('mousedown', function(evt) {
        if (evt.target.classList.contains('popup__close') || !evt.target.closest('.popup__content')) {
            closePopup(popup);
            if (popup !== popupOpenImage) {
                clearValidation(
                    popup, {
                    inputSelector: '.popup__input',
                    submitButtonSelector: '.popup__button',
                    inactiveButtonClass: 'popup__button_disabled'
                });
            }
        }
    });
});

formEditProfile.addEventListener('submit', handleProfileFormSubmit);
formAddCard.addEventListener('submit', saveNewCard);
formAvatar.addEventListener('submit', handleAvatarFormSubmit);






