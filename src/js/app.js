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


const itemsAll = document.querySelectorAll('.items');
const itemsElements = document.querySelectorAll('.items-item');

let actualElement;
let offsetX = 0; // Смещение по X  
let offsetY = 0; // Смещение по Y  
let initialX = 0; // Начальная позиция по X  
let initialY = 0; // Начальная позиция по Y  


itemsAll.forEach((items) => {
  items.addEventListener('mousedown', (e) => {
    e.preventDefault();
    actualElement = e.target;      
    actualElement.classList.add('dragged');

    // Вычисляем начальную позицию в момент нажатия  
    const rect = actualElement.getBoundingClientRect();   
    offsetX = e.clientX - rect.left;  
    offsetY = e.clientY - rect.top;  

    // Устанавливаем начальную позицию  
    initialX = rect.left;  
    initialY = rect.top; 

    document.documentElement.addEventListener('mouseup', onMouseUp);
    document.documentElement.addEventListener('mouseover', onMouseOver);
  });
});

const onMouseOver = (e) => {
  if (!actualElement) return;
  
  // Устанавливаем новую позицию  
  const newX = e.clientX - offsetX;  
  const newY = e.clientY - offsetY; 

  // Установка позиции элемента  
  actualElement.style.left = `${newX}px`;  
  actualElement.style.top = `${newY}px`;
};

const onMouseUp = (e) => {
  if (!actualElement) return;
  const mouseUpItem = document.elementFromPoint(e.clientX, e.clientY);  
  const targetColumn = mouseUpItem ? mouseUpItem.closest('.items') : null; 

  if (targetColumn) {  
    targetColumn.insertBefore(actualElement, mouseUpItem); 
  } 
 
  // Сброс стилей и завершение перетаскивания  
  actualElement.style.top = '';  
  actualElement.style.left = '';  
  actualElement.classList.remove('dragged');  
  actualElement = null; // Сбрасываем текущий элемент  
  
  document.documentElement.removeEventListener('mouseup', onMouseUp);
  document.documentElement.removeEventListener('mouseover', onMouseOver);
};


itemsElements.forEach((el) => {
  el.addEventListener('mouseover', (e) => {
    el.querySelector('.btn-item-close').classList.remove('disable');
  });

  el.addEventListener('mouseout', (e) => {
    el.querySelector('.btn-item-close').classList.add('disable');
  });
});
