// TODO: write code here
import { mdConvert } from 'md-converter';
import Form from './Form';
import Card from './Card';

// создание формы
const form = new Form();
const trelloListAll = document.querySelectorAll('.trello-list');
trelloListAll.forEach((el, i) => {
  el.appendChild(form.createForm(i)); // добавляем форму  
});

const card = new Card();

const addAnotherForm0 = document.querySelector('.btn-add-form0');
const addAnotherForm1 = document.querySelector('.btn-add-form1');
const addAnotherForm2 = document.querySelector('.btn-add-form2');
const addItem0 = document.querySelector('.btn-add0');
const addItem1 = document.querySelector('.btn-add1');
const addItem2 = document.querySelector('.btn-add2');
const formClose0 = document.querySelector('.btn-add-close0');
const formClose1 = document.querySelector('.btn-add-close1');
const formClose2 = document.querySelector('.btn-add-close2');
const formAdd0 = document.querySelector('.form0');
const formAdd1 = document.querySelector('.form1');
const formAdd2 = document.querySelector('.form2');
const textCard0 = document.querySelector('.form-textarea0');
const textCard1 = document.querySelector('.form-textarea1');
const textCard2 = document.querySelector('.form-textarea2');

// показать форму
addAnotherForm0.addEventListener('click', (e) => {
  e.preventDefault();

  formAdd0.classList.remove('disable'); // показываем форму
  addAnotherForm0.classList.add('disable'); // прячем кнопку
});
addAnotherForm1.addEventListener('click', (e) => {
  e.preventDefault();

  formAdd1.classList.remove('disable'); // показываем форму
  addAnotherForm1.classList.add('disable'); // прячем кнопку
});
addAnotherForm2.addEventListener('click', (e) => {
  e.preventDefault();

  formAdd2.classList.remove('disable'); // показываем форму
  addAnotherForm2.classList.add('disable'); // прячем кнопку
});

// добавляет элемент в список
addItem0.addEventListener('click', (e) => {
  e.preventDefault();
  if(textCard0.value === '') {
    formAdd0.classList.add('disable'); // прячем форму
    addAnotherForm0.classList.remove('disable'); // показываем кнопку    
    return;
  };

  card.createCard(0);

  formAdd0.classList.add('disable'); // прячем форму
  addAnotherForm0.classList.remove('disable'); // показываем кнопку
  clearForm0();
});
addItem1.addEventListener('click', (e) => {
  e.preventDefault();
  if(textCard1.value === '') {
    formAdd1.classList.add('disable'); // прячем форму
    addAnotherForm1.classList.remove('disable'); // показываем кнопку    
    return;
  };

  card.createCard(1);

  formAdd1.classList.add('disable'); // прячем форму
  addAnotherForm1.classList.remove('disable'); // показываем кнопку
  clearForm1();
});
addItem2.addEventListener('click', (e) => {
  e.preventDefault();
  if(textCard2.value === '') {
    formAdd2.classList.add('disable'); // прячем форму
    addAnotherForm2.classList.remove('disable'); // показываем кнопку    
    return;
  };

  card.createCard(2);

  formAdd2.classList.add('disable'); // прячем форму
  addAnotherForm2.classList.remove('disable'); // показываем кнопку
  clearForm2();
});

// закрывает форму
formClose0.addEventListener('click', (e) => {
  e.preventDefault();

  formAdd0.classList.add('disable'); // прячем форму
  addAnotherForm0.classList.remove('disable'); // показываем кнопку
  clearForm0();
});
formClose1.addEventListener('click', (e) => {
  e.preventDefault();

  formAdd1.classList.add('disable'); // прячем форму
  addAnotherForm1.classList.remove('disable'); // показываем кнопку
  clearForm1();
});
formClose2.addEventListener('click', (e) => {
  e.preventDefault();

  formAdd2.classList.add('disable'); // прячем форму
  addAnotherForm2.classList.remove('disable'); // показываем кнопку
  clearForm2();
});

// очищает форму
function clearForm0() {
  textCard0.value = '';
}
function clearForm1() {
  textCard1.value = '';
}
function clearForm2() {
  textCard2.value = '';
}


// блок с перемещением элементов внутри main
const itemsAll = document.querySelectorAll('.items');
const itemsElements = document.querySelectorAll('.items-item');

let actualElement;
let offsetX = 0; // Смещение по X  
let offsetY = 0; // Смещение по Y  
let initialX = 0; // Начальная позиция по X  
let initialY = 0; // Начальная позиция по Y  

// создфём тень и скрываем её
const divShadow = document.createElement('div');
divShadow.className = 'shadow hidden';
divShadow.style.background = 'rgba(0, 0, 0, 0.5)';
divShadow.style.borderRadius = '5px';


