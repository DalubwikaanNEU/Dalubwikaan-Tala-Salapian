import { initializeApp } from "https://www.gstatic.com/firebasejs/11.0.2/firebase-app.js";

import {
    getFirestore,
    collection,
    getDocs,
    query,
    orderBy
} from "https://www.gstatic.com/firebasejs/11.0.2/firebase-firestore.js";

/* ===========================
   FIREBASE CONFIG
=========================== */

const firebaseConfig = {
    apiKey: "AIzaSyDx5TR1iYZZsK4JqlvCmuR_0U6H1d3Mr80 ",
    authDomain: "YOUR_PROJECT.firebaseapp.com",
    projectId: "YOUR_PROJECT_ID",
    storageBucket: "YOUR_PROJECT.appspot.com",
    messagingSenderId: "YOUR_SENDER_ID",
    appId: "YOUR_APP_ID"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

/* ===========================
   GLOBAL VARIABLES
=========================== */

let collectionsData = [];

/* ===========================
   LOAD COLLECTIONS
=========================== */

async function loadCollections() {

    try {

        const q = query(
            collection(db, "collections"),
            orderBy("createdAt", "desc")
        );

        const snapshot = await getDocs(q);

        collectionsData = [];

        snapshot.forEach(doc => {

            collectionsData.push({
                id: doc.id,
                ...doc.data()
            });

        });

        displayCollections(collectionsData);

    }

    catch (error) {

        console.error(error);

        document.getElementById("collectionList").innerHTML = `
            <div class="expense">
                <h3>❌ Failed to load data.</h3>
            </div>
        `;

    }

}
/* ===========================
   DISPLAY COLLECTIONS
=========================== */

function displayCollections(dataList) {

    const container = document.getElementById("collectionList");
    const totalCollection = document.getElementById("totalCollection");
    const collectionCount = document.getElementById("collectionCount");

    container.innerHTML = "";

    let grandTotal = 0;

    dataList.forEach(data => {

        const total =
            Number(data.firstYear || 0) +
            Number(data.secondYear || 0) +
            Number(data.thirdYear || 0) +
            Number(data.fourthYear || 0);

        grandTotal += total;

        container.innerHTML += `

<div class="expense">

<h2>💰 ${data.week || "Collection"}</h2>

<p>📅 ${data.date || "-"}</p>

<p>👤 ${data.collector || "-"}</p>

<hr>

<p>1st Year : ₱${Number(data.firstYear || 0).toLocaleString()}</p>

<p>2nd Year : ₱${Number(data.secondYear || 0).toLocaleString()}</p>

<p>3rd Year : ₱${Number(data.thirdYear || 0).toLocaleString()}</p>

<p>4th Year : ₱${Number(data.fourthYear || 0).toLocaleString()}</p>

<hr>

<h3>Total : ₱${total.toLocaleString()}</h3>

</div>

`;

    });

    totalCollection.textContent = "₱" + grandTotal.toLocaleString();
    collectionCount.textContent = dataList.length;

}
/* ===========================
   SEARCH + FILTER
=========================== */

function filterCollections() {

    const keyword = document
        .getElementById("searchCollection")
        .value
        .toLowerCase();

    const year = document
        .getElementById("yearFilter")
        .value;

    const filtered = collectionsData.filter(item => {

        const searchMatch =
            (item.week || "").toLowerCase().includes(keyword) ||
            (item.collector || "").toLowerCase().includes(keyword);

        if (year === "all") return searchMatch;

        let amount = 0;

        if (year === "1") amount = Number(item.firstYear || 0);
        if (year === "2") amount = Number(item.secondYear || 0);
        if (year === "3") amount = Number(item.thirdYear || 0);
        if (year === "4") amount = Number(item.fourthYear || 0);

        return searchMatch && amount > 0;

    });

    displayCollections(filtered);

}
/* ===========================
   EVENTS
=========================== */

document.addEventListener("DOMContentLoaded", () => {

    loadCollections();

    document
        .getElementById("searchCollection")
        .addEventListener("input", filterCollections);

    document
        .getElementById("yearFilter")
        .addEventListener("change", filterCollections);

});
