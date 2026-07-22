// =====================================================
// DALUBWIKAAN TRANSPARENCY PORTAL
// DASHBOARD.JS PART 1/4
// FIREBASE CONNECTION + DASHBOARD LOADER
// =====================================================


// ================= FIREBASE IMPORT =================


import { initializeApp } 
from "https://www.gstatic.com/firebasejs/11.0.2/firebase-app.js";


import {

getFirestore,
collection,
getDocs

}
from "https://www.gstatic.com/firebasejs/11.0.2/firebase-firestore.js";




// ================= FIREBASE CONFIG =================


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



console.log("🔥 Dashboard Firebase Connected!");





// =====================================================
// ================= LOAD COLLECTIONS ==================
// =====================================================


async function loadCollections(){


const container =
document.getElementById("dashboardCollectionContainer");


if(!container)
return;



const snapshot =
await getDocs(
collection(db,"collections")
);



container.innerHTML="";



let total = 0;



snapshot.forEach(item=>{


const data=item.data();



const amount =

Number(data.firstYear || 0)

+

Number(data.secondYear || 0)

+

Number(data.thirdYear || 0)

+

Number(data.fourthYear || 0);



total += amount;




container.innerHTML += `


<div class="expense">


<h3>
💰 ${data.week || "Collection"}
</h3>


<p>
Collector:
${data.collector || "N/A"}
</p>


<p>
Amount:
₱${amount.toLocaleString()}
</p>


</div>


`;



});




// TOTAL COLLECTION DISPLAY


const totalCollection =
document.getElementById("totalCollection");


if(totalCollection){

totalCollection.innerHTML =
"₱" + total.toLocaleString();

}



}






// =====================================================
// ================= LOAD EXPENSES =====================
// =====================================================


async function loadExpenses(){


const container =
document.getElementById("dashboardExpenseContainer");


if(!container)
return;



const snapshot =
await getDocs(
collection(db,"expenses")
);



container.innerHTML="";



let totalExpense = 0;



snapshot.forEach(item=>{


const data=item.data();



totalExpense +=
Number(data.amount || 0);




container.innerHTML += `


<div class="expense">


<h3>
💸 ${data.title || "Expense"}
</h3>


<p>

Category:
${data.category || "N/A"}

</p>


<h3>

₱${Number(data.amount || 0)
.toLocaleString()}

</h3>


</div>


`;



});





const totalExpenses =
document.getElementById("totalExpenses");



if(totalExpenses){

totalExpenses.innerHTML =
"₱" + totalExpense.toLocaleString();

}



}






// =====================================================
// ================= INITIAL LOAD ======================
// =====================================================


loadCollections();

loadExpenses();



console.log(
"✅ Dashboard Loaded Successfully!"
);

// =====================================================
// DALUBWIKAAN TRANSPARENCY PORTAL
// DASHBOARD.JS PART 2/4
// PROJECTS + ANNOUNCEMENTS LOADER
// =====================================================



// =====================================================
// ================= LOAD PROJECTS =====================
// =====================================================


async function loadProjects(){


const container =
document.getElementById("dashboardProjectContainer");



if(!container)
return;



const snapshot =
await getDocs(
collection(db,"projects")
);



container.innerHTML="";



let totalProjects = 0;



snapshot.forEach(item=>{


const data=item.data();


totalProjects++;




let statusClass = "";


if(data.status === "Completed"){

statusClass="completed";

}

else if(data.status === "Ongoing"){

statusClass="ongoing";

}

else{

statusClass="planning";

}





container.innerHTML += `


<div class="projectCard">


<h3>
📂 ${data.title || "Untitled Project"}
</h3>



<p class="projectInfo">

${data.description || "No description available."}

</p>



<p class="projectBudget">

₱${Number(data.budget || 0)
.toLocaleString()}

</p>



<p>

💸 Spent:

₱${Number(data.spent || 0)
.toLocaleString()}

</p>




<span class="badge ${statusClass}">

${data.status || "Planning"}

</span>



</div>


`;



});






const projectTotal =
document.getElementById("totalProjects");



if(projectTotal){

projectTotal.innerHTML =
totalProjects;

}



}








