console.log("THEME JS LOADED");

const button = document.getElementById("themeToggle");


let savedTheme = localStorage.getItem("theme");


if(savedTheme === "dark"){

    document.body.classList.add("dark");

    button.innerHTML="☀️ Light Mode";

}



button.addEventListener("click",()=>{


    document.body.classList.toggle("dark");


    if(document.body.classList.contains("dark")){


        localStorage.setItem("theme","dark");

        button.innerHTML="☀️ Light Mode";


    }else{


        localStorage.setItem("theme","light");

        button.innerHTML="🌙 Dark Mode";


    }


});
