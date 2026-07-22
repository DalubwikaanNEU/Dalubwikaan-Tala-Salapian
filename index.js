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


console.log("🔥 Dashboard Firebase Connected!");





// ================= LOAD EXPENSES =================


async function loadExpenses(){


try{


const container =
document.getElementById("expenseContainer");


const totalExpenseDisplay =
document.getElementById("totalExpenses");



const snapshot =
await getDocs(collection(db,"expenses"));



let totalExpenses = 0;



if(container){

container.innerHTML = "";

}




snapshot.forEach((doc)=>{


const expense = doc.data();


totalExpenses += Number(expense.amount || 0);



if(container){


container.innerHTML += `

<div class="expense">


<h3>
${expense.title}
</h3>


<p>
📌 Category: ${expense.category}
</p>


<p>
💰 Amount: ₱${Number(expense.amount).toLocaleString()}
</p>


<p>
📅 Date: ${expense.date}
</p>


<p>
${expense.remarks || ""}
</p>


</div>

`;

}


});



if(totalExpenseDisplay){

totalExpenseDisplay.innerHTML =
"₱" + totalExpenses.toLocaleString();

}



console.log(
"Total Expenses:",
totalExpenses
);



return totalExpenses;


}



catch(error){


console.error(
"Expense Error:",
error
);


return 0;


}


}









// ================= LOAD COLLECTIONS =================


async function loadCollections(){


try{


const snapshot =
await getDocs(collection(db,"collections"));



let firstYear = 0;
let secondYear = 0;
let thirdYear = 0;
let fourthYear = 0;



snapshot.forEach((doc)=>{


const data = doc.data();


firstYear += Number(data.firstYear || 0);

secondYear += Number(data.secondYear || 0);

thirdYear += Number(data.thirdYear || 0);

fourthYear += Number(data.fourthYear || 0);


});



const totalCollection =
firstYear +
secondYear +
thirdYear +
fourthYear;




if(document.getElementById("totalCollection")){

document.getElementById("totalCollection").innerHTML =
"₱" + totalCollection.toLocaleString();

}



if(document.getElementById("firstYear")){

document.getElementById("firstYear").innerHTML =
"₱" + firstYear.toLocaleString();

}



if(document.getElementById("secondYear")){

document.getElementById("secondYear").innerHTML =
"₱" + secondYear.toLocaleString();

}



if(document.getElementById("thirdYear")){

document.getElementById("thirdYear").innerHTML =
"₱" + thirdYear.toLocaleString();

}



if(document.getElementById("fourthYear")){

document.getElementById("fourthYear").innerHTML =
"₱" + fourthYear.toLocaleString();

}



createChart(
firstYear,
secondYear,
thirdYear,
fourthYear
);



console.log(
"Total Collection:",
totalCollection
);



return totalCollection;



}



catch(error){


console.error(
"Collection Error:",
error
);


return 0;


}


}










// ================= PROJECT COUNT =================


async function loadProjects(){


try{


const snapshot =
await getDocs(collection(db,"projects"));



const projectDisplay =
document.getElementById("projectCount");



if(projectDisplay){

projectDisplay.innerHTML =
snapshot.size;

}



}



catch(error){


console.error(
"Project Error:",
error
);


}


}









// ================= BALANCE =================


async function calculateBalance(){


const totalCollection =
await loadCollections();



const totalExpenses =
await loadExpenses();



const balance =
totalCollection - totalExpenses;



const balanceDisplay =
document.getElementById("currentBalance");



if(balanceDisplay){


balanceDisplay.innerHTML =
"₱" + balance.toLocaleString();


}


}









// ================= CHART =================


function createChart(
first,
second,
third,
fourth
){


const canvas =
document.getElementById("collectionChart");



if(!canvas){

return;

}



new Chart(canvas,{


type:"bar",


data:{


labels:[

"1st Year",
"2nd Year",
"3rd Year",
"4th Year"

],


datasets:[{


label:"Collection",


data:[

first,
second,
third,
fourth

]


}]


},



options:{


responsive:true


}


});



}









// ================= START =================


async function startDashboard(){


await calculateBalance();


await loadProjects();



}



startDashboard();
