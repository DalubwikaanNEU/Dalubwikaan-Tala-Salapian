// =====================================================
// DALUBWIKAAN TRANSPARENCY PORTAL
// FINAL INDEX.JS / DASHBOARD.JS
// PART 1/4
// FIREBASE CONNECTION + BASIC SETUP
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






// =====================================================
// FIREBASE CONFIGURATION
// =====================================================


const firebaseConfig = {


    apiKey: "AIzaSyDx5TR1iYZZsK4JqlvCmuR_0U6H1d3Mr80",


    authDomain: "dalubwikaan--26-8e646.firebaseapp.com",


    projectId: "dalubwikaan--26-8e646",


    storageBucket: "dalubwikaan--26-8e646.firebasestorage.app",


    messagingSenderId: "409516392020",


    appId: "1:409516392020:web:87d462a5927449c69eb7c1"


};







// ================= INITIALIZE FIREBASE =================



const app = initializeApp(firebaseConfig);



const db = getFirestore(app);



console.log("🔥 Dalubwikaan Firebase Connected");









// =====================================================
// GLOBAL VARIABLES
// =====================================================



let totalExpenseAmount = 0;



let chartInstance = null;



let allRecords = [];









// =====================================================
// HELPER FUNCTION
// FORMATS PESO VALUE
// =====================================================



function formatPeso(value){


    return "₱" + Number(value || 0)
    .toLocaleString("en-PH");


}









// =====================================================
// LOAD EXPENSES
// =====================================================



async function loadExpenses(){



try{



const container = 
document.getElementById("expenseContainer");



const totalDisplay =
document.getElementById("totalExpenses");





const snapshot = 
await getDocs(
collection(db,"expenses")
);






let total = 0;



let expenseHTML = "";








snapshot.forEach((doc)=>{



const expense = doc.data();




const amount = 
Number(expense.amount || 0);





total += amount;






allRecords.push({


type:"Expense",


title:expense.title,


category:expense.category,


amount:amount,


date:expense.date,


remarks:expense.remarks || ""


});







expenseHTML += `



<div class="expense compactExpense">


<h3>

${expense.title || "Untitled Expense"}

</h3>



<div class="expenseInfo">


<p>

<span>📌 Category</span>

${expense.category || "N/A"}

</p>



<p>

<span>💰 Amount</span>

${formatPeso(amount)}

</p>



<p>

<span>📅 Date</span>

${expense.date || "No Date"}

</p>



</div>





${
expense.remarks

?

`

<p class="remarks">

📝 ${expense.remarks}

</p>

`

:

""

}





</div>



`;



});







totalExpenseAmount = total;







if(container){


container.innerHTML = expenseHTML || 
`
<div class="expense">

No expense records found.

</div>

`;

}





if(totalDisplay){


totalDisplay.innerHTML =
formatPeso(total);


}







console.log(
"Expenses Loaded:",
total
);






}



catch(error){



console.error(
"Expense Loading Error:",
error
);



}



}

// =====================================================
// DALUBWIKAAN TRANSPARENCY PORTAL
// FINAL INDEX.JS / DASHBOARD.JS
// PART 2/4
// COLLECTIONS + YEAR LEVEL COMPUTATION
// =====================================================






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






firstYear += 
Number(data.firstYear || 0);




secondYear += 
Number(data.secondYear || 0);




thirdYear += 
Number(data.thirdYear || 0);




fourthYear += 
Number(data.fourthYear || 0);






allRecords.push({


type:"Collection",


title:"Year Collection Record",


firstYear:data.firstYear || 0,


secondYear:data.secondYear || 0,


thirdYear:data.thirdYear || 0,


fourthYear:data.fourthYear || 0



});




});









const totalCollection =

firstYear +

secondYear +

thirdYear +

fourthYear;









// ================= DISPLAY TOTAL =================



const totalDisplay =

document.getElementById(
"totalCollection"
);





if(totalDisplay){


totalDisplay.innerHTML =

formatPeso(totalCollection);



}









// ================= YEAR DISPLAY =================



const yearDisplays = {


firstYear:firstYear,


secondYear:secondYear,


thirdYear:thirdYear,


fourthYear:fourthYear


};









Object.keys(yearDisplays)

.forEach((id)=>{



const element =

document.getElementById(id);





if(element){



element.innerHTML =

formatPeso(
yearDisplays[id]
);



}



});









// CREATE CHART



