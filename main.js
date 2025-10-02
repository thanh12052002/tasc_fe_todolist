//get object by document from id
const input = document.getElementById("todo-input");
const addBtn = document.getElementById("add-btn");
const todoList = document.getElementById("todo-list-id");
const taskCount = document.getElementById("task-count");
let listItem = [];
let counterId = 0;
//handle events click +
addBtn.addEventListener("click", addTodo);
function addTodo() {
  const text = input.value.trim();
  if (text == "") return;
  //tao item
  listItem.push();
  console.log(`Input nhap vao: ${input.value}`);
  const todoItem = document.createElement("div");
  todoItem.className = "todo-item";
  console.log(`todoItem: ${JSON.stringify(todoItem)}`);
  todoItem.innerHTML = `
    <span>${text}</span>
    <button class = "delete-btn">Delete</button>
  `;
  //
  console.log(`todoItem after innerHtml: ${todoItem.outerHTML}`);
  console.log(`todoList before appendChild: ${todoList.outerHTML}`);
  todoList.appendChild(todoItem);
  console.log(`todoList after appendChild: ${todoList.outerHTML}`);
  input.value = "";
  updateTaskCount();
}
function updateTaskCount() {
  console.log(
    `TodoList nhap vao: ${todoList} and ${JSON.stringify(todoList.children)}`
  );
  const count = todoList.children.length;
  taskCount.textContent = `You have ${count} pending task${
    count > 1 ? "s" : ""
  }`;
}
