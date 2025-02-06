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
  console.log('click');
  //addCard();
  card.createCard();

  formAdd.classList.add('disable'); // прячем форму
  addAnotherForm.classList.remove('disable'); // показываем кнопку
  clearForm();
});

// закрывает форму
formClose.addEventListener('click', (e) => {
  e.preventDefault();
  console.log('close');
  
  formAdd.classList.add('disable'); // прячем форму
  addAnotherForm.classList.remove('disable'); // показываем кнопку
  clearForm();
});

// метод добавления элемента в список
function addCard() {  
  const li = document.createElement('li');
  li.className = 'items-item';
  li.textContent = textCard.value;
  document.querySelector('.items').appendChild(li);  
}

// очищает форму
function clearForm() {
  textCard.value = '';
}




// console.log('app.js bundled');


// const fileContainer = document.querySelector('.file-container');
// const fileInput = fileContainer.querySelector('.overlapped');

// const previewTitle = document.querySelector('.preview-title');
// const previewText = document.querySelector('.preview-text');
// const previewHtml = document.querySelector('.preview-html');
// const previewImage = document.querySelector('.preview-image');

// fileContainer.addEventListener('click', (e) => {
//     console.log(e);
    
//     console.log('click');

//     fileInput.dispatchEvent(new MouseEvent('click'));
// });

// fileContainer.addEventListener('dragover', (e) => {
//     e.preventDefault();
// })

// fileContainer.addEventListener('drop', (e) => {
//     e.preventDefault();

//     console.log('drop')

//     previewImage.src = URL.createObjectURL(e.dataTransfer.files && e.dataTransfer.files[0])
// })

// const displayImageContent = (e) => {
//     console.log(e);

//     previewImage.src = e.target.result;
// }

// const displayTextContent = (e) => {
//     console.log(e);

//     previewText.textContent = e.target.result;
// }

// const displayMDTextContent = (e) => {
//     console.log(e);

//     previewHtml.innerHTML = mdConvert(e.target.result);
// }

// fileInput.addEventListener('change', (e) => {
//     console.log(e);
//     console.dir(fileInput)

//     const file = fileInput.files && fileInput.files[0];

//     if(!file) return;

//     previewTitle.textContent = file.name;

//     const url = URL.createObjectURL(file);

//     const link = document.createElement('a');

//     link.href = url;
//     link.rel = 'noopener';
//     link.download = file.name;

//     link.click();

//     console.log(url)
// })



// const items = document.querySelector('.items');

// const itemsElements = items.querySelector('.items-item');

// let actualElement;

// const onMouseOver = (e) => {
//     console.log(e);

//     actualElement.style.top = e.clientY + 'px';
//     actualElement.style.left = e.clientX + 'px';
// };

// const onMouseUp = (e) => {
//     const mouseUpItem = e.target;

//     items.insertBefore(actualElement, mouseUpItem);

//     actualElement.classList.remove('dragged');
//     actualElement = undefined;

//     document.documentElement.removeEventListener('mouseup', onMouseUp);
//     document.documentElement.removeEventListener('mouseover', onMouseOver);
// };



// items.addEventListener('mousedown', (e) => {
//     e.preventDefault();

//     actualElement = e.target;
    
//     actualElement.classList.add('dragged');

//     document.documentElement.addEventListener('mouseup', onMouseUp);
//     document.documentElement.addEventListener('mouseover', onMouseOver);
// })