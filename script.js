/*=========================================================
 DALUBWIKAAN TRANSPARENCY PORTAL
 script.js
 PART 1 - Foundation
=========================================================*/

// =========================================================
// GLOBAL VARIABLES
// =========================================================

let collections = [];
let expenses = [];
let projects = [];
let announcements = [];

let collectionChart = null;

// =========================================================
// WEBSITE START
// =========================================================

document.addEventListener("DOMContentLoaded", async () => {

    await initializeWebsite();

});

// =========================================================
// INITIALIZER
// =========================================================

async function initializeWebsite(){

    await loadCollections();

}

// =========================================================
// FORMAT CURRENCY
// =========================================================

function peso(value){

    return "₱" + Number(value).toLocaleString("en-PH");

}

// =========================================================
// FETCH JSON
// =========================================================

async function getJSON(file){

    const response = await fetch(file);

    if(!response.ok){

        throw new Error("Unable to load " + file);

    }

    return await response.json();

}

// =========================================================
// LOAD COLLECTIONS
// =========================================================

async function loadCollections(){

    try{

        const data = await getJSON("data/collections.json");

        collections = data.weeks;

        computeCollectionTotals();

    }

    catch(error){

        console.error(error);

    }

}

// =========================================================
// COMPUTE COLLECTION TOTALS
// =========================================================

function computeCollectionTotals(){

    const totals = {

        first:0,

        second:0,

        third:0,

        fourth:0

    };

    collections.forEach(week=>{

        totals.first += Number(week.first);

        totals.second += Number(week.second);

        totals.third += Number(week.third);

        totals.fourth += Number(week.fourth);

    });

    updateCollectionCards(totals);

}

// =========================================================
// UPDATE DASHBOARD
// =========================================================

function updateCollectionCards(totals){

    setMoney("firstYear", totals.first);

    setMoney("secondYear", totals.second);

    setMoney("thirdYear", totals.third);

    setMoney("fourthYear", totals.fourth);

    const total =

        totals.first +

        totals.second +

        totals.third +

        totals.fourth;

    setMoney("totalCollection", total);

}

// =========================================================
// UPDATE MONEY ELEMENT
// =========================================================

function setMoney(id,value){

    const element = document.getElementById(id);

    if(!element) return;

    element.textContent = peso(value);

}

// =========================================================
// TOTAL COLLECTION
// =========================================================

function getTotalCollection(){

    let total = 0;

    collections.forEach(week=>{

        total +=

        Number(week.first)+

        Number(week.second)+

        Number(week.third)+

        Number(week.fourth);

    });

    return total;

}

// =========================================================
// TOTAL PER YEAR LEVEL
// =========================================================

function getYearTotal(year){

    let total = 0;

    collections.forEach(week=>{

        total += Number(week[year]);

    });

    return total;

}

// =========================================================
// SIMPLE COUNTER ANIMATION
// =========================================================

function animateMoney(id,endValue){

    const element = document.getElementById(id);

    if(!element) return;

    let current = 0;

    const increment = Math.max(1,Math.ceil(endValue/80));

    const timer = setInterval(()=>{

        current += increment;

        if(current >= endValue){

            current = endValue;

            clearInterval(timer);

        }

        element.textContent = peso(current);

    },15);

}

/*=========================================================
 DALUBWIKAAN TRANSPARENCY PORTAL
 script.js
 PART 2 - Expenses
=========================================================*/

// =========================================================
// LOAD EXPENSES
// =========================================================

async function loadExpenses(){

    try{

        expenses = await getJSON("data/expenses.json");

        renderExpenses();

        updateExpenseSummary();

    }

    catch(error){

        console.error(error);

    }

}

// =========================================================
// INITIALIZE CONTINUATION
// =========================================================

// Tawagin ito pagkatapos ng loadCollections()
// sa initializeWebsite() ng Part 1:
//
// await loadExpenses();
//
// (Sa Part 7 ibibigay ko ang FINAL initializeWebsite()
// para hindi ka na mag-edit ulit.)

// =========================================================
// TOTAL EXPENSES
// =========================================================

function getTotalExpenses(){

    let total = 0;

    expenses.forEach(expense=>{

        total += Number(expense.amount);

    });

    return total;

}

// =========================================================
// CURRENT BALANCE
// =========================================================

function getCurrentBalance(){

    return getTotalCollection() - getTotalExpenses();

}

// =========================================================
// UPDATE DASHBOARD
// =========================================================

function updateExpenseSummary(){

    setMoney(

        "totalExpenses",

        getTotalExpenses()

    );

    setMoney(

        "currentBalance",

        getCurrentBalance()

    );

}

