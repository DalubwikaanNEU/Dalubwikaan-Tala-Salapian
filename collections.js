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
    apiKey: "YOUR_API_KEY",
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
