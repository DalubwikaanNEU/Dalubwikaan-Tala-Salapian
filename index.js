// =====================================================
// DALUBWIKAAN TRANSPARENCY PORTAL
// FINAL INDEX.JS / DASHBOARD.JS
// PART 1/4
// FIREBASE CONNECTION + DATA LOADING SETUP
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
"https://cdn.jsdelivr.net/npm/chart.js/auto";





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



console.log(
"🔥 Firebase Connected Successfully"
);






// =====================================================
// GLOBAL VARIABLES
// =====================================================


let totalExpenseValue = 0;


let totalCollectionValue = 0;


let chartInstance = null;



let searchDatabase = [];







// =====================================================
// LOAD EXPENSE DATA
// =====================================================


async function loadExpenses(){



try{



const expenseContainer =

document.getElementById(
"expenseContainer"
);



const totalExpenseDisplay =

document.getElementById(
"totalExpenses"
);





const snapshot =

await getDocs(
collection(db,"expenses")
);






let total = 0;






if(expenseContainer){

expenseContainer.innerHTML = "";

}







snapshot.forEach((doc)=>{



const expense = doc.data();




const amount =

Number(
expense.amount || 0
);




total += amount;






// STORE SEARCH DATA


searchDatabase.push({


type:"Expense",


title:
expense.title || "Untitled Expense",


category:
expense.category || "No Category",


amount:amount,


date:
expense.date || ""



});







// DISPLAY EXPENSE CARD


if(expenseContainer){



expenseContainer.innerHTML += `


<div class="expense fade">


<h3>

💸 ${expense.title || "Untitled Expense"}

</h3>



<p>

📂 Category:

${expense.category || "No Category"}

</p>



<p>

💰 Amount:

₱${amount.toLocaleString()}

</p>



<p>

📅 Date:

${expense.date || "No Date"}

</p>




${
expense.remarks

?

`

<p>

📝 ${expense.remarks}

</p>

`

:

""

}



</div>


`;



}





});








totalExpenseValue = total;







if(totalExpenseDisplay){



totalExpenseDisplay.innerHTML =

"₱" +

total.toLocaleString();



}







console.log(

"💸 Expenses Loaded:",

total

);





return total;



}



catch(error){



console.error(

"Expense Loading Error:",

error

);



return 0;



}



}

// =====================================================
// DALUBWIKAAN TRANSPARENCY PORTAL
// FINAL INDEX.JS / DASHBOARD.JS
// PART 3/4
// COLLECTION CHART + SEARCH SYSTEM
// =====================================================






// =====================================================
// CREATE COLLECTION CHART
// =====================================================


function createCollectionChart(

firstYear,

secondYear,

thirdYear,

fourthYear

){



const canvas =

document.getElementById(
"collectionChart"
);






if(!canvas){


console.log(
"❌ Collection chart canvas not found"
);


return;


}






// REMOVE OLD CHART FIRST


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





datasets:[{


label:"Collection Amount (₱)",




data:[


firstYear,

secondYear,

thirdYear,

fourthYear


],





borderWidth:2



}]



},





options:{


responsive:true,


maintainAspectRatio:false,



plugins:{


legend:{


display:true,


position:"bottom"


}



},






scales:{


y:{


beginAtZero:true,



ticks:{



callback:function(value){


return "₱" +

value.toLocaleString();



}



}



}



}



}



}



);






console.log(

"📊 Collection Chart Created"

);



}









// =====================================================
// SEARCH SYSTEM
// =====================================================


function setupSearch(){



const searchInput =

document.getElementById(
"dashboardSearch"
);





const resultBox =

document.getElementById(
"dashboardSearchResults"
);






if(!searchInput || !resultBox){



console.log(
"Search box not found"
);


return;



}






searchInput.addEventListener(

"input",

()=>{



const keyword =

searchInput.value

.toLowerCase()

.trim();






resultBox.innerHTML = "";






if(keyword === ""){


return;


}






const results =

searchDatabase.filter(item=>{



return (

item.title

.toLowerCase()

.includes(keyword)



||



item.type

.toLowerCase()

.includes(keyword)



||



item.category

.toLowerCase()

.includes(keyword)



);



});








if(results.length === 0){



resultBox.innerHTML = `


<div class="expense">


<p>

❌ No record found

</p>


</div>



`;



return;


}








results.slice(0,10)

.forEach(item=>{



resultBox.innerHTML += `


<div class="expense fade">


<h3>

${item.title}

</h3>



<p>

📂 Type:

${item.type}

</p>




<p>

📌 Category:

${item.category}

</p>






${
item.amount

?

`

<p>

💰 ₱${Number(item.amount).toLocaleString()}

</p>

`

:

""

}




</div>


`;



});





});





}

// =====================================================
// DALUBWIKAAN TRANSPARENCY PORTAL
// FINAL INDEX.JS / DASHBOARD.JS
// PART 4/4
// FINAL STARTUP SYSTEM
// =====================================================






// =====================================================
// DASHBOARD START FUNCTION
// =====================================================


async function startDashboard(){



try{



console.log(

"⏳ Loading Dashboard..."

);






// CLEAR SEARCH DATABASE FIRST

searchDatabase = [];







// LOAD DATA


await loadCollections();


await loadExpenses();


await loadProjects();






// UPDATE BALANCE AFTER COLLECTION + EXPENSE LOAD


calculateBalance();







// ENABLE SEARCH


setupSearch();







console.log(

"✅ Dalubwikaan Dashboard Fully Loaded"

);





}



catch(error){



console.error(

"❌ Dashboard Loading Failed:",

error

);



}



}









// =====================================================
// CHART RESPONSIVE FIX
// =====================================================


window.addEventListener(

"resize",

()=>{


if(chartInstance){


chartInstance.resize();



}



}

);









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
// AUTO REFRESH EVERY 60 SECONDS
// =====================================================


setInterval(()=>{


startDashboard();



},60000);






// =====================================================
// END OF FINAL INDEX.JS
// =====================================================
