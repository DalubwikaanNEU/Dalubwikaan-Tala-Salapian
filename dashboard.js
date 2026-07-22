// =====================================================
// DALUBWIKAAN TRANSPARENCY PORTAL
// DASHBOARD.JS
// PART 1/4
// FIREBASE CONNECTION + DATA FETCH
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
// GLOBAL DASHBOARD DATA
// =====================================================


const dashboardData = {


    collections: [],

    expenses: [],

    projects: [],

    announcements: []


};





// para magamit ng ibang parts

window.dashboardData = dashboardData;





// =====================================================
// FETCH FIRESTORE DATA
// =====================================================


async function fetchDashboardData(){


    try{


        console.log(
        "⏳ Fetching dashboard data..."
        );



        // CLEAR OLD DATA

        dashboardData.collections = [];

        dashboardData.expenses = [];

        dashboardData.projects = [];

        dashboardData.announcements = [];








        // ================= COLLECTIONS =================


        const collectionsSnap = await getDocs(

            collection(
                db,
                "collections"
            )

        );



        collectionsSnap.forEach((item)=>{


            dashboardData.collections.push({

                id:item.id,

                ...item.data()

            });


        });









        // ================= EXPENSES =================


        const expensesSnap = await getDocs(

            collection(
                db,
                "expenses"
            )

        );



        expensesSnap.forEach((item)=>{


            dashboardData.expenses.push({

                id:item.id,

                ...item.data()

            });


        });









        // ================= PROJECTS =================


        const projectsSnap = await getDocs(

            collection(
                db,
                "projects"
            )

        );



        projectsSnap.forEach((item)=>{


            dashboardData.projects.push({

                id:item.id,

                ...item.data()

            });


        });









        // ================= ANNOUNCEMENTS =================


        const announcementsSnap = await getDocs(

            collection(
                db,
                "announcements"
            )

        );



        announcementsSnap.forEach((item)=>{


            dashboardData.announcements.push({

                id:item.id,

                ...item.data()

            });


        });








        console.log(
            "✅ Dashboard Data Loaded",
            dashboardData
        );



    }



    catch(error){


        console.error(

            "❌ Dashboard Firebase Error:",

            error

        );


    }



}







// export globally

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
// COLLECTION TOTAL
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
// EXPENSE TOTAL
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


let collectionChart = null;



window.collectionChart = collectionChart;







console.log(
"✅ DASHBOARD PART 1 READY"
);