// =========================================================
// SORT EXPENSES
// =========================================================

function sortExpenses(){

    expenses.sort((a,b)=>{

        return new Date(b.date)-new Date(a.date);

    });

}

// =========================================================
// DISPLAY EXPENSES
// =========================================================

function renderExpenses(){

    const container = document.getElementById(

        "expenseContainer"

    );

    if(!container) return;

    sortExpenses();

    container.innerHTML = "";

    if(expenses.length===0){

        container.innerHTML = `

        <div class="expense">

            <h3>No expenses yet.</h3>

        </div>

        `;

        return;

    }

    expenses.forEach(expense=>{

        container.innerHTML += `

        <div class="expense fade">

            <h3>

                ${expense.title}

            </h3>

            <div class="expenseAmount">

                ${peso(expense.amount)}

            </div>

            <div class="expenseDate">

                ${expense.date}

            </div>

            <div class="expenseCategory">

                ${expense.category}

            </div>

        </div>

        `;

    });

}

// =========================================================
// EXPENSE BY CATEGORY
// =========================================================

function getCategoryTotal(category){

    let total = 0;

    expenses.forEach(expense=>{

        if(expense.category===category){

            total += Number(expense.amount);

        }

    });

    return total;

}

// =========================================================
// MOST RECENT EXPENSE
// =========================================================

function getLatestExpense(){

    if(expenses.length===0){

        return null;

    }

    sortExpenses();

    return expenses[0];

}

/*=========================================================
 DALUBWIKAAN TRANSPARENCY PORTAL
 script.js
 PART 3 - Projects
=========================================================*/

// =========================================================
// LOAD PROJECTS
// =========================================================

async function loadProjects(){

    try{

        projects = await getJSON("data/projects.json");

        renderProjects();

        updateProjectCounter();

    }

    catch(error){

        console.error(error);

    }

}

// =========================================================
// DISPLAY PROJECTS
// =========================================================

function renderProjects(){

    const container=document.getElementById("projectContainer");

    if(!container) return;

    container.innerHTML="";

    if(projects.length===0){

        container.innerHTML=`

        <div class="projectCard">

            <h3>No Projects Available</h3>

            <p>Projects will appear here.</p>

        </div>

        `;

        return;

    }

    projects.forEach(project=>{

        const remaining=

            Number(project.budget)-

            Number(project.spent);

        let badge="planning";

        if(project.status==="Completed"){

            badge="completed";

        }

        else if(project.status==="Ongoing"){

            badge="ongoing";

        }

        container.innerHTML+=`

        <div class="projectCard fade">

            <h3>${project.title}</h3>

            <div class="projectBudget">

                ${peso(project.budget)}

            </div>

            <div class="projectInfo">

                <strong>Spent:</strong>

                ${peso(project.spent)}

                <br><br>

                <strong>Remaining:</strong>

                ${peso(remaining)}

            </div>

            <div class="badge ${badge}">

                ${project.status}

            </div>

        </div>

        `;

    });

}

// =========================================================
// PROJECT COUNTER
// =========================================================

function updateProjectCounter(){

    const counter=document.getElementById("projectCount");

    if(counter){

        counter.textContent=projects.length;

    }

}

// =========================================================
// TOTAL PROJECT BUDGET
// =========================================================

function getTotalProjectBudget(){

    let total=0;

    projects.forEach(project=>{

        total+=Number(project.budget);

    });

    return total;

}

// =========================================================
// TOTAL PROJECT SPENT
// =========================================================

function getTotalProjectSpent(){

    let total=0;

    projects.forEach(project=>{

        total+=Number(project.spent);

    });

    return total;

}

// =========================================================
// REMAINING PROJECT BUDGET
// =========================================================

function getRemainingProjectBudget(){

    return getTotalProjectBudget()-getTotalProjectSpent();

}

// =========================================================
// PROJECT STATUS COUNTS
// =========================================================

function getProjectStatusCount(status){

    let total=0;

    projects.forEach(project=>{

        if(project.status===status){

            total++;

        }

    });

    return total;

}

/*=========================================================
 DALUBWIKAAN TRANSPARENCY PORTAL
 script.js
 PART 4 - Charts & Dashboard
=========================================================*/

// =========================================================
// COLLECTION CHART
// =========================================================

