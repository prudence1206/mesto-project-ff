// @todo: Темплейт карточки
// @todo: DOM узлы
const placesList = document.querySelector('.places__list');
//const addButton = document.querySelector('.profile__add-button');

//console.log(deleteButton);
//const container = document.querySelector('.content');
//const resetButton = container.querySelector('.input__btn_action_reset');
//const noSongsElement = container.querySelector('.no-songs');
// @todo: Функция создания карточки
function addCard(srcValue, altValue) {
    const cardTemplate = document.querySelector('#card-template').content;
    const placesItemCard = cardTemplate.querySelector('.card').cloneNode(true);  
    placesItemCard.querySelector('.card__image').src = srcValue;
    placesItemCard.querySelector('.card__image').alt = altValue;
    placesList.append(placesItemCard);
    const deleteButton = placesItemCard.querySelector('.card__delete-button');
    console.log(deleteButton);
    deleteButton.addEventListener('click', function () {
      placesItemCard.remove();
  }
  )  
  }
 //initialCards.forEach(element => {
    //addCard(element[1], element[0]);
 //}); 
//addCard('https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg', 'Камчатка')
console.dir(placesList)
//addCard('https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg', 'Иваново')  
// @todo: Функция удаления карточки

  
// @todo: Вывести карточки на страницу




/* вызов всплывающего окна 
  addButton.addEventListener('click', function () {
    popupNewCard.style.display = 'block';
    const name = document.querySelector('.popup__input_type_card-name');
    const description = document.querySelector('.popup__input_type_description');
    addCard(name.value, description.value);

  });
*/
addCard('https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg', 'Камчатка')
addCard('https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg', 'Иваново')
  

/*
function renderHasSongs() {
    resetButton.removeAttribute('disabled');
    resetButton.classList.remove('input__btn_disabled');
    noSongsElement.classList.add('no-songs_hidden');
  }
  
  function renderNoSongs() {
    resetButton.setAttribute('disabled', true);
    resetButton.classList.add('input__btn_disabled');
    noSongsElement.classList.remove('no-songs_hidden');
}
    addButton.addEventListener('click', function () {
    const artist = document.querySelector('.input__text_type_artist');
    const title = document.querySelector('.input__text_type_title');
  
    addSong(artist.value, title.value);
    renderHasSongs();
  
    artist.value = '';
    title.value = '';
  });

*/