import { initializeApp } from "https://www.gstatic.com/firebasejs/11.0.2/firebase-app.js";


import {

getFirestore,

collection,

getDocs,

query,

orderBy

} from "https://www.gstatic.com/firebasejs/11.0.2/firebase-firestore.js";




// ================= FIREBASE =================


const firebaseConfig = {

apiKey: "AIzaSyDx5TR1iYZZsK4JqlvCmuR_0U6H1d3Mr80",

authDomain: "dalubwikaan--26-8e646.firebaseapp.com",

projectId: "dalubwikaan--26-8e646",

storageBucket: "dalubwikaan--26-8e646.firebasestorage.app",

messagingSenderId: "409516392020",

appId: "1:409516392020:web:87d462a5927449c69eb7c1"

};



const app = initializeApp(firebaseConfig);


const db = getFirestore(app);



console.log("📢 Announcement Connected!");






// ================= LOAD ANNOUNCEMENTS =================



async function loadAnnouncements(){



const container =
document.getElementById("announcementList");



try{



const q = query(

collection(db,"announcements"),

orderBy("createdAt","desc")

);



const snapshot = await getDocs(q);



container.innerHTML = "";





if(snapshot.empty){


container.innerHTML = `

<p>
No announcements yet.
</p>

`;


return;


}







snapshot.forEach((doc)=>{



const data = doc.data();



let badge = "";



if(data.priority === "High"){


badge = "🔴 HIGH";


}


else if(data.priority === "Medium"){


badge = "🟡 MEDIUM";


}


else{


badge = "🟢 LOW";


}







let date = "";



if(data.createdAt){


date = new Date(

data.createdAt.seconds * 1000

).toLocaleDateString();



}







container.innerHTML += `



<div class="expense announcementCard">



<h2>

${data.title}

</h2>




<h4>

${badge}

</h4>




<p>

${data.message}

</p>




<small>

📅 Posted: ${date}

</small>



</div>



`;



});



}

catch(error){



console.error(
"Announcement Error:",
error
);



container.innerHTML = `

<p>
Failed to load announcements.
</p>

`;



}



}






loadAnnouncements();
