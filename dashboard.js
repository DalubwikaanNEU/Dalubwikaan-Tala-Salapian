// =====================================================
// DALUBWIKAAN TRANSPARENCY PORTAL
// FINAL DASHBOARD.JS
// PART 1/4
// FIREBASE CONNECTION + DATA FETCHING
// =====================================================


// ================= FIREBASE IMPORT =================


import { initializeApp } 
from "https://www.gstatic.com/firebasejs/11.0.2/firebase-app.js";


import {

    getFirestore,
    collection,
    getDocs

}

from "https://www.gstatic.com/firebasejs/11.0.2/firebase-firestore.js";




// ================= CHART IMPORT =================


// ginagamit natin sa Part 4
import Chart from 
"https://cdn.jsdelivr.net/npm/chart.js/auto";





// =====================================================
// FIREBASE CONFIGURATION
// =====================================================


const firebaseConfig = {


    apiKey: "AIzaSyDx5TR1iYZZsK4JqlvCmuR_0U6H1d3Mr80",

    authDomain: "dalubwikaan--26-8e646.firebaseapp.com",

    projectId: "dalubwikaan--26-8e646",

    storageBucket: "dalubwikaan--26-8e646.firebasestorage.app",

    messagingSenderId: "409516392020",

    appId: "1:409516392020:web:87d462a5927449c69eb7c1"


};






// ================= INITIALIZE FIREBASE =================


const app = initializeApp(firebaseConfig);


const db = getFirestore(app);



console.log(
    "🔥 Firebase Connected"
);







// =====================================================
// GLOBAL DATA STORAGE
// =====================================================


const dashboardData = {


    collections: [],

    expenses: [],

    projects: [],

    announcements: []


};







// =====================================================
// FETCH ALL FIREBASE DATA
// =====================================================


async function fetchDashboardData(){


    try{


        // ================= COLLECTIONS =================


        const collectionSnapshot =

        await getDocs(
            collection(db,"collections")
        );



        dashboardData.collections =


        collectionSnapshot.docs.map(doc=>({


            id:doc.id,


            ...doc.data()


        }));









        // ================= EXPENSES =================



        const expenseSnapshot =


        await getDocs(
            collection(db,"expenses")
        );



        dashboardData.expenses =


        expenseSnapshot.docs.map(doc=>({


            id:doc.id,


            ...doc.data()


        }));









        // ================= PROJECTS =================



        const projectSnapshot =


        await getDocs(
            collection(db,"projects")
        );



        dashboardData.projects =


        projectSnapshot.docs.map(doc=>({


            id:doc.id,


            ...doc.data()


        }));









        // ================= ANNOUNCEMENTS =================



        const announcementSnapshot =


        await getDocs(
            collection(db,"announcements")
        );



        dashboardData.announcements =


        announcementSnapshot.docs.map(doc=>({


            id:doc.id,


            ...doc.data()


        }));









        console.log(

            "📊 Dashboard Data Loaded",

            dashboardData

        );



    }



    catch(error){



        console.error(

            "❌ Firebase Loading Error:",

            error

        );



    }



}







// =====================================================
// MONEY FORMAT HELPER
// =====================================================


function formatMoney(value){


    return "₱" +

    Number(value || 0)

    .toLocaleString();


}







// =====================================================
// COLLECTION TOTAL CALCULATOR
// =====================================================


function calculateCollectionTotal(){



    let total = 0;



    dashboardData.collections.forEach(data=>{



        total +=


        Number(data.firstYear || 0)


        +


        Number(data.secondYear || 0)


        +


        Number(data.thirdYear || 0)


        +


        Number(data.fourthYear || 0);



    });




    return total;



}







// =====================================================
// EXPENSE TOTAL CALCULATOR
// =====================================================


function calculateExpenseTotal(){



    let total = 0;



    dashboardData.expenses.forEach(data=>{


        total += Number(

            data.amount || 0

        );



    });



    return total;



}






console.log(

"✅ Dashboard Part 1 Ready"

);

