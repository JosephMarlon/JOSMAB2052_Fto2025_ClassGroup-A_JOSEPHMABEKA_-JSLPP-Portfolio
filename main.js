import { loadTasksFromStorage } from "./utils/localStorage.js";
import { clearExistingTasks, renderTasks } from "./ui/render.js";
import {
  setupModalCloseHandler,
  setupNewTaskModalHandler,
} from "./ui/modalHandlers.js";



function setupThemeToggle() {
  const themeCheckbox = document.getElementById("theme-checkbox");
  const isDark = localStorage.getItem("dark-theme") === "true";
  
  if (isDark) {
    document.body.classList.add("dark-theme");
    if(themeCheckbox) themeCheckbox.checked = true;
  }
  
  if (themeCheckbox) {
    themeCheckbox.addEventListener("change", (e) => {
      if (e.target.checked) {
        document.body.classList.add("dark-theme");
        localStorage.setItem("dark-theme", "true");
      } else {
        document.body.classList.remove("dark-theme");
        localStorage.setItem("dark-theme", "false");
      }
    });
  }
}

function setupSidebarToggle() {
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

function initTaskBoard() {
  const tasks = loadTasksFromStorage();
  clearExistingTasks();
  renderTasks(tasks);
  setupModalCloseHandler();
  setupNewTaskModalHandler();
  setupEditAndDeleteTaskHandler();
  setupThemeToggle();
  setupSidebarToggle();
}





document.addEventListener("DOMContentLoaded", initTaskBoard);
