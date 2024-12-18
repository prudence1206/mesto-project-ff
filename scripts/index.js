
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
// @todo: Функция создания карточки
function addCard(srcValue, altValue, deleteCard) {
    const placesItemCard = getCardTemplate();  
    placesItemCard.querySelector('.card__image').src = srcValue;
    placesItemCard.querySelector('.card__image').alt = altValue;
    placesList.append(placesItemCard);
    const deleteButton = placesItemCard.querySelector('.card__delete-button');
    deleteButton.addEventListener('click', function () {
      placesItemCard.remove();
    });
  } 

// @todo: Вывести карточки на страницу
initialCards.forEach(elem=>{
  addCard(elem.link, elem.name)
}); 