// =====================================================
// DALUBWIKAAN TRANSPARENCY PORTAL
// FINAL DASHBOARD.JS
// PART 1/4
// FIREBASE CONNECTION + DATA FETCH SYSTEM
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






// =====================================================
// INITIALIZE FIREBASE
// =====================================================


const app = initializeApp(firebaseConfig);


const db = getFirestore(app);



console.log(
"🔥 Firebase Connected Successfully"
);








// =====================================================
// GLOBAL DASHBOARD STORAGE
// =====================================================


const dashboardData = {


    collections: [],


    expenses: [],


    projects: [],


    announcements: []


};







// =====================================================
// CHART VARIABLE
// =====================================================


let collectionChart = null;









// =====================================================
// FETCH ALL FIREBASE DATA
// =====================================================


async function fetchDashboardData(){


try{



    // IMPORTANT:
    // CLEAR OLD DATA PARA WALANG DUPLICATE


    dashboardData.collections = [];

    dashboardData.expenses = [];

    dashboardData.projects = [];

    dashboardData.announcements = [];







    // ================= COLLECTIONS =================


    const collectionSnapshot = await getDocs(

        collection(db,"collections")

    );



    collectionSnapshot.forEach(doc=>{


        dashboardData.collections.push({

            id:doc.id,

            ...doc.data()

        });


    });









    // ================= EXPENSES =================


    const expenseSnapshot = await getDocs(

        collection(db,"expenses")

    );



    expenseSnapshot.forEach(doc=>{


        dashboardData.expenses.push({

            id:doc.id,

            ...doc.data()

        });


    });









    // ================= PROJECTS =================


    const projectSnapshot = await getDocs(

        collection(db,"projects")

    );



    projectSnapshot.forEach(doc=>{


        dashboardData.projects.push({

            id:doc.id,

            ...doc.data()

        });


    });









    // ================= ANNOUNCEMENTS =================


    const announcementSnapshot = await getDocs(

        collection(db,"announcements")

    );



    announcementSnapshot.forEach(doc=>{


        dashboardData.announcements.push({

            id:doc.id,

            ...doc.data()

        });


    });









    console.log(
        "📊 Dashboard Data Loaded",
        dashboardData
    );



}

catch(error){



    console.error(

        "❌ Firebase Fetch Error:",

        error

    );



}



}









// =====================================================
// MONEY FORMAT FUNCTION
// =====================================================


function formatMoney(value){


    return "₱" +

    Number(value || 0)

    .toLocaleString();



}









// =====================================================
// TOTAL COLLECTION CALCULATION
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
// TOTAL EXPENSE CALCULATION
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

"✅ Dashboard PART 1 Ready"

);



// =====================================================
// END OF PART 1
// NEXT: DISPLAY SYSTEM + DASHBOARD CARDS
// =====================================================

// =====================================================
// DALUBWIKAAN TRANSPARENCY PORTAL
// FINAL DASHBOARD.JS
// PART 2/4
// DISPLAY SYSTEM + DASHBOARD SUMMARY
// =====================================================



// =====================================================
// DISPLAY COLLECTIONS
// =====================================================


function displayCollections(){


    const container = document.getElementById(
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
            👤 Collector:
            ${data.collector || "N/A"}
            </p>



            <p>
            📅 Date:
            ${data.date || "N/A"}
            </p>



            <h3>

            ${formatMoney(total)}

            </h3>



        </div>


        `;


    });



}









// =====================================================
// DISPLAY EXPENSES
// =====================================================


function displayExpenses(){


    const container = document.getElementById(
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



            <p>

            📂 Category:

            ${data.category || "Others"}

            </p>




            <h3>

            ${formatMoney(data.amount)}

            </h3>




            <p>

            📅 ${data.date || "No Date"}

            </p>



        </div>



        `;


    });



}









// =====================================================
// DISPLAY PROJECTS
// =====================================================


