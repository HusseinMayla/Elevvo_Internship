const themeToggle = document.getElementById("themeToggle");
themeToggle.addEventListener("click", () => {
  const root = document.documentElement;
  const current = root.getAttribute("data-bs-theme");
  const next = current === "dark" ? "light" : "dark";
  root.setAttribute("data-bs-theme", next);
  themeToggle.textContent = next === "dark" ? "☀️ Light Mode" : "🌙 Dark Mode";
  themeToggle.classList.toggle("btn-outline-dark");
  themeToggle.classList.toggle("btn-outline-light");
});