function renderCollectionChart(){

    const canvas=document.getElementById("collectionChart");

    if(!canvas) return;

    const first=getYearTotal("first");
    const second=getYearTotal("second");
    const third=getYearTotal("third");
    const fourth=getYearTotal("fourth");

    if(collectionChart){

        collectionChart.destroy();

    }

    collectionChart=new Chart(canvas,{

        type:"bar",

        data:{

            labels:[
                "1st Year",
                "2nd Year",
                "3rd Year",
                "4th Year"
            ],

            datasets:[{

                label:"Collections",

                data:[
                    first,
                    second,
                    third,
                    fourth
                ],

                backgroundColor:[
                    "#8B5E3C",
                    "#5D8C63",
                    "#B58A5A",
                    "#4E79A7"
                ],

                borderRadius:10

            }]

        },

        options:{

            responsive:true,

            maintainAspectRatio:false,

            plugins:{

                legend:{

                    display:false

                }

            },

            scales:{

                y:{

                    beginAtZero:true,

                    ticks:{

                        callback:function(value){

                            return "₱"+value.toLocaleString();

                        }

                    }

                }

            }

        }

    });

}

// =========================================================
// REFRESH DASHBOARD
// =========================================================

function refreshDashboard(){

    computeCollectionTotals();

    updateExpenseSummary();

    renderExpenses();

    renderProjects();

    updateProjectCounter();

    renderCollectionChart();

}

// =========================================================
// LOAD EVERYTHING
// =========================================================

async function initializeWebsite(){

    await loadCollections();

    await loadExpenses();

    await loadProjects();

    refreshDashboard();

}

// =========================================================
// AUTO REFRESH
// =========================================================

setInterval(()=>{

    refreshDashboard();

},30000);

// =========================================================
// ANIMATE DASHBOARD
// =========================================================

function animateDashboard(){

    animateMoney(

        "totalCollection",

        getTotalCollection()

    );

    animateMoney(

        "totalExpenses",

        getTotalExpenses()

    );

    animateMoney(

        "currentBalance",

        getCurrentBalance()

    );

}

/*=========================================================
 DALUBWIKAAN TRANSPARENCY PORTAL
 script.js
 PART 5 - Search, Weekly Collections & Reports
=========================================================*/

// =========================================================
// SEARCH PROJECTS
// =========================================================

function searchProjects(keyword){

    keyword = keyword.toLowerCase();

    const cards = document.querySelectorAll(".projectCard");

    cards.forEach(card=>{

        if(card.textContent.toLowerCase().includes(keyword)){

            card.style.display="block";

        }

        else{

            card.style.display="none";

        }

    });

}

// =========================================================
// SEARCH EXPENSES
// =========================================================

function searchExpenses(keyword){

    keyword = keyword.toLowerCase();

    const cards = document.querySelectorAll(".expense");

    cards.forEach(card=>{

        if(card.textContent.toLowerCase().includes(keyword)){

            card.style.display="block";

        }

        else{

            card.style.display="none";

        }

    });

}

// =========================================================
// RENDER WEEKLY COLLECTION TABLE
// =========================================================

function renderWeeklyCollections(){

    const table=document.getElementById("weeklyCollectionTable");

    if(!table) return;

    table.innerHTML="";

    collections.forEach(week=>{

        const total=

            Number(week.first)+

            Number(week.second)+

            Number(week.third)+

            Number(week.fourth);

        table.innerHTML+=`

        <tr>

            <td>${week.week}</td>

            <td>${peso(week.first)}</td>

            <td>${peso(week.second)}</td>

            <td>${peso(week.third)}</td>

            <td>${peso(week.fourth)}</td>

            <td><strong>${peso(total)}</strong></td>

        </tr>

        `;

    });

}

// =========================================================
// REPORT SUMMARY
// =========================================================

function generateFinancialSummary(){

    return{

        collection:getTotalCollection(),

        expenses:getTotalExpenses(),

        balance:getCurrentBalance(),

        projects:projects.length,

        projectBudget:getTotalProjectBudget(),

        projectSpent:getTotalProjectSpent(),

        projectRemaining:getRemainingProjectBudget()

    };

}

// =========================================================
// DISPLAY REPORT SUMMARY
// =========================================================

function renderReportSummary(){

    const report=document.getElementById("reportSummary");

    if(!report) return;

    const summary=generateFinancialSummary();

    report.innerHTML=`

        <div class="statCard">

            <h3>Total Collection</h3>

            <h2>${peso(summary.collection)}</h2>

        </div>

        <div class="statCard">

            <h3>Total Expenses</h3>

            <h2>${peso(summary.expenses)}</h2>

        </div>

        <div class="statCard">

            <h3>Current Balance</h3>

            <h2>${peso(summary.balance)}</h2>

        </div>

        <div class="statCard">

            <h3>Total Projects</h3>

            <h2>${summary.projects}</h2>

        </div>

    `;

}

