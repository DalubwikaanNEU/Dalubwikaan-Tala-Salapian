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

console.log("💸 Expenses Connected!");

let allExpenses = [];

// ================= LOAD EXPENSES =================

async function loadExpenses() {

    const container = document.getElementById("expenseContainer");

    if (!container) return;

    container.innerHTML = "<p>Loading expenses...</p>";

    try {

        const snapshot = await getDocs(collection(db, "expenses"));

        allExpenses = [];

        snapshot.forEach((doc) => {

            allExpenses.push({
                id: doc.id,
                ...doc.data()
            });

        });

        // Sort newest first
        allExpenses.sort((a, b) => {

            const dateA = a.createdAt?.seconds || 0;
            const dateB = b.createdAt?.seconds || 0;

            return dateB - dateA;

        });

        displayExpenses(allExpenses);

    }

    catch (error) {

        console.error(error);

        container.innerHTML = `
            <div class="expense">
                ❌ Failed to load expenses.
            </div>
        `;

    }

}

// ================= DISPLAY =================

function displayExpenses(expenses) {

    const container = document.getElementById("expenseContainer");

    const totalExpense = document.getElementById("totalExpense");

    const expenseCount = document.getElementById("expenseCount");

    container.innerHTML = "";

    let total = 0;

    expenseCount.innerHTML = expenses.length;

    expenses.forEach((expense) => {

        total += Number(expense.amount || 0);

        let date = "No Date";

        if (expense.date) {

            date = expense.date;

        }
        else if (expense.createdAt?.seconds) {

            date = new Date(
                expense.createdAt.seconds * 1000
            ).toLocaleDateString();

        }

        let receiptButton = "";

        if (expense.receipt) {

            receiptButton = `
                <a href="${expense.receipt}" target="_blank">
                    <button>📄 View Receipt</button>
                </a>
            `;

        }

        container.innerHTML += `

        <div class="expense">

            <h2>💸 ${expense.title || "Untitled Expense"}</h2>

            <p><strong>Category:</strong> ${expense.category || "N/A"}</p>

            <p><strong>Amount:</strong> ₱${Number(expense.amount || 0).toLocaleString()}</p>

            <p><strong>Date:</strong> ${date}</p>

            <p><strong>Remarks:</strong><br>${expense.remarks || "No remarks."}</p>

            ${receiptButton}

        </div>

        `;

    });

    totalExpense.innerHTML = "₱" + total.toLocaleString();

}

// ================= SEARCH =================

const searchExpense = document.getElementById("searchExpense");

if (searchExpense) {

    searchExpense.addEventListener("input", filterExpenses);

}

// ================= CATEGORY FILTER =================

const categoryFilter = document.getElementById("categoryFilter");

if (categoryFilter) {

    categoryFilter.addEventListener("change", filterExpenses);

}

// ================= FILTER =================

function filterExpenses() {

    const keyword = document
        .getElementById("searchExpense")
        .value
        .toLowerCase();

    const category = document
        .getElementById("categoryFilter")
        .value;

    const filtered = allExpenses.filter((expense) => {

        const matchTitle =
            (expense.title || "")
            .toLowerCase()
            .includes(keyword);

        const matchCategory =
            category === "All" ||
            expense.category === category;

        return matchTitle && matchCategory;

    });

    displayExpenses(filtered);

}

// ================= START =================

loadExpenses();
