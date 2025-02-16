export default class Card {
  constructor() {

  }

  //  добавление элемента в список
  createCard(i) {
    const li = document.createElement('li');
    li.className = 'items-item';
    li.textContent = document.querySelector('.form-textarea' + i).value;     

    const close = document.createElement('button');
    close.className = 'btn-item-close disable';
    close.textContent = 'x';

    // вешает слушатель при создании элемента
    li.addEventListener('mouseover', (e) => {
      li.querySelector('.btn-item-close').classList.remove('disable');
    });
  
    li.addEventListener('mouseout', (e) => {
      li.querySelector('.btn-item-close').classList.add('disable');
    });

    // слушатель на удаление элемента
    li.addEventListener('mouseup', (e) => { 
      //e.stopPropagation(); 
      if (e.target.matches('.btn-item-close')) { 
        if (li) {  
          li.remove();
        }           
      }   
    });

    li.appendChild(close);
    document.querySelector('.items' + i).appendChild(li); 
  }
  
  // в видео было упоминание о необходимости такого метода, у меня он уехал в app.js
  deleteCard() {
    
  }

}
