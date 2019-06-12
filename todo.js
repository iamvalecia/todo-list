
var todoUl = document.getElementById('todoUl');
var newTodo = document.getElementById('newTodo');
    
function addItem() {
    todoLi = document.createElement('li');
    todoSpan = document.createElement('span');
    todoSpan.style.textDecoration = 'none';
    todoEditInput = document.createElement('input');
    todoEditInput.style.display = 'none';
    todoSpan.innerHTML = newTodo.value;
    todoSpan.setAttribute('onclick', 'strikeOut(this)');
    var editButton = document.createElement('button');
    editButton.textContent = "Edit";
    editButton.setAttribute('onclick', 'editTodo(this)');
    var deleteButton = document.createElement('button');
    deleteButton.textContent = 'Delete';
    deleteButton.className = 'deleteButton';
    deleteButton.setAttribute('onclick', 'deleteTodo(this)');
    todoUl.appendChild(todoLi);
    todoLi.appendChild(todoEditInput);
    todoLi.appendChild(todoSpan);
    todoLi.appendChild(editButton);
    todoLi.appendChild(deleteButton);
    newTodo.value = "";
    saveList();
}

function editTodo(thisEditButton) {
  thisEditButton.textContent = 'Done';
  var thisLi = thisEditButton.parentNode;
  var thisTodoEditInput = thisLi.firstChild;
  thisTodoEditInput.style.display = 'inline';
  thisSpan = thisTodoEditInput.nextSibling;
  thisSpan.style.display = 'none';
  thisTodoEditInput.value = thisSpan.textContent;
  thisEditButton.setAttribute('onclick', 'editComplete(this)');
  // runnung saveList() has no effect
}

function editComplete(thisEditButton) {
  thisEditButton.textContent = "Edit";
  var thisLi = thisEditButton.parentNode;
  var thisTodoEditInput = thisLi.firstChild;
  thisSpan = thisTodoEditInput.nextSibling;
  thisSpan.textContent = thisTodoEditInput.value;
  thisSpan.style.display = 'inline';
  thisTodoEditInput.style.display = 'none';
  thisEditButton.setAttribute('onclick', 'editTodo(this)');
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
