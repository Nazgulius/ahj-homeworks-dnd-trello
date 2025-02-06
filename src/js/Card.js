export default class Card {
  constructor() {

  }

  createCard() {
    const li = document.createElement('li');
    li.className = 'items-item';
    li.textContent = document.querySelector('.form-textarea').value;
    document.querySelector('.items').appendChild(li);  
  }

  deleteCard() {

  }


}