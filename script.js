// Select elements
const taskForm = document.getElementById("taskForm");
const taskTitle = document.getElementById("title");
const taskDesc = document.getElementById("description");
const taskPriority = document.getElementById("priority");
const taskStatus = document.getElementById("status");
const taskContainer = document.querySelector(".tasks");

// Load tasks on page load
document.addEventListener("DOMContentLoaded", loadTasks);

// Add task
document.getElementById("taskForm").addEventListener("submit", function (e) {
  e.preventDefault();

  const title = document.getElementById("title").value;
  const description = document.getElementById("description").value;
  const priority = document.getElementById("priority").value;
  const status = document.getElementById("status").value;

  if (
    title === "" ||
    description === "" ||
    priority === "" ||
    status === ""
  ) {
    alert("Please fill all fields");
    return;
  }

  const task = {
    id: Date.now(),
    title: title,
    description: description,
    priority: priority,
    status: status,
  };

  saveTask(task);
  displayTask(task);
  taskForm.reset();
});

// Save task to LocalStorage
function saveTask(task) {
  let tasks = getTasks();
  tasks.push(task);
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

// Get tasks from LocalStorage
function getTasks() {
  return localStorage.getItem("tasks")
    ? JSON.parse(localStorage.getItem("tasks"))
    : [];
}

// Load tasks
function loadTasks() {
  let tasks = getTasks();
  tasks.forEach(displayTask);
}

// Display task
function displayTask(task) {
  const taskCard = document.createElement("div");
  taskCard.classList.add("task-card");

  taskCard.innerHTML = `
    <h3>${task.title}</h3>
    <p>${task.description}</p>
    <p><strong>Priority:</strong> ${task.priority}</p>
    <p><strong>Status:</strong> ${task.status}</p>
    <button onclick="deleteTask(${task.id})">Delete</button>
  `;

  taskContainer.appendChild(taskCard);
}

// Delete task
function deleteTask(id) {
  let tasks = getTasks().filter(task => task.id !== id);
  localStorage.setItem("tasks", JSON.stringify(tasks));
  taskContainer.innerHTML = "";
  loadTasks();
}
