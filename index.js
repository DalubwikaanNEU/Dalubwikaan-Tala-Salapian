// =====================================================
// DALUBWIKAAN TRANSPARENCY PORTAL
// INDEX.JS / DASHBOARD.JS
// PART 1/4
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



console.log(
"🔥 Dalubwikaan Dashboard Firebase Connected!"
);





// ================= GLOBAL VARIABLES =================


let financeChart = null;





// =====================================================
// LOAD COLLECTIONS
// =====================================================


async function loadCollections(){


try{


const snapshot =
await getDocs(
collection(db,"collections")
);



let firstYear = 0;

let secondYear = 0;

let thirdYear = 0;

let fourthYear = 0;





snapshot.forEach((doc)=>{


const data = doc.data();



firstYear += Number(
data.firstYear || 0
);


secondYear += Number(
data.secondYear || 0
);


thirdYear += Number(
data.thirdYear || 0
);


fourthYear += Number(
data.fourthYear || 0
);



});





const total =

firstYear +
secondYear +
thirdYear +
fourthYear;





updateText(
"totalCollection",
"₱" + total.toLocaleString()
);



updateText(
"firstYear",
"₱" + firstYear.toLocaleString()
);



updateText(
"secondYear",
"₱" + secondYear.toLocaleString()
);



updateText(
"thirdYear",
"₱" + thirdYear.toLocaleString()
);



updateText(
"fourthYear",
"₱" + fourthYear.toLocaleString()
);





createCollectionChart(

firstYear,

secondYear,

thirdYear,

fourthYear

);




return total;



}

catch(error){


console.error(
"Collection Error:",
error
);



return 0;


}



}









// =====================================================
// LOAD EXPENSES
// =====================================================


async function loadExpenses(){


try{


const container =
document.getElementById(
"expenseContainer"
);



const snapshot =
await getDocs(
collection(db,"expenses")
);




let total = 0;



if(container){

container.innerHTML="";

}





snapshot.forEach((doc)=>{


const data =
doc.data();




const amount =
Number(data.amount || 0);



total += amount;





if(container){



container.innerHTML += `


<div class="expense">


<h3>
${data.title || "Expense"}
</h3>


<p>
📌 Category:
${data.category || "N/A"}
</p>



<p>
💰 Amount:
₱${amount.toLocaleString()}
</p>



<p>
📅 Date:
${data.date || "No date"}
</p>



<p>
${data.remarks || ""}
</p>


</div>


`;



}



});






updateText(

"totalExpenses",

"₱" + total.toLocaleString()

);





return total;



}

catch(error){


console.error(

"Expense Error:",

error

);



return 0;



}



}









// =====================================================
// HELPER FUNCTION
// =====================================================


function updateText(id,value){


const element =
document.getElementById(id);



if(element){

element.innerHTML = value;

}


}

// =====================================================
// DALUBWIKAAN TRANSPARENCY PORTAL
// INDEX.JS / DASHBOARD.JS
// PART 2/4
// PROJECTS + BALANCE + CHART
// =====================================================




// =====================================================
// LOAD PROJECT COUNT
// =====================================================


async function loadProjects(){


try{


const snapshot =
await getDocs(
collection(db,"projects")
);



const count =
snapshot.size;



updateText(
"projectCount",
count
);



return count;



}

catch(error){


console.error(
"Project Error:",
error
);



return 0;



}



}









// =====================================================
// CALCULATE BALANCE
// =====================================================


async function calculateBalance(){



const totalCollection =

await loadCollections();




const totalExpenses =

await loadExpenses();





const balance =

totalCollection - totalExpenses;





updateText(

"currentBalance",

"₱" + balance.toLocaleString()

);





return balance;



}









// =====================================================
// COLLECTION CHART
// =====================================================


function createCollectionChart(

first,

second,

third,

fourth

){



const canvas =

document.getElementById(
"collectionChart"
);





if(!canvas){

return;

}







// REMOVE OLD CHART


if(financeChart){


financeChart.destroy();


}







financeChart = new Chart(

canvas,

{


type:"bar",



data:{



labels:[

"1st Year",

"2nd Year",

"3rd Year",

"4th Year"

],




datasets:[{


label:"Collection Amount",



data:[

first,

second,

third,

fourth

]



}]




},





options:{



responsive:true,


maintainAspectRatio:false,



plugins:{



legend:{


display:true


}



}



}




}



);



}









// =====================================================
// LOAD DASHBOARD START
// =====================================================


async function startDashboard(){



console.log(
"📊 Loading Dashboard..."
);





await calculateBalance();



await loadProjects();





console.log(
"✅ Dashboard Loaded!"
);



}


