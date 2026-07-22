import { initializeApp } 
from "https://www.gstatic.com/firebasejs/11.0.2/firebase-app.js";


import { 
getAuth,
onAuthStateChanged 
} 
from "https://www.gstatic.com/firebasejs/11.0.2/firebase-auth.js";



const firebaseConfig = {

apiKey: "AIzaSyDx5TRi1YZZsK4JqlvCmuR_0U6H1d3Mr80",

authDomain: "dalubwikaan--26-8e646.firebaseapp.com",

projectId: "dalubwikaan--26-8e646",

storageBucket: "dalubwikaan--26-8e646.firebasestorage.app",

messagingSenderId: "409516392020",

appId: "1:409516392020:web:87d462a5927449c69eb7c1"

};



const app = initializeApp(firebaseConfig);

const auth = getAuth(app);



console.log("🔐 Auth Guard Loaded");



onAuthStateChanged(auth,(user)=>{


console.log("Current Admin:", user);



if(!user){


alert("🔒 Admin access only");


window.location.href = "login.html";


}


});
