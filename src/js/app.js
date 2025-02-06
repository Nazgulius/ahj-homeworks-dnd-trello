// TODO: write code here
import { mdConvert } from 'md-converter';
import Form from './Form';
import Card from './Card';

const form = new Form();
const trelloList = document.querySelector('.trello-list');
trelloList.appendChild(form.createForm()); // добавляем форму

const card = new Card();

const addAnotherForm = document.querySelector('.btn-add-form');
const addItem = document.querySelector('.btn-add');
const formClose = document.querySelector('.btn-add-close');
const formAdd = document.querySelector('.form');
const textCard = document.querySelector('.form-textarea');

// показать форму
addAnotherForm.addEventListener('click', (e) => {
  e.preventDefault();
  
  formAdd.classList.remove('disable'); // показываем форму
  addAnotherForm.classList.add('disable'); // прячем кнопку
});

// добавляет элемент в список
addItem.addEventListener('click', (e) => {
  e.preventDefault();
  if(textCard.value === '') {
    formAdd.classList.add('disable'); // прячем форму
    addAnotherForm.classList.remove('disable'); // показываем кнопку    
    return;
  };

  card.createCard();

  formAdd.classList.add('disable'); // прячем форму
  addAnotherForm.classList.remove('disable'); // показываем кнопку
  clearForm();
});

// закрывает форму
formClose.addEventListener('click', (e) => {
  e.preventDefault();
  
  formAdd.classList.add('disable'); // прячем форму
  addAnotherForm.classList.remove('disable'); // показываем кнопку
  clearForm();
});

// очищает форму
function clearForm() {
  textCard.value = '';
}

if(document.querySelector('items-item')) {

  document.querySelector('items-item').addEventListener('mouseover', () => {  
    console.log('mouseover');
    document.querySelector('btn-item-close').classList.remove('disable');  
  });  
  
  document.querySelector('items-item').addEventListener('mouseout', () => { 
    console.log('mouseout'); 
    document.querySelector('btn-item-close').classList.add('disable');  
  }); 
}



const items = document.querySelector('.items');

const itemsElements = items.querySelector('.items-item');

let actualElement;

const onMouseOver = (e) => {
    console.log(e);

    actualElement.style.top = e.clientY + 'px';
    actualElement.style.left = e.clientX + 'px';
    
};

const onMouseUp = (e) => {
    const mouseUpItem = e.target;

    items.insertBefore(actualElement, mouseUpItem);

    actualElement.style.top = 0;
    actualElement.style.left = 0;
    
    actualElement.classList.remove('dragged');
    actualElement = undefined;

    document.documentElement.removeEventListener('mouseup', onMouseUp);
    document.documentElement.removeEventListener('mouseover', onMouseOver);
};



items.addEventListener('mousedown', (e) => {
    e.preventDefault();
    console.log(e);
    actualElement = e.target;
    
    actualElement.classList.add('dragged');

    document.documentElement.addEventListener('mouseup', onMouseUp);
    document.documentElement.addEventListener('mouseover', onMouseOver);
});
