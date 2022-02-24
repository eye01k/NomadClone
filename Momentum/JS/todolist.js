const todoForm = document.querySelector('#todo-form');
const todoInput = todoForm.querySelector('input')
const todoList = document.querySelector('#todo-list');

let todos = [];

function saveTodos(){
  localStorage.setItem('todos', JSON.stringify(todos));
}

function deleteTodo(event){
  const li = event.target.parentElement;
  li.remove();
  todos = todos.filter(toDo => toDo.id !== parseInt(li.id));
  saveTodos();
}

function paintTodo(newTodo){
  const li = document.createElement('li');
  li.id = newTodo.id;
  const span = document.createElement('span');
  span.innerText = newTodo.text;
  const deleteButton = document.createElement('button');
  deleteButton.innerText = '❌';
  deleteButton.addEventListener('click', deleteTodo);
  li.appendChild(span);
  li.appendChild(deleteButton);
  todoList.appendChild(li);
}

function handleSubmitEvent (event){
  event.preventDefault();
  const newTodo = todoInput.value;
  todoInput.value = '';
  const newTodoObj = {
    text : newTodo,
    id : Date.now(),
  };
  todos.push(newTodoObj);
  paintTodo(newTodoObj);
  saveTodos();
}

todoForm.addEventListener('submit', handleSubmitEvent);

const savedTodos = localStorage.getItem('todos');

if(savedTodos !== null){
  const parsedTodos = JSON.parse(savedTodos);
  todos = parsedTodos;
  parsedTodos.forEach(paintTodo);
}