createCollectionChart(

firstYear,

secondYear,

thirdYear,

fourthYear

);







console.log(

"Collections Loaded:",

totalCollection

);





return totalCollection;






}





catch(error){



console.error(

"Collection Loading Error:",

error

);



return 0;



}



}











// =====================================================
// CALCULATE CURRENT BALANCE
// =====================================================



async function calculateBalance(){



const totalCollection =

await loadCollections();





const totalExpenses =

totalExpenseAmount;







const balance =

totalCollection -

totalExpenses;








const balanceDisplay =

document.getElementById(

"currentBalance"

);






if(balanceDisplay){



balanceDisplay.innerHTML =

formatPeso(balance);



}







console.log(

"Current Balance:",

balance

);





}









// =====================================================
// END OF PART 2
// =====================================================

// =====================================================
// DALUBWIKAAN TRANSPARENCY PORTAL
// FINAL INDEX.JS / DASHBOARD.JS
// PART 3/4
// CHART + PROJECTS + SEARCH SYSTEM
// =====================================================







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

if(chartInstance){


chartInstance.destroy();


}









chartInstance = new Chart(

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




datasets:[


{


label:"Collection",


data:[


first,

second,

third,

fourth


],



borderWidth:1



}


]





},







options:{



responsive:true,



maintainAspectRatio:false,



plugins:{



legend:{


display:true


}



},






scales:{



y:{



beginAtZero:true



}



}



}







}

);





}











// =====================================================
// LOAD PROJECT COUNT
// =====================================================



async function loadProjects(){



try{



const snapshot =

await getDocs(

collection(db,"projects")

);







const projectDisplay =

document.getElementById(

"projectCount"

);






if(projectDisplay){



projectDisplay.innerHTML =

snapshot.size;



}








snapshot.forEach((doc)=>{



const project = doc.data();





allRecords.push({



type:"Project",



title:project.title || "Project",



description:project.description || "",



budget:project.budget || 0



});



});








console.log(

"Projects Loaded:",

snapshot.size

);







}



catch(error){



console.error(

"Project Loading Error:",

error

);



}




}











// =====================================================
// SEARCH FUNCTION
// =====================================================



function setupSearch(){



const searchInput =

document.getElementById(

"dashboardSearch"

);






const results =

document.getElementById(

"dashboardSearchResults"

);








if(!searchInput || !results){


return;


}







searchInput.addEventListener(

"input",

()=>{





const keyword =

searchInput.value

.toLowerCase()

.trim();









if(keyword === ""){



results.innerHTML = "";

return;



}









const filtered =

allRecords.filter((item)=>{





return JSON.stringify(item)

.toLowerCase()

.includes(keyword);






});









if(filtered.length === 0){



results.innerHTML = `



<div class="expense">


<p>

❌ No records found

</p>


</div>



`;



return;



}









results.innerHTML =

filtered.map((item)=>{





return `



<div class="expense">



<h3>

${item.title || item.type}

</h3>



<p>

<strong>Type:</strong>

${item.type}

</p>





${

item.category

?

`

<p>

<strong>Category:</strong>

${item.category}

</p>

`

:

""

}







${

item.amount

?

`

<p>

<strong>Amount:</strong>

${formatPeso(item.amount)}

</p>

`

:

""

}







${

item.description

?

`

<p>

${item.description}

</p>

`

:

""

}






</div>



`;






}).join("");







});






}









// =====================================================
// END OF PART 3
// =====================================================

// =====================================================
// DALUBWIKAAN TRANSPARENCY PORTAL
// FINAL INDEX.JS / DASHBOARD.JS
// PART 4/4
// FINAL INITIALIZATION + START SYSTEM
// =====================================================







// =====================================================
// DASHBOARD STARTER
// =====================================================



async function startDashboard(){



try{



console.log(

"🚀 Starting Dalubwikaan Dashboard..."

);







// LOAD ALL DATA



await loadExpenses();




await loadCollections();




await calculateBalance();




await loadProjects();







// ENABLE SEARCH



setupSearch();








console.log(

"✅ Dashboard Fully Loaded"

);






}






catch(error){



console.error(

"Dashboard Start Error:",

error

);





}





}











// =====================================================
// AUTO START WHEN PAGE LOADS
// =====================================================



document.addEventListener(

"DOMContentLoaded",

()=>{


startDashboard();



}

);









// =====================================================
// END OF FINAL INDEX.JS
// =====================================================
