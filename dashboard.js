// =====================================================
// DALUBWIKAAN TRANSPARENCY PORTAL
// DASHBOARD.JS PART 1/4
// FIREBASE CONNECTION + COLLECTIONS + EXPENSES
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



// ================= CHART IMPORT =================


import Chart from
"https://cdn.jsdelivr.net/npm/chart.js@4.4.1/dist/chart.umd.min.js";




// ================= FIREBASE CONFIG =================


const firebaseConfig = {


apiKey: "AIzaSyDx5TR1iYZZsK4JqlvCmuR_0U6H1d3Mr80",

authDomain: "dalubwikaan--26-8e646.firebaseapp.com",

projectId: "dalubwikaan--26-8e646",

storageBucket: "dalubwikaan--26-8e646.firebasestorage.app",

messagingSenderId: "409516392020",

appId: "1:409516392020:web:87d462a5927449c69eb7c1"


};




// INITIALIZE FIREBASE


const app = initializeApp(firebaseConfig);

const db = getFirestore(app);



console.log("🔥 Dashboard Firebase Connected!");




// =====================================================
// GLOBAL VARIABLES
// =====================================================


let dashboardData = {

collections:[],
expenses:[],
projects:[],
announcements:[]

};




// =====================================================
// LOAD ALL COLLECTION DATA
// =====================================================


async function fetchDashboardData(){


try{


const collectionsSnap =
await getDocs(
collection(db,"collections")
);



dashboardData.collections =
collectionsSnap.docs.map(doc=>({

id:doc.id,

...doc.data()

}));





const expensesSnap =
await getDocs(
collection(db,"expenses")
);



dashboardData.expenses =
expensesSnap.docs.map(doc=>({

id:doc.id,

...doc.data()

}));





const projectsSnap =
await getDocs(
collection(db,"projects")
);



dashboardData.projects =
projectsSnap.docs.map(doc=>({

id:doc.id,

...doc.data()

}));






const announcementsSnap =
await getDocs(
collection(db,"announcements")
);



dashboardData.announcements =
announcementsSnap.docs.map(doc=>({

id:doc.id,

...doc.data()

}));





console.log(
"📊 Dashboard Data Loaded",
dashboardData
);



}


catch(error){


console.error(
"Dashboard loading error:",
error
);


}



}




// =====================================================
// DISPLAY COLLECTIONS
// =====================================================


function displayCollections(){



const container =
document.getElementById(
"dashboardCollectionContainer"
);



if(!container)
return;



container.innerHTML="";



dashboardData.collections.forEach(data=>{


const total =

Number(data.firstYear || 0)

+

Number(data.secondYear || 0)

+

Number(data.thirdYear || 0)

+

Number(data.fourthYear || 0);





container.innerHTML += `


<div class="expense fade">


<h3>
💰 ${data.week || "Collection"}
</h3>



<p>

👤 Collector:

${data.collector || "N/A"}

</p>



<p>

📅 Date:

${data.date || "N/A"}

</p>



<h3>

₱${total.toLocaleString()}

</h3>


</div>


`;



});



}




// =====================================================
// DISPLAY EXPENSES
// =====================================================


