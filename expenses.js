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



let allExpenses = [];




// ================= LOAD EXPENSES =================


async function loadExpenses(){


    const container =
    document.getElementById("expenseContainer");


    if(!container) return;



    container.innerHTML = `

    <div class="expense">

    Loading expenses...

    </div>

    `;



    try{


        const snapshot =
        await getDocs(
            collection(db,"expenses")
        );



        allExpenses = [];



        snapshot.forEach((doc)=>{


            allExpenses.push({

                id:doc.id,

                ...doc.data()

            });


        });



        allExpenses.sort((a,b)=>{


            const A =
            a.createdAt?.seconds || 0;


            const B =
            b.createdAt?.seconds || 0;


            return B-A;


        });



        displayExpenses(allExpenses);



    }



    catch(error){


        console.error(error);



        container.innerHTML = `

        <div class="expense">

        ❌ Failed to load expenses.

        </div>

        `;


    }



}





// ================= DISPLAY =================



function displayExpenses(list){


    const container =
    document.getElementById("expenseContainer");


    const totalDisplay =
    document.getElementById("totalExpense");


    const countDisplay =
    document.getElementById("expenseCount");



    container.innerHTML = "";



    let total = 0;



    countDisplay.innerHTML =
    list.length;




    if(list.length === 0){


        container.innerHTML = `

        <div class="expense">

        <h3>🔍 No Expense Found</h3>

        <p>
        Try another keyword or category.
        </p>

        </div>

        `;



        totalDisplay.innerHTML = "₱0";

        return;


    }




    list.forEach((expense)=>{


        const amount =
        Number(expense.amount || 0);



        total += amount;



        let date = "No Date";



        if(expense.date){


            date = expense.date;


        }

        else if(expense.createdAt?.seconds){


            date =
            new Date(
                expense.createdAt.seconds * 1000
            ).toLocaleDateString();


        }



        let receipt = "";



        if(expense.receipt){


            receipt = `

            <br>

            <a href="${expense.receipt}" target="_blank">

            <button class="btn">

            📄 View Receipt

            </button>

            </a>

            `;


        }




        container.innerHTML += `


        <div class="expense">


        <h2>

        💸 ${expense.title || "Untitled Expense"}

        </h2>



        <p>

        <strong>Category:</strong>

        ${expense.category || "N/A"}

        </p>



        <p>

        <strong>Amount:</strong>

        ₱${amount.toLocaleString()}

        </p>



        <p>

        <strong>Date:</strong>

        ${date}

        </p>



        <p>

        <strong>Remarks:</strong>

        <br>

        ${expense.remarks || "No remarks."}

        </p>



        ${receipt}



        </div>


        `;


    });



    totalDisplay.innerHTML =
    "₱" + total.toLocaleString();



}







// ================= FILTER =================



function filterExpenses(){


    const keyword =

    document
    .getElementById("searchExpense")
    .value
    .toLowerCase()
    .trim();



    const category =

    document
    .getElementById("categoryFilter")
    .value;




    const filtered =

    allExpenses.filter((expense)=>{



        const searchable = `

        ${expense.title || ""}

        ${expense.category || ""}

        ${expense.remarks || ""}

        ${expense.date || ""}

        `.toLowerCase();



        const matchSearch =

        searchable.includes(keyword);



        const matchCategory =

        category === "All"

        ||

        expense.category === category;



        return matchSearch && matchCategory;



    });



    displayExpenses(filtered);



}






// ================= EVENTS =================



document
.getElementById("searchExpense")
.addEventListener(
"input",
filterExpenses
);



document
.getElementById("categoryFilter")
.addEventListener(
"change",
filterExpenses
);





// ================= START =================


loadExpenses();
