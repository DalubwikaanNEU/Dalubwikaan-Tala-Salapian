// =====================================================
// DALUBWIKAAN ADMIN SYSTEM
// FINAL ADMIN.JS
// PART 1/4
// FIREBASE + AUTH + COLLECTION MANAGEMENT
// =====================================================


// ================= FIREBASE IMPORT =================


import { initializeApp }

from "https://www.gstatic.com/firebasejs/11.0.2/firebase-app.js";


import {

getFirestore,
collection,
addDoc,
getDocs,
deleteDoc,
doc,
getDoc,
updateDoc

}

from "https://www.gstatic.com/firebasejs/11.0.2/firebase-firestore.js";


import {

getAuth,
signOut

}

from "https://www.gstatic.com/firebasejs/11.0.2/firebase-auth.js";




// =====================================================
// FIREBASE CONFIG
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


const auth = getAuth(app);



console.log(
"🔥 Dalubwikaan Firebase Connected"
);







// =====================================================
// GLOBAL EDIT VARIABLES
// =====================================================


let editingCollectionID = null;








// =====================================================
// LOGOUT SYSTEM (ONLY ONE)
// =====================================================


document.addEventListener(

"DOMContentLoaded",

()=>{


const logoutBtn =

document.getElementById(
"logoutBtn"
);



if(logoutBtn){


logoutBtn.addEventListener(

"click",

async()=>{


try{


await signOut(auth);



alert(
"✅ Logged out successfully!"
);



window.location.href =
"login.html";



}

catch(error){


console.error(
error
);


alert(
"❌ Logout failed"
);



}



}


);



}



}

);









// =====================================================
// COLLECTION SAVE SYSTEM
// =====================================================


window.saveCollection = async function(){



try{



const collectionData = {



week:

document.getElementById(
"week"
).value.trim(),



date:

document.getElementById(
"collectionDate"
).value,



firstYear:

Number(

document.getElementById(
"firstYearCollection"
).value || 0

),



secondYear:

Number(

document.getElementById(
"secondYearCollection"
).value || 0

),



thirdYear:

Number(

document.getElementById(
"thirdYearCollection"
).value || 0

),



fourthYear:

Number(

document.getElementById(
"fourthYearCollection"
).value || 0

),



collector:

document.getElementById(
"collector"
).value.trim(),



updatedAt:

new Date().toISOString()



};









// UPDATE EXISTING COLLECTION


if(editingCollectionID){



await updateDoc(

doc(

db,

"collections",

editingCollectionID

),

collectionData

);



alert(
"✅ Collection updated!"
);



editingCollectionID=null;



}






// ADD NEW COLLECTION


else{



await addDoc(

collection(

db,

"collections"

),

{


...collectionData,


createdAt:

new Date().toISOString()


}


);



alert(
"✅ Collection saved!"
);



}








clearCollectionForm();


loadAdminCollections();



}



catch(error){



console.error(
"Collection Save Error:",
error
);



alert(
"❌ Failed saving collection"
);



}



};









// =====================================================
// LOAD COLLECTION RECORDS
// =====================================================


async function loadAdminCollections(){



const container =

document.getElementById(
"adminCollectionList"
);




if(!container)
return;






try{



const snapshot =

await getDocs(

collection(

db,

"collections"

)

);





container.innerHTML="";







if(snapshot.empty){



container.innerHTML =

`

<p>
No collection records yet.
</p>

`;



return;



}








snapshot.forEach((item)=>{



const data=item.data();






const total =


Number(data.firstYear || 0)

+

Number(data.secondYear || 0)

+

Number(data.thirdYear || 0)

+

Number(data.fourthYear || 0);








container.innerHTML += `



<div class="expense">



<h3>

💰 ${data.week || "No Week"}

</h3>




<p>

📅 Date:

${data.date || "N/A"}

</p>




<p>

👤 Collector:

${data.collector || "N/A"}

</p>




<h3>

Total:

₱${total.toLocaleString()}

</h3>





<button

class="btn"

onclick="editCollection('${item.id}')">

✏️ Edit

</button>






<button

class="logoutBtn"

onclick="deleteCollection('${item.id}')">

🗑️ Delete

</button>





</div>



`;



});






}

catch(error){



console.error(
"Loading Collection Error:",
error
);



container.innerHTML =

`

<p>
❌ Failed loading collections.
</p>

`;



}



}










