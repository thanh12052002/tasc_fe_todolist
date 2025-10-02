//object dom
const input = document.getElementById("todo-input");
const addBtn = document.getElementById("add-btn");
const todoList = document.getElementById("todo-list-id");
const clearBtn = document.getElementById("clear-btn");
//variable global
let listTodo = [];
let countId = 0;
//

addBtn.addEventListener("click", handleClickAddBtn);

function handleClickAddBtn(e) {
  console.log(`đối tượng xử lý: ${e.target} - sự kiện xử lý: ${e}`);
  addInput(input.value.trim());
  addToListTodo();
  updateTaskCount();
}
//add Input when click add button
function addInput(inputTodo) {
  var objectInput = {
    id: countId++,
    content: inputTodo,
  };
  listTodo.push(objectInput);
}
//handle render
function addToListTodo() {
  const todoHTML = listTodo
    .map((item) => {
      return `
        <div class="todo-item" data-id="${item.id}">
            <span>${item.content}</span>
            <button class="delete-btn">Delete</button>
        </div>
        `;
    })
    .join("");
  todoList.innerHTML = todoHTML;
}
//
function updateTaskCount() {
  let taskCount = document.getElementById("task-count");
  let count = todoList.children.length;
  taskCount.textContent = `You have ${count} pending task${
    count > 1 ? "s" : ""
  }`;
}

//handle delete
todoList.addEventListener("click", (e) => {
  //get object target
  const objectTarget = e.target;
  //kiem tra class thuoc delete-btn
  if (objectTarget.classList.contains("delete-btn")) {
    //get id qua phan tu parent
    const objectParent = objectTarget.closest(".todo-item");
    let deleteId = parseInt(objectParent.dataset.id);
    //xoa Item
    listTodo = listTodo.filter((item) => item.id != deleteId);
    //update DoM
    objectParent.remove();
    updateTaskCount();
  }
});