itemsAll.forEach((items) => {
  items.addEventListener('mousedown', (e) => {
    e.preventDefault();

    actualElement = e.target;
    actualElement.classList.add('dragged');

    // Вычисляем начальную позицию в момент нажатия  
    const rect = actualElement.getBoundingClientRect();
    offsetX = e.clientX ;
    offsetY = e.clientY ;

    divShadow.style.width = `${rect.width}px`; // Установка ширины тени  
    divShadow.style.height = `${rect.height}px`; // Установка высоты тени  
    divShadow.classList.remove('hidden'); // показываем тень
    document.body.appendChild(divShadow); // Добавляем тень в body 

    // Устанавливаем начальную позицию  
    initialX = rect.left;
    initialY = rect.top;

    document.documentElement.addEventListener('mouseup', onMouseUp);
    document.documentElement.addEventListener('mousemove', onMouseMove);
    document.documentElement.addEventListener('mouseover', onMouseOver);

    itemsAll.forEach(item => {  
      item.addEventListener('mouseover', onItemHover);  
    }); 
  });
});

const onMouseMove = (e) => {
  if (!actualElement) return;

  // Устанавливаем новую позицию  
  const newX = e.clientX - offsetX + initialX;
  const newY = e.clientY - offsetY + initialY;

  // Установка позиции элемента  
  actualElement.style.left = `${newX}px`;
  actualElement.style.top = `${newY}px`;
};

const onMouseOver = (e) => {
  if (!divShadow) return;

  // Устанавливаем новую позицию тени
  const newX = e.clientX - offsetX + initialX;
  const newY = e.clientY - offsetY + initialY;

  // Установка позиции элемента тень
  divShadow.style.left = `${newX}px`;
  divShadow.style.top = `${newY}px`;
}


//  перемещение тени
const onItemHover = (e) => {  
  if (!actualElement) return;  

  const mouseUpItem = e.target.closest('.items-item');  
  
  // Проверка на наличие mouseUpItem  
  if (!mouseUpItem) return;   

  const parentItems = mouseUpItem.parentNode.children;  

  // Сброс смещения для всех элементов  
  for (let item of parentItems) {  
    item.style.transform = 'translateY(0)';  
  }  

  // Устанавливаем тень на позицию текущего элемента списка  
  const rect = mouseUpItem.getBoundingClientRect();  
  divShadow.style.left = `${rect.left}px`;  
  divShadow.style.top = `${rect.top}px`;  

  // Вычисляем центральную точку  
  const centerY = rect.top + (rect.height / 2);  

  if (e.clientY < centerY) {  
    // Если курсор выше центра, вставляем перед элементом  
    if (mouseUpItem.previousElementSibling) {  
      mouseUpItem.parentNode.insertBefore(divShadow, mouseUpItem);  
    } else {  
      mouseUpItem.parentNode.insertBefore(divShadow, mouseUpItem); // Если это первый элемент, вставляем перед ним  
    }  
  } else {  
    // Если курсор ниже центра, вставляем после элемента  
    const nextSibling = mouseUpItem.nextElementSibling;  
    if (nextSibling) {  
      mouseUpItem.parentNode.insertBefore(divShadow, nextSibling);  
    } else {  
      mouseUpItem.parentNode.appendChild(divShadow); // Если это последний элемент, добавляем в конец  
    }  
  }  
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
  
  divShadow.style.width = '0px';
  divShadow.style.height = '0px';
  divShadow.classList.add('hidden'); // скрываем тень  

  // Убираем смещение у всех элементов  
  const items = targetColumn.children;  
  for (let item of items) {  
    item.style.transform = 'translateY(0)';  
  } 
  
  document.documentElement.removeEventListener('mouseup', onMouseUp);
  document.documentElement.removeEventListener('mousemove', onMouseMove);
  document.documentElement.removeEventListener('mouseover', onMouseOver);
  itemsAll.forEach(item => {  
    item.removeEventListener('mouseover', onItemHover);  
  });
};

// показываем или скрываем кнопку закрытия
itemsElements.forEach((el) => {
  el.addEventListener('mouseenter', (e) => {
    if (e.target.matches('.items-item') || e.target.closest('.items-item')) {
      e.target.querySelector('.btn-item-close').classList.remove('disable');
    }
  });

  el.addEventListener('mouseleave', (e) => {
    if (e.target.matches('.items-item') || e.target.closest('.items-item')) {
      e.target.querySelector('.btn-item-close').classList.add('disable');
    }
  });
});

// Удаляем элемент по клику
itemsElements.forEach((el) => {
  el.addEventListener('mouseup', (e) => {
    // команда e.stopPropagation(); позволяет удалять и кнопки с X, но тогда ломается перемещение элементов.
    if (e.target.matches('.btn-item-close')) {
      if (el) {
        e.stopPropagation();
        el.remove();
        divShadow.classList.add('hidden'); // скрываем тень
      }
    }
  });
});