// =====================================================
// DELETE COLLECTION
// =====================================================


window.deleteCollection = async function(id){



if(
!confirm(
"Delete this collection?"
)

)

return;






try{



await deleteDoc(

doc(

db,

"collections",

id

)

);





alert(
"🗑️ Collection deleted!"
);



loadAdminCollections();



}

catch(error){



console.error(error);


alert(
"❌ Delete failed"
);



}



};









// =====================================================
// EDIT COLLECTION
// =====================================================


window.editCollection = async function(id){



try{



const snap =

await getDoc(

doc(

db,

"collections",

id

)

);






if(!snap.exists()){


alert(
"Collection not found"
);


return;


}






const data=snap.data();







document.getElementById(
"week"
).value =
data.week || "";



document.getElementById(
"collectionDate"
).value =
data.date || "";



document.getElementById(
"firstYearCollection"
).value =
data.firstYear || 0;



document.getElementById(
"secondYearCollection"
).value =
data.secondYear || 0;



document.getElementById(
"thirdYearCollection"
).value =
data.thirdYear || 0;



document.getElementById(
"fourthYearCollection"
).value =
data.fourthYear || 0;



document.getElementById(
"collector"
).value =
data.collector || "";







editingCollectionID=id;



alert(
"✏️ Editing Collection Mode"
);



}

catch(error){



console.error(error);


alert(
"❌ Cannot edit collection"
);



}



};









// =====================================================
// CLEAR COLLECTION FORM
// =====================================================


function clearCollectionForm(){



const fields=[


"week",

"collectionDate",

"firstYearCollection",

"secondYearCollection",

"thirdYearCollection",

"fourthYearCollection",

"collector"


];





fields.forEach(id=>{



const field =

document.getElementById(id);



if(field){


field.value="";


}



});



editingCollectionID=null;



}









// LOAD COLLECTION WHEN PAGE READY


document.addEventListener(

"DOMContentLoaded",

()=>{


loadAdminCollections();



}

);







// =====================================================
// END OF PART 1/4
// NEXT: EXPENSE + PROJECT SYSTEM
// =====================================================

// =====================================================
// DALUBWIKAAN ADMIN SYSTEM
// FINAL ADMIN.JS
// PART 2/4
// EXPENSE + PROJECT MANAGEMENT
// =====================================================



// =====================================================
// ================= EXPENSE SYSTEM ====================
// =====================================================


let editingExpenseID = null;







window.saveExpense = async function(){


try{



const expenseData = {



title:

document.getElementById(
"expenseTitle"
).value.trim(),



category:

document.getElementById(
"expenseCategory"
).value.trim(),



amount:

Number(

document.getElementById(
"expenseAmount"
).value || 0

),



date:

document.getElementById(
"expenseDate"
).value,



receipt:

document.getElementById(
"expenseReceipt"
).value.trim(),



remarks:

document.getElementById(
"expenseRemarks"
).value.trim(),



updatedAt:

new Date().toISOString()



};







if(editingExpenseID){



await updateDoc(

doc(

db,

"expenses",

editingExpenseID

),

expenseData

);



alert(
"✅ Expense updated!"
);



editingExpenseID=null;



}



else{



await addDoc(

collection(

db,

"expenses"

),

{


...expenseData,


createdAt:

new Date().toISOString()


}


);



alert(
"✅ Expense saved!"
);



}






clearExpenseForm();


loadAdminExpenses();



}



catch(error){



console.error(
"Expense Error:",
error
);



alert(
"❌ Expense saving failed"
);



}



};










