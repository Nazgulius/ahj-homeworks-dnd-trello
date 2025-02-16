/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ 261:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";

// EXPORTS
__webpack_require__.d(__webpack_exports__, {
  "default": () => (/* binding */ parser_block)
});

;// ./node_modules/md-converter/src/parse/nodes/Node.js
class Node {
  constructor(name, type) {
    this.name = name;
    this.type = type;
  }
};

;// ./node_modules/md-converter/src/parse/nodes/inline.js


const IMAGE_REGEX = /^!\[([^\]]*)?\]\(([^\)]+)\)$/;
const LINK_REGEX = /^\[([^\]]*)?\]\(([^\)]+)\)$/;

class Text extends Node {
  constructor(text) {
    super('text', 'inline');
    this.value = text;
  }
}

class Html extends Node {
  constructor(text) {
    super('html', 'inline');
    this.value = text;
  }
}

class HtmlComment extends Node {
  constructor(text) {
    super('htmlcomment', 'inline');
    this.value = text;
  }
}

class Em extends Node {
  constructor(text) {
    super('em', 'inline');
    this.value = text;
  }
}

class Italic extends Node {
  constructor(text) {
    super('italic', 'inline');
    this.value = text;
  }
}
class EmItalic extends Node {
  constructor(text) {
    super('emitalic', 'inline');
    this.value = text;
  }
}
class Strikethrough extends Node {
  constructor(text) {
    super('strikethrough', 'inline');
    this.value = text;
  }
}

class InlineCode extends Node {
  constructor(text) {
    super('code', 'inline');
    this.value = text;
  }
}

class Image extends Node {
  constructor(text) {
    const match = text.match(IMAGE_REGEX);
    if (!match) {
      throw new Error(`Invalid image syntax: ${text}`);
    }
    super('image', 'inline');
    this.alt = match[1] || '';
    this.src = match[2] || '';
  }
}

class Link extends Node {
  constructor(text) {
    const match = text.match(LINK_REGEX);
    if (!match) {
      throw new Error(`Invalid link syntax: ${text}`);
    }
    super('link', 'inline');
    this.title = match[1] || '';
    this.href = match[2] || '';
  }
}

/* harmony default export */ const inline = ({
  Text,
  Html,
  HtmlComment,
  Em,
  Italic,
  EmItalic,
  Strikethrough,
  InlineCode,
  Image,
  Link
});

;// ./node_modules/md-converter/src/parse/parser/helper.js
const EMPTY_REGEX = /^\s*$/;

const isEmpty = str => {
  return str.length === 0 || EMPTY_REGEX.test(str);
};

/* harmony default export */ const helper = ({
  isEmpty
});


;// ./node_modules/md-converter/src/parse/parser/inline.js



const MODE_DEFAULT = 0;
const MODE_ASTERISK = 1;
const MODE_ASTERISK_DOUBLE = 2;
const MODE_ASTERISK_TRIPLE = 3;
const MODE_UNDERLINE = 4;
const MODE_UNDERLINE_DOUBLE = 5;
const MODE_UNDERLINE_TRIPLE = 6;
const MODE_STRIKETHROUGH = 7;
const MODE_IMAGE = 8;
const MODE_LINK = 9;
const MODE_INLINE_CODE = 10;

