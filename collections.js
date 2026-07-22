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

console.log("💰 Collections Connected!");

let collectionsData = [];

// ================= LOAD =================

async function loadCollections() {

    const snapshot = await getDocs(collection(db, "collections"));

    collectionsData = [];

    snapshot.forEach((doc) => {

        collectionsData.push({
            id: doc.id,
            ...doc.data()
        });

    });

    collectionsData.sort((a, b) => {

        const A = a.createdAt?.seconds || 0;
        const B = b.createdAt?.seconds || 0;

        return B - A;

    });

    displayCollections(collectionsData);

}

// ================= DISPLAY =================

function displayCollections(list) {

    const container = document.getElementById("collectionList");

    const totalDisplay = document.getElementById("totalCollection");

    const countDisplay = document.getElementById("collectionCount");

    container.innerHTML = "";

    let grandTotal = 0;

    countDisplay.innerHTML = list.length;

    list.forEach((data) => {

        const total =
            Number(data.firstYear || 0) +
            Number(data.secondYear || 0) +
            Number(data.thirdYear || 0) +
            Number(data.fourthYear || 0);

        grandTotal += total;

        container.innerHTML += `

<div class="expense">

<h2>💰 ${data.week}</h2>

<p>📅 ${data.date}</p>

<p>👤 <strong>${data.collector}</strong></p>

<hr>

<p>1️⃣ First Year :
₱${Number(data.firstYear || 0).toLocaleString()}</p>

<p>2️⃣ Second Year :
₱${Number(data.secondYear || 0).toLocaleString()}</p>

<p>3️⃣ Third Year :
₱${Number(data.thirdYear || 0).toLocaleString()}</p>

<p>4️⃣ Fourth Year :
₱${Number(data.fourthYear || 0).toLocaleString()}</p>

<hr>

<h3>💵 Total:
₱${total.toLocaleString()}</h3>

</div>

`;

    });

    totalDisplay.innerHTML = "₱" + grandTotal.toLocaleString();

}

// ================= SEARCH + FILTER =================

function filterCollections() {

    const keyword = document
        .getElementById("searchCollection")
        .value
        .toLowerCase();

    const year = document
        .getElementById("yearFilter")
        .value;

    const filtered = collectionsData.filter((item) => {

        const matchSearch =
            (item.week || "").toLowerCase().includes(keyword) ||
            (item.collector || "").toLowerCase().includes(keyword);

        if (year === "all") return matchSearch;

        let amount = 0;

        if (year === "1") amount = Number(item.firstYear || 0);

        if (year === "2") amount = Number(item.secondYear || 0);

        if (year === "3") amount = Number(item.thirdYear || 0);

        if (year === "4") amount = Number(item.fourthYear || 0);

        return matchSearch && amount > 0;

    });

    displayCollections(filtered);

}

// ================= EVENTS =================

document
.getElementById("searchCollection")
.addEventListener("input", filterCollections);

document
.getElementById("yearFilter")
.addEventListener("change", filterCollections);

// ================= START =================

loadCollections();