async function loadAdminExpenses(){



const container =

document.getElementById(
"adminExpenseList"
);




if(!container)
return;






try{



const snapshot =

await getDocs(

collection(

db,

"expenses"

)

);






container.innerHTML="";







if(snapshot.empty){



container.innerHTML =

`

<p>
No expense records yet.
</p>

`;



return;



}







snapshot.forEach((item)=>{



const data=item.data();







container.innerHTML += `



<div class="expense">



<h3>

💸 ${data.title || "Untitled Expense"}

</h3>






<p>

📂 Category:

${data.category || "Others"}

</p>






<p>

💰 Amount:

₱${Number(data.amount || 0).toLocaleString()}

</p>







<p>

📅 Date:

${data.date || "N/A"}

</p>







<p>

📝 ${data.remarks || ""}

</p>






<button

class="btn"

onclick="editExpense('${item.id}')">

✏️ Edit

</button>







<button

class="logoutBtn"

onclick="deleteExpense('${item.id}')">

🗑️ Delete

</button>






</div>



`;



});



}



catch(error){



console.error(
"Expense Load Error:",
error
);



container.innerHTML =

`

<p>
❌ Failed loading expenses.
</p>

`;



}



}









window.deleteExpense = async function(id){



if(

!confirm(
"Delete this expense?"
)

)

return;







try{



await deleteDoc(

doc(

db,

"expenses",

id

)

);





alert(
"🗑️ Expense deleted!"
);



loadAdminExpenses();



}

catch(error){



console.error(error);


alert(
"❌ Delete failed"
);



}



};









window.editExpense = async function(id){



try{



const snap =

await getDoc(

doc(

db,

"expenses",

id

)

);






if(!snap.exists()){


alert(
"Expense not found"
);


return;


}






const data=snap.data();







document.getElementById(
"expenseTitle"
).value =

data.title || "";





document.getElementById(
"expenseCategory"
).value =

data.category || "";






document.getElementById(
"expenseAmount"
).value =

data.amount || 0;






document.getElementById(
"expenseDate"
).value =

data.date || "";






document.getElementById(
"expenseReceipt"
).value =

data.receipt || "";






document.getElementById(
"expenseRemarks"
).value =

data.remarks || "";








editingExpenseID=id;



alert(
"✏️ Editing Expense Mode"
);



}

catch(error){



console.error(error);


alert(
"❌ Cannot edit expense"
);



}



};









function clearExpenseForm(){



const fields=[


"expenseTitle",

"expenseCategory",

"expenseAmount",

"expenseDate",

"expenseReceipt",

"expenseRemarks"


];





fields.forEach(id=>{



const field=

document.getElementById(id);



if(field){


field.value="";


}



});



editingExpenseID=null;



}











// =====================================================
// ================= PROJECT SYSTEM =====================
// =====================================================



let editingProjectID=null;








window.saveProject = async function(){



try{



const projectData = {



title:

document.getElementById(
"projectTitle"
).value.trim(),




description:

document.getElementById(
"projectDescription"
).value.trim(),





budget:

Number(

document.getElementById(
"projectBudget"
).value || 0

),





spent:

Number(

document.getElementById(
"projectSpent"
).value || 0

),





status:

document.getElementById(
"projectStatus"
).value,





updatedAt:

new Date().toISOString()



};









if(editingProjectID){



await updateDoc(

doc(

db,

"projects",

editingProjectID

),

projectData

);



alert(
"✅ Project updated!"
);



editingProjectID=null;



}





else{



await addDoc(

collection(

db,

"projects"

),

{


...projectData,


createdAt:

new Date().toISOString()


}


);



alert(
"✅ Project saved!"
);



}







clearProjectForm();


loadAdminProjects();



}



catch(error){



console.error(
"Project Error:",
error
);



alert(
"❌ Project saving failed"
);



}



};