// =====================================================
// DALUBWIKAAN TRANSPARENCY PORTAL
// FINAL DASHBOARD.JS
// PART 2/4
// DISPLAY CONTENT + DASHBOARD SUMMARY
// =====================================================




// =====================================================
// DISPLAY COLLECTION RECORDS
// =====================================================


function displayCollections(){


    const container =

    document.getElementById(
        "collectionContainer"
    );



    if(!container) return;



    container.innerHTML = "";




    if(dashboardData.collections.length === 0){


        container.innerHTML = `

        <div class="expense">

            <h3>
            No Collection Records
            </h3>

        </div>

        `;


        return;


    }







    dashboardData.collections.forEach(data=>{



        const total =


        Number(data.firstYear || 0)

        +

        Number(data.secondYear || 0)

        +

        Number(data.thirdYear || 0)

        +

        Number(data.fourthYear || 0);






        container.innerHTML += `


        <div class="expense fade">


            <h3>
            💰 ${data.week || "Collection"}
            </h3>



            <p>
            👤 ${data.collector || "N/A"}
            </p>



            <p>
            📅 ${data.date || "N/A"}
            </p>




            <h3>
            ${formatMoney(total)}
            </h3>



        </div>


        `;



    });



}








// =====================================================
// DISPLAY EXPENSE RECORDS
// =====================================================


function displayExpenses(){


    const container =

    document.getElementById(
        "expenseContainer"
    );



    if(!container) return;



    container.innerHTML = "";







    if(dashboardData.expenses.length === 0){


        container.innerHTML = `


        <div class="expense">

            <h3>
            No Expense Records
            </h3>


        </div>


        `;


        return;


    }






    dashboardData.expenses.forEach(data=>{





        container.innerHTML += `


        <div class="expense fade">


            <h3>
            💸 ${data.title || "Expense"}
            </h3>




            <p class="expenseCategory">

            ${data.category || "Others"}

            </p>




            <h3 class="expenseAmount">

            ${formatMoney(data.amount)}

            </h3>



            <p class="expenseDate">

            ${data.date || "No date"}

            </p>



        </div>


        `;



    });



}








// =====================================================
// DISPLAY PROJECTS
// =====================================================


function displayProjects(){



    const container =

    document.getElementById(
        "projectContainer"
    );



    if(!container) return;



    container.innerHTML="";






    if(dashboardData.projects.length === 0){


        container.innerHTML = `


        <div class="projectCard">

            <h3>
            No Projects Available
            </h3>

        </div>


        `;


        return;


    }








    dashboardData.projects.forEach(data=>{



        let statusClass = "planning";



        if(data.status === "Completed"){

            statusClass="completed";

        }



        else if(data.status === "Ongoing"){

            statusClass="ongoing";

        }








        container.innerHTML += `


        <div class="projectCard fade">



            <h3>
            📂 ${data.title || "Untitled Project"}
            </h3>




            <p class="projectInfo">

            ${data.description || "No description"}

            </p>





            <h3 class="projectBudget">

            ${formatMoney(data.budget)}

            </h3>





            <span class="badge ${statusClass}">

            ${data.status || "Planning"}

            </span>



        </div>


        `;



    });



}








// =====================================================
// DISPLAY ANNOUNCEMENTS
// =====================================================


function displayAnnouncements(){



    const container =

    document.getElementById(
        "announcementContainer"
    );



    if(!container) return;



    container.innerHTML="";






    dashboardData.announcements.forEach(data=>{



        let priority="low";



        if(data.priority==="High"){

            priority="high";

        }


        else if(data.priority==="Medium"){

            priority="medium";

        }







        container.innerHTML += `


        <div class="announcementCard ${priority} fade">


            <h3>

            📢 ${data.title || "Announcement"}

            </h3>




            <p class="announcementMessage">

            ${data.message || "No message"}

            </p>




            <p class="announcementDate">

            Priority:
            ${data.priority || "Low"}

            </p>



        </div>


        `;



    });



}









// =====================================================
// UPDATE SUMMARY CARDS
// =====================================================