function displayProjects(){



    const container = document.getElementById(
        "projectContainer"
    );



    if(!container) return;



    container.innerHTML = "";






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



        container.innerHTML += `



        <div class="projectCard fade">


            <h3>

            📂 ${data.title || "Untitled Project"}

            </h3>



            <p>

            ${data.description || "No description"}

            </p>



            <h3>

            ${formatMoney(data.budget)}

            </h3>




            <span class="badge">

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



    const container = document.getElementById(
        "announcementContainer"
    );



    if(!container) return;



    container.innerHTML = "";






    dashboardData.announcements.forEach(data=>{



        container.innerHTML += `



        <div class="announcementCard fade">


            <h3>

            📢 ${data.title || "Announcement"}

            </h3>




            <p>

            ${data.message || "No message"}

            </p>




            <p>

            Priority:

            ${data.priority || "Low"}

            </p>



        </div>



        `;



    });



}









// =====================================================
// UPDATE DASHBOARD SUMMARY CARDS
// =====================================================


function updateDashboardCards(){



    const collectionTotal =

    calculateCollectionTotal();





    const expenseTotal =

    calculateExpenseTotal();





    const balance =

    collectionTotal - expenseTotal;









    const collectionBox = document.getElementById(
        "totalCollection"
    );


    const expenseBox = document.getElementById(
        "totalExpenses"
    );


    const balanceBox = document.getElementById(
        "currentBalance"
    );


    const projectBox = document.getElementById(
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
"✅ Dashboard Part 2 Loaded"
);

// =====================================================
// DALUBWIKAAN TRANSPARENCY PORTAL
// FINAL DASHBOARD.JS
// PART 3/4
// GLOBAL SEARCH SYSTEM
// =====================================================







// =====================================================
// SEARCH SYSTEM VARIABLES
// =====================================================


let searchInitialized = false;









// =====================================================
// SETUP SEARCH
// =====================================================


function setupSearch(){



    if(searchInitialized)

    return;



    const searchInput = document.getElementById(

        "dashboardSearch"

    );



    const searchResults = document.getElementById(

        "dashboardSearchResults"

    );





    if(!searchInput || !searchResults){



        console.log(

            "🔎 Search elements not found"

        );


        return;



    }






    searchInitialized = true;







    searchInput.addEventListener(

        "input",

        ()=>{



            const keyword =

            searchInput.value

            .toLowerCase()

            .trim();





            performSearch(

                keyword,

                searchResults

            );



        }



    );







    console.log(

        "🔎 Search Activated"

    );



}











// =====================================================
// SEARCH FUNCTION
// =====================================================


function performSearch(keyword, resultBox){





    resultBox.innerHTML = "";






    if(keyword === ""){


        return;


    }







    let results = "";









    // =================================================
    // SEARCH COLLECTIONS
    // =================================================



    dashboardData.collections.forEach(data=>{



        const content = `


        ${data.week || ""}

        ${data.collector || ""}

        ${data.date || ""}


        `

        .toLowerCase();








        if(content.includes(keyword)){



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
                ${data.week || "No Week"}
                </p>




                <p>
                ${formatMoney(total)}
                </p>



            </div>



            `;



        }



    });









    // =================================================
    // SEARCH EXPENSES
    // =================================================



    dashboardData.expenses.forEach(data=>{



        const content = `


        ${data.title || ""}

        ${data.category || ""}

        ${data.date || ""}

        ${data.remarks || ""}



        `

        .toLowerCase();







        if(content.includes(keyword)){



            results += `



            <div class="expense fade">


                <h3>
                💸 ${data.title || "Expense"}
                </h3>




                <p>
                Category:
                ${data.category || "Others"}
                </p>




                <p>

                ${formatMoney(data.amount)}

                </p>



            </div>



            `;



        }



    });









    // =================================================
    // SEARCH PROJECTS
    // =================================================



    dashboardData.projects.forEach(data=>{



        const content = `


        ${data.title || ""}

        ${data.description || ""}

        ${data.status || ""}



        `

        .toLowerCase();







        if(content.includes(keyword)){



            results += `



            <div class="projectCard fade">


                <h3>
                📂 ${data.title || "Project"}
                </h3>




                <p>

                ${data.description || ""}

                </p>




                <p>

                Status:
                ${data.status || "Planning"}

                </p>



            </div>



            `;



        }



    });









    // =================================================
    // SEARCH ANNOUNCEMENTS
    // =================================================



    dashboardData.announcements.forEach(data=>{



        const content = `


        ${data.title || ""}

        ${data.message || ""}

        ${data.priority || ""}



        `

        .toLowerCase();







        if(content.includes(keyword)){



            results += `



            <div class="announcementCard fade">


                <h3>

                📢 ${data.title || "Announcement"}

                </h3>




                <p>

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









    // =================================================
    // SHOW RESULTS
    // =================================================



    if(results === ""){



        resultBox.innerHTML = `


        <div class="expense">


            <h3>

            ❌ No Record Found

            </h3>


        </div>


        `;



    }

    else{


        resultBox.innerHTML = results;


    }






}








console.log(

"✅ Dashboard Part 3 Loaded"

);



// =====================================================
// END PART 3
// NEXT:
// CHART + FINAL STARTUP SYSTEM
// =====================================================

// =====================================================
// DALUBWIKAAN TRANSPARENCY PORTAL
// FINAL DASHBOARD.JS
// PART 4/4
// CHART + FINAL STARTUP SYSTEM
// =====================================================







// =====================================================
// CREATE COLLECTION CHART
// =====================================================


function createCollectionChart(){



    const canvas = document.getElementById(

        "collectionChart"

    );





    if(!canvas){


        console.log(

            "📊 Chart canvas not found"

        );


        return;


    }







    let firstYear = 0;

    let secondYear = 0;

    let thirdYear = 0;

    let fourthYear = 0;







    dashboardData.collections.forEach(data=>{



        firstYear += Number(

            data.firstYear || 0

        );





        secondYear += Number(

            data.secondYear || 0

        );





        thirdYear += Number(

            data.thirdYear || 0

        );





        fourthYear += Number(

            data.fourthYear || 0

        );



    });








    // REMOVE OLD CHART


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



                    ],




                    borderWidth:2



                }]



            },







            options:{



                responsive:true,


                maintainAspectRatio:false,





                plugins:{



                    legend:{


                        display:true,


                        position:"bottom"



                    }



                },







                scales:{



                    y:{



                        beginAtZero:true,





                        ticks:{



                            callback:function(value){



                                return "₱" +

                                value.toLocaleString();



                            }



                        }



                    }



                }



            }



        }



    );







    console.log(

        "📊 Collection Chart Loaded"

    );



}











// =====================================================
// ACTIVATE SIMPLE ANIMATION
// =====================================================


function activateAnimations(){



    const elements = document.querySelectorAll(


        ".expense, .projectCard, .announcementCard"


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

            "⏳ Starting Dashboard..."

        );








        // FETCH FIREBASE DATA


        await fetchDashboardData();








        // DISPLAY DATA


        displayCollections();


        displayExpenses();


        displayProjects();


        displayAnnouncements();








        // UPDATE SUMMARY


        updateDashboardCards();








        // CREATE CHART


        createCollectionChart();








        // ENABLE SEARCH


        setupSearch();








        // ANIMATION


        activateAnimations();








        console.log(

            "✅ Dalubwikaan Dashboard Ready"

        );



    }





    catch(error){



        console.error(

            "❌ Dashboard Start Error:",

            error

        );



    }



}











// =====================================================
// WINDOW RESIZE CHART FIX
// =====================================================


window.addEventListener(

    "resize",

    ()=>{



        if(collectionChart){



            collectionChart.resize();



        }



    }



);











// =====================================================
// INITIAL LOAD
// =====================================================


document.addEventListener(

    "DOMContentLoaded",

    ()=>{


        startDashboard();


    }


);









// =====================================================
// AUTO REFRESH EVERY 60 SECONDS
// =====================================================


setInterval(()=>{



    startDashboard();



},60000);









console.log(

"🚀 FINAL DASHBOARD SYSTEM LOADED"

);



// =====================================================
// END OF DASHBOARD.JS
// =====================================================