async function loadAdminProjects(){



const container =

document.getElementById(
"adminProjectList"
);




if(!container)
return;






try{



const snapshot =

await getDocs(

collection(

db,

"projects"

)

);







container.innerHTML="";







if(snapshot.empty){



container.innerHTML =

`

<p>
No projects available.
</p>

`;



return;



}







snapshot.forEach((item)=>{



const data=item.data();







container.innerHTML += `



<div class="expense">



<h3>

📂 ${data.title || "Untitled Project"}

</h3>







<p>

${data.description || "No description"}

</p>







<p>

💰 Budget:

₱${Number(data.budget || 0).toLocaleString()}

</p>







<p>

💸 Spent:

₱${Number(data.spent || 0).toLocaleString()}

</p>







<p>

📌 Status:

${data.status || "Planning"}

</p>







<button

class="btn"

onclick="editProject('${item.id}')">

✏️ Edit

</button>







<button

class="logoutBtn"

onclick="deleteProject('${item.id}')">

🗑️ Delete

</button>






</div>



`;



});



}



catch(error){



console.error(
"Project Load Error:",
error
);



container.innerHTML =

`

<p>
❌ Failed loading projects.
</p>

`;



}



}










window.deleteProject = async function(id){



if(

!confirm(
"Delete this project?"
)

)

return;







try{



await deleteDoc(

doc(

db,

"projects",

id

)

);





alert(
"🗑️ Project deleted!"
);



loadAdminProjects();



}

catch(error){



console.error(error);


alert(
"❌ Delete failed"
);



}



};









window.editProject = async function(id){



try{



const snap =

await getDoc(

doc(

db,

"projects",

id

)

);






const data=snap.data();







document.getElementById(
"projectTitle"
).value =

data.title || "";






document.getElementById(
"projectDescription"
).value =

data.description || "";






document.getElementById(
"projectBudget"
).value =

data.budget || 0;






document.getElementById(
"projectSpent"
).value =

data.spent || 0;






document.getElementById(
"projectStatus"
).value =

data.status || "Planning";






editingProjectID=id;



alert(
"✏️ Editing Project Mode"
);



}

catch(error){



console.error(error);


alert(
"❌ Cannot edit project"
);



}



};









function clearProjectForm(){



const fields=[


"projectTitle",

"projectDescription",

"projectBudget",

"projectSpent"


];





fields.forEach(id=>{



const field=

document.getElementById(id);



if(field){


field.value="";


}



});







const status =

document.getElementById(
"projectStatus"
);



if(status){


status.value="Planning";


}



editingProjectID=null;



}







// =====================================================
// LOAD DATA AFTER PAGE READY
// =====================================================


document.addEventListener(

"DOMContentLoaded",

()=>{


loadAdminExpenses();


loadAdminProjects();



}

);






// =====================================================
// END OF PART 2/4
// NEXT: ANNOUNCEMENT SYSTEM + CLEAN REFRESH
// =====================================================

// =====================================================
// DALUBWIKAAN ADMIN SYSTEM
// FINAL ADMIN.JS
// PART 3/4
// ANNOUNCEMENT MANAGEMENT
// =====================================================




// =====================================================
// ================= ANNOUNCEMENTS =====================
// =====================================================



let editingAnnouncementID = null;







window.saveAnnouncement = async function(){


try{



const announcementData = {



title:

document.getElementById(
"announcementTitle"
).value.trim(),





message:

document.getElementById(
"announcementMessage"
).value.trim(),





priority:

document.getElementById(
"announcementPriority"
).value,





updatedAt:

new Date().toISOString()



};







if(
!announcementData.title ||
!announcementData.message
){



alert(
"⚠️ Please complete announcement details."
);



return;



}








if(editingAnnouncementID){



await updateDoc(

doc(

db,

"announcements",

editingAnnouncementID

),

announcementData

);



alert(
"✅ Announcement updated!"
);



editingAnnouncementID=null;



}






else{



await addDoc(

collection(

db,

"announcements"

),

{


...announcementData,


createdAt:

new Date().toISOString()


}


);



alert(
"📢 Announcement posted!"
);



}







clearAnnouncementForm();


loadAdminAnnouncements();



}



catch(error){



console.error(
"Announcement Save Error:",
error
);



alert(
"❌ Failed saving announcement."
);



}



};











