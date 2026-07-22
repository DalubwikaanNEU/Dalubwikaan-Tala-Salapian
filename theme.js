// ===========================
// DALUBWIKAAN THEME SYSTEM
// ===========================

const themeBtn = document.getElementById("themeToggle");

// Load saved theme
const savedTheme = localStorage.getItem("theme");

if (savedTheme === "dark") {
    document.body.classList.add("dark-mode");

    if (themeBtn) {
        themeBtn.innerHTML = "☀️ Light Mode";
    }
} else {
    document.body.classList.remove("dark-mode");

    if (themeBtn) {
        themeBtn.innerHTML = "🌙 Dark Mode";
    }
}

// Toggle Theme
if (themeBtn) {

    themeBtn.addEventListener("click", () => {

        document.body.classList.toggle("dark-mode");

        if (document.body.classList.contains("dark-mode")) {

            localStorage.setItem("theme", "dark");
            themeBtn.innerHTML = "☀️ Light Mode";

        } else {

            localStorage.setItem("theme", "light");
            themeBtn.innerHTML = "🌙 Dark Mode";

        }

    });

}
