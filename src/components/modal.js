export function openPopup(popup) {
    if (popup) {
        popup.classList.add('popup_is-animated');
        document.addEventListener('keydown', handleEscape);

        setTimeout(() => {
            popup.classList.add('popup_is-opened'); 
        }, 0);
    }
}

export function closePopup(popup) {
    if (popup) {
        popup.classList.remove('popup_is-opened');
        document.removeEventListener('keydown', handleEscape);
    }
}

export function handleEscape(evt) {
    if (evt.key === 'Escape') {
        const openedPopup = document.querySelector('.popup_is-opened');
        if (openedPopup) {
            closePopup(openedPopup);
        }
    }
}