// =====================================================
// LOAD ANNOUNCEMENTS
// =====================================================



async function loadAdminAnnouncements(){



const container =

document.getElementById(
"adminAnnouncementList"
);





if(!container)
return;







try{



const snapshot =

await getDocs(

collection(

db,

"announcements"

)

);






container.innerHTML="";






if(snapshot.empty){



container.innerHTML =

`

<p>
No announcements posted yet.
</p>

`;



return;



}







snapshot.forEach((item)=>{



const data=item.data();







let priorityClass = "low";



if(
data.priority === "High"
){


priorityClass="high";


}



else if(
data.priority === "Medium"
){


priorityClass="medium";


}









container.innerHTML += `



<div class="expense ${priorityClass}">



<h3>

📢 ${data.title || "Announcement"}

</h3>







<p>

${data.message || "No message"}

</p>







<p>

Priority:

<strong>

${data.priority || "Low"}

</strong>

</p>







<button

class="btn"

onclick="editAnnouncement('${item.id}')">

✏️ Edit

</button>








<button

class="logoutBtn"

onclick="deleteAnnouncement('${item.id}')">

🗑️ Delete

</button>






</div>



`;



});



}



catch(error){



console.error(
"Announcement Load Error:",
error
);



container.innerHTML =

`

<p>
❌ Failed loading announcements.
</p>

`;



}



}









// =====================================================
// DELETE ANNOUNCEMENT
// =====================================================



window.deleteAnnouncement = async function(id){



if(

!confirm(
"Delete this announcement?"
)

)

return;







try{



await deleteDoc(

doc(

db,

"announcements",

id

)

);






alert(
"🗑️ Announcement deleted!"
);



loadAdminAnnouncements();



}



catch(error){



console.error(
error
);



alert(
"❌ Delete failed."
);



}



};











// =====================================================
// EDIT ANNOUNCEMENT
// =====================================================



window.editAnnouncement = async function(id){



try{



const snap =

await getDoc(

doc(

db,

"announcements",

id

)

);






if(!snap.exists()){


alert(
"Announcement not found."
);


return;


}







const data=snap.data();









document.getElementById(
"announcementTitle"
).value =

data.title || "";








document.getElementById(
"announcementMessage"
).value =

data.message || "";








document.getElementById(
"announcementPriority"
).value =

data.priority || "Low";









editingAnnouncementID=id;






alert(
"✏️ Editing Announcement Mode"
);



}



catch(error){



console.error(
error
);



alert(
"❌ Cannot edit announcement."
);



}



};











// =====================================================
// CLEAR ANNOUNCEMENT FORM
// =====================================================



function clearAnnouncementForm(){



const title =

document.getElementById(
"announcementTitle"
);



const message =

document.getElementById(
"announcementMessage"
);



const priority =

document.getElementById(
"announcementPriority"
);







if(title){


title.value="";


}






if(message){


message.value="";


}






if(priority){


priority.value="Low";


}







editingAnnouncementID=null;



}











// =====================================================
// INITIAL LOAD
// =====================================================



document.addEventListener(

"DOMContentLoaded",

()=>{


loadAdminAnnouncements();



}

);







// =====================================================
// END OF PART 3/4
// NEXT: GLOBAL SEARCH + FINAL SYSTEM CHECK
// =====================================================

// =====================================================
// DALUBWIKAAN ADMIN SYSTEM
// FINAL ADMIN.JS
// PART 4/4
// GLOBAL SEARCH + FINAL SYSTEM START
// =====================================================






// =====================================================
// ================= GLOBAL SEARCH =====================
// =====================================================



const globalSearch =

document.getElementById(
"globalSearch"
);



const searchResults =

document.getElementById(
"searchResults"
);