/* harmony default export */ const parser_inline = (text => {
  const ast = [];

  let stack = '';
  let mode = MODE_DEFAULT;
  let escapeSequence = false;
  const html = [];

  for (let i = 0; i < text.length; ++i) {
    const char = text[i];

    if (escapeSequence === true) {
      stack += char;
      escapeSequence = false;
      continue;
    }

    switch (char) {
      case "*":
        if (text[i + 1] === '*') {
          i++;
          if (text[i + 1] === '*') {
            i++;
            if (mode === MODE_ASTERISK_TRIPLE) {
              ast.push(new inline.EmItalic(stack));
              mode = MODE_DEFAULT;
            } else {
              if (!helper.isEmpty(stack)) {
                ast.push(new inline.Text(stack));
              }
              mode = MODE_ASTERISK_TRIPLE;
            }
            stack = '';
          } else {
            if (mode === MODE_ASTERISK_DOUBLE) {
              ast.push(new inline.Em(stack));
              mode = MODE_DEFAULT;
            } else {
              if (!helper.isEmpty(stack)) {
                ast.push(new inline.Text(stack));
              }
              mode = MODE_ASTERISK_DOUBLE;
            }
            stack = '';
          }
          continue;
        }
        if (mode === MODE_ASTERISK) {
          ast.push(new inline.Italic(stack));
          mode = MODE_DEFAULT;
        } else {
          if (!helper.isEmpty(stack)) {
            ast.push(new inline.Text(stack));
          }
          mode = MODE_ASTERISK;
        }
        stack = '';
        continue;
      case "_":
        if (text[i + 1] === '_') {
          i++;
          if (text[i + 1] === '_') {
            i++;
            if (mode === MODE_UNDERLINE_TRIPLE) {
              ast.push(new inline.EmItalic(stack));
              mode = MODE_DEFAULT;
            } else {
              if (!helper.isEmpty(stack)) {
                ast.push(new inline.Text(stack));
              }
              mode = MODE_UNDERLINE_TRIPLE;
            }
            stack = '';
          } else {
            if (mode === MODE_UNDERLINE_DOUBLE) {
              ast.push(new inline.Em(stack));
              mode = MODE_DEFAULT;
            } else {
              if (!helper.isEmpty(stack)) {
                ast.push(new inline.Text(stack));
              }
              mode = MODE_UNDERLINE_DOUBLE;
            }
            stack = '';
          }
          continue;
        }
        if (mode === MODE_UNDERLINE) {
          ast.push(new inline.Italic(stack));
          mode = MODE_DEFAULT;
        } else {
          if (!helper.isEmpty(stack)) {
            ast.push(new inline.Text(stack));
          }
          mode = MODE_UNDERLINE;
        }
        stack = '';
        continue;
      case "~":
        if (text[i + 1] === '~') {
          i++;
          if (mode === MODE_STRIKETHROUGH) {
            ast.push(new inline.Strikethrough(stack));
            mode = MODE_DEFAULT;
          } else {
            if (!helper.isEmpty(stack)) {
              ast.push(new inline.Text(stack));
            }
            mode = MODE_STRIKETHROUGH;
          }
          stack = '';
          continue;
        }
        stack += char;
        continue;
      case "`":
        if (mode === MODE_INLINE_CODE) {
          ast.push(new inline.InlineCode(stack));
          mode = MODE_DEFAULT;
        } else {
          if (!helper.isEmpty(stack)) {
            ast.push(new inline.Text(stack));
          }
          mode = MODE_INLINE_CODE;
        }
        stack = '';
        continue;
      case "<":
        if (!helper.isEmpty(stack)) {
          if (html.length === 0) {
            ast.push(new inline.Text(stack));
          } else {
            html[html.length - 1] += stack;
          }
          stack = '';
        }
        let c = char;
        do {
          stack += c;
          c = text[++i];
        } while(c != ">");
        stack += c;
        if (stack[1] === '/') {
          const h = html.pop() + stack;
          ast.push(new inline.Html(h));
        } else if (stack[1] === '!') {
          ast.push(new inline.HtmlComment(stack));
        } else {
          html.push(stack);
        }
        stack = '';
        continue;
      case "!":
        if (!helper.isEmpty(stack)) {
          ast.push(new inline.Text(stack));
        }
        stack = '';
        mode = MODE_IMAGE;
        stack = char;
        continue;
      case "[":
        if (mode !== MODE_IMAGE) {
          if (!helper.isEmpty(stack)) {
            ast.push(new inline.Text(stack));
          }
          mode = MODE_LINK;
          stack = char;
          continue
        }
        stack += char;
        continue;
      case ")":
        stack += char;
        if (mode === MODE_IMAGE) {
          ast.push(new inline.Image(stack));
          mode = MODE_DEFAULT;
          stack = '';
        } else if (mode === MODE_LINK) {
          ast.push(new inline.Link(stack));
          mode = MODE_DEFAULT;
          stack = '';
        } else {
          stack += char;
        }
        continue;
      case "\\":
        escapeSequence = true;
        continue;
      default:
        stack += char;
        break;
    }
  }
  if (!helper.isEmpty(stack)) {
    const prev = ast[ast.length - 1];
    if (!prev || mode === MODE_DEFAULT) {
      ast.push(new inline.Text(stack));
    } else {
      let prefix = '';
      switch (mode) {
        case MODE_ASTERISK: prefix = '*'; break;
        case MODE_ASTERISK_DOUBLE: prefix = '**'; break;
        case MODE_ASTERISK_TRIPLE: prefix = '**'; break;
        case MODE_UNDERLINE: prefix = '_'; break;
        case MODE_UNDERLINE_DOUBLE: prefix = '__'; break;
        case MODE_UNDERLINE_TRIPLE: prefix = '___'; break;
        case MODE_STRIKETHROUGH: prefix = '~~'; break;
        case MODE_INLINE_CODE: prefix = '`'; break;
      }
      prev.value += `${prefix}${stack}`;
    }
  }
  return ast;
});

