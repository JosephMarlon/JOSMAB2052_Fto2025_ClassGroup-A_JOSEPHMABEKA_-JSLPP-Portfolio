import {
  loadTasksFromStorage,
  saveTasksToStorage,
} from "../utils/localStorage.js";
import { clearExistingTasks, renderTasks } from "../ui/render.js";
import { resetForm } from "./formUtils.js";

export function addNewTask() {
  const title = document.getElementById("title-input").value.trim();
  const description = document.getElementById("desc-input").value.trim();
  const status = document.getElementById("select-status").value;
  const overlay = document.querySelector(".modal-overlay");

  if (!title) return;

  const tasks = loadTasksFromStorage();
  const newTask = {
    id: tasks.length ? Math.max(...tasks.map((t) => t.id)) + 1 : 1,
    title,
    description,
    status,
    board: "Launch Career"
  };

  const updatedTasks = [...tasks, newTask];
  saveTasksToStorage(updatedTasks);

  clearExistingTasks();
  renderTasks(updatedTasks);
  resetForm();
  overlay.close();
}

export function saveTaskChanges(taskId) {
  const tasks = loadTasksFromStorage();
  const taskIndex = tasks.findIndex((t) => t.id === taskId);
  if (taskIndex > -1) {
    tasks[taskIndex].title = document.getElementById("task-title").value.trim();
    tasks[taskIndex].description = document.getElementById("task-desc").value.trim();
    tasks[taskIndex].status = document.getElementById("task-status").value;

    saveTasksToStorage(tasks);
    clearExistingTasks();
    renderTasks(tasks);
    document.getElementById("task-modal").close();
  }
}

export function deleteTask(taskId) {
  const tasks = loadTasksFromStorage();
  const updatedTasks = tasks.filter((t) => t.id !== taskId);

  saveTasksToStorage(updatedTasks);
  clearExistingTasks();
  renderTasks(updatedTasks);
  document.getElementById("task-modal").close();
}
