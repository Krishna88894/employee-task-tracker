// Select elements
const taskForm = document.getElementById("taskForm");
const taskTitle = document.getElementById("taskTitle");
const taskDesc = document.getElementById("taskDesc");
const taskPriority = document.getElementById("taskPriority");
const taskStatus = document.getElementById("taskStatus");
const taskContainer = document.querySelector(".tasks");

// Load tasks on page load
document.addEventListener("DOMContentLoaded", loadTasks);

// Add task
taskForm.addEventListener("submit", function (e) {
  e.preventDefault();

  if (
    taskTitle.value === "" ||
    taskDesc.value === "" ||
    taskPriority.value === "" ||
    taskStatus.value === ""
  ) {
    alert("Please fill all fields");
    return;
  }

  const task = {
    id: Date.now(),
    title: taskTitle.value,
    description: taskDesc.value,
    priority: taskPriority.value,
    status: taskStatus.value,
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
