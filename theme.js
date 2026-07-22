// ===========================
// DALUBWIKAAN THEME SYSTEM
// ===========================


document.addEventListener(
"DOMContentLoaded",
()=>{


const themeBtn =
document.getElementById("themeToggle");



const savedTheme =
localStorage.getItem("dalubTheme");




// LOAD SAVED THEME

if(savedTheme === "dark"){


document.body.classList.add(
"dark-mode"
);



if(themeBtn){

themeBtn.innerHTML =
"☀️ Light Mode";

}


}


else{


document.body.classList.remove(
"dark-mode"
);



if(themeBtn){

themeBtn.innerHTML =
"🌙 Dark Mode";

}


}







// TOGGLE BUTTON


if(themeBtn){


themeBtn.addEventListener(
"click",
()=>{


document.body.classList.toggle(
"dark-mode"
);



const isDark =
document.body.classList.contains(
"dark-mode"
);





if(isDark){


localStorage.setItem(
"dalubTheme",
"dark"
);



themeBtn.innerHTML =
"☀️ Light Mode";



}


else{


localStorage.setItem(
"dalubTheme",
"light"
);



themeBtn.innerHTML =
"🌙 Dark Mode";


}



}

);



}



}

);
