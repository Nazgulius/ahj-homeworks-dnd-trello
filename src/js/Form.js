export default class Form {
  constructor() {

  }

  createForm() {
    const form = document.createElement('form');
    form.className = 'form disable';
    
    const textarea = document.createElement('textarea');
    textarea.className = 'form-textarea';
    textarea.cols = '31';
    textarea.rows = '5';
        
    const buttonAdd = document.createElement('button');
    buttonAdd.className = 'btn-add';
    buttonAdd.textContent  = 'Add card';
    buttonAdd.type  = 'button';

    
    const buttonCloseForm = document.createElement('button');
    buttonCloseForm.className = 'btn-add-close';
    buttonCloseForm.textContent = 'x';
    buttonCloseForm.tupe = 'button';
    
    
    form.appendChild(textarea);
    form.appendChild(buttonAdd);
    form.appendChild(buttonCloseForm);

    return form;
  }
}