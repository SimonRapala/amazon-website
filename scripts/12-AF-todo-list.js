const todoList = [];
document.addEventListener('keydown', (event) => {
  if (event.key === 'Enter'){
    addTodo();
  }
});

renderTodoList();

function renderTodoList(){
  let todoListHTML = [];

  todoList.forEach((todoObject, index) => {
    const {name, dueDate} = todoObject;
    const html = `
    <div>${name}</div>
    <div>${dueDate}</div>
    <div>
    <button class="delete-button js-delete-todo-button">Delete</button>
    </div>`;
    todoListHTML += html;
  });


  document.querySelector('.js-todo-list').innerHTML = todoListHTML;

  document.querySelectorAll('.js-delete-todo-button').forEach((deleteButton, index)=>{
    deleteButton.addEventListener('click', ()=>{
    todoList.splice(index, 1);
    renderTodoList();
    });
  });
  }

document.querySelector('.js-todo-add-button').addEventListener('click', () =>{
  addTodo();
})

function addTodo(){
  const inputElement = document.querySelector(".js-name-input");
  const dueDateElement = document.querySelector(".js-due-date-input");
  const name = inputElement.value;
  const dueDate = dueDateElement.value;
  todoList.push({name, dueDate});
  inputElement.value = "";
  dueDateElement.value = '';

  renderTodoList();
}