// =====================================================
// END PART 1/4
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



    if(!container){

        console.warn(
            "collectionContainer not found"
        );

        return;

    }




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








    dashboardData.collections.forEach((data)=>{



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



window.displayCollections = displayCollections;









// =====================================================
// DISPLAY EXPENSES
// =====================================================


function displayExpenses(){



    const container = document.getElementById(
        "expenseContainer"
    );



    if(!container){

        console.warn(
            "expenseContainer not found"
        );

        return;

    }






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







    dashboardData.expenses.forEach((data)=>{



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



window.displayExpenses = displayExpenses;









// =====================================================
// DISPLAY PROJECTS
// =====================================================


function displayProjects(){



    const container = document.getElementById(
        "projectContainer"
    );



    if(!container){

        console.warn(
            "projectContainer not found"
        );

        return;

    }






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








    dashboardData.projects.forEach((data)=>{



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






            <p>

            Status:

            ${data.status || "Planning"}

            </p>



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



    if(!container){

        console.warn(
            "announcementContainer not found"
        );

        return;

    }







    container.innerHTML = "";








    if(dashboardData.announcements.length === 0){



        container.innerHTML = `


        <div class="announcementCard">


            <h3>
            No Announcements
            </h3>


        </div>


        `;


        return;


    }








    dashboardData.announcements.forEach((data)=>{



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
// UPDATE SUMMARY CARDS
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



window.updateDashboardCards = updateDashboardCards;









console.log(
"✅ DASHBOARD PART 2 READY"
);



// =====================================================
// END PART 2/4
// =====================================================

// =====================================================
// DALUBWIKAAN TRANSPARENCY PORTAL
// DASHBOARD.JS
// PART 3/4
// GLOBAL SEARCH SYSTEM
// =====================================================





// =====================================================
// SEARCH SETUP
// =====================================================


let searchInitialized = false;







function setupSearch(){



    if(searchInitialized){

        return;

    }







    const searchInput = document.getElementById(
        "dashboardSearch"
    );



    const resultBox = document.getElementById(
        "dashboardSearchResults"
    );







    if(!searchInput || !resultBox){



        console.warn(
            "Search elements missing"
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


        resultBox.innerHTML = `


        <div class="expense">


            <p>
            Type something to search...
            </p>


        </div>


        `;


        return;


    }









    let results = "";









    // ================= COLLECTION SEARCH =================



    dashboardData.collections.forEach((data)=>{



        const searchable = `

        ${data.week || ""}

        ${data.collector || ""}

        ${data.date || ""}

        `

        .toLowerCase();






        if(searchable.includes(keyword)){



            const total =

            Number(data.firstYear || 0)

            +

            Number(data.secondYear || 0)

            +

            Number(data.thirdYear || 0)

            +

            Number(data.fourthYear || 0);







            results += `


            <div class="expense">


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









    // ================= EXPENSE SEARCH =================



    dashboardData.expenses.forEach((data)=>{



        const searchable = `

        ${data.title || ""}

        ${data.category || ""}

        ${data.date || ""}

        ${data.remarks || ""}

        `

        .toLowerCase();







        if(searchable.includes(keyword)){



            results += `


            <div class="expense">


                <h3>
                💸 ${data.title || "Expense"}
                </h3>




                <p>
                Category:
                ${data.category || "Others"}
                </p>




                <h3>
                ${formatMoney(data.amount)}
                </h3>



            </div>


            `;



        }



    });









    // ================= PROJECT SEARCH =================



    dashboardData.projects.forEach((data)=>{



        const searchable = `


        ${data.title || ""}

        ${data.description || ""}

        ${data.status || ""}


        `

        .toLowerCase();







        if(searchable.includes(keyword)){



            results += `


            <div class="projectCard">


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









    // ================= ANNOUNCEMENT SEARCH =================



    dashboardData.announcements.forEach((data)=>{



        const searchable = `


        ${data.title || ""}

        ${data.message || ""}

        ${data.priority || ""}


        `

        .toLowerCase();







        if(searchable.includes(keyword)){



            results += `


            <div class="announcementCard">


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









    // ================= SHOW RESULT =================



    if(results === ""){


        resultBox.innerHTML = `


        <div class="expense">


            <h3>
            ❌ No Record Found
            </h3>


            <p>
            No matching data.
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
"✅ DASHBOARD PART 3 READY"
);



// =====================================================
// END PART 3/4
// =====================================================

// =====================================================
// DALUBWIKAAN TRANSPARENCY PORTAL
// DASHBOARD.JS
// PART 4/4
// CHART + FINAL START SYSTEM
// =====================================================





// =====================================================
// CREATE COLLECTION CHART
// =====================================================


function createCollectionChart(){



    const canvas = document.getElementById(
        "collectionChart"
    );




    if(!canvas){


        console.warn(
            "Chart canvas not found"
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
        "📊 Chart Created"
    );



}











// =====================================================
// ANIMATION SYSTEM
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
// MAIN DASHBOARD START
// =====================================================


async function startDashboard(){



    try{



        console.log(
            "⏳ Starting Dashboard..."
        );






        await fetchDashboardData();






        displayCollections();


        displayExpenses();


        displayProjects();


        displayAnnouncements();






        updateDashboardCards();






        createCollectionChart();






        setupSearch();






        activateAnimations();






        console.log(

            "✅ DALUBWIKAAN DASHBOARD READY"

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
// REFRESH SYSTEM
// =====================================================


async function refreshDashboard(){



    await startDashboard();



}



window.refreshDashboard = refreshDashboard;









// =====================================================
// AUTO REFRESH EVERY 60 SECONDS
// =====================================================


setInterval(()=>{


    refreshDashboard();


},60000);











// =====================================================
// THEME SYSTEM
// =====================================================


const themeButton = document.getElementById(
    "themeToggle"
);





if(themeButton){



    themeButton.addEventListener(

        "click",

        ()=>{


            document.body.classList.toggle(
                "dark-mode"
            );




            const dark =

            document.body.classList.contains(
                "dark-mode"
            );





            themeButton.innerHTML = dark

            ?

            "☀️ Light Mode"

            :

            "🌙 Dark Mode";






            localStorage.setItem(

                "theme",

                dark

                ?

                "dark"

                :

                "light"

            );



        }


    );



}









// LOAD SAVED THEME


const savedTheme = localStorage.getItem(
    "theme"
);




if(savedTheme === "dark"){


    document.body.classList.add(
        "dark-mode"
    );



    if(themeButton){


        themeButton.innerHTML =
        "☀️ Light Mode";


    }


}











// =====================================================
// PAGE READY
// =====================================================


document.addEventListener(

    "DOMContentLoaded",

    ()=>{


        startDashboard();


    }


);









console.log(
"🚀 DASHBOARD SYSTEM LOADED"
);



// =====================================================
// END OF DASHBOARD.JS
// =====================================================