function updateDashboardCards(){



    const collectionTotal =

    calculateCollectionTotal();




    const expenseTotal =

    calculateExpenseTotal();




    const balance =

    collectionTotal - expenseTotal;







    const collectionBox =

    document.getElementById(
        "totalCollection"
    );




    const expenseBox =

    document.getElementById(
        "totalExpenses"
    );




    const balanceBox =

    document.getElementById(
        "currentBalance"
    );




    const projectBox =

    document.getElementById(
        "projectCount"
    );







    if(collectionBox){

        collectionBox.innerHTML =

        formatMoney(collectionTotal);

    }





    if(expenseBox){

        expenseBox.innerHTML =

        formatMoney(expenseTotal);

    }






    if(balanceBox){

        balanceBox.innerHTML =

        formatMoney(balance);

    }






    if(projectBox){

        projectBox.innerHTML =

        dashboardData.projects.length;

    }




}






console.log(
"✅ Dashboard Part 2 Ready"
);

// =====================================================
// DALUBWIKAAN TRANSPARENCY PORTAL
// FINAL DASHBOARD.JS
// PART 3/4
// GLOBAL SEARCH SYSTEM
// =====================================================






// =====================================================
// SEARCH ELEMENTS
// =====================================================


const dashboardSearch =

document.getElementById(
    "dashboardSearch"
);



const dashboardSearchResults =

document.getElementById(
    "dashboardSearchResults"
);









// =====================================================
// SEARCH EVENT
// =====================================================


if(dashboardSearch){



    dashboardSearch.addEventListener(

        "input",

        ()=>{


            searchDashboard(

                dashboardSearch.value

            );


        }


    );


}









// =====================================================
// MAIN SEARCH FUNCTION
// =====================================================


function searchDashboard(keyword){



    if(!dashboardSearchResults)

    return;





    keyword =

    keyword

    .toLowerCase()

    .trim();








    // EMPTY SEARCH


    if(keyword === ""){


        dashboardSearchResults.innerHTML = "";

        return;


    }








    let results = "";









    // =====================================================
    // SEARCH COLLECTIONS
    // =====================================================



    dashboardData.collections.forEach(data=>{



        const text = `

        ${data.week}

        ${data.collector}

        ${data.date}

        `

        .toLowerCase();







        if(text.includes(keyword)){



            const total =


            Number(data.firstYear || 0)

            +

            Number(data.secondYear || 0)

            +

            Number(data.thirdYear || 0)

            +

            Number(data.fourthYear || 0);







            results += `


            <div class="expense fade">


                <h3>
                💰 Collection
                </h3>



                <p>
                Week:
                ${data.week || "N/A"}
                </p>



                <p>
                Collector:
                ${data.collector || "N/A"}
                </p>




                <h3>
                ${formatMoney(total)}
                </h3>



            </div>


            `;



        }



    });









    // =====================================================
    // SEARCH EXPENSES
    // =====================================================



    dashboardData.expenses.forEach(data=>{



        const text = `

        ${data.title}

        ${data.category}

        ${data.remarks}

        `

        .toLowerCase();







        if(text.includes(keyword)){



            results += `


            <div class="expense fade">


                <h3>
                💸 ${data.title || "Expense"}
                </h3>



                <p>
                Category:
                ${data.category || "Others"}
                </p>



                <h3 class="expenseAmount">

                ${formatMoney(data.amount)}

                </h3>



            </div>


            `;



        }



    });









    // =====================================================
    // SEARCH PROJECTS
    // =====================================================



    dashboardData.projects.forEach(data=>{



        const text = `

        ${data.title}

        ${data.description}

        ${data.status}

        `

        .toLowerCase();








        if(text.includes(keyword)){



            results += `


            <div class="projectCard fade">


                <h3>
                📂 ${data.title || "Project"}
                </h3>



                <p>
                ${data.description || ""}
                </p>



                <span class="badge">

                ${data.status || "Planning"}

                </span>



            </div>


            `;



        }



    });









    // =====================================================
    // SEARCH ANNOUNCEMENTS
    // =====================================================



    dashboardData.announcements.forEach(data=>{



        const text = `

        ${data.title}

        ${data.message}

        ${data.priority}

        `

        .toLowerCase();







        if(text.includes(keyword)){



            results += `


            <div class="announcementCard fade">


                <h3>
                📢 ${data.title || "Announcement"}
                </h3>




                <p class="announcementMessage">

                ${data.message || ""}

                </p>




                <p>

                Priority:

                ${data.priority || "Low"}

                </p>



            </div>


            `;



        }



    });









    // =====================================================
    // DISPLAY RESULT
    // =====================================================



    if(results === ""){



        dashboardSearchResults.innerHTML = `


        <div class="expense fade">


            <h3>
            ❌ No Result Found
            </h3>



            <p>
            No transparency record matched.
            </p>


        </div>


        `;


    }



    else{


        dashboardSearchResults.innerHTML = results;


    }





}








