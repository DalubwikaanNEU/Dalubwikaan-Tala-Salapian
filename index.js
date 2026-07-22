// =====================================================
// DALUBWIKAAN TRANSPARENCY PORTAL
// FINAL INDEX.JS / DASHBOARD.JS
// PART 1/4
// FIREBASE + EXPENSE SYSTEM
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






// ================= INITIALIZE =================


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
// LOAD EXPENSES
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






// STORE FOR SEARCH


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


<div class="expense">


<h3>

${expense.title || "Untitled Expense"}

</h3>




<div class="expenseInfo">


<p>
📌 ${expense.category || "No Category"}
</p>



<p>
💰 ₱${amount.toLocaleString()}
</p>



<p>
📅 ${expense.date || "No Date"}
</p>


</div>





${
expense.remarks

?

`

<p class="expenseRemarks">

${expense.remarks}

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

"Expenses Loaded:",

total

);






return total;





}



catch(error){



console.error(

"Expense Loading Failed:",

error

);



return 0;



}



}

// =====================================================
// DALUBWIKAAN TRANSPARENCY PORTAL
// FINAL INDEX.JS / DASHBOARD.JS
// PART 2/4
// COLLECTIONS + YEAR LEVEL + BALANCE
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







// ADD TO SEARCH DATABASE


searchDatabase.push({

type:"Collection",

title:"Year Collection",

category:"Collection",

amount:

Number(data.firstYear || 0)

+

Number(data.secondYear || 0)

+

Number(data.thirdYear || 0)

+

Number(data.fourthYear || 0)


});



});







const totalCollection =


firstYear

+

secondYear

+

thirdYear

+

fourthYear;







totalCollectionValue = totalCollection;








// ================= UPDATE DASHBOARD =================





const totalDisplay =

document.getElementById(
"totalCollection"
);





if(totalDisplay){


totalDisplay.innerHTML =

"₱"

+

totalCollection.toLocaleString();


}








const firstDisplay =

document.getElementById(
"firstYear"
);



if(firstDisplay){


firstDisplay.innerHTML =

"₱"

+

firstYear.toLocaleString();


}









const secondDisplay =

document.getElementById(
"secondYear"
);



if(secondDisplay){


secondDisplay.innerHTML =

"₱"

+

secondYear.toLocaleString();


}









const thirdDisplay =

document.getElementById(
"thirdYear"
);



if(thirdDisplay){


thirdDisplay.innerHTML =

"₱"

+

thirdYear.toLocaleString();


}









const fourthDisplay =

document.getElementById(
"fourthYear"
);



if(fourthDisplay){


fourthDisplay.innerHTML =

"₱"

+

fourthYear.toLocaleString();


}







// CREATE CHART DATA


createChart(

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

"Collection Loading Failed:",

error

);



return 0;



}


}










// =====================================================
// CALCULATE CURRENT BALANCE
// =====================================================


async function calculateBalance(){



const balance =


totalCollectionValue

-

totalExpenseValue;







const balanceDisplay =

document.getElementById(
"currentBalance"
);







if(balanceDisplay){



balanceDisplay.innerHTML =


"₱"

+

balance.toLocaleString();




}







console.log(

"Current Balance:",

balance

);



return balance;



}







// =====================================================
// REFRESH BALANCE AFTER LOADING
// =====================================================


async function updateBalance(){



await loadCollections();


await loadExpenses();


await calculateBalance();



}

// =====================================================
// DALUBWIKAAN TRANSPARENCY PORTAL
// FINAL INDEX.JS / DASHBOARD.JS
// PART 3/4
// CHART + PROJECTS SYSTEM
// =====================================================






// =====================================================
// CREATE COLLECTION CHART
// =====================================================


function createChart(

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
"Chart canvas not found"
);

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





datasets:[{


label:

"Collection Amount",




data:[


firstYear,

secondYear,

thirdYear,

fourthYear


],





borderWidth:1




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

"📊 Collection Chart Loaded"

);



}









// =====================================================
// LOAD PROJECTS
// =====================================================


async function loadProjects(){



try{



const projectContainer =

document.getElementById(

"projectContainer"

);




const projectCount =

document.getElementById(

"projectCount"

);








const snapshot =

await getDocs(

collection(db,"projects")

);








if(projectContainer){



projectContainer.innerHTML = "";



}







let count = 0;








snapshot.forEach((doc)=>{



const project = doc.data();




count++;






// ADD SEARCH DATA


searchDatabase.push({


type:"Project",


title:

project.title ||

"Untitled Project",



category:

project.status ||

"Ongoing",



amount:

Number(project.budget || 0)



});









if(projectContainer){





projectContainer.innerHTML += `



<div class="projectCard">



<h3>

${project.title || "Untitled Project"}

</h3>





<p>

💰 Budget:

₱${Number(project.budget || 0).toLocaleString()}

</p>





<p>

📌 Status:

${project.status || "Not specified"}

</p>





<p>

${project.description || ""}

</p>





</div>



`;





}





});








if(projectCount){



projectCount.innerHTML = count;



}






console.log(

"Projects Loaded:",

count

);






}

catch(error){



console.error(

"Project Loading Failed:",

error

);




}




}









// =====================================================
// RESPONSIVE CHART RESIZE FIX
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
// DALUBWIKAAN TRANSPARENCY PORTAL
// FINAL INDEX.JS / DASHBOARD.JS
// PART 4/4
// SEARCH + DASHBOARD STARTUP
// =====================================================







// =====================================================
// SEARCH SYSTEM
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


console.log(

"Search elements not found"

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







results.innerHTML = "";







if(keyword === ""){


results.innerHTML = "";


return;


}







const filtered =

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








filtered.slice(0,10)

.forEach(item=>{





results.innerHTML += `



<div class="expense">



<h3>

${item.title}

</h3>




<p>

📂 ${item.type}

</p>





<p>

📌 ${item.category}

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
// START DASHBOARD
// =====================================================



async function startDashboard(){



try{





console.log(

"⏳ Loading Dashboard..."

);







// IMPORTANT ORDER
// COLLECTION FIRST FOR CHART DATA


await loadCollections();




await loadExpenses();




await calculateBalance();




await loadProjects();







// ENABLE SEARCH AFTER DATA LOAD


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