// =====================================================
// DALUBWIKAAN TRANSPARENCY PORTAL
// INDEX.JS / DASHBOARD.JS
// PART 3/4
// GLOBAL DASHBOARD SEARCH
// =====================================================



// ================= SEARCH ELEMENTS =================


const dashboardSearch =

document.getElementById(
"dashboardSearch"
);



const dashboardSearchResults =

document.getElementById(
"dashboardSearchResults"
);







// ================= SEARCH LISTENER =================


if(dashboardSearch){



dashboardSearch.addEventListener(

"input",

searchDashboard

);



}







// =====================================================
// SEARCH FUNCTION
// =====================================================


async function searchDashboard(){



const keyword =

dashboardSearch.value

.toLowerCase()

.trim();






if(!dashboardSearchResults){

return;

}






// CLEAR RESULT


if(keyword === ""){


dashboardSearchResults.innerHTML = "";

return;


}







let results = "";







// =====================================================
// SEARCH EXPENSES
// =====================================================



const expenseSnapshot =

await getDocs(

collection(db,"expenses")

);





expenseSnapshot.forEach((doc)=>{



const data =
doc.data();





const searchable = `

${data.title}

${data.category}

${data.remarks}

${data.date}

`

.toLowerCase();







if(searchable.includes(keyword)){



results += `


<div class="expense">


<h3>
💸 ${data.title || "Expense"}
</h3>



<p>

📌 Category:

${data.category || "N/A"}

</p>



<p>

💰 Amount:

₱${Number(data.amount || 0)
.toLocaleString()}

</p>



<p>

📅 Date:

${data.date || "N/A"}

</p>


</div>


`;



}



});









// =====================================================
// SEARCH COLLECTIONS
// =====================================================



const collectionSnapshot =

await getDocs(

collection(db,"collections")

);





collectionSnapshot.forEach((doc)=>{



const data =
doc.data();





const searchable = `

${data.collector}

${data.week}

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

💰 Collection Record

</h3>



<p>

Collector:

${data.collector || "N/A"}

</p>



<p>

Week:

${data.week || "N/A"}

</p>



<p>

Amount:

₱${total.toLocaleString()}

</p>



</div>


`;



}



});









// =====================================================
// SEARCH PROJECTS
// =====================================================



const projectSnapshot =

await getDocs(

collection(db,"projects")

);





projectSnapshot.forEach((doc)=>{



const data =
doc.data();






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

📂 ${data.title || "Project"}

</h3>



<p>

${data.description || ""}

</p>



<p>

Status:

${data.status || "Planning"}

</p>



</div>


`;



}



});









// =====================================================
// SEARCH ANNOUNCEMENTS
// =====================================================



const announcementSnapshot =

await getDocs(

collection(db,"announcements")

);





announcementSnapshot.forEach((doc)=>{



const data =
doc.data();





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
// DISPLAY SEARCH RESULT
// =====================================================



if(results === ""){



dashboardSearchResults.innerHTML = `


<div class="expense">


<h3>

❌ No Result Found

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
"🔎 Search System Ready!"
);


// =====================================================
// DALUBWIKAAN TRANSPARENCY PORTAL
// INDEX.JS / DASHBOARD.JS
// PART 4/4
// FINAL STARTUP + AUTO REFRESH + ANIMATION
// =====================================================





// =====================================================
// CARD ANIMATION
// =====================================================


function activateAnimation(){



const cards =

document.querySelectorAll(

".card, .expense, .projectCard, .announcementCard, .yearCard"

);





cards.forEach(card=>{


card.classList.add(
"fade"
);



});



}









// =====================================================
// FULL DASHBOARD UPDATE
// =====================================================


async function updateDashboard(){



try{



console.log(
"🔄 Updating Dashboard..."
);





await loadCollections();



await loadExpenses();



await loadProjects();





await calculateBalance();





activateAnimation();






console.log(
"✅ Dashboard Updated Successfully!"
);



}

catch(error){


console.error(

"Dashboard Update Error:",

error

);



}



}









// =====================================================
// FIRST LOAD
// =====================================================



updateDashboard();









// =====================================================
// AUTO REFRESH
// =====================================================



setInterval(()=>{


updateDashboard();



},30000);









// =====================================================
// DARK MODE CONNECTION CHECK
// =====================================================



const themeButton =

document.getElementById(
"themeToggle"
);




if(themeButton){



themeButton.addEventListener(

"click",

()=>{


document.body.classList.toggle(
"dark"
);



const isDark =

document.body.classList.contains(
"dark"
);




themeButton.innerHTML =

isDark

?

"☀️ Light Mode"

:

"🌙 Dark Mode";



}


);



}






console.log(
"🚀 Dalubwikaan Transparency Portal Ready!"
);