// =====================================================
// ================= LOAD ANNOUNCEMENTS ================
// =====================================================



async function loadAnnouncements(){


const container =
document.getElementById("dashboardAnnouncementContainer");



if(!container)
return;



const snapshot =
await getDocs(
collection(db,"announcements")
);



container.innerHTML="";



snapshot.forEach(item=>{


const data=item.data();



let priorityClass="";



if(data.priority==="High"){

priorityClass="high";

}

else if(data.priority==="Medium"){

priorityClass="medium";

}

else{

priorityClass="low";

}




container.innerHTML += `


<div class="announcementCard ${priorityClass}">


<h3>

📢 ${data.title || "Announcement"}

</h3>



<p class="announcementMessage">

${data.message || "No message"}

</p>



<p class="announcementDate">

Priority:
${data.priority || "Low"}

</p>



</div>


`;



});



}








// =====================================================
// ================= REFRESH DASHBOARD =================
// =====================================================



async function refreshDashboard(){


await loadCollections();

await loadExpenses();

await loadProjects();

await loadAnnouncements();



console.log(
"🔄 Dashboard Updated!"
);



}





// INITIAL LOAD


loadProjects();

loadAnnouncements();


// =====================================================
// DALUBWIKAAN TRANSPARENCY PORTAL
// DASHBOARD.JS PART 3/4
// GLOBAL DASHBOARD SEARCH
// =====================================================



// ================= DASHBOARD SEARCH ==================


const dashboardSearch =
document.getElementById("dashboardSearch");


const dashboardSearchResults =
document.getElementById("dashboardSearchResults");





if(dashboardSearch){


dashboardSearch.addEventListener(
"input",
searchDashboard
);


}





async function searchDashboard(){



const keyword =

dashboardSearch.value
.toLowerCase()
.trim();




if(!dashboardSearchResults)
return;





if(keyword===""){


dashboardSearchResults.innerHTML = `


<div class="expense">

<p>
Type something to search...
</p>


</div>


`;

return;


}





let results = "";





// =====================================================
// ================= COLLECTION SEARCH =================
// =====================================================



const collectionsSnapshot =

await getDocs(
collection(db,"collections")
);




collectionsSnapshot.forEach(item=>{


const data=item.data();



const searchable = `

${data.week}

${data.collector}

${data.date}

`
.toLowerCase();




if(searchable.includes(keyword)){



const total =

Number(data.firstYear || 0)

+

Number(data.secondYear || 0)

+

Number(data.thirdYear || 0)

+

Number(data.fourthYear || 0);




results += `


<div class="expense">


<h3>
💰 Collection
</h3>



<p>

Week:
${data.week || "N/A"}

</p>



<p>

Collector:
${data.collector || "N/A"}

</p>



<h3>

₱${total.toLocaleString()}

</h3>


</div>


`;



}



});







// =====================================================
// ================= EXPENSE SEARCH ====================
// =====================================================



const expenseSnapshot =

await getDocs(
collection(db,"expenses")
);




expenseSnapshot.forEach(item=>{


const data=item.data();



const searchable = `

${data.title}

${data.category}

${data.remarks}

`
.toLowerCase();




if(searchable.includes(keyword)){



results += `


<div class="expense">


<h3>
💸 Expense
</h3>



<p>

${data.title || "No title"}

</p>



<p>

Category:
${data.category || "N/A"}

</p>



<h3>

₱${Number(data.amount || 0)
.toLocaleString()}

</h3>



</div>


`;



}



});








// =====================================================
// ================= PROJECT SEARCH ====================
// =====================================================



const projectSnapshot =

await getDocs(
collection(db,"projects")
);





projectSnapshot.forEach(item=>{


const data=item.data();




const searchable = `

${data.title}

${data.description}

${data.status}

`
.toLowerCase();




if(searchable.includes(keyword)){



results += `


<div class="projectCard">


<h3>
📂 Project
</h3>


<h3>

${data.title || "Untitled"}

</h3>



<p>

${data.description || ""}

</p>



<span class="badge">

${data.status || "Planning"}

</span>



</div>


`;



}



});









// =====================================================
// =============== ANNOUNCEMENT SEARCH =================
// =====================================================



const announcementSnapshot =

await getDocs(
collection(db,"announcements")
);




announcementSnapshot.forEach(item=>{


const data=item.data();



const searchable = `

${data.title}

${data.message}

${data.priority}

`
.toLowerCase();





if(searchable.includes(keyword)){



results += `


<div class="announcementCard">


<h3>

📢 ${data.title || "Announcement"}

</h3>



<p>

${data.message || ""}

</p>



<p>

Priority:
${data.priority || "Low"}

</p>



</div>


`;



}



});







// =====================================================
// ================= DISPLAY RESULTS ===================
// =====================================================



if(results===""){


dashboardSearchResults.innerHTML = `


<div class="expense">


<h3>
❌ No Results Found
</h3>



<p>

No transparency records matched your search.

</p>


</div>


`;



}

else{


dashboardSearchResults.innerHTML = results;


}




}



