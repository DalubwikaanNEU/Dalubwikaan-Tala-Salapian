import { initializeApp } from "https://www.gstatic.com/firebasejs/11.0.2/firebase-app.js";

import {
    getFirestore,
    collection,
    getDocs
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



console.log("📢 Announcement Firebase Connected!");






// ================= LOAD ANNOUNCEMENTS =================



async function loadAnnouncements(){


const container =
document.getElementById("announcementList");



if(!container){

console.error("Announcement container not found");

return;

}



try{



const snapshot =
await getDocs(
collection(db,"announcements")
);




container.innerHTML = "";





if(snapshot.empty){


container.innerHTML = `

<div class="expense">

<p>
No announcements yet.
</p>

</div>

`;

return;


}





let announcements = [];



snapshot.forEach((doc)=>{


announcements.push(doc.data());


});





// SORT NEWEST FIRST

announcements.sort((a,b)=>{


let dateA =
a.createdAt?.seconds || 0;


let dateB =
b.createdAt?.seconds || 0;


return dateB - dateA;


});







announcements.forEach((data)=>{



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







let postedDate = "No date";



if(data.createdAt){


if(data.createdAt.seconds){


postedDate =
new Date(
data.createdAt.seconds * 1000
).toLocaleDateString();


}

}





container.innerHTML += `


<div class="expense announcementCard">


<h2>
📢 ${data.title || "Untitled"}
</h2>



<h4>
${badge}
</h4>



<p>
${data.message || ""}
</p>



<small>
📅 Posted: ${postedDate}
</small>



</div>


`;



});




}


catch(error){


console.error(
"Announcement loading error:",
error
);



container.innerHTML = `

<div class="expense">

<p>
❌ Error loading announcements
</p>

<p>
${error.message}
</p>

</div>

`;



}



}







loadAnnouncements();
