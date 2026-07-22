import { initializeApp } from "https://www.gstatic.com/firebasejs/11.0.2/firebase-app.js";

import { 
    getFirestore,
    collection,
    addDoc
} from "https://www.gstatic.com/firebasejs/11.0.2/firebase-firestore.js";


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



window.saveExpense = async function(){

    try {

        await addDoc(collection(db, "expenses"), {

            title: document.getElementById("expenseTitle").value,

            category: document.getElementById("expenseCategory").value,

            amount: Number(document.getElementById("expenseAmount").value),

            date: document.getElementById("expenseDate").value,

            receipt: document.getElementById("expenseReceipt").value,

            remarks: document.getElementById("expenseRemarks").value,

            createdAt: new Date()

        });


        alert("Expense saved!");

    } catch(error) {

        alert("Error: " + error.message);

    }

};
