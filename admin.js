import { initializeApp } from "https://www.gstatic.com/firebasejs/11.0.2/firebase-app.js";

import {
    getFirestore,
    collection,
    addDoc,
    getDocs,
    deleteDoc,
    doc,
    getDoc,
    updateDoc
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


console.log("🔥 Admin Firebase Connected!");




// ================= EXPENSE =================


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




if(editingExpenseID){


await updateDoc(
doc(db,"expenses",editingExpenseID),
expenseData
);


alert("✅ Expense updated!");


editingExpenseID = null;


}


else{


await addDoc(
collection(db,"expenses"),
expenseData
);


alert("✅ Expense saved!");


}



clearExpenseForm();

loadAdminExpenses();



}


catch(error){


console.error(error);


alert(
"Error: " + error.message
);


}


};









// ================= SHOW EXPENSES =================



async function loadAdminExpenses(){


try{


const container =
document.getElementById("adminExpenseList");



if(!container) return;



const snapshot =
await getDocs(collection(db,"expenses"));



container.innerHTML="";



if(snapshot.empty){


container.innerHTML =
`
<p>No expenses recorded.</p>
`;


return;


}





snapshot.forEach((item)=>{


const expense = item.data();



container.innerHTML +=

`

<div class="expense">


<h3>
${expense.title}
</h3>


<p>
📌 Category:
${expense.category}
</p>


<p>
💰 Amount:
₱${Number(expense.amount).toLocaleString()}
</p>


<p>
📅 Date:
${expense.date}
</p>



<button onclick="editExpense('${item.id}')">

✏️ Edit

</button>



<button onclick="deleteExpense('${item.id}')">

🗑️ Delete

</button>



</div>


`;



});



}


catch(error){


console.error(
"Loading expense error:",
error
);


}



}




loadAdminExpenses();









// ================= DELETE =================



window.deleteExpense = async function(id){


if(!confirm("Delete this expense?")) return;



await deleteDoc(
doc(db,"expenses",id)
);



alert("🗑️ Expense deleted!");


loadAdminExpenses();



};









// ================= EDIT =================



window.editExpense = async function(id){



const expenseRef =
doc(db,"expenses",id);



const snapshot =
await getDoc(expenseRef);



const expense =
snapshot.data();




document.getElementById("expenseTitle").value =
expense.title;


document.getElementById("expenseCategory").value =
expense.category;


document.getElementById("expenseAmount").value =
expense.amount;


document.getElementById("expenseDate").value =
expense.date;


document.getElementById("expenseReceipt").value =
expense.receipt || "";


document.getElementById("expenseRemarks").value =
expense.remarks || "";



editingExpenseID = id;



alert(
"✏️ Edit mode ON. Click Save Expense after editing."
);



};








function clearExpenseForm(){


document.getElementById("expenseTitle").value="";

document.getElementById("expenseCategory").value="";

document.getElementById("expenseAmount").value="";

document.getElementById("expenseDate").value="";

document.getElementById("expenseReceipt").value="";

document.getElementById("expenseRemarks").value="";


}










// ================= COLLECTION =================



window.saveCollection = async function(){


try{


await addDoc(
collection(db,"collections"),
{


week:
document.getElementById("week").value,


date:
document.getElementById("collectionDate").value,


firstYear:
Number(document.getElementById("firstYearCollection").value || 0),


secondYear:
Number(document.getElementById("secondYearCollection").value || 0),


thirdYear:
Number(document.getElementById("thirdYearCollection").value || 0),


fourthYear:
Number(document.getElementById("fourthYearCollection").value || 0),


collector:
document.getElementById("collector").value,


createdAt:
new Date()


});


alert("✅ Collection saved!");


}


catch(error){


alert(error.message);


}



};









// ================= PROJECTS =================



window.saveProject = async function(){


try{


await addDoc(
collection(db,"projects"),
{


title:
document.getElementById("projectTitle").value,


description:
document.getElementById("projectDescription").value,


budget:
Number(document.getElementById("projectBudget").value || 0),


spent:
Number(document.getElementById("projectSpent").value || 0),


status:
document.getElementById("projectStatus").value,


createdAt:
new Date()


});


alert("✅ Project saved!");


}


catch(error){

alert(error.message);

}


};









// ================= ANNOUNCEMENT =================



window.saveAnnouncement = async function(){


try{


await addDoc(
collection(db,"announcements"),
{


title:
document.getElementById("announcementTitle").value,


message:
document.getElementById("announcementMessage").value,


priority:
document.getElementById("announcementPriority").value,


createdAt:
new Date()


});


alert("✅ Announcement posted!");


}


catch(error){

alert(error.message);

}


};
