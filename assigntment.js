const data = [
  {
    name: "David Lee",
    role: "Backend Engineer",
    image: "https://source.unsplash.com/100x100/?face,developer",
  },
  {
    name: "Sophie Chen",
    role: "Data Analyst",
    image: "https://source.unsplash.com/100x100/?face,analyst",
  },
  {
    name: "Mark O'Connell",
    role: "DevOps Specialist",
    image: "https://source.unsplash.com/100x100/?face,engineer",
  },
];

const ul = document.querySelector(".user-list");
let currentTarget = null;
let current_pos = null;
let drop_pos = null;

// Hàm tạo danh sách
function createListElements() {
  ul.innerHTML = ""; // xóa UL trước khi render lại
  data.forEach((person, index) => {
    const li = document.createElement("li");
    li.setAttribute("list-pos", index);
    li.innerHTML = `
      <div class="user">
        <img src="${person.image}" alt="">
        <div class="info">
          <h2>${person.name}</h2>
          <p>${person.role}</p>
        </div>
      </div>
    `;
    li.draggable = true;

    // Drag start
    li.addEventListener("dragstart", (e) => {
      const liEl = e.target.closest("li");
      current_pos = Number(liEl.getAttribute("list-pos"));
      liEl.classList.add("dragging");
    });

    // Drag end
    li.addEventListener("dragend", (e) => {
      const liEl = e.target.closest("li");
      liEl.classList.remove("dragging");
    });

    ul.appendChild(li);
  });
}

// Render danh sách lần đầu
createListElements();

// Event delegation trên UL
ul.addEventListener("dragover", (e) => e.preventDefault());

ul.addEventListener("dragenter", (e) => {
  const li = e.target.closest("li");
  if (!li) return;
  if (currentTarget !== li) {
    li.classList.add("active");
    currentTarget = li;
  }
});

ul.addEventListener("dragleave", (e) => {
  const li = e.target.closest("li");
  if (!li) return;
  const related = e.relatedTarget;
  if (related && li.contains(related)) return; // tránh nhấp nháy
  li.classList.remove("active");
  if (currentTarget === li) currentTarget = null;
});

ul.addEventListener("drop", (e) => {
  const li = e.target.closest("li");
  if (!li) return;
  drop_pos = Number(li.getAttribute("list-pos"));

  console.log("Dragged from:", current_pos, "Dropped on:", drop_pos);

  // 1. Cập nhật dữ liệu
  const item = data.splice(current_pos, 1)[0];
  data.splice(drop_pos, 0, item);

  // 2. Render lại DOM
  createListElements();

  li.classList.remove("active");
  if (currentTarget === li) currentTarget = null;

  e.preventDefault();
});
