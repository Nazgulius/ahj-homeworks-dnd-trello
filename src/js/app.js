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

const addAnotherForm = document.querySelector('.btn-add-form');
const addAnotherForm0 = document.querySelector('.btn-add-form0');
const addAnotherForm1 = document.querySelector('.btn-add-form1');
const addAnotherForm2 = document.querySelector('.btn-add-form2');
const addAnotherFormAll = document.querySelectorAll('.btn-add-form');
const addItem = document.querySelector('.btn-add');
const addItem0 = document.querySelector('.btn-add0');
const addItem1 = document.querySelector('.btn-add1');
const addItem2 = document.querySelector('.btn-add2');
const formClose = document.querySelector('.btn-add-close');
const formClose0 = document.querySelector('.btn-add-close0');
const formClose1 = document.querySelector('.btn-add-close1');
const formClose2 = document.querySelector('.btn-add-close2');
const formAdd = document.querySelector('.form');
const formAdd0 = document.querySelector('.form0');
const formAdd1 = document.querySelector('.form1');
const formAdd2 = document.querySelector('.form2');
const textCard = document.querySelector('.form-textarea');
const textCard0 = document.querySelector('.form-textarea0');
const textCard1 = document.querySelector('.form-textarea1');
const textCard2 = document.querySelector('.form-textarea2');

// в этом блоке я пытался реализовать добавление слушателей на каждую форму с кнопками, 
// под каждым блоком. Неполучилось.

// addAnotherFormAll.forEach((el) => {
//   // показать форму  
//   el.addEventListener('click', (e) => {
//     e.preventDefault();
//     const formAdd = document.querySelector('.form');

//     formAdd.classList.remove('disable'); // показываем форму
//     el.classList.add('disable'); // прячем кнопку
//   });
// });

  // добавляет элемент в список
  // addItem.addEventListener('click', (e) => {
  //   e.preventDefault();
  //   if (textCard.value === '') {
  //     formAdd.classList.add('disable'); // прячем форму
  //     addAnotherForm.classList.remove('disable'); // показываем кнопку    
  //     return;
  //   };

  //   card.createCard();

  //   formAdd.classList.add('disable'); // прячем форму
  //   addAnotherForm.classList.remove('disable'); // показываем кнопку
  //   clearForm();
  // });

  // // закрывает форму
  // formClose.addEventListener('click', (e) => {
  //   e.preventDefault();

  //   formAdd.classList.add('disable'); // прячем форму
  //   addAnotherForm.classList.remove('disable'); // показываем кнопку
  //   clearForm();
  // });


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
  // actualElement.style.left = `${newX + initialX}px`;
  // actualElement.style.top = `${newY + initialY}px`;
  actualElement.style.left = `${e.clientX - offsetX + initialX}px`;
  actualElement.style.top = `${e.clientY - offsetY + initialY}px`;
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

// показываем или скрываем кнопку закрытия
// itemsAll.forEach((el) => {
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
// itemsAll.forEach((el) => {
itemsElements.forEach((el) => {
  el.addEventListener('mouseup', (e) => {
    // команда e.stopPropagation(); позволяет удалять и кнопки с X, но тогда ломается перемещение элементов.
    if (e.target.matches('.btn-item-close')) {
      if (el) {
        e.stopPropagation();
        el.remove();
      }
    }
  });
});
