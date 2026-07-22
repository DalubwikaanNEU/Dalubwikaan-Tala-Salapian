// =====================================================
// DALUBWIKAAN TRANSPARENCY PORTAL
// FINAL INDEX.JS / DASHBOARD.JS
// PART 1/4
// FIREBASE CONNECTION + GLOBAL SETUP + EXPENSE LOADING
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
// GLOBAL VARIABLES
// =====================================================


let totalCollectionValue = 0;


let totalExpenseValue = 0;


let chartInstance = null;


let searchDatabase = [];









// =====================================================
// LOAD EXPENSES
// =====================================================


async function loadExpenses(){


try{


const expenseContainer =

document.getElementById(
"expenseContainer"
);




const totalExpenseDisplay =

document.getElementById(
"totalExpenses"
);






const snapshot = await getDocs(

collection(db,"expenses")

);







let total = 0;






if(expenseContainer){


expenseContainer.innerHTML = "";


}









snapshot.forEach((doc)=>{



const data = doc.data();





const amount =

Number(data.amount || 0);






total += amount;







// ================= SEARCH STORAGE =================



searchDatabase.push({


type:"Expense",


title:
data.title || "Untitled Expense",


category:
data.category || "No Category",


amount:amount,


date:
data.date || ""


});









// ================= DISPLAY EXPENSE =================



if(expenseContainer){



expenseContainer.innerHTML += `



<div class="expense fade">


<h3>

💸 ${data.title || "Untitled Expense"}

</h3>



<p>

📂 Category:

${data.category || "No Category"}

</p>



<p>

💰 Amount:

₱${amount.toLocaleString()}

</p>



<p>

📅 Date:

${data.date || "No Date"}

</p>



${

data.remarks

?

`

<p>

📝 ${data.remarks}

</p>

`

:

""

}



</div>



`;



}



});









// SAVE TOTAL EXPENSE


totalExpenseValue = total;








// UPDATE EXPENSE CARD



if(totalExpenseDisplay){


totalExpenseDisplay.innerHTML =


"₱" + total.toLocaleString();



}







console.log(

"💸 Expenses Loaded:",

total

);





return total;





}

catch(error){



console.error(

"❌ Expense Loading Error:",

error

);



return 0;



}



}








// =====================================================
// PART 1 END
// NEXT: COLLECTION SYSTEM + YEAR LEVEL DATA
// =====================================================

// =====================================================
// DALUBWIKAAN TRANSPARENCY PORTAL
// FINAL INDEX.JS / DASHBOARD.JS
// PART 2/4
// COLLECTION SYSTEM + YEAR LEVEL + BALANCE
// =====================================================







// =====================================================
// LOAD COLLECTIONS
// =====================================================


async function loadCollections(){


try{



const snapshot = await getDocs(

collection(db,"collections")

);






let firstYear = 0;

let secondYear = 0;

let thirdYear = 0;

let fourthYear = 0;








snapshot.forEach((doc)=>{



const data = doc.data();






// ADD YEAR LEVEL COLLECTION



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








// SAVE FOR SEARCH



searchDatabase.push({



type:"Collection",



title:
"Year Level Collection",



category:
"Collection",



amount:

Number(data.firstYear || 0)

+

Number(data.secondYear || 0)

+

Number(data.thirdYear || 0)

+

Number(data.fourthYear || 0)



});





});









// TOTAL COLLECTION



const total =


firstYear

+

secondYear

+

thirdYear

+

fourthYear;







totalCollectionValue = total;









// =====================================================
// UPDATE DASHBOARD TOTAL COLLECTION
// =====================================================



const totalCollectionDisplay =

document.getElementById(

"totalCollection"

);





if(totalCollectionDisplay){



totalCollectionDisplay.innerHTML =


"₱" +

total.toLocaleString();



}









// =====================================================
// UPDATE YEAR LEVEL CARDS
// =====================================================



const firstDisplay =

document.getElementById(

"firstYear"

);



const secondDisplay =

document.getElementById(

"secondYear"

);



const thirdDisplay =

document.getElementById(

"thirdYear"

);



const fourthDisplay =

document.getElementById(

"fourthYear"

);









if(firstDisplay){


firstDisplay.innerHTML =

"₱" +

firstYear.toLocaleString();


}





if(secondDisplay){


secondDisplay.innerHTML =

"₱" +

secondYear.toLocaleString();


}





if(thirdDisplay){


thirdDisplay.innerHTML =

"₱" +

thirdYear.toLocaleString();


}





if(fourthDisplay){


fourthDisplay.innerHTML =

"₱" +

fourthYear.toLocaleString();


}









// =====================================================
// CREATE COLLECTION CHART
// =====================================================



createCollectionChart(

firstYear,

secondYear,

thirdYear,

fourthYear

);







console.log(

"📚 Collections Loaded:",

total

);





return total;



}

catch(error){



console.error(

"❌ Collection Loading Error:",

error

);



return 0;



}



}











