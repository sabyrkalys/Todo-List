'use strict';

const todoControl = document.querySelector('.todo-control'),
  headerInput = document.querySelector('.header-input'),
  todoList = document.querySelector('.todo-list'),
  todoCompleted = document.querySelector('.todo-completed');
//textTodo = document.querySelectorAll('.text-todo');
let todoData = [];



let render = function () {
  todoList.textContent = '';
  todoCompleted.textContent = '';

  todoData.forEach(function (item, i) {
    const li = document.createElement('li');
    li.classList.add('todo-item');

    li.innerHTML = `<span class="text-todo"> ${item.value} </span>
        <div class="todo-buttons">
        <button class="todo-remove" id =${i}></button>
        <button class="todo-complete"></button>
        </div>`;

    if (item.completed) {
      todoCompleted.append(li);
    } else {
      todoList.append(li);
    }

    const btnTodoComplete = li.querySelector('.todo-complete');
    btnTodoComplete.addEventListener('click', function () {
      item.completed = !item.completed;
      localStorage.setItem('todo', JSON.stringify(todoData));
      render();
    });

    let btnTodoRemove = li.querySelector('.todo-remove');
    btnTodoRemove.addEventListener('click', function () {
      let index = todoData.indexOf(item);

      if (index > -1) {
        todoData.splice(i, 1);
      }
      localStorage.setItem('todo', JSON.stringify(todoData));
      render();
    });
  });
};
if (localStorage.getItem('todo')) {
  todoData = JSON.parse(localStorage.getItem('todo'));
  render();
}

todoControl.addEventListener('submit', function (event) {
  event.preventDefault();
  const newTodo = {
    value: headerInput.value,
    completed: false
  }
  if (headerInput.value.trim() === '') {
    headerInput.classList.add('input-border');
    alert('Добавьте дело/задачу');
  } else {
    headerInput.classList.remove('input-border');
    todoData.push(newTodo);
    restart();
    //headerInput.value = "";
    render();
    localStorage.setItem('todo', JSON.stringify(todoData));
  }

});

let restart = function () {
  if (headerInput.value !== '') {
    headerInput.value = "";
  } else {
    return false;
  }
};