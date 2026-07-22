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


console.log("Firebase connected!");


// ======================
// WEEKLY COLLECTION
// ======================

window.saveCollection = async function(){

    try {

        const collectionData = {

            week: document.getElementById("week").value,

            date: document.getElementById("collectionDate").value,

            firstYear: Number(document.getElementById("firstYearCollection").value),

            secondYear: Number(document.getElementById("secondYearCollection").value),

            thirdYear: Number(document.getElementById("thirdYearCollection").value),

            fourthYear: Number(document.getElementById("fourthYearCollection").value),

            collector: document.getElementById("collector").value,

            createdAt: new Date()

        };


        await addDoc(collection(db, "collections"), collectionData);


        alert("Collection saved successfully!");


    } catch(error){

        alert("Error saving collection: " + error.message);

    }

};



// ======================
// EXPENSES
// ======================

window.saveExpense = async function(){

    try {

        const expenseData = {

            title: document.getElementById("expenseTitle").value,

            category: document.getElementById("expenseCategory").value,

            amount: Number(document.getElementById("expenseAmount").value),

            date: document.getElementById("expenseDate").value,

            receipt: document.getElementById("expenseReceipt").value,

            remarks: document.getElementById("expenseRemarks").value,

            createdAt: new Date()

        };


        await addDoc(collection(db, "expenses"), expenseData);


        alert("Expense saved successfully!");


    } catch(error){

        alert("Error saving expense: " + error.message);

    }

};



// ======================
// PROJECTS
// ======================

window.saveProject = async function(){

    try {

        const projectData = {

            title: document.getElementById("projectTitle").value,

            description: document.getElementById("projectDescription").value,

            budget: Number(document.getElementById("projectBudget").value),

            spent: Number(document.getElementById("projectSpent").value),

            status: document.getElementById("projectStatus").value,

            createdAt: new Date()

        };


        await addDoc(collection(db, "projects"), projectData);


        alert("Project saved successfully!");


    } catch(error){

        alert("Error saving project: " + error.message);

    }

};



// ======================
// ANNOUNCEMENTS
// ======================

window.saveAnnouncement = async function(){

    try {

        const announcementData = {

            title: document.getElementById("announcementTitle").value,

            message: document.getElementById("announcementMessage").value,

            priority: document.getElementById("announcementPriority").value,

            createdAt: new Date()

        };


        await addDoc(collection(db, "announcements"), announcementData);


        alert("Announcement posted successfully!");


    } catch(error){

        alert("Error posting announcement: " + error.message);

    }

};
