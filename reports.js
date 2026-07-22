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



console.log("📊 Reports Firebase Connected!");






// ================= LOAD REPORT =================


async function loadReport(){


try{


const monthFilter =
document.getElementById("monthFilter");


if(!monthFilter) return;



const selectedMonth =
Number(monthFilter.value);



let totalCollection = 0;

let totalExpense = 0;



let expenseHTML = "";





// ================= COLLECTIONS =================


const collectionSnap =
await getDocs(collection(db,"collections"));



collectionSnap.forEach((doc)=>{


const data = doc.data();



if(data.date){


const date = new Date(data.date);



if(date.getMonth() === selectedMonth){


totalCollection +=

Number(data.firstYear || 0) +

Number(data.secondYear || 0) +

Number(data.thirdYear || 0) +

Number(data.fourthYear || 0);


}


}


});










// ================= EXPENSES =================


const expenseSnap =
await getDocs(collection(db,"expenses"));



let hasExpense = false;



expenseSnap.forEach((doc)=>{


const data = doc.data();



if(data.date){


const date = new Date(data.date);



if(date.getMonth() === selectedMonth){


hasExpense = true;


totalExpense += Number(data.amount || 0);




expenseHTML += `


<tr>

<td>
${data.title || "No title"}
</td>


<td>
${data.category || "-"}
</td>


<td>
₱${Number(data.amount || 0).toLocaleString()}
</td>


<td>
${data.date || "-"}
</td>


<td>
${data.remarks || "-"}
</td>


</tr>


`;



}


}



});





if(!hasExpense){


expenseHTML = `

<tr>

<td colspan="5">

No expense records for this month.

</td>

</tr>

`;

}



const expenseList =
document.getElementById("expenseReportList");



if(expenseList){

expenseList.innerHTML = expenseHTML;

}









// ================= DISPLAY =================



const reportCollection =
document.getElementById("reportCollection");


const reportExpense =
document.getElementById("reportExpense");


const reportBalance =
document.getElementById("reportBalance");





if(reportCollection){

reportCollection.innerHTML =

"₱" + totalCollection.toLocaleString();

}



if(reportExpense){

reportExpense.innerHTML =

"₱" + totalExpense.toLocaleString();

}



if(reportBalance){

reportBalance.innerHTML =

"₱" +

(totalCollection - totalExpense)
.toLocaleString();

}




displayReportInfo();



}


catch(error){


console.error(
"Report Error:",
error
);


}


}









// ================= REPORT INFO =================


function displayReportInfo(){


const monthFilter =
document.getElementById("monthFilter");


if(!monthFilter) return;



const monthName =

monthFilter.options[
monthFilter.selectedIndex
].text;





const reportMonth =
document.getElementById("reportMonth");

const generatedDate =
document.getElementById("generatedDate");





if(reportMonth){

reportMonth.innerHTML =
"📅 Month: " + monthName;

}




if(generatedDate){

generatedDate.innerHTML =

"Generated: " +

new Date().toLocaleDateString();

}



}









// ================= PRINT BUTTON =================


function setupPrintButton(){


const printButton =
document.getElementById("printButton");



if(!printButton) return;




printButton.addEventListener(
"click",
function(){



console.log(
"Printing report..."
);



window.print();



}

);



}









// ================= MONTH CHANGE =================


const monthFilter =
document.getElementById("monthFilter");



if(monthFilter){


monthFilter.addEventListener(
"change",
function(){


loadReport();


});


}









// ================= START =================


loadReport();

displayReportInfo();

setupPrintButton();
