// ==========================
// DALUBWIKAAN DASHBOARD.JS
// ==========================

import { initializeApp } from "https://www.gstatic.com/firebasejs/11.0.2/firebase-app.js";

import {
    getFirestore,
    collection,
    getDocs
} from "https://www.gstatic.com/firebasejs/11.0.2/firebase-firestore.js";

// ================= FIREBASE =================

const firebaseConfig = {
    apiKey: "YOUR_API_KEY",
    authDomain: "dalubwikaan--26-8e646.firebaseapp.com",
    projectId: "dalubwikaan--26-8e646",
    storageBucket: "dalubwikaan--26-8e646.firebasestorage.app",
    messagingSenderId: "409516392020",
    appId: "1:409516392020:web:87d462a5927449c69eb7c1"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// ================= LOAD DASHBOARD =================

async function loadDashboard() {

    // Collections
    const collectionsSnapshot = await getDocs(collection(db, "collections"));

    let totalCollection = 0;

    let first = 0;
    let second = 0;
    let third = 0;
    let fourth = 0;

    const collectionContainer = document.getElementById("collectionContainer");
    collectionContainer.innerHTML = "";

    collectionsSnapshot.forEach(doc => {

        const data = doc.data();

        const total =
            Number(data.firstYear || 0) +
            Number(data.secondYear || 0) +
            Number(data.thirdYear || 0) +
            Number(data.fourthYear || 0);

        totalCollection += total;

        first += Number(data.firstYear || 0);
        second += Number(data.secondYear || 0);
        third += Number(data.thirdYear || 0);
        fourth += Number(data.fourthYear || 0);

        collectionContainer.innerHTML += `

<div class="card">

<h3>${data.week || "Collection"}</h3>

<p>${data.collector || ""}</p>

<p>${data.date || ""}</p>

<h2>₱${total.toLocaleString()}</h2>

</div>

`;

    });

    // Expenses

    const expensesSnapshot = await getDocs(collection(db, "expenses"));

    let totalExpense = 0;

    const expenseContainer = document.getElementById("expenseContainer");
    expenseContainer.innerHTML = "";

    expensesSnapshot.forEach(doc => {

        const data = doc.data();

        totalExpense += Number(data.amount || 0);

        expenseContainer.innerHTML += `

<div class="card">

<h3>${data.title}</h3>

<p>${data.category}</p>

<h2>₱${Number(data.amount).toLocaleString()}</h2>

</div>

`;

    });

    // Projects

    const projectsSnapshot = await getDocs(collection(db, "projects"));

    const projectContainer = document.getElementById("projectContainer");

    projectContainer.innerHTML = "";

    let projectCount = 0;

    projectsSnapshot.forEach(doc => {

        projectCount++;

        const data = doc.data();

        projectContainer.innerHTML += `

<div class="card">

<h3>${data.title}</h3>

<p>${data.description}</p>

<p>Status: ${data.status}</p>

</div>

`;

    });

    // Announcements

    const announcementSnapshot = await getDocs(collection(db, "announcements"));

    const announcementContainer = document.getElementById("announcementContainer");

    announcementContainer.innerHTML = "";

    announcementSnapshot.forEach(doc => {

        const data = doc.data();

        announcementContainer.innerHTML += `

<div class="card">

<h3>${data.title}</h3>

<p>${data.message}</p>

</div>

`;

    });

    // SUMMARY

    document.getElementById("totalCollection").innerHTML =
        "₱" + totalCollection.toLocaleString();

    document.getElementById("totalExpenses").innerHTML =
        "₱" + totalExpense.toLocaleString();

    document.getElementById("currentBalance").innerHTML =
        "₱" + (totalCollection - totalExpense).toLocaleString();

    document.getElementById("projectCount").innerHTML =
        projectCount;

    document.getElementById("firstYear").innerHTML =
        "₱" + first.toLocaleString();

    document.getElementById("secondYear").innerHTML =
        "₱" + second.toLocaleString();

    document.getElementById("thirdYear").innerHTML =
        "₱" + third.toLocaleString();

    document.getElementById("fourthYear").innerHTML =
        "₱" + fourth.toLocaleString();

}

loadDashboard();
