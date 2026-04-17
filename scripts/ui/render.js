import { createTaskElement } from "./taskElement.js";

/**
 * Finds the task container element based on task status.
 */
function getTaskContainerByStatus(status) {
  const column = document.querySelector(`.column-div[data-status="${status}"]`);
  return column ? column.querySelector(".tasks-container") : null;
}

/**
 * Clears all existing task-divs from all task containers.
 */
export function clearExistingTasks() {
  document.querySelectorAll(".tasks-container").forEach((container) => {
    container.innerHTML = "";
  });
}

/**
 * Renders tasks to their appropriate columns.
 */
export function renderTasks(tasks) {

  let todoCount = 0;
  let doingCount = 0;
  let doneCount = 0;

  tasks.forEach((task) => {
    const container = getTaskContainerByStatus(task.status);
    if (container) {
      const taskElement = createTaskElement(task);
      container.appendChild(taskElement);
      
      if (task.status === "todo") todoCount++;
      if (task.status === "doing") doingCount++;
      if (task.status === "done") doneCount++;
    }

  });

   // Update header texts
  const todoText = document.getElementById("toDoText");
  if (todoText) todoText.textContent = `TO DO (${todoCount})`;

  const doingText = document.getElementById("doingText");
  if (doingText) doingText.textContent = `IN PROGRESS (${doingCount})`;

  const doneText = document.getElementById("doneText");
  if (doneText) doneText.textContent = `DONE (${doneCount})`;
}
