// Firebase imports
import { initializeApp } from "firebase/app";
import { 
    getFirestore,
    collection,
    addDoc
} from "firebase/firestore";


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


// SAVE COLLECTION
window.saveCollection = async function(){

    await addDoc(collection(db, "collections"), {

        week: document.getElementById("week").value,
        date: document.getElementById("collectionDate").value,

        firstYear: Number(document.getElementById("firstYearCollection").value),
        secondYear: Number(document.getElementById("secondYearCollection").value),
        thirdYear: Number(document.getElementById("thirdYearCollection").value),
        fourthYear: Number(document.getElementById("fourthYearCollection").value),

        collector: document.getElementById("collector").value,

        createdAt: new Date()

    });

    alert("Collection saved!");
};


// SAVE EXPENSE
window.saveExpense = async function(){

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

};


// SAVE PROJECT
window.saveProject = async function(){

    await addDoc(collection(db, "projects"), {

        title: document.getElementById("projectTitle").value,
        description: document.getElementById("projectDescription").value,
        budget: Number(document.getElementById("projectBudget").value),
        spent: Number(document.getElementById("projectSpent").value),
        status: document.getElementById("projectStatus").value,

        createdAt: new Date()

    });

    alert("Project saved!");

};


// SAVE ANNOUNCEMENT
window.saveAnnouncement = async function(){

    await addDoc(collection(db, "announcements"), {

        title: document.getElementById("announcementTitle").value,
        message: document.getElementById("announcementMessage").value,
        priority: document.getElementById("announcementPriority").value,

        createdAt: new Date()

    });

    alert("Announcement posted!");

};
