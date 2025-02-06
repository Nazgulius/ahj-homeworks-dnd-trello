export default class Card {
  constructor() {

  }

  //  добавление элемента в список
  createCard() {
    const li = document.createElement('li');
    li.className = 'items-item';
    li.textContent = document.querySelector('.form-textarea').value;
    document.querySelector('.items').appendChild(li);  

    const close = document.createElement('button');
    close.className = 'btn-item-close disable';

  }

  deleteCard() {

  }


}