console.log(

"🔎 Dashboard Search Activated"

);

// =====================================================
// DALUBWIKAAN TRANSPARENCY PORTAL
// FINAL DASHBOARD.JS
// PART 4/4
// CHART + FINAL INITIALIZATION
// =====================================================






// =====================================================
// COLLECTION STATISTICS CHART
// =====================================================


let collectionChart = null;






function createCollectionChart(){



    const canvas =

    document.getElementById(
        "collectionChart"
    );



    if(!canvas)

    return;






    let firstYear = 0;

    let secondYear = 0;

    let thirdYear = 0;

    let fourthYear = 0;







    dashboardData.collections.forEach(data=>{



        firstYear +=

        Number(data.firstYear || 0);



        secondYear +=

        Number(data.secondYear || 0);



        thirdYear +=

        Number(data.thirdYear || 0);



        fourthYear +=

        Number(data.fourthYear || 0);



    });









    if(collectionChart){


        collectionChart.destroy();


    }







    collectionChart = new Chart(

        canvas,

        {


        type:"bar",



        data:{



            labels:[

                "1st Year",

                "2nd Year",

                "3rd Year",

                "4th Year"

            ],





            datasets:[{


                label:

                "Collection Amount (₱)",



                data:[

                    firstYear,

                    secondYear,

                    thirdYear,

                    fourthYear

                ]



            }]



        },







        options:{



            responsive:true,

            maintainAspectRatio:false,



            plugins:{



                legend:{


                    display:true


                }



            },





            scales:{



                y:{



                    beginAtZero:true



                }



            }



        }



        }



    );



}












// =====================================================
// SIMPLE ANIMATION
// =====================================================


function activateAnimations(){



    const elements =

    document.querySelectorAll(

        ".card, .expense, .projectCard, .announcementCard"

    );



    elements.forEach(item=>{


        item.classList.add(

            "fade"

        );


    });



}









// =====================================================
// FINAL DASHBOARD START
// =====================================================


async function startDashboard(){



    try{



        console.log(

            "⏳ Loading Dashboard..."

        );





        await fetchDashboardData();






        displayCollections();



        displayExpenses();



        displayProjects();



        displayAnnouncements();



        updateDashboardCards();



        createCollectionChart();



        activateAnimations();






        console.log(

            "✅ Dalubwikaan Dashboard Loaded!"

        );



    }





    catch(error){



        console.error(

            "Dashboard Start Error:",

            error

        );



    }



}









// =====================================================
// AUTO REFRESH EVERY 1 MINUTE
// =====================================================


setInterval(async()=>{



    await fetchDashboardData();




    displayCollections();



    displayExpenses();



    displayProjects();



    displayAnnouncements();



    updateDashboardCards();



    createCollectionChart();





    console.log(

        "🔄 Dashboard Updated"

    );




},60000);









// =====================================================
// RUN DASHBOARD
// =====================================================


document.addEventListener(

"DOMContentLoaded",

()=>{


    startDashboard();



});








console.log(

"🚀 Dashboard System Ready"

);
