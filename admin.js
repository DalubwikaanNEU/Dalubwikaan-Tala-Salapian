import { initializeApp } from "https://www.gstatic.com/firebasejs/11.0.2/firebase-app.js";

import { 
    getFirestore,
    collection,
    addDoc
} from "https://www.gstatic.com/firebasejs/11.0.2/firebase-firestore.js";


// Firebase Configuration
const firebaseConfig = {
  apiKey: "AIzaSyDx5TR1iYZZsK4JqlvCmuR_0U6H1d3Mr80",
  authDomain: "dalubwikaan--26-8e646.firebaseapp.com",
  projectId: "dalubwikaan--26-8e646",
  storageBucket: "dalubwikaan--26-8e646.firebasestorage.app",
  messagingSenderId: "409516392020",
  appId: "1:409516392020:web:87d462a5927449c69eb7c1"
};


// Initialize Firebase
const app = initializeApp(firebaseConfig);

const db = getFirestore(app);


// TEST CONNECTION
console.log("Firebase connected successfully!");

alert("admin.js connected!");



// SAVE EXPENSE
window.saveExpense = async function(){

    console.log("Save Expense button clicked");


    try {

        const expenseTitle = document.getElementById("expenseTitle").value;
        const expenseCategory = document.getElementById("expenseCategory").value;
        const expenseAmount = document.getElementById("expenseAmount").value;
        const expenseDate = document.getElementById("expenseDate").value;
        const expenseReceipt = document.getElementById("expenseReceipt").value;
        const expenseRemarks = document.getElementById("expenseRemarks").value;


        if(expenseTitle === "" || expenseAmount === ""){

            alert("Please fill up Expense Title and Amount first!");

            return;

        }


        const expenseData = {

            title: expenseTitle,

            category: expenseCategory,

            amount: Number(expenseAmount),

            date: expenseDate,

            receipt: expenseReceipt,

            remarks: expenseRemarks,

            createdAt: new Date()

        };


        await addDoc(collection(db, "expenses"), expenseData);


        alert("Expense saved successfully!");


        // Clear form after saving

        document.getElementById("expenseTitle").value = "";
        document.getElementById("expenseCategory").value = "";
        document.getElementById("expenseAmount").value = "";
        document.getElementById("expenseDate").value = "";
        document.getElementById("expenseReceipt").value = "";
        document.getElementById("expenseRemarks").value = "";


    } catch(error) {

        console.error("Firebase Error:", error);

        alert("Error saving expense: " + error.message);

    }

};
