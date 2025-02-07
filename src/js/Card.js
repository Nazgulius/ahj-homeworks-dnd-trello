export default class Card {
  constructor() {

  }

  //  добавление элемента в список
  createCard() {
    const li = document.createElement('li');
    li.className = 'items-item';
    li.textContent = document.querySelector('.form-textarea').value;     

    const close = document.createElement('button');
    close.className = 'btn-item-close disable';
    li.textContent = 'x';

    li.appendChild(close);
    document.querySelector('.items').appendChild(li); 
  }
  
  deleteCard() {

  }

}