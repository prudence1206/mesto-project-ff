
// @todo: Темплейт карточки
function getCardTemplate(){
  const cardTemplate = document.querySelector('#card-template').content.querySelector('.card');
  return cardTemplate.cloneNode(true);
}

// @todo: DOM узлы
const placesList = document.querySelector('.places__list');
//console.log(deleteButton);
//const container = document.querySelector('.content');
//const resetButton = container.querySelector('.input__btn_action_reset');
//const noSongsElement = container.querySelector('.no-songs');

function deleteButton (placesItemCard){
  const deleteButton = placesItemCard.querySelector('.card__delete-button');
  deleteButton.addEventListener('click', function () {
    placesItemCard.remove();
  }); 
}
// @todo: Функция создания карточки
function createCard(srcValue, name) {
    const placesItemCard = getCardTemplate();
    const cardImage = placesItemCard.querySelector('.card__image');  
    cardImage.src = srcValue;
    cardImage.alt = name;
    cardImage.textContent = name;
    deleteButton(placesItemCard);
    return placesItemCard;
    
  }


// @todo: Вывести карточки на страницу
initialCards.forEach((elem) => {
  const cardElement = createCard(elem.link, elem.name);
  placesList.append(cardElement);
});