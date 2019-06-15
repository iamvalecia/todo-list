
var todoUl = document.getElementById('todoUl');
var newTodo = document.getElementById('newTodo');

//allows keyboard control for addTodoButton
document.getElementById('newTodo').addEventListener("keydown", addTodoKeyDown, false);

function addTodoKeyDown(e) {
  if(e.keyCode === 13) {
    addTodo();
  }
};

//function allows us to get HTML UTF-8 characters via JS
function decodeHTML(html) {
	var txt = document.createElement('textarea');
	txt.innerHTML = html;
	return txt.value;
};

function addTodo() {
    todoLi = document.createElement('li');
    todoSpan = document.createElement('span');
    todoSpan.style.textDecoration = 'none';
    var todoEditInput = document.createElement('input');
    todoEditInput.className = 'todoEditInput'
    todoEditInput.style.display = 'none';
    todoSpan.innerHTML = newTodo.value;
    todoSpan.setAttribute('onclick', 'strikeOut(this)');
    var editButton = document.createElement('button');
    editButton.textContent = decodeHTML('&#x270E');
    editButton.className = 'editButton';
    editButton.setAttribute('ondblclick', 'editTodo(this)');
    var deleteButton = document.createElement('button');
    deleteButton.textContent = decodeHTML('&#x274c');
    deleteButton.className = 'deleteButton';
    deleteButton.setAttribute('ondblclick', 'deleteTodo(this)');
    todoUl.appendChild(todoLi);
    todoLi.appendChild(todoEditInput);
    todoLi.appendChild(todoSpan);
// this order helps with CSS 
    todoLi.appendChild(deleteButton);
    todoLi.appendChild(editButton);
    newTodo.value = "";
    saveList();
}

function editTodo(thisEditButton) {
  thisEditButton.textContent = decodeHTML('&#x2714')
  var thisLi = thisEditButton.parentNode;
  var thisTodoEditInput = thisLi.firstChild;
  thisTodoEditInput.style.display = 'inline';
  thisTodoEditInput.addEventListener("keydown", editCompleteKeyDown, false);
  thisSpan = thisTodoEditInput.nextSibling;
  thisSpan.style.display = 'none';
  thisTodoEditInput.value = thisSpan.textContent;
  thisEditButton.setAttribute('onclick', 'editComplete(this)');
  thisEditButton.removeAttribute('ondblclick')
}

// adds keyboard control to editTodoInput
function editCompleteKeyDown(e) {
  if(e.keyCode === 13) {
    var thisParent = this.parentNode;
    editComplete(thisParent.lastChild);
  }
};

function editComplete(thisEditButton) {
  thisEditButton.textContent = decodeHTML('&#x270E');
  var thisLi = thisEditButton.parentNode;
  var thisTodoEditInput = thisLi.firstChild;
  thisSpan = thisTodoEditInput.nextSibling;
  thisSpan.textContent = thisTodoEditInput.value;
  thisSpan.style.display = 'inline';
  thisTodoEditInput.style.display = 'none';
  thisEditButton.setAttribute('ondblclick', 'editTodo(this)');
  thisEditButton.removeAttribute('onclick')
  saveList();
}

function deleteTodo(todo) {
  document.getElementById("todoUl").removeChild(todo.parentNode);
  saveList();
}

function strikeOut(todo) {
    if (todo.style.textDecoration === 'none') {
    todo.style.textDecoration = 'line-through yellow double';
    } else {
    todo.style.textDecoration = 'none';
    }
    saveList();
}

function saveList() {
  window.localStorage.setItem('savedList', todoUl.innerHTML);
}
if(localStorage.getItem('savedList')) {
  var storedList = localStorage.getItem('savedList');
  todoUl.innerHTML = storedList;
} 
