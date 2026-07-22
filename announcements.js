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


console.log("📢 Announcement Firebase Connected!");





// ================= LOAD ANNOUNCEMENTS =================


async function loadAnnouncements(){


const container =
document.getElementById("announcementList");



if(!container) return;



try{


const announcementQuery = query(

collection(db,"announcements"),

orderBy("createdAt","desc")

);



const snapshot =
await getDocs(announcementQuery);



container.innerHTML = "";



if(snapshot.empty){


container.innerHTML = `

<div class="announcementCard">

<h3>
📭 No Announcements Yet
</h3>

<p>
There are currently no posted announcements.
</p>

</div>

`;


return;

}







let announcements = [];



snapshot.forEach((doc)=>{


const data = doc.data();


announcements.push(data);


});







// PRIORITY SORTING

const priorityRank = {

"High":1,

"Medium":2,

"Low":3

};



announcements.sort((a,b)=>{


return (

(priorityRank[a.priority] || 3)

-

(priorityRank[b.priority] || 3)

);

});








announcements.forEach((data)=>{



let badge = "";

let badgeClass = "";



if(data.priority === "High"){


badge = "🔴 HIGH";

badgeClass = "high";


}


else if(data.priority === "Medium"){


badge = "🟡 MEDIUM";

badgeClass = "medium";


}


else{


badge = "🟢 LOW";

badgeClass = "low";


}







let datePosted = "No date";



if(data.createdAt){



if(data.createdAt.seconds){


datePosted =
new Date(
data.createdAt.seconds * 1000
)
.toLocaleDateString(
"en-PH",
{
year:"numeric",
month:"long",
day:"numeric"
}
);


}


else if(data.createdAt instanceof Date){


datePosted =
data.createdAt.toLocaleDateString();


}


}









container.innerHTML += `


<div class="announcementCard fadeIn">


<div class="announcementHeader">


<h2>
📢 ${data.title || "Untitled Announcement"}
</h2>


<span class="priority ${badgeClass}">

${badge}

</span>


</div>




<p class="announcementMessage">

${data.message || "No message provided."}

</p>




<div class="announcementFooter">

📅 Posted: ${datePosted}

</div>



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


<div class="announcementCard">


<h3>
❌ Failed to Load Announcements
</h3>


<p>
${error.message}
</p>


</div>


`;



}



}




loadAnnouncements();