console.log(
"🔎 Dashboard Search Ready!"
);

// =====================================================
// DALUBWIKAAN TRANSPARENCY PORTAL
// DASHBOARD.JS PART 4/4
// CHARTS + FINAL DASHBOARD POLISH
// =====================================================



// ================= CHART IMPORT =================


import {

Chart

}
from
"https://cdn.jsdelivr.net/npm/chart.js@4.4.1/dist/chart.umd.min.js";





// =====================================================
// ================= DASHBOARD STATISTICS ==============
// =====================================================



async function loadStatistics(){



let totalCollection = 0;

let totalExpense = 0;




// COLLECTION TOTAL


const collectionSnapshot =

await getDocs(
collection(db,"collections")
);



collectionSnapshot.forEach(item=>{


const data=item.data();



totalCollection +=

Number(data.firstYear || 0)

+

Number(data.secondYear || 0)

+

Number(data.thirdYear || 0)

+

Number(data.fourthYear || 0);



});





// EXPENSE TOTAL


const expenseSnapshot =

await getDocs(
collection(db,"expenses")
);




expenseSnapshot.forEach(item=>{


const data=item.data();


totalExpense +=

Number(data.amount || 0);



});







const collectionDisplay =

document.getElementById(
"totalCollection"
);



const expenseDisplay =

document.getElementById(
"totalExpenses"
);




if(collectionDisplay){

collectionDisplay.innerHTML =

"₱" +
totalCollection.toLocaleString();

}



if(expenseDisplay){

expenseDisplay.innerHTML =

"₱" +
totalExpense.toLocaleString();

}




createFinanceChart(
totalCollection,
totalExpense
);



}








// =====================================================
// ================= FINANCE CHART =====================
// =====================================================



let financeChart=null;



function createFinanceChart(
collectionAmount,
expenseAmount
){



const canvas =

document.getElementById(
"financeChart"
);



if(!canvas)
return;





if(financeChart){

financeChart.destroy();

}




financeChart = new Chart(

canvas,

{


type:"bar",


data:{


labels:[

"Collection",

"Expenses"

],


datasets:[{


label:"Amount (₱)",


data:[

collectionAmount,

expenseAmount

]

}]


},



options:{


responsive:true,


plugins:{


legend:{


display:false


}


}


}


}



);



}









// =====================================================
// ================= ANIMATION =========================
// =====================================================



function activateAnimation(){



const cards =

document.querySelectorAll(
".card, .expense, .projectCard, .announcementCard"
);



cards.forEach(card=>{


card.classList.add(
"fade"
);



});



}








// =====================================================
// ================= AUTO REFRESH ======================
// =====================================================



async function updateDashboard(){


await loadCollections();

await loadExpenses();

await loadProjects();

await loadAnnouncements();

await loadStatistics();



activateAnimation();



console.log(
"📊 Dashboard Fully Updated!"
);



}





// FIRST LOAD


updateDashboard();





// AUTO UPDATE EVERY 30 SECONDS


setInterval(

()=>{

updateDashboard();

},

30000



);





console.log(
"✅ Dalubwikaan Dashboard System Complete!"
);
