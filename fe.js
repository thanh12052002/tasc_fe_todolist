const input = document.getElementById("todo-input");
const addBtn = document.getElementById("add-btn");
const todoList = document.getElementById("todo-list-id");
const clearBtn = document.getElementById("clear-btn");

const searchInput = document.getElementById("search-input");
const searchBtn = document.getElementById("search-btn");

let listTodo = [];
let countId = 0;
let currentTarget = null;

// Thêm todo mới
addBtn.addEventListener("click", () => {
  const value = input.value.trim();
  if (!value) return;

  // Validate trùng tên
  if (
    listTodo.some((item) => item.content.toLowerCase() === value.toLowerCase())
  ) {
    alert("Task name already exists!");
    return;
  }

  addInput(value);
  addToListTodo();
  updateTaskCount();
  input.value = "";
});

// Clear All
clearBtn.addEventListener("click", () => {
  listTodo = [];
  addToListTodo();
  updateTaskCount();
});

// Search todo
searchBtn.addEventListener("click", () => {
  const query = searchInput.value.trim().toLowerCase();

  if (!query) {
    // Nếu ô search rỗng thì render lại tất cả
    renderList(listTodo);
    return;
  }

  const filtered = listTodo.filter((item) =>
    item.content.toLowerCase().includes(query)
  );
  renderList(filtered);
});

// Hàm thêm todo vào mảng
function addInput(content) {
  listTodo.push({ id: countId++, content });
}

// Hàm render danh sách
function addToListTodo() {
  renderList(listTodo);
}

function renderList(list) {
  todoList.innerHTML = list
    .map(
      (item) => `
      <div class="todo-item" data-id="${item.id}" draggable="true">
        <span>${item.content}</span>
        <button class="delete-btn">Delete</button>
      </div>
    `
    )
    .join("");

  // Thêm dragstart / dragend
  todoList.querySelectorAll(".todo-item").forEach((item) => {
    item.addEventListener("dragstart", (e) => {
      e.dataTransfer.setData("text/plain", item.dataset.id);
      item.classList.add("dragging");
    });
    item.addEventListener("dragend", (e) => {
      item.classList.remove("dragging");
    });
  });
}

// Cập nhật số task
function updateTaskCount() {
  const taskCount = document.getElementById("task-count");
  const count = listTodo.length;
  taskCount.textContent = `You have ${count} pending task${
    count > 1 ? "s" : ""
  }`;
}

// Xóa todo
todoList.addEventListener("click", (e) => {
  if (!e.target.classList.contains("delete-btn")) return;
  const itemDiv = e.target.closest(".todo-item");
  const id = parseInt(itemDiv.dataset.id);
  listTodo = listTodo.filter((item) => item.id !== id);
  addToListTodo();
  updateTaskCount();
});

// Drag & Drop
todoList.addEventListener("dragover", (e) => e.preventDefault());

todoList.addEventListener("dragenter", (e) => {
  const item = e.target.closest(".todo-item");
  if (!item) return;
  if (currentTarget !== item) {
    item.classList.add("active");
    currentTarget = item;
  }
});

todoList.addEventListener("dragleave", (e) => {
  const item = e.target.closest(".todo-item");
  if (!item) return;
  const related = e.relatedTarget;
  if (related && item.contains(related)) return;
  item.classList.remove("active");
  if (currentTarget === item) currentTarget = null;
});

todoList.addEventListener("drop", (e) => {
  e.preventDefault();
  const dropItem = e.target.closest(".todo-item");
  if (!dropItem) return;

  const draggedId = parseInt(e.dataTransfer.getData("text/plain"));
  const dropId = parseInt(dropItem.dataset.id);
  if (draggedId === dropId) return;

  const draggedIndex = listTodo.findIndex((item) => item.id === draggedId);
  const dropIndex = listTodo.findIndex((item) => item.id === dropId);
  const [draggedItem] = listTodo.splice(draggedIndex, 1);
  listTodo.splice(dropIndex, 0, draggedItem);

  addToListTodo();
  updateTaskCount();

  dropItem.classList.remove("active");
  if (currentTarget === dropItem) currentTarget = null;
});
