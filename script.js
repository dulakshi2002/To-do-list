// Get elements from the DOM
const taskInput = document.getElementById("task-input");
const addTaskButton = document.getElementById("add-task-button");
const taskList = document.getElementById("task-list");
const noTasksMessage = document.getElementById("no-tasks-message");
const successMessage = document.getElementById("success-message");

// Add event listener to the "Add Task" button
addTaskButton.addEventListener("click", addTask);

// Function to check if the task list is empty and toggle the message
function updateNoTasksMessage() {
  if (taskList.children.length === 0) {
    noTasksMessage.style.display = "block";
  } else {
    noTasksMessage.style.display = "none";
  }
}

// Call the function initially to show the message if there are no tasks
updateNoTasksMessage();

// Show success message briefly
function showSuccessMessage() {
  successMessage.style.display = "block";
  setTimeout(() => {
    successMessage.style.display = "none";
  }, 2000);
}

// Function to add a new task
function addTask() {
  const taskText = taskInput.value.trim();
  if (taskText === "") return;

  const taskItem = document.createElement("li");
  taskItem.classList.add("task-item");

  // Task text element
  const taskTextElement = document.createElement("span");
  taskTextElement.classList.add("task-text");
  taskTextElement.textContent = taskText;

  // Toggle completed state when task is clicked
  taskTextElement.addEventListener("click", () => {
    taskItem.classList.toggle("completed");
  });

  // Edit button
  const editButton = document.createElement("button");
  editButton.classList.add("edit-button");
  editButton.innerHTML = "✏️";
  editButton.addEventListener("click", () => {
    const newTaskText = prompt("Edit your task:", taskTextElement.textContent);
    if (newTaskText !== null && newTaskText.trim() !== "") {
      taskTextElement.textContent = newTaskText.trim();
    }
  });

  // Delete button
  const deleteButton = document.createElement("button");
  deleteButton.classList.add("delete-button");
  deleteButton.innerHTML = "🗑️";
  deleteButton.addEventListener("click", () => {
    taskList.removeChild(taskItem);
    updateNoTasksMessage();
  });

  // Append elements to the task item
  taskItem.appendChild(taskTextElement);
  taskItem.appendChild(editButton);
  taskItem.appendChild(deleteButton);

  // Add the task item to the list
  taskList.appendChild(taskItem);

  // Clear the input and show success message
  taskInput.value = "";
  showSuccessMessage();

  // Hide the "no tasks" message
  updateNoTasksMessage();
}