;// ./node_modules/md-converter/src/parse/parser/syntax-error.js
class SyntaxError extends Error {
  constructor(message) {
    super(message);
  }
};

;// ./node_modules/md-converter/src/parse/nodes/block.js





class Paragraph extends Node {
  constructor(text) {
    super('paragraph', 'block');
    this.values = parser_inline(text);
  }
}

class Horizontal extends Node {
  constructor(text) {
    super('horizontal', 'block');
    this.values = [];
  }
}

class Br extends Node {
  constructor() {
    super('br', 'block');
    this.values = [];
  }
}

class Code extends Node {
  constructor(text, syntax) {
    super('code', 'block');
    this.syntax = syntax;
    this.values = [
      new inline.Text(text)
    ];
  }
}

class Blockquote extends Node {
  constructor(text, level) {
    super('blockquote', 'block');
    this.level = level;
    this.values = new parser_inline(text);
  }
}

class Heading extends Node {
  constructor(text, level) {
    if (level === 0 || level > 6) {
      throw new SyntaxError('Invalid heading: heading support only between H1 and H6');
    }
    super('heading', 'block');
    this.level = level;
    this.values = parser_inline(text);
  }
}

class List extends Node {
  constructor(text, level) {
    super('list', 'block');
    this.level = level;
    this.values = parser_inline(text);
  }
}

class OrderedList extends Node {
  constructor(text, order, level) {
    super('orderedlist', 'block');
    this.level = level;
    this.order = order;
    this.values = parser_inline(text);
  }
}

class CheckList extends Node {
  constructor(text, checked, level) {
    super('checklist', 'block');
    this.level = level;
    this.checked = checked;
    this.values = parser_inline(text);
  }
}

class Table extends Node {
  constructor(_rows) {
    super('table', 'block');
    const [heading, separator, ...rows] = _rows.map(line => line.replace(/^\||\|$/g, '').split('|'));
    if(heading !== undefined) {
      this.headings = heading.map(cell => cell.trim());
    }
    if (separator !== undefined) {
      this.aligns = separator.map(cell => {
        cell = cell.trim();
        let align = 'left';
        if (cell[cell.length - 1] === ':') {
          align = cell[0] === ':' ? 'center': 'right';
        }
        return align;
      });
    }
    if (rows !== undefined) {
      this.rows = rows.map(row => {
        return row.map(cell => parser_inline(cell.trim()));
      });
    }
  }
}

/* harmony default export */ const block = ({
  Paragraph,
  Horizontal,
  Code,
  Blockquote,
  Heading,
  List,
  CheckList,
  OrderedList,
  Table,
  Br
});

;// ./node_modules/md-converter/src/parse/parser/block.js



