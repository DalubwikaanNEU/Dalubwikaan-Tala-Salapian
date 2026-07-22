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

apiKey: "AIzaSyDx5TR1i1YZZsK4JqlvCmuR_0U6H1d3Mr80",

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



if(!container) return;



try{


const projectQuery = query(

collection(db,"projects"),

orderBy("createdAt","desc")

);



const snapshot =
await getDocs(projectQuery);



container.innerHTML = "";



if(snapshot.empty){


container.innerHTML = `


<div class="projectCard">


<h3>
📭 No Projects Yet
</h3>


<p>
No projects have been posted.
</p>


</div>


`;


return;


}






snapshot.forEach((doc)=>{


const data = doc.data();





const budget =
Number(data.budget || 0);



const spent =
Number(data.spent || 0);



const remaining =
budget - spent;




let percentage = 0;



if(budget > 0){

percentage =
(spent / budget) * 100;

}




if(percentage > 100){

percentage = 100;

}






let statusBadge = "";



if(data.status === "Completed"){


statusBadge =
"🟢 Completed";


}

else if(data.status === "Ongoing"){


statusBadge =
"🟡 Ongoing";


}

else{


statusBadge =
"🔵 Planning";


}








container.innerHTML += `



<div class="projectCard">



<h2>

📂 ${data.title || "Untitled Project"}

</h2>




<h4>

${statusBadge}

</h4>





<p>

${data.description || "No description available."}

</p>





<hr>





<p>

💰 Budget:

<strong>
₱${budget.toLocaleString()}
</strong>

</p>





<p>

💸 Spent:

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







<div class="progressContainer">


<div class="progressBar"

style="width:${percentage}%">

</div>


</div>





<p>

Progress:
${percentage.toFixed(0)}%

</p>





</div>



`;



});





}

catch(error){


console.error(
"Project Loading Error:",
error
);



container.innerHTML = `


<div class="projectCard">


<h3>
❌ Failed to Load Projects
</h3>


<p>
${error.message}
</p>


</div>


`;



}



}





loadProjects();
