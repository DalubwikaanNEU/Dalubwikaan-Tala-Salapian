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


const selectedMonth = Number(
document.getElementById("monthFilter").value
);



let totalCollection = 0;

let totalExpense = 0;





// ================= COLLECTIONS =================


const collectionSnap = await getDocs(
collection(db,"collections")
);



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


const expenseSnap = await getDocs(
collection(db,"expenses")
);



expenseSnap.forEach((doc)=>{


const data = doc.data();



if(data.date){


const date = new Date(data.date);



if(date.getMonth() === selectedMonth){


totalExpense += Number(data.amount || 0);


}


}


});









// ================= DISPLAY =================


document.getElementById("reportCollection").innerHTML =

"₱" + totalCollection.toLocaleString();




document.getElementById("reportExpense").innerHTML =

"₱" + totalExpense.toLocaleString();




document.getElementById("reportBalance").innerHTML =

"₱" +

(totalCollection - totalExpense)
.toLocaleString();



displayReportInfo();



}

catch(error){


console.error(
"Report Error:",
error
);


}



}









// ================= REPORT INFORMATION =================


function displayReportInfo(){


const monthSelect =
document.getElementById("monthFilter");



if(!monthSelect) return;



const monthName =

monthSelect.options[
monthSelect.selectedIndex
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









// ================= PRINT =================


function setupPrintButton(){


const printButton =
document.getElementById("printButton");



if(printButton){



printButton.addEventListener(
"click",
function(){


console.log("Printing report...");


window.print();



}

);



}


}







// ================= CHANGE MONTH =================


document
.getElementById("monthFilter")
.addEventListener(
"change",
function(){


loadReport();


displayReportInfo();


});









// ================= START =================


loadReport();

displayReportInfo();

setupPrintButton();
