export default class Form {
  constructor() {

  }

  createForm(i) {
    const form = document.createElement('form');
    form.className = 'form disable form' + i;
    
    const textarea = document.createElement('textarea');
    textarea.className = 'form-textarea form-textarea' + i;
    textarea.cols = '31';
    textarea.rows = '5';
        
    const buttonAdd = document.createElement('button');
    buttonAdd.className = 'btn-add btn-add' + i;
    buttonAdd.textContent  = 'Add card';
    buttonAdd.type  = 'button';

    
    const buttonCloseForm = document.createElement('button');
    buttonCloseForm.className = 'btn-add-close btn-add-close' + i;
    buttonCloseForm.textContent = 'x';
    buttonCloseForm.tupe = 'button';
    
    
    form.appendChild(textarea);
    form.appendChild(buttonAdd);
    form.appendChild(buttonCloseForm);

    return form;
  }
}
