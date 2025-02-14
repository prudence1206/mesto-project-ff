const popups = document.querySelectorAll('.popup');

function closeModalWindowEscape(event) {
  if (event.key === 'Escape') {
    closeModal(document.querySelector('.popup_is-opened'));
  }
}

function overlayMouseClick(event) {
  if (event.target.classList.contains('popup_is-opened')) {
    closeModal(event.target);
  }
}

// Открытие модального окна
export function openModal(modalWindow) {
  modalWindow.classList.add('popup_is-opened');
  document.addEventListener('keyup', closeModalWindowEscape);
}

// Закрытие модального окна
export function closeModal(modalWindow) {
  modalWindow.classList.remove('popup_is-opened');
  document.removeEventListener('keyup', closeModalWindowEscape);
}

// Инициализация слушателей для оверлея и кнопок закрытия (один раз)
popups.forEach((popup) => {
  popup.addEventListener('mousedown', overlayMouseClick);
  const closeButton = popup.querySelector('.popup__close');
  closeButton.addEventListener('click', () => closeModal(popup));
});