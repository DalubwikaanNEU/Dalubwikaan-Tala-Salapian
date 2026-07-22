import { initializeApp } from "https://www.gstatic.com/firebasejs/11.0.2/firebase-app.js";

import {
    getFirestore,
    collection,
    addDoc,
    getDocs,
    deleteDoc,
    doc,
    updateDoc,
    getDoc
} from "https://www.gstatic.com/firebasejs/11.0.2/firebase-firestore.js";


// FIREBASE CONFIG

const firebaseConfig = {
  apiKey: "AIzaSyDx5TRi1YZZsK4JqlvCmuR_0U6H1d3Mr80",
  authDomain: "dalubwikaan--26-8e646.firebaseapp.com",
  projectId: "dalubwikaan--26-8e646",
  storageBucket: "dalubwikaan--26-8e646.firebasestorage.app",
  messagingSenderId: "409516392020",
  appId: "1:409516392020:web:87d462a5927449c69eb7c1"
};


const app = initializeApp(firebaseConfig);

const db = getFirestore(app);



console.log("Admin Firebase Connected!");



// ===============================
// EXPENSES
// ===============================


let editingExpenseID = null;



window.saveExpense = async function(){


try{


const expenseData = {


title:
document.getElementById("expenseTitle").value,


category:
document.getElementById("expenseCategory").value,


amount:
Number(document.getElementById("expenseAmount").value),


date:
document.getElementById("expenseDate").value,


receipt:
document.getElementById("expenseReceipt").value,


remarks:
document.getElementById("expenseRemarks").value,


createdAt:
new Date()


};




// UPDATE MODE

if(editingExpenseID){


await updateDoc(
doc(db,"expenses",editingExpenseID),
expenseData
);


alert("Expense updated successfully!");


editingExpenseID = null;



}


// ADD MODE

else{


await addDoc(
collection(db,"expenses"),
expenseData
);


alert("Expense saved successfully!");


}



clearExpenseForm();

loadAdminExpenses();



}

catch(error){

alert("Error: " + error.message);

}



};






// LOAD EXPENSES


async function loadAdminExpenses(){


const container =
document.getElementById("adminExpenseList");



if(!container) return;



const snapshot =
await getDocs(collection(db,"expenses"));



container.innerHTML="";



snapshot.forEach((item)=>{


const expense=item.data();



container.innerHTML += `


<div class="expense">


<h3>${expense.title}</h3>


<p>
Category: ${expense.category}
</p>


<p>
Amount: ₱${expense.amount}
</p>



<button onclick="editExpense('${item.id}')">

Edit

</button>



<button onclick="deleteExpense('${item.id}')">

Delete

</button>


</div>


`;



});


}



loadAdminExpenses();






// DELETE EXPENSE


window.deleteExpense = async function(id){


await deleteDoc(
doc(db,"expenses",id)
);



alert("Expense deleted!");



loadAdminExpenses();


};






// EDIT EXPENSE


window.editExpense = async function(id){



const expenseRef =
doc(db,"expenses",id);



const expenseSnap =
await getDoc(expenseRef);



const expense =
expenseSnap.data();



document.getElementById("expenseTitle").value =
expense.title;


document.getElementById("expenseCategory").value =
expense.category;


document.getElementById("expenseAmount").value =
expense.amount;


document.getElementById("expenseDate").value =
expense.date;


document.getElementById("expenseReceipt").value =
expense.receipt;


document.getElementById("expenseRemarks").value =
expense.remarks;



editingExpenseID=id;



alert("Edit mode activated. Update the form then press Save Expense.");



};






function clearExpenseForm(){


document.getElementById("expenseTitle").value="";

document.getElementById("expenseCategory").value="";

document.getElementById("expenseAmount").value="";

document.getElementById("expenseDate").value="";

document.getElementById("expenseReceipt").value="";

document.getElementById("expenseRemarks").value="";


}






// ===============================
// COLLECTIONS
// ===============================


window.saveCollection = async function(){


await addDoc(
collection(db,"collections"),
{


week:
document.getElementById("week").value,


date:
document.getElementById("collectionDate").value,


firstYear:
Number(document.getElementById("firstYearCollection").value),


secondYear:
Number(document.getElementById("secondYearCollection").value),


thirdYear:
Number(document.getElementById("thirdYearCollection").value),


fourthYear:
Number(document.getElementById("fourthYearCollection").value),


collector:
document.getElementById("collector").value,


createdAt:new Date()


});


alert("Collection saved!");

};







// ===============================
// PROJECTS
// ===============================


window.saveProject = async function(){



await addDoc(
collection(db,"projects"),
{


title:
document.getElementById("projectTitle").value,


description:
document.getElementById("projectDescription").value,


budget:
Number(document.getElementById("projectBudget").value),


spent:
Number(document.getElementById("projectSpent").value),


status:
document.getElementById("projectStatus").value,


createdAt:new Date()


});



alert("Project saved!");



};







// ===============================
// ANNOUNCEMENTS
// ===============================


window.saveAnnouncement = async function(){



await addDoc(
collection(db,"announcements"),
{


title:
document.getElementById("announcementTitle").value,


message:
document.getElementById("announcementMessage").value,


priority:
document.getElementById("announcementPriority").value,


createdAt:new Date()


});



alert("Announcement posted!");



};