function displayExpenses(){


const container =
document.getElementById(
"dashboardExpenseContainer"
);



if(!container)
return;



container.innerHTML="";



dashboardData.expenses.forEach(data=>{



container.innerHTML += `


<div class="expense fade">


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



}






// =====================================================
// INITIAL DATA LOAD
// =====================================================


async function loadDashboard(){


await fetchDashboardData();


displayCollections();


displayExpenses();



console.log(
"✅ Dashboard Part 1 Loaded!"
);



}



// NOTE:
// loadDashboard() will continue in Part 4
// after all functions are ready
// =====================================================
// DALUBWIKAAN TRANSPARENCY PORTAL
// DASHBOARD.JS PART 2/4
// PROJECTS + ANNOUNCEMENTS DISPLAY
// =====================================================




// =====================================================
// DISPLAY PROJECTS
// =====================================================


function displayProjects(){


const container =
document.getElementById(
"dashboardProjectContainer"
);



if(!container)
return;



container.innerHTML="";



dashboardData.projects.forEach(data=>{



let statusClass = "planning";



if(data.status === "Completed"){

statusClass="completed";

}

else if(data.status === "Ongoing"){

statusClass="ongoing";

}





container.innerHTML += `


<div class="projectCard fade">


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



}






// =====================================================
// DISPLAY ANNOUNCEMENTS
// =====================================================


function displayAnnouncements(){



const container =
document.getElementById(
"dashboardAnnouncementContainer"
);



if(!container)
return;



container.innerHTML="";



dashboardData.announcements.forEach(data=>{



let priorityClass="low";



if(data.priority==="High"){

priorityClass="high";

}

else if(data.priority==="Medium"){

priorityClass="medium";

}




container.innerHTML += `


<div class="announcementCard ${priorityClass} fade">


<h3>

📢 ${data.title || "Announcement"}

</h3>




<p class="announcementMessage">

${data.message || "No announcement message."}

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
// DASHBOARD SUMMARY CARDS
// =====================================================


function updateDashboardCards(){



let totalCollection = 0;

let totalExpense = 0;

let totalProjects = 0;





// COLLECTION TOTAL


dashboardData.collections.forEach(data=>{


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


dashboardData.expenses.forEach(data=>{


totalExpense +=

Number(data.amount || 0);



});






// PROJECT COUNT


totalProjects =
dashboardData.projects.length;






// UPDATE HTML VALUES


const collectionBox =
document.getElementById(
"totalCollection"
);



const expenseBox =
document.getElementById(
"totalExpenses"
);



const projectBox =
document.getElementById(
"totalProjects"
);





if(collectionBox){

collectionBox.innerHTML =
"₱"+totalCollection.toLocaleString();

}



if(expenseBox){

expenseBox.innerHTML =
"₱"+totalExpense.toLocaleString();

}



if(projectBox){

projectBox.innerHTML =
totalProjects;

}




}






// =====================================================
// PART 2 READY
// =====================================================


console.log(
"✅ Dashboard Part 2 Loaded!"
);

// =====================================================
// DALUBWIKAAN TRANSPARENCY PORTAL
// DASHBOARD.JS PART 3/4
// GLOBAL DASHBOARD SEARCH SYSTEM
// =====================================================




// =====================================================
// SEARCH ELEMENTS
// =====================================================


const dashboardSearch =
document.getElementById(
"dashboardSearch"
);



const dashboardSearchResults =
document.getElementById(
"dashboardSearchResults"
);






// =====================================================
// SEARCH LISTENER
// =====================================================


if(dashboardSearch){


dashboardSearch.addEventListener(
"input",
function(){


searchDashboard(
this.value
);


}

);


}






// =====================================================
// SEARCH FUNCTION
// =====================================================


function searchDashboard(keyword){



if(!dashboardSearchResults)
return;




keyword =
keyword
.toLowerCase()
.trim();





// EMPTY SEARCH


if(keyword===""){


dashboardSearchResults.innerHTML = `


<div class="expense">


<p>

🔎 Type something to search...

</p>


</div>


`;

return;


}






let results = "";






// =====================================================
// SEARCH COLLECTIONS
// =====================================================


dashboardData.collections.forEach(data=>{


const text = `

${data.week}

${data.collector}

${data.date}

`
.toLowerCase();





if(text.includes(keyword)){



const total =

Number(data.firstYear || 0)

+

Number(data.secondYear || 0)

+

Number(data.thirdYear || 0)

+

Number(data.fourthYear || 0);





results += `


<div class="expense fade">


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
// SEARCH EXPENSES
// =====================================================


dashboardData.expenses.forEach(data=>{


const text = `

${data.title}

${data.category}

${data.remarks}

`
.toLowerCase();





if(text.includes(keyword)){



results += `


<div class="expense fade">


<h3>

💸 Expense

</h3>



<p>

${data.title || "No Title"}

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
// SEARCH PROJECTS
// =====================================================


dashboardData.projects.forEach(data=>{


const text = `

${data.title}

${data.description}

${data.status}

`
.toLowerCase();





if(text.includes(keyword)){



results += `


<div class="projectCard fade">


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
// SEARCH ANNOUNCEMENTS
// =====================================================


dashboardData.announcements.forEach(data=>{


const text = `

${data.title}

${data.message}

${data.priority}

`
.toLowerCase();





if(text.includes(keyword)){



results += `


<div class="announcementCard fade">


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
// DISPLAY SEARCH RESULT
// =====================================================


if(results===""){


dashboardSearchResults.innerHTML = `


<div class="expense">


<h3>

❌ No Results Found

</h3>



<p>

No transparency record matched your search.

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
// CHART + FINAL INITIALIZATION
// =====================================================




// =====================================================
// FINANCE CHART
// =====================================================


let financeChart = null;



function createFinanceChart(){



const canvas =
document.getElementById(
"financeChart"
);



if(!canvas)
return;





let totalCollection = 0;

let totalExpense = 0;





dashboardData.collections.forEach(data=>{


totalCollection +=

Number(data.firstYear || 0)

+

Number(data.secondYear || 0)

+

Number(data.thirdYear || 0)

+

Number(data.fourthYear || 0);



});





dashboardData.expenses.forEach(data=>{


totalExpense +=

Number(data.amount || 0);


});






if(financeChart){


financeChart.destroy();


}






financeChart = new Chart(

canvas,

{


type:"bar",



data:{



labels:[

"Collections",

"Expenses"

],



datasets:[{


label:"Amount (₱)",


data:[

totalCollection,

totalExpense

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
// ANIMATION ACTIVATOR
// =====================================================


function activateDashboardAnimation(){



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
// FINAL DASHBOARD LOAD
// =====================================================


async function startDashboard(){



console.log(
"⏳ Loading Dashboard..."
);





await loadDashboard();





displayProjects();


displayAnnouncements();



updateDashboardCards();



createFinanceChart();



activateDashboardAnimation();





console.log(
"✅ Dalubwikaan Dashboard Fully Loaded!"
);



}







// =====================================================
// AUTO REFRESH
// =====================================================


setInterval(async()=>{



await loadDashboard();



displayCollections();


displayExpenses();


displayProjects();


displayAnnouncements();


updateDashboardCards();


createFinanceChart();



console.log(
"🔄 Dashboard Updated"
);



},60000);







// =====================================================
// START SYSTEM
// =====================================================


startDashboard();