// =====================================================
// CURRENT BALANCE
// =====================================================


function calculateBalance(){



const balance =


totalCollectionValue

-

totalExpenseValue;







const balanceDisplay =

document.getElementById(

"currentBalance"

);







if(balanceDisplay){



balanceDisplay.innerHTML =


"₱" +

balance.toLocaleString();



}







console.log(

"💰 Current Balance:",

balance

);



}








// =====================================================
// LOAD ANNOUNCEMENTS
// =====================================================


async function loadAnnouncements(){


try{



const container =

document.getElementById(

"dashboardAnnouncementContainer"

);





if(!container)
return;







const snapshot = await getDocs(

collection(db,"announcements")

);






container.innerHTML = "";







snapshot.forEach((doc)=>{


const data = doc.data();






searchDatabase.push({



type:"Announcement",


title:

data.title || "Announcement",



category:

data.priority || "Low",



amount:0



});









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

catch(error){



console.error(

"❌ Announcement Loading Error:",

error

);



}



}









// =====================================================
// PART 2 END
// NEXT: CHART SYSTEM + PROJECTS + SEARCH
// =====================================================

// =====================================================
// DALUBWIKAAN TRANSPARENCY PORTAL
// FINAL INDEX.JS / DASHBOARD.JS
// PART 3/4
// COLLECTION CHART + PROJECT SYSTEM
// =====================================================







// =====================================================
// CREATE COLLECTION CHART
// =====================================================


function createCollectionChart(

firstYear,

secondYear,

thirdYear,

fourthYear

){



const canvas = document.getElementById(

"collectionChart"

);





if(!canvas){


console.log(

"❌ Collection Chart Canvas Missing"

);


return;


}







// REMOVE OLD CHART


if(chartInstance){


chartInstance.destroy();


}









chartInstance = new Chart(

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

"📊 Collection Statistics Chart Loaded"

);



}











// =====================================================
// LOAD PROJECTS
// =====================================================


async function loadProjects(){



try{



const container = document.getElementById(

"projectContainer"

);





const projectCount = document.getElementById(

"projectCount"

);








const snapshot = await getDocs(

collection(db,"projects")

);







let totalProjects = 0;







if(container){



container.innerHTML = "";

}



snapshot.forEach((doc)=>{



const project = doc.data();





totalProjects++;








// ADD SEARCH DATABASE



searchDatabase.push({



type:"Project",



title:

project.title || "Untitled Project",



category:

project.status || "Planning",



amount:

Number(project.budget || 0)



});









if(container){



container.innerHTML += `



<div class="projectCard fade">


<h3>

📂 ${project.title || "Untitled Project"}

</h3>





<p>

${project.description || "No description available."}

</p>





<p>

💰 Budget:

₱${Number(project.budget || 0).toLocaleString()}

</p>





<p>

📌 Status:

${project.status || "Planning"}

</p>



</div>



`;



}





});








if(projectCount){



projectCount.innerHTML = totalProjects;



}






console.log(

"📂 Projects Loaded:",

totalProjects

);





}

catch(error){



console.error(

"❌ Project Loading Error:",

error

);



}



}











// =====================================================
// LOAD DASHBOARD ANNOUNCEMENTS FIX
// =====================================================


async function refreshAnnouncements(){



try{



const container = document.getElementById(

"dashboardAnnouncementContainer"

);






if(!container)

return;








const snapshot = await getDocs(

collection(db,"announcements")

);





container.innerHTML = "";








snapshot.forEach((doc)=>{



const data = doc.data();







container.innerHTML += `



<div class="announcementCard fade">



<h3>

📢 ${data.title || "Announcement"}

</h3>





<p>

${data.message || "No announcement"}

</p>





<p>

Priority:

${data.priority || "Low"}

</p>



</div>



`;







searchDatabase.push({



type:"Announcement",



title:

data.title || "Announcement",



category:

data.priority || "Low",



amount:0



});





});





}

catch(error){



console.error(

"❌ Announcement Error:",

error

);



}



}









// =====================================================
// CHART RESIZE FIX
// =====================================================


window.addEventListener(

"resize",

()=>{


if(chartInstance){


chartInstance.resize();


}


}

);









// =====================================================
// PART 3 END
// NEXT: SEARCH + FINAL DASHBOARD STARTUP
// =====================================================

// =====================================================
// DALUBWIKAAN TRANSPARENCY PORTAL
// FINAL INDEX.JS / DASHBOARD.JS
// PART 4/4
// SEARCH SYSTEM + FINAL STARTUP
// =====================================================







// =====================================================
// DASHBOARD SEARCH SYSTEM
// =====================================================


function setupSearch(){



const searchInput = document.getElementById(

"dashboardSearch"

);




const resultBox = document.getElementById(

"dashboardSearchResults"

);






if(!searchInput || !resultBox){


console.log(

"🔎 Search Elements Not Found"

);


return;


}








searchInput.addEventListener(

"input",

()=>{



const keyword = searchInput.value

.toLowerCase()

.trim();






resultBox.innerHTML = "";







if(keyword === ""){


return;


}







const results = searchDatabase.filter(item=>{



const title =

(item.title || "")

.toLowerCase();





const type =

(item.type || "")

.toLowerCase();





const category =

(item.category || "")

.toLowerCase();







return (

title.includes(keyword)

||

type.includes(keyword)

||

category.includes(keyword)

);



});









if(results.length === 0){



resultBox.innerHTML = `



<div class="expense fade">


<h3>

❌ No Record Found

</h3>



<p>

No matching transparency data.

</p>



</div>



`;



return;



}








results.slice(0,10)

.forEach(item=>{



resultBox.innerHTML += `



<div class="expense fade">



<h3>

${item.title}

</h3>





<p>

📂 Type:

${item.type}

</p>





<p>

📌 Category:

${item.category}

</p>





${
item.amount > 0

?

`

<p>

💰 Amount:

₱${Number(item.amount).toLocaleString()}

</p>

`

:

""

}





</div>



`;



});





});



}











// =====================================================
// CALCULATE BALANCE
// =====================================================


function calculateBalance(){



const balance =


totalCollectionValue

-

totalExpenseValue;






const balanceDisplay = document.getElementById(

"currentBalance"

);







if(balanceDisplay){



balanceDisplay.innerHTML =

"₱" +

balance.toLocaleString();



}







console.log(

"💰 Current Balance:",

balance

);



}












// =====================================================
// FINAL DASHBOARD LOADER
// =====================================================


async function startDashboard(){



try{



console.log(

"⏳ Loading Dalubwikaan Dashboard..."

);








// RESET SEARCH DATA


searchDatabase = [];







// LOAD ALL DATA



await loadCollections();



await loadExpenses();



await loadProjects();



await refreshAnnouncements();








// UPDATE BALANCE



calculateBalance();








// ENABLE SEARCH



setupSearch();








console.log(

"✅ Dashboard Successfully Loaded!"

);






}

catch(error){



console.error(

"❌ Dashboard Error:",

error

);



}



}











// =====================================================
// AUTO LOAD
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











// =====================================================
// END OF FINAL DASHBOARD.JS
// =====================================================
