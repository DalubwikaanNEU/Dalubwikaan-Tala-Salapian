// =====================================================
// DALUBWIKAAN TRANSPARENCY PORTAL
// DASHBOARD.JS
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
// gagamitin sa PART 4


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




// export para magamit ng ibang parts

window.dashboardData = dashboardData;





// =====================================================
// FETCH FIREBASE DATA
// =====================================================


async function fetchDashboardData(){


    try{


        // CLEAR OLD DATA
        // para walang duplicate kapag nag refresh


        dashboardData.collections = [];

        dashboardData.expenses = [];

        dashboardData.projects = [];

        dashboardData.announcements = [];






        // ================= COLLECTIONS =================


        const collectionsSnapshot = await getDocs(

            collection(
                db,
                "collections"
            )

        );



        collectionsSnapshot.forEach((doc)=>{


            dashboardData.collections.push({


                id: doc.id,


                ...doc.data()


            });


        });







        // ================= EXPENSES =================


        const expensesSnapshot = await getDocs(

            collection(
                db,
                "expenses"
            )

        );



        expensesSnapshot.forEach((doc)=>{


            dashboardData.expenses.push({


                id: doc.id,


                ...doc.data()


            });


        });








        // ================= PROJECTS =================


        const projectsSnapshot = await getDocs(

            collection(
                db,
                "projects"
            )

        );



        projectsSnapshot.forEach((doc)=>{


            dashboardData.projects.push({


                id: doc.id,


                ...doc.data()


            });


        });








        // ================= ANNOUNCEMENTS =================


        const announcementsSnapshot = await getDocs(

            collection(
                db,
                "announcements"
            )

        );



        announcementsSnapshot.forEach((doc)=>{


            dashboardData.announcements.push({


                id: doc.id,


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






// export function para magamit sa ibang parts

window.fetchDashboardData = fetchDashboardData;







// =====================================================
// MONEY FORMAT
// =====================================================


function formatMoney(value){



    return "₱" +

    Number(value || 0)

    .toLocaleString();



}



window.formatMoney = formatMoney;






// =====================================================
// TOTAL COLLECTION
// =====================================================


function calculateCollectionTotal(){



    let total = 0;



    dashboardData.collections.forEach((data)=>{



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



window.calculateCollectionTotal = calculateCollectionTotal;







// =====================================================
// TOTAL EXPENSE
// =====================================================


function calculateExpenseTotal(){



    let total = 0;



    dashboardData.expenses.forEach((data)=>{



        total += Number(

            data.amount || 0

        );



    });



    return total;



}



window.calculateExpenseTotal = calculateExpenseTotal;







// =====================================================
// CHART STORAGE
// =====================================================


window.collectionChart = null;






console.log(

"✅ Dashboard PART 1 READY"

);



// =====================================================
// END OF PART 1/4
// =====================================================

// =====================================================
// DALUBWIKAAN TRANSPARENCY PORTAL
// DASHBOARD.JS
// PART 2/4
// DISPLAY SYSTEM + SUMMARY CARDS
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





    if(window.dashboardData.collections.length === 0){


        container.innerHTML = `

        <div class="expense">

            <h3>
            No Collection Records
            </h3>

        </div>

        `;


        return;


    }







    window.dashboardData.collections.forEach((data)=>{



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
            ${window.formatMoney(total)}
            </h3>



        </div>


        `;



    });



}






window.displayCollections = displayCollections;







// =====================================================
// DISPLAY EXPENSES
// =====================================================


function displayExpenses(){



    const container = document.getElementById(
        "expenseContainer"
    );



    if(!container) return;



    container.innerHTML = "";







    if(window.dashboardData.expenses.length === 0){


        container.innerHTML = `


        <div class="expense">


            <h3>
            No Expense Records
            </h3>


        </div>


        `;


        return;


    }








    window.dashboardData.expenses.forEach((data)=>{



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
            ${window.formatMoney(data.amount)}
            </h3>




            <p>
            📅 ${data.date || "No Date"}
            </p>



        </div>


        `;



    });



}



window.displayExpenses = displayExpenses;







// =====================================================
// DISPLAY PROJECTS
// =====================================================


function displayProjects(){



    const container = document.getElementById(
        "projectContainer"
    );



    if(!container) return;



    container.innerHTML = "";







    if(window.dashboardData.projects.length === 0){



        container.innerHTML = `


        <div class="projectCard">


            <h3>
            No Projects Available
            </h3>


        </div>


        `;


        return;


    }







    window.dashboardData.projects.forEach((data)=>{



        container.innerHTML += `


        <div class="projectCard fade">


            <h3>
            📂 ${data.title || "Untitled Project"}
            </h3>



            <p>
            ${data.description || "No Description"}
            </p>




            <h3>
            ${window.formatMoney(data.budget)}
            </h3>




            <span class="badge">

            ${data.status || "Planning"}

            </span>



        </div>


        `;



    });



}



window.displayProjects = displayProjects;







// =====================================================
// DISPLAY ANNOUNCEMENTS
// =====================================================


function displayAnnouncements(){



    const container = document.getElementById(
        "announcementContainer"
    );



    if(!container) return;



    container.innerHTML = "";








    if(window.dashboardData.announcements.length === 0){



        container.innerHTML = `


        <div class="announcementCard">


            <h3>
            No Announcements
            </h3>


        </div>


        `;


        return;


    }








    window.dashboardData.announcements.forEach((data)=>{



        container.innerHTML += `


        <div class="announcementCard fade">


            <h3>
            📢 ${data.title || "Announcement"}
            </h3>




            <p>
            ${data.message || "No Message"}
            </p>




            <p>
            Priority:
            ${data.priority || "Low"}
            </p>



        </div>


        `;



    });



}



window.displayAnnouncements = displayAnnouncements;









// =====================================================
// UPDATE DASHBOARD SUMMARY CARDS
// =====================================================


function updateDashboardCards(){



    const collectionTotal =

    window.calculateCollectionTotal();





    const expenseTotal =

    window.calculateExpenseTotal();





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

        window.formatMoney(collectionTotal);


    }







    if(expenseBox){


        expenseBox.innerHTML =

        window.formatMoney(expenseTotal);


    }








    if(balanceBox){


        balanceBox.innerHTML =

        window.formatMoney(balance);


    }








    if(projectBox){


        projectBox.innerHTML =

        window.dashboardData.projects.length;


    }




}



window.updateDashboardCards = updateDashboardCards;







console.log(

"✅ Dashboard PART 2 READY"

);



// =====================================================
// END OF PART 2/4
// =====================================================

// =====================================================
// DALUBWIKAAN TRANSPARENCY PORTAL
// DASHBOARD.JS
// PART 3/4
// GLOBAL SEARCH SYSTEM
// =====================================================





// =====================================================
// SEARCH INITIALIZATION CONTROL
// =====================================================


let searchStarted = false;






// =====================================================
// SETUP SEARCH
// =====================================================


function setupSearch(){



    if(searchStarted){

        return;

    }






    const searchInput = document.getElementById(
        "dashboardSearch"
    );



    const resultBox = document.getElementById(
        "dashboardSearchResults"
    );






    if(!searchInput || !resultBox){


        console.log(
            "🔎 Search elements missing"
        );


        return;


    }







    searchStarted = true;







    searchInput.addEventListener(

        "input",

        function(){



            const keyword =

            searchInput.value

            .toLowerCase()

            .trim();






            searchDashboard(

                keyword,

                resultBox

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


function searchDashboard(keyword,resultBox){



    resultBox.innerHTML = "";







    if(keyword === ""){


        return;


    }







    let results = "";









    // =================================================
    // COLLECTION SEARCH
    // =================================================


    window.dashboardData.collections.forEach((data)=>{



        const text = `

        ${data.week || ""}

        ${data.collector || ""}

        ${data.date || ""}

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
                ${data.week || "No Week"}
                </p>



                <p>
                ${window.formatMoney(total)}
                </p>



            </div>


            `;



        }



    });









    // =================================================
    // EXPENSE SEARCH
    // =================================================


    window.dashboardData.expenses.forEach((data)=>{



        const text = `


        ${data.title || ""}

        ${data.category || ""}

        ${data.date || ""}

        ${data.remarks || ""}


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



                <p>
                ${window.formatMoney(data.amount)}
                </p>



            </div>


            `;



        }



    });









    // =================================================
    // PROJECT SEARCH
    // =================================================


    window.dashboardData.projects.forEach((data)=>{



        const text = `


        ${data.title || ""}

        ${data.description || ""}

        ${data.status || ""}



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




                <p>
                Status:
                ${data.status || "Planning"}
                </p>



            </div>


            `;



        }



    });









    // =================================================
    // ANNOUNCEMENT SEARCH
    // =================================================


    window.dashboardData.announcements.forEach((data)=>{



        const text = `


        ${data.title || ""}

        ${data.message || ""}

        ${data.priority || ""}



        `

        .toLowerCase();








        if(text.includes(keyword)){



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
    // DISPLAY SEARCH RESULT
    // =================================================



    if(results === ""){


        resultBox.innerHTML = `


        <div class="expense">


            <h3>
            ❌ No Record Found
            </h3>


            <p>
            No matching transparency data.
            </p>


        </div>


        `;


    }

    else{


        resultBox.innerHTML = results;


    }



}







window.setupSearch = setupSearch;







console.log(

"✅ Dashboard PART 3 READY"

);



// =====================================================
// END OF PART 3/4
// =====================================================

// =====================================================
// DALUBWIKAAN TRANSPARENCY PORTAL
// DASHBOARD.JS
// PART 4/4
// CHART + FINAL STARTUP SYSTEM
// =====================================================






// =====================================================
// COLLECTION CHART
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







    dashboardData.collections.forEach((data)=>{



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


                    label:"Collection Amount (₱)",



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
        "📊 Collection Chart Updated"
    );



}











// =====================================================
// ANIMATION
// =====================================================


function activateAnimations(){



    const elements = document.querySelectorAll(

        ".expense, .projectCard, .announcementCard"

    );





    elements.forEach((item)=>{


        item.classList.add(
            "fade"
        );


    });



}











// =====================================================
// MAIN DASHBOARD LOADER
// =====================================================


let dashboardStarted = false;







async function startDashboard(){



    if(dashboardStarted){

        console.log(
            "Dashboard already running"
        );

        return;

    }







    dashboardStarted = true;





    try{



        console.log(
            "⏳ Loading Dalubwikaan Dashboard..."
        );







        await fetchDashboardData();







        displayCollections();



        displayExpenses();



        displayProjects();



        displayAnnouncements();







        updateDashboardCards();







        createCollectionChart();







        if(window.setupSearch){


            window.setupSearch();


        }







        activateAnimations();







        console.log(

            "✅ Dashboard Successfully Loaded"

        );





    }

    catch(error){



        console.error(

            "❌ Dashboard Loading Error:",

            error

        );



    }



}











// =====================================================
// REFRESH DASHBOARD DATA
// =====================================================


async function refreshDashboard(){



    dashboardStarted = false;



    await startDashboard();



}











// =====================================================
// AUTO REFRESH EVERY 60 SECONDS
// =====================================================


setInterval(()=>{



    refreshDashboard();



},60000);











// =====================================================
// INITIAL START
// =====================================================


document.addEventListener(

    "DOMContentLoaded",

    ()=>{


        startDashboard();


    }


);











// =====================================================
// EXPORT GLOBAL FUNCTIONS
// =====================================================


window.dashboardData = dashboardData;


window.formatMoney = formatMoney;


window.refreshDashboard = refreshDashboard;







console.log(

"🚀 DALUBWIKAAN DASHBOARD SYSTEM READY"

);



// =====================================================
// END OF DASHBOARD.JS
// =====================================================
