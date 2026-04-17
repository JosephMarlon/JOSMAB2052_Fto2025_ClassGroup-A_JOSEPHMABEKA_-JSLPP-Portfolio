import { loadTasksFromStorage } from "./utils/localStorage.js";
import { clearExistingTasks, renderTasks } from "./ui/render.js";
import {
  setupModalCloseHandler,
  setupNewTaskModalHandler,
} from "./ui/modalHandlers.js";

function initTaskBoard() {
  const tasks = loadTasksFromStorage();
  clearExistingTasks();
  renderTasks(tasks);
  setupModalCloseHandler();
  setupNewTaskModalHandler();

  // Sidebar toggling logic
  const hideSidebarBtn = document.getElementById("hide-sidebar-btn");
  const showSidebarBtn = document.getElementById("show-sidebar-btn");
  const sidebar = document.getElementById("side-bar-div");

  if(hideSidebarBtn && showSidebarBtn && sidebar) {
    hideSidebarBtn.addEventListener("click", () => {
      sidebar.style.display = "none";
      showSidebarBtn.style.display = "flex";
    });

    showSidebarBtn.addEventListener("click", () => {
      sidebar.style.display = "flex";
      showSidebarBtn.style.display = "none";
    });
  }
}

document.addEventListener("DOMContentLoaded", initTaskBoard);
