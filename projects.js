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



console.log("📂 Projects Firebase Connected!");





// ================= LOAD PROJECTS =================


async function loadProjects(){


const container =
document.getElementById("projectList");



if(!container){

console.error("Project container not found");

return;

}



try{


const snapshot =
await getDocs(
collection(db,"projects")
);



container.innerHTML = "";





if(snapshot.empty){


container.innerHTML = `


<div class="expense">


<p>
No projects available yet.
</p>


</div>


`;

return;


}






snapshot.forEach((item)=>{


const project = item.data();




let statusClass = "";



if(project.status === "Completed"){


statusClass = "completed";


}

else if(project.status === "Ongoing"){


statusClass = "ongoing";


}

else{


statusClass = "planning";


}






let budget =
Number(project.budget || 0);



let spent =
Number(project.spent || 0);



let remaining =
budget - spent;



let progress = 0;



if(budget > 0){

progress =
(spent / budget) * 100;

}





if(progress > 100){

progress = 100;

}







container.innerHTML += `


<div class="projectCard">



<div class="projectHeader">


<h2>
📂 ${project.title || "Untitled Project"}
</h2>


<span class="status ${statusClass}">
${project.status || "Planning"}
</span>


</div>





<p>

${project.description || "No description available."}

</p>






<div class="projectFinance">


<p>
💰 Budget:
<strong>
₱${budget.toLocaleString()}
</strong>
</p>



<p>
💸 Used:
<strong>
₱${spent.toLocaleString()}
</strong>
</p>



<p>
💵 Remaining:
<strong>
₱${remaining.toLocaleString()}
</strong>
</p>



</div>







<div class="progressContainer">


<div class="progressBar"
style="width:${progress}%">

</div>


</div>



<small>

${progress.toFixed(0)}% of budget utilized

</small>



</div>


`;



});



}



catch(error){


console.error(
"Project loading error:",
error
);



container.innerHTML = `


<div class="expense">

<p>
❌ Failed loading projects
</p>


<p>
${error.message}
</p>


</div>


`;



}



}





loadProjects();
