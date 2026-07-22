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





let projectsData = [];




// ================= LOAD PROJECTS =================



async function loadProjects(){


    const container =
    document.getElementById("projectList");



    if(!container) return;



    container.innerHTML = `

    <div class="projectCard">

    <h3>

    Loading projects...

    </h3>

    </div>

    `;



    try{


        const snapshot = await getDocs(
            collection(db,"projects")
        );



        projectsData = [];



        snapshot.forEach((doc)=>{


            projectsData.push({

                id:doc.id,

                ...doc.data()

            });


        });





        displayProjects(projectsData);



    }



    catch(error){


        console.error(error);



        container.innerHTML = `

        <div class="projectCard">

        <h2>
        ❌ Error Loading Projects
        </h2>


        <p>

        ${error.message}

        </p>


        </div>

        `;


    }



}







// ================= DISPLAY =================



function displayProjects(list){



    const container =
    document.getElementById("projectList");



    container.innerHTML = "";





    if(list.length === 0){


        container.innerHTML = `

        <div class="projectCard">


        <h2>

        📂 No Projects Yet

        </h2>


        <p>

        No project records available.

        </p>


        </div>


        `;


        return;


    }






    list.forEach((data)=>{



        const budget =
        Number(data.budget || 0);



        const spent =
        Number(data.spent || 0);



        const remaining =
        budget - spent;




        let statusClass =
        "statusPlanning";



        if(data.status === "Ongoing"){


            statusClass =
            "statusOngoing";


        }


        else if(data.status === "Completed"){


            statusClass =
            "statusCompleted";


        }







        let progress = 0;



        if(budget > 0){


            progress =
            Math.round(
                (spent / budget) * 100
            );


        }




        container.innerHTML += `


        <div class="projectCard">


        <h2>

        📂 ${data.title || "Untitled Project"}

        </h2>




        <p>

        ${data.description || "No description provided."}

        </p>





        <span class="projectStatus ${statusClass}">

        ${data.status || "Planning"}

        </span>






        <p class="projectMoney">

        💰 Budget:

        ₱${budget.toLocaleString()}

        </p>





        <p>

        💸 Spent:

        ₱${spent.toLocaleString()}

        </p>





        <p>

        📊 Remaining:

        ₱${remaining.toLocaleString()}

        </p>





        <p>

        📈 Utilization:

        ${progress}%

        </p>





        </div>



        `;



    });



}







// ================= START =================



loadProjects();
