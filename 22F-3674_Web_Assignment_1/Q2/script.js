document.getElementById("dark-mode-toggle").addEventListener("click", () => {
  document.body.classList.toggle("dark-mode");
});

document.addEventListener("DOMContentLoaded", () => {
  initializeApp();
});

const tasks = [];

function initializeApp() {
  document.getElementById("add-task").addEventListener("click", addTask);
  document
    .getElementById("tasks-container")
    .addEventListener("click", handleTaskAction);
  document
    .getElementById("completed-tasks-container")
    .addEventListener("click", handleTaskAction);
  document.getElementById("search-btn").addEventListener("click", renderTasks);
  updateTaskCount();
}

function addTask() {
  const taskName = document.getElementById("task-name").value.trim();
  const priority = document.getElementById("task-priority").value;

  if (!taskName) {
    alert("Task name cannot be empty!");
    return;
  }

  tasks.push({ name: taskName, priority, completed: false });
  document.getElementById("task-name").value = "";
  renderTasks();
}

function handleTaskAction(event) {
  if (event.target.classList.contains("complete-btn")) {
    completeTask(event.target.dataset.index);
  } else if (event.target.classList.contains("delete-btn")) {
    deleteTask(event.target.dataset.index);
  }
}

function completeTask(index) {
  tasks[index].completed = true;
  renderTasks();
}

function deleteTask(index) {
  tasks.splice(index, 1);
  renderTasks();
}

function renderTasks() {
  updateSearchContainerVisibility();
  const taskList = document.getElementById("tasks-container");
  const completedList = document.getElementById("completed-tasks-container");
  const searchValue = document
    .getElementById("search-task")
    .value.toLowerCase();
  const filterPriority = document.getElementById("filter-priority").value;

  taskList.innerHTML = "";
  completedList.innerHTML = "";

  const groupedTasks = tasks.reduce((acc, task, index) => {
    if (!task.completed) {
      acc[task.priority] = acc[task.priority] || [];
      acc[task.priority].push({ ...task, index });
    }
    return acc;
  }, {});

  ["High", "Medium", "Low"].forEach((priority) => {
    if (groupedTasks[priority]) {
      const prioritySection = document.createElement("div");
      prioritySection.innerHTML = `<h4>${priority} Priority</h4>`;
      groupedTasks[priority].forEach((task) => {
        if (
          task.name.toLowerCase().includes(searchValue) &&
          (!filterPriority || task.priority === filterPriority)
        ) {
          prioritySection.appendChild(createTaskElement(task, false));
        }
      });
      taskList.appendChild(prioritySection);
    }
  });

  tasks
    .filter((task) => task.completed)
    .forEach((task) => {
      if (
        task.name.toLowerCase().includes(searchValue) &&
        (!filterPriority || task.priority === filterPriority)
      ) {
        completedList.appendChild(createTaskElement(task, true));
      }
    });

  updateTaskCount();
}

function createTaskElement(task, isCompleted) {
  const taskElement = document.createElement("div");
  taskElement.classList.add("task");
  taskElement.innerHTML = `
        <span>${task.name}</span>
        ${
          isCompleted
            ? ""
            : `<button class="complete-btn" data-index="${task.index}">Complete</button>`
        }
        <button class="delete-btn" data-index="${task.index}">Delete</button>
    `;
  return taskElement;
}

function updateTaskCount() {
  const taskCount = tasks.filter((task) => !task.completed).length;
  document.getElementById("task-count").textContent = `${taskCount}`;
}

function updateSearchContainerVisibility() {
  const searchContainer = document.getElementById("search-container");
  if (tasks.length > 0) {
    searchContainer.style.display = "block";
  } else {
    searchContainer.style.display = "none";
  }
}