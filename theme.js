const button = document.getElementById("themeToggle");

// Load saved theme
const savedTheme = localStorage.getItem("theme");

if (savedTheme === "dark") {

    document.body.classList.add("dark");

    if (button) {

        button.innerHTML = "☀️ Light Mode";

    }

}

if (button) {

    button.addEventListener("click", () => {

        document.body.classList.toggle("dark");

        if (document.body.classList.contains("dark")) {

            localStorage.setItem("theme", "dark");

            button.innerHTML = "☀️ Light Mode";

        } else {

            localStorage.setItem("theme", "light");

            button.innerHTML = "🌙 Dark Mode";

        }

    });

}
