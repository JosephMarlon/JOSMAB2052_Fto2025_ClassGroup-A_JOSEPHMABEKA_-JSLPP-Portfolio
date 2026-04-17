
import { addNewTask, saveTaskChanges, deleteTask } from "../tasks/taskManager.js";

let activeTaskId = null;

export function setupModalCloseHandler() {
  const modal = document.getElementById("task-modal");
  const closeBtn = document.getElementById("close-modal-btn");
  closeBtn.addEventListener("click", () => modal.close());
}

export function setupNewTaskModalHandler() {
  const overlay = document.querySelector(".modal-overlay");
  const newTaskBtn = document.getElementById("add-new-task-btn");
  const form = document.querySelector(".modal-window");
  const cancelBtn = document.getElementById("cancel-add-btn");

  newTaskBtn.addEventListener("click", () => {
    overlay.style.visibility = "visible";
    overlay.showModal();
  });

  cancelBtn.addEventListener("click", () => overlay.close());

  form.addEventListener("submit", (e) => {
    e.preventDefault();
    if (form.checkValidity()) {
      addNewTask();
    } else {
      form.reportValidity();
    }
  });
}

export function setupEditAndDeleteTaskHandler() {
  const saveBtn = document.getElementById("save-task-changes-btn");
  const deleteBtn = document.getElementById("delete-task-btn");

  if (saveBtn) {
    saveBtn.addEventListener("click", (e) => {
      e.preventDefault();
      if (activeTaskId !== null) saveTaskChanges(activeTaskId);
    });
  }

  if (deleteBtn) {
    deleteBtn.addEventListener("click", (e) => {
      e.preventDefault();
      if (activeTaskId !== null) deleteTask(activeTaskId);
    });
  }
}

export function openTaskModal(task) {
  activeTaskId = task.id;
  const modal = document.getElementById("task-modal");
  document.getElementById("task-title").value = task.title;
  document.getElementById("task-desc").value = task.description;
  document.getElementById("task-status").value = task.status;
  modal.showModal();
}