const HEADING_REGEX = /^(#{1,})\s(.+)$/;
const ULIST_REGEX = /^(\s*)?(?:\-|\*)\s(.+)$/;
const OLIST_REGEX = /^(\s*)?([0-9]+)\.\s(.+)$/;
const HORIZONTAL_RULE_REGEX = /^[\*\-_\s]+$/;
const CODE_REGEX = /^[`~]{3}(.*)|[`~]{3}(.*)\b[\l]+\b$/;
const BLOCKQUOTE_REGEX = /^(>{1,})\s?(.+)$/;
const LINEBREAK_REGEX = /(.+?)[\u0020]{2}$/;
const TABLE_REGEX = /(?:\s*)?\|(.+)\|(?:\s*)$/;

const block_MODE_DEFAULT = 0;
const MODE_CODE = 1;

/* harmony default export */ const parser_block = (str => {
  const ast = [];

  if (!/\n$/.test(str)) {
    str += '\n';
  }

  let stack = '';
  let line = '';
  let mode = block_MODE_DEFAULT;
  let tables = [];
  let match;
  let codeLang = '';

  const parseParagraph = stack => {
    if (tables.length > 0) {
      ast.push(new block.Table(tables));
      tables = [];
    }
    if (!helper.isEmpty(stack)) {
      ast.push(new block.Paragraph(stack));
    }
  };

  for (let i = 0; i < str.length; ++i) {
    const char = str[i];

    if (char === '\r') {
      continue;
    }

    if (char === '\n') {
      if (null !== (match = line.match(LINEBREAK_REGEX))) {
        parseParagraph(stack + match[1]);
        stack = '';
      } else if (CODE_REGEX.test(line)) {
        if (mode === MODE_CODE) {
          ast.push(new block.Code(stack.trim(), codeLang));
          codeLang = ''
          mode = block_MODE_DEFAULT;
        } else {
          parseParagraph(stack);
          codeLang = line.replace(/\`\`\`/, '').trim();
          mode = MODE_CODE;
        }
        stack = '';
      } else if (null !== (match = line.match(BLOCKQUOTE_REGEX))) {
        parseParagraph(stack);
        stack = '';
        ast.push(new block.Blockquote(match[2], match[1].length));
      } else if (HORIZONTAL_RULE_REGEX.test(line) && line.split(/[\*\-_]/).length > 3) {
        parseParagraph(stack);
        stack = '';
        ast.push(new block.Horizontal());
      } else if (null !== (match = line.match(HEADING_REGEX))) {
        parseParagraph(stack);
        stack = '';
        ast.push(new block.Heading(match[2], match[1].length));
      } else if (null !== (match = line.match(ULIST_REGEX))) {
        parseParagraph(stack);
        stack = '';
        const prev = ast[ast.length - 1];
        const check = match[2].match(/^\[(x|\u0020)?\]\s(.+)$/);
        let level = 1;
        if (prev && (prev.name === 'list' || prev.name === 'checklist')) {
          const indent = (match[1] || '').length;
          if (prev.level * 2 <= indent) {
            level = prev.level + 1
          } else if (prev.level === indent) {
            level = prev.level
          } else if (indent === 0) {
            level = 1
          } else {
            level = prev.level - 1
          }
        }
        const list = check ? new block.CheckList(check[2], check[1] === 'x', level) : new block.List(match[2], level);
        ast.push(list);
      } else if (null !== (match = line.match(OLIST_REGEX))) {
        parseParagraph(stack);
        stack = '';
        const prev = ast[ast.length - 1];
        let level = 1;
        if (prev && (prev.name === 'orderedlist')) {
          const indent = (match[1] || '').length;
          if (prev.level * 2 <= indent) {
            level = prev.level + 1
          } else if (prev.level === indent) {
            level = prev.level
          } else {
            level = prev.level - 1
          }
        }
        const list = new block.OrderedList(match[3], (match[2] | 0), level);
        ast.push(list);
      } else if (null !== (match = line.match(TABLE_REGEX))) {
        tables.push(line);
        stack = '';
      } else if (line === '') {
        parseParagraph(stack);
        stack = '';
        ast.push(new block.Br());
      } else {
        stack += line !== '' ? `${line}\n` : '';
      }
      line = '';
    } else {
      line += char;
    }
  }
  parseParagraph(stack.slice(0, -1));
  return ast;
});


/***/ }),

/***/ 410:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

module.exports = __webpack_require__(261);


/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry needs to be wrapped in an IIFE because it needs to be in strict mode.
(() => {
"use strict";

// EXTERNAL MODULE: ./node_modules/md-converter/src/parse/parser/index.js
var parser = __webpack_require__(410);
;// ./node_modules/md-converter/src/parse/Tree.js
class Tree {
  constructor(ast) {
    this.ast = ast;
  }
};

;// ./node_modules/md-converter/src/parse/index.js



const mdParse = mdString => {
  const ast = (0,parser["default"])(mdString);

  return new Tree(ast);
};

/* harmony default export */ const parse = (mdParse.parse = parser["default"]);

;// ./node_modules/md-converter/src/mdconvert.js



const mdConvert = (text) => {
  const mdTree = mtp(text);
  let htmlValue = ``
  let prev = null
  let bqValue = [];
  let listValue = [];
  for (const line of mdTree) {
    if(line.name === "heading") {
      if (line.values.length !== 0) {
        htmlValue += convert.heading(line.level, line.values[0].value)
      }
      prev = line
    } else if (line.name === "paragraph") {
      if (prev && prev.name === "blockquote") {
        bqValue.push(line.values)
        if (line === mdTree[mdTree.length-1]) {
          htmlValue += convert.blockquote(bqValue)
        }
      } else {
        htmlValue += convert.paragraph(line.values)
      }
      prev = line
    } else if (line.name === "blockquote") {
      bqValue.push(line.values)
      prev = line
      if (line === mdTree[mdTree.length-1]) {
        htmlValue += convert.blockquote(bqValue)
      }
    } else if (line.name === "list") {
      listValue.push({ level: line.level, value: line.values })
      if (line === mdTree[mdTree.length-1]) {
        htmlValue += convert.ulist(listValue)
      }
      prev = line
    } else if (line.name === "checklist") {
      listValue.push({ level: line.level, value: line.values, checked: line.checked })
      if (line === mdTree[mdTree.length-1]) {
        htmlValue += convert.checklist(listValue)
      }
      prev = line
    } else if (line.name === "orderedlist") {
      listValue.push(line.values)
      if (line === mdTree[mdTree.length-1]) {
        htmlValue += convert.orderedlist(listValue)
      }
      // htmlValue += convert.orderedlist(line.values)
      prev = line
    } else if (line.name === "code") {
      htmlValue += convert.code(line)
    } else if (line.name === "horizontal") {
      htmlValue += convert.horizontal()
    } else if(line.name === "table") {
      htmlValue += convert.table(line)
    } else if (line.name === "br") {
      if (bqValue.length !== 0) {
        htmlValue += convert.blockquote(bqValue)
        bqValue = []
        continue
      }
      if (prev && prev.name === "list") {
        htmlValue += convert.ulist(listValue)
        listValue = []
        continue
      }
      if (prev && prev.name === "orderedlist") {
        htmlValue += convert.orderedlist(listValue)
        listValue = []
        continue
      }
      if (prev && prev.name === "checklist") {
        htmlValue += convert.checklist(listValue)
        listValue = []
        continue
      }
      if (prev && prev.name === line.name) {
        continue
      }
      htmlValue += convert.br()
      prev = line
    }
  }
  return htmlValue
}

;// ./node_modules/md-converter/src/index.js





;// ./src/js/Form.js
class Form {
  constructor() {}
  createForm(i) {
    const form = document.createElement('form');
    form.className = 'form disable form' + i;
    const textarea = document.createElement('textarea');
    textarea.className = 'form-textarea form-textarea' + i;
    textarea.cols = '31';
    textarea.rows = '5';
    const buttonAdd = document.createElement('button');
    buttonAdd.className = 'btn-add btn-add' + i;
    buttonAdd.textContent = 'Add card';
    buttonAdd.type = 'button';
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
;// ./src/js/Card.js
class Card {
  constructor() {}

  //  добавление элемента в список
  createCard(i) {
    const li = document.createElement('li');
    li.className = 'items-item';
    li.textContent = document.querySelector('.form-textarea' + i).value;
    const close = document.createElement('button');
    close.className = 'btn-item-close disable';
    close.textContent = 'x';

    // вешает слушатель при создании элемента
    li.addEventListener('mouseover', e => {
      li.querySelector('.btn-item-close').classList.remove('disable');
    });
    li.addEventListener('mouseout', e => {
      li.querySelector('.btn-item-close').classList.add('disable');
    });

    // слушатель на удаление элемента
    li.addEventListener('mouseup', e => {
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
  deleteCard() {}
}
;// ./src/js/app.js
// TODO: write code here




// создание формы
const app_form = new Form();
const trelloListAll = document.querySelectorAll('.trello-list');
trelloListAll.forEach((el, i) => {
  el.appendChild(app_form.createForm(i)); // добавляем форму  
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

addAnotherForm0.addEventListener('click', e => {
  e.preventDefault();
  formAdd0.classList.remove('disable'); // показываем форму
  addAnotherForm0.classList.add('disable'); // прячем кнопку
});
addAnotherForm1.addEventListener('click', e => {
  e.preventDefault();
  formAdd1.classList.remove('disable'); // показываем форму
  addAnotherForm1.classList.add('disable'); // прячем кнопку
});
addAnotherForm2.addEventListener('click', e => {
  e.preventDefault();
  formAdd2.classList.remove('disable'); // показываем форму
  addAnotherForm2.classList.add('disable'); // прячем кнопку
});

// добавляет элемент в список
addItem0.addEventListener('click', e => {
  e.preventDefault();
  if (textCard0.value === '') {
    formAdd0.classList.add('disable'); // прячем форму
    addAnotherForm0.classList.remove('disable'); // показываем кнопку    
    return;
  }
  ;
  card.createCard(0);
  formAdd0.classList.add('disable'); // прячем форму
  addAnotherForm0.classList.remove('disable'); // показываем кнопку
  clearForm0();
});
addItem1.addEventListener('click', e => {
  e.preventDefault();
  if (textCard1.value === '') {
    formAdd1.classList.add('disable'); // прячем форму
    addAnotherForm1.classList.remove('disable'); // показываем кнопку    
    return;
  }
  ;
  card.createCard(1);
  formAdd1.classList.add('disable'); // прячем форму
  addAnotherForm1.classList.remove('disable'); // показываем кнопку
  clearForm1();
});
addItem2.addEventListener('click', e => {
  e.preventDefault();
  if (textCard2.value === '') {
    formAdd2.classList.add('disable'); // прячем форму
    addAnotherForm2.classList.remove('disable'); // показываем кнопку    
    return;
  }
  ;
  card.createCard(2);
  formAdd2.classList.add('disable'); // прячем форму
  addAnotherForm2.classList.remove('disable'); // показываем кнопку
  clearForm2();
});

// закрывает форму
formClose0.addEventListener('click', e => {
  e.preventDefault();
  formAdd0.classList.add('disable'); // прячем форму
  addAnotherForm0.classList.remove('disable'); // показываем кнопку
  clearForm0();
});
formClose1.addEventListener('click', e => {
  e.preventDefault();
  formAdd1.classList.add('disable'); // прячем форму
  addAnotherForm1.classList.remove('disable'); // показываем кнопку
  clearForm1();
});
formClose2.addEventListener('click', e => {
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

itemsAll.forEach(items => {
  items.addEventListener('mousedown', e => {
    e.preventDefault();
    actualElement = e.target;
    actualElement.classList.add('dragged');

    // Вычисляем начальную позицию в момент нажатия  
    const rect = actualElement.getBoundingClientRect();
    offsetX = e.clientX + rect.left;
    offsetY = e.clientY + rect.top;

    // Устанавливаем начальную позицию  
    initialX = rect.left;
    initialY = rect.top;
    document.documentElement.addEventListener('mouseup', onMouseUp);
    document.documentElement.addEventListener('mouseover', onMouseOver);
  });
});
const onMouseOver = e => {
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
const onMouseUp = e => {
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
itemsElements.forEach(el => {
  el.addEventListener('mouseenter', e => {
    if (e.target.matches('.items-item') || e.target.closest('.items-item')) {
      e.target.querySelector('.btn-item-close').classList.remove('disable');
    }
  });
  el.addEventListener('mouseleave', e => {
    if (e.target.matches('.items-item') || e.target.closest('.items-item')) {
      e.target.querySelector('.btn-item-close').classList.add('disable');
    }
  });
});

// Удаляем элемент по клику
// itemsAll.forEach((el) => {
itemsElements.forEach(el => {
  el.addEventListener('mouseup', e => {
    // команда e.stopPropagation(); позволяет удалять и кнопки с X, но тогда ломается перемещение элементов.
    if (e.target.matches('.btn-item-close')) {
      if (el) {
        e.stopPropagation();
        el.remove();
      }
    }
  });
});
;// ./src/index.js



// TODO: write your code in app.js
})();

/******/ })()
;