// =========================================================
// REFRESH REPORTS
// =========================================================

function refreshReports(){

    renderWeeklyCollections();

    renderReportSummary();

}

/*=========================================================
 DALUBWIKAAN TRANSPARENCY PORTAL
 script.js
 PART 6 - Print, Export & Utilities
=========================================================*/

// =========================================================
// PRINT FINANCIAL REPORT
// =========================================================

function printReport(){

    window.print();

}

// =========================================================
// EXPORT REPORT AS JSON
// =========================================================

function exportFinancialData(){

    const data={

        collections,

        expenses,

        projects,

        summary:generateFinancialSummary()

    };

    const json=JSON.stringify(data,null,4);

    const blob=new Blob(

        [json],

        {

            type:"application/json"

        }

    );

    const url=URL.createObjectURL(blob);

    const link=document.createElement("a");

    link.href=url;

    link.download="Dalubwikaan-Financial-Report.json";

    document.body.appendChild(link);

    link.click();

    document.body.removeChild(link);

    URL.revokeObjectURL(url);

}

// =========================================================
// VIEW RECEIPT
// =========================================================

function viewReceipt(image){

    if(!image){

        alert("No receipt uploaded.");

        return;

    }

    window.open(

        image,

        "_blank"

    );

}

// =========================================================
// TODAY'S DATE
// =========================================================

function getCurrentDate(){

    return new Date().toLocaleDateString(

        "en-PH",

        {

            year:"numeric",

            month:"long",

            day:"numeric"

        }

    );

}

// =========================================================
// LAST UPDATED
// =========================================================

function updateLastUpdated(){

    const element=document.getElementById(

        "lastUpdated"

    );

    if(!element) return;

    element.textContent=

    "Last Updated: "+

    getCurrentDate();

}

// =========================================================
// LOADING
// =========================================================

function showLoading(id){

    const element=document.getElementById(id);

    if(!element) return;

    element.innerHTML=`

        <div class="loading"></div>

    `;

}

function hideLoading(id){

    const element=document.getElementById(id);

    if(!element) return;

    element.innerHTML="";

}

// =========================================================
// NOTIFICATION
// =========================================================

function notify(message){

    alert(message);

}

// =========================================================
// CURRENCY INPUT
// =========================================================

function sanitizeAmount(value){

    return Number(value)||0;

}

// =========================================================
// AUTO UPDATE DATE
// =========================================================

window.addEventListener("load",()=>{

    updateLastUpdated();

});

/*=========================================================
 DALUBWIKAAN TRANSPARENCY PORTAL
 script.js
 PART 7 - Final
=========================================================*/

// =========================================================
// GLOBAL DASHBOARD REFRESH
// =========================================================

function refreshAll(){

    computeCollectionTotals();

    updateExpenseSummary();

    renderExpenses();

    renderProjects();

    updateProjectCounter();

    renderCollectionChart();

    renderWeeklyCollections();

    renderReportSummary();

    updateLastUpdated();

}

// =========================================================
// RELOAD ALL JSON FILES
// =========================================================

async function reloadData(){

    try{

        await loadCollections();

        await loadExpenses();

        await loadProjects();

        refreshAll();

    }

    catch(error){

        console.error("Reload Error:",error);

    }

}

// =========================================================
// WINDOW FOCUS
// =========================================================

window.addEventListener("focus",()=>{

    reloadData();

});

// =========================================================
// AUTO REFRESH EVERY 60 SECONDS
// =========================================================

setInterval(()=>{

    reloadData();

},60000);

// =========================================================
// PAGE LOADED
// =========================================================

window.addEventListener("load",()=>{

    refreshAll();

});

// =========================================================
// GLOBAL SEARCH
// =========================================================

function globalSearch(){

    const input=document.getElementById("searchInput");

    if(!input) return;

    const keyword=input.value;

    searchExpenses(keyword);

    searchProjects(keyword);

}

// =========================================================
// ENTER KEY SEARCH
// =========================================================

document.addEventListener("keydown",(event)=>{

    if(event.key==="Enter"){

        globalSearch();

    }

});

// =========================================================
// CLEAR SEARCH
// =========================================================

function clearSearch(){

    const input=document.getElementById("searchInput");

    if(!input) return;

    input.value="";

    renderExpenses();

    renderProjects();

}

// =========================================================
// PAGE READY
// =========================================================

console.log(
    "Dalubwikaan Transparency Portal Loaded Successfully."
);