let searchTimer = null;








if(globalSearch){



globalSearch.addEventListener(

"input",

()=>{



clearTimeout(searchTimer);






searchTimer = setTimeout(()=>{



searchEverything();



},400);





}

);



}












// =====================================================
// SEARCH FUNCTION
// =====================================================



async function searchEverything(){



if(!searchResults)
return;







const keyword =

globalSearch.value

.toLowerCase()

.trim();








if(keyword === ""){



searchResults.innerHTML =



`

<div class="expense">

<p>
Type something to search...
</p>

</div>

`;



return;



}








try{



let results = "";








// ================= COLLECTION SEARCH =================



const collectionSnapshot =

await getDocs(

collection(
db,
"collections"
)

);






collectionSnapshot.forEach((item)=>{



const data=item.data();






const searchable =

`

${data.week}

${data.collector}

${data.date}

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




<p>
Total:
₱${total.toLocaleString()}
</p>




</div>



`;



}



});









// ================= EXPENSE SEARCH =================



const expenseSnapshot =

await getDocs(

collection(
db,
"expenses"
)

);







expenseSnapshot.forEach((item)=>{



const data=item.data();






const searchable =

`

${data.title}

${data.category}

${data.remarks}

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





<p>
Amount:
₱${Number(data.amount || 0).toLocaleString()}
</p>



</div>



`;



}



});









// ================= PROJECT SEARCH =================



const projectSnapshot =

await getDocs(

collection(
db,
"projects"
)

);







projectSnapshot.forEach((item)=>{



const data=item.data();






const searchable =

`

${data.title}

${data.description}

${data.status}

`

.toLowerCase();






if(searchable.includes(keyword)){



results += `



<div class="expense">



<h3>
📂 ${data.title || "Project"}
</h3>




<p>
Status:
${data.status || "Planning"}
</p>




<p>
${data.description || ""}
</p>



</div>



`;



}



});









// ================= ANNOUNCEMENT SEARCH =================



const announcementSnapshot =

await getDocs(

collection(
db,
"announcements"
)

);






announcementSnapshot.forEach((item)=>{



const data=item.data();






const searchable =

`

${data.title}

${data.message}

${data.priority}

`

.toLowerCase();







if(searchable.includes(keyword)){



results += `



<div class="expense">



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









// ================= DISPLAY =================



if(results === ""){



searchResults.innerHTML =



`

<div class="expense">


<h3>
❌ No Result Found
</h3>


<p>
No matching record.
</p>


</div>


`;



}



else{



searchResults.innerHTML = results;



}



}



catch(error){



console.error(

"Search Error:",

error

);



searchResults.innerHTML =



`

<div class="expense">


<p>
❌ Search failed.
</p>


</div>


`;



}



}











// =====================================================
// ================= THEME BUTTON ======================
// =====================================================



const themeToggle =

document.getElementById(
"themeToggle"
);






if(themeToggle){



themeToggle.addEventListener(

"click",

()=>{



document.body.classList.toggle(
"dark-mode"
);







const dark =

document.body.classList.contains(
"dark-mode"
);






themeToggle.innerHTML = dark

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



const savedTheme =

localStorage.getItem(
"theme"
);






if(savedTheme==="dark"){



document.body.classList.add(
"dark-mode"
);





if(themeToggle){



themeToggle.innerHTML =
"☀️ Light Mode";


}



}











// =====================================================
// ================= FINAL START SYSTEM ================
// =====================================================




async function initializeAdmin(){



console.log(

"⏳ Loading Dalubwikaan Admin System..."

);





await loadAdminCollections();



await loadAdminExpenses();



await loadAdminProjects();



await loadAdminAnnouncements();






console.log(

"✅ Dalubwikaan Admin Ready!"

);



}












// START AFTER PAGE LOAD



document.addEventListener(

"DOMContentLoaded",

()=>{


initializeAdmin();


}

);









// =====================================================
// END OF FINAL ADMIN.JS
// =====================================================
