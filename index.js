import { initializeApp } from "https://www.gstatic.com/firebasejs/11.0.2/firebase-app.js";

import {
    getFirestore,
    collection,
    getDocs,
    query,
    orderBy
} from "https://www.gstatic.com/firebasejs/11.0.2/firebase-firestore.js";


const firebaseConfig = {
  apiKey: "AIzaSyDx5TRi1YZZsK4JqlvCmuR_0U6H1d3Mr80",
  authDomain: "dalubwikaan--26-8e646.firebaseapp.com",
  projectId: "dalubwikaan--26-8e646",
  storageBucket: "dalubwikaan--26-8e646.firebasestorage.app",
  messagingSenderId: "409516392020",
  appId: "1:409516392020:web:87d462a5927449c69eb7c1"
};


const app = initializeApp(firebaseConfig);

const db = getFirestore(app);



async function loadExpenses(){

    try {

        const container = document.getElementById("expenseContainer");


        const expenseQuery = query(
            collection(db,"expenses"),
            orderBy("createdAt","desc")
        );


        const snapshot = await getDocs(expenseQuery);



        if(snapshot.empty){

            container.innerHTML = `
                <div class="expense">
                    <span>No expenses recorded yet.</span>
                </div>
            `;

            return;

        }



        container.innerHTML = "";



        snapshot.forEach((doc)=>{


            const expense = doc.data();


            container.innerHTML += `

            <div class="expense">

                <h3>${expense.title}</h3>

                <p>
                Category: ${expense.category}
                </p>

                <p>
                Amount: ₱${expense.amount}</p>

                <p>
                Date: ${expense.date}</p>

                <small>
                ${expense.remarks || "No remarks"}
                </small>

            </div>

            `;


        });


    } catch(error){

        console.error("Error loading expenses:", error);


        document.getElementById("expenseContainer").innerHTML = `

        <div class="expense">
            <span>Error loading expenses.</span>
        </div>

        `;

    }

}



loadExpenses();
