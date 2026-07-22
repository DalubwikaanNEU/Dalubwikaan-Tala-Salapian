// =====================================================
// DALUBWIKAAN ADMIN SYSTEM
// ADMIN.JS PART 1
// FIREBASE + COLLECTION CRUD ONLY
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




// ================= FIREBASE CONFIG =================


const firebaseConfig = {

    apiKey: "AIzaSyDx5TR1iYZZsK4JqlvCmuR_0U6H1d3Mr80",

    authDomain: "dalubwikaan--26-8e646.firebaseapp.com",

    projectId: "dalubwikaan--26-8e646",

    storageBucket: "dalubwikaan--26-8e646.firebasestorage.app",

    messagingSenderId: "409516392020",

    appId: "1:409516392020:web:87d462a5927449c69eb7c1"

};




// ================= INITIALIZE =================


const app = initializeApp(firebaseConfig);

const db = getFirestore(app);

const auth = getAuth(app);

import {
    onAuthStateChanged
} from "https://www.gstatic.com/firebasejs/11.0.2/firebase-auth.js";

onAuthStateChanged(auth, (user) => {
    console.log("Current User:", user);

    if (user) {
        console.log("Email:", user.email);
    } else {
        console.log("No user logged in");
    }
});

console.log("🔥 Firebase Connected");





// =====================================================
// LOGOUT
// =====================================================


document.addEventListener("DOMContentLoaded",()=>{


const logoutBtn = document.getElementById("logoutBtn");


if(logoutBtn){


logoutBtn.onclick = async()=>{


try{


await signOut(auth);


alert("Logged out successfully");


window.location.href="login.html";


}

catch(error){


console.error(error);


alert("Logout failed");


}


};


}


});






// =====================================================
// COLLECTION SYSTEM
// =====================================================


let editingCollectionID = null;





// ================= SAVE COLLECTION =================


window.saveCollection = async function(){


try{


const week =
document.getElementById("week").value.trim();


const date =
document.getElementById("collectionDate").value;


const firstYear =
Number(document.getElementById("firstYearCollection").value || 0);


const secondYear =
Number(document.getElementById("secondYearCollection").value || 0);


const thirdYear =
Number(document.getElementById("thirdYearCollection").value || 0);


const fourthYear =
Number(document.getElementById("fourthYearCollection").value || 0);


const collector =
document.getElementById("collector").value.trim();




const data = {


week,

date,

firstYear,

secondYear,

thirdYear,

fourthYear,

collector,


updatedAt:new Date()


};





console.log("Saving:",data);





// UPDATE


if(editingCollectionID){


await updateDoc(

doc(
db,
"collections",
editingCollectionID
),

data

);



alert("✅ Collection Updated");


editingCollectionID=null;


}




// ADD


else{


await addDoc(

collection(
db,
"collections"
),

{

...data,

createdAt:new Date()

}


);



alert("✅ Collection Saved");


}





clearCollectionForm();


loadAdminCollections();



}

catch(error){


console.error(
"SAVE COLLECTION ERROR:",
error
);


alert(
"❌ Failed saving collection: " + error.message
);


}



};









// ================= LOAD COLLECTION =================


async function loadAdminCollections(){



const container =
document.getElementById("adminCollectionList");



if(!container)return;



try{


const snapshot = await getDocs(

collection(
db,
"collections"
)

);



container.innerHTML="";





if(snapshot.empty){


container.innerHTML=
"<p>No collection records.</p>";


return;


}





snapshot.forEach((item)=>{


const data=item.data();




const total =

Number(data.firstYear || 0)+
Number(data.secondYear || 0)+
Number(data.thirdYear || 0)+
Number(data.fourthYear || 0);





container.innerHTML += `


<div class="expense">


<h3>
💰 ${data.week || "No Week"}
</h3>


<p>
📅 ${data.date || ""}
</p>


<p>
👤 ${data.collector || ""}
</p>


<h3>
₱${total.toLocaleString()}
</h3>



<button class="btn"
onclick="editCollection('${item.id}')">

✏️ Edit

</button>




<button class="logoutBtn"
onclick="deleteCollection('${item.id}')">

🗑️ Delete

</button>



</div>



`;



});



}

catch(error){


console.error(error);


container.innerHTML=
"<p>Failed loading collections</p>";


}



}







// ================= DELETE =================


window.deleteCollection = async function(id){


try{


await deleteDoc(

doc(
db,
"collections",
id

)

);



alert("🗑️ Deleted");


loadAdminCollections();



}

catch(error){


console.error(error);


alert("Delete failed");


}



};








// ================= EDIT =================


window.editCollection = async function(id){



try{


const snap = await getDoc(

doc(
db,
"collections",
id
)

);



if(!snap.exists()){


alert("Record not found");


return;


}



const data=snap.data();




document.getElementById("week").value =
data.week || "";


document.getElementById("collectionDate").value =
data.date || "";


document.getElementById("firstYearCollection").value =
data.firstYear || 0;


document.getElementById("secondYearCollection").value =
data.secondYear || 0;


document.getElementById("thirdYearCollection").value =
data.thirdYear || 0;


document.getElementById("fourthYearCollection").value =
data.fourthYear || 0;


document.getElementById("collector").value =
data.collector || "";




editingCollectionID=id;



alert("✏️ Editing Mode Activated");



}

catch(error){


console.error(error);


alert("Edit failed");


}



};









// ================= CLEAR FORM =================


function clearCollectionForm(){


[
"week",
"collectionDate",
"firstYearCollection",
"secondYearCollection",
"thirdYearCollection",
"fourthYearCollection",
"collector"

].forEach(id=>{


const el=document.getElementById(id);


if(el){

el.value="";

}


});


editingCollectionID=null;


}






// LOAD WHEN READY


document.addEventListener(
"DOMContentLoaded",
()=>{


loadAdminCollections();


}
);



console.log(
"✅ Collection System Ready"
);

// =====================================================
// DALUBWIKAAN ADMIN SYSTEM
// ADMIN.JS PART 2
// EXPENSE + PROJECT MANAGEMENT
// =====================================================



// =====================================================
// EXPENSE SYSTEM
// =====================================================


let editingExpenseID = null;




// ================= SAVE EXPENSE =================


window.saveExpense = async function(){


try{


const data = {


title:
document.getElementById("expenseTitle").value.trim(),


category:
document.getElementById("expenseCategory").value.trim(),


amount:
Number(
document.getElementById("expenseAmount").value || 0
),


date:
document.getElementById("expenseDate").value,


receipt:
document.getElementById("expenseReceipt").value.trim(),


remarks:
document.getElementById("expenseRemarks").value.trim(),


updatedAt:new Date()



};





console.log("Saving Expense:",data);





if(editingExpenseID){



await updateDoc(

doc(
db,
"expenses",
editingExpenseID
),

data

);



alert("✅ Expense Updated");


editingExpenseID=null;


}




else{


await addDoc(

collection(
db,
"expenses"
),

{

...data,

createdAt:new Date()

}


);



alert("✅ Expense Saved");


}






clearExpenseForm();


loadAdminExpenses();



}


catch(error){


console.error(
"Expense Save Error:",
error
);


alert(
"❌ Failed saving expense: "+error.message
);


}



};








// ================= LOAD EXPENSE =================


async function loadAdminExpenses(){


const container =
document.getElementById("adminExpenseList");



if(!container)return;



try{


const snapshot = await getDocs(

collection(
db,
"expenses"
)

);



container.innerHTML="";





if(snapshot.empty){


container.innerHTML=
"<p>No expense records.</p>";


return;


}





snapshot.forEach((item)=>{


const data=item.data();




container.innerHTML += `



<div class="expense">


<h3>
💸 ${data.title || "Expense"}
</h3>



<p>
📂 ${data.category || "Others"}
</p>



<p>
💰 ₱${Number(data.amount || 0).toLocaleString()}
</p>



<p>
📅 ${data.date || ""}
</p>



<p>
${data.remarks || ""}
</p>




<button class="btn"
onclick="editExpense('${item.id}')">

✏️ Edit

</button>




<button class="logoutBtn"
onclick="deleteExpense('${item.id}')">

🗑️ Delete

</button>



</div>


`;



});



}

catch(error){


console.error(error);


container.innerHTML=
"<p>Failed loading expenses</p>";



}



}









// ================= EDIT EXPENSE =================



window.editExpense = async function(id){



try{


const snap = await getDoc(

doc(
db,
"expenses",
id
)

);



const data=snap.data();




document.getElementById("expenseTitle").value =
data.title || "";



document.getElementById("expenseCategory").value =
data.category || "";



document.getElementById("expenseAmount").value =
data.amount || 0;



document.getElementById("expenseDate").value =
data.date || "";



document.getElementById("expenseReceipt").value =
data.receipt || "";



document.getElementById("expenseRemarks").value =
data.remarks || "";




editingExpenseID=id;



alert("✏️ Editing Expense Mode");



}

catch(error){


console.error(error);


alert("Edit expense failed");


}



};








// ================= DELETE EXPENSE =================



window.deleteExpense = async function(id){



if(!confirm("Delete this expense?"))

return;




try{


await deleteDoc(

doc(
db,
"expenses",
id
)

);



alert("🗑️ Expense Deleted");


loadAdminExpenses();



}

catch(error){


console.error(error);


alert("Delete failed");


}



};








function clearExpenseForm(){



[
"expenseTitle",
"expenseCategory",
"expenseAmount",
"expenseDate",
"expenseReceipt",
"expenseRemarks"

].forEach(id=>{


const el=document.getElementById(id);



if(el){

el.value="";


}



});


editingExpenseID=null;


}









// =====================================================
// PROJECT SYSTEM
// =====================================================



let editingProjectID=null;








// ================= SAVE PROJECT =================



window.saveProject = async function(){



try{


const data={


title:
document.getElementById("projectTitle").value.trim(),


description:
document.getElementById("projectDescription").value.trim(),


budget:
Number(
document.getElementById("projectBudget").value || 0
),


spent:
Number(
document.getElementById("projectSpent").value || 0
),


status:
document.getElementById("projectStatus").value,


updatedAt:new Date()



};






console.log("Saving Project:",data);






if(editingProjectID){



await updateDoc(

doc(
db,
"projects",
editingProjectID
),

data

);



alert("✅ Project Updated");


editingProjectID=null;


}




else{


await addDoc(

collection(
db,
"projects"
),

{

...data,

createdAt:new Date()

}


);



alert("✅ Project Saved");


}






clearProjectForm();


loadAdminProjects();



}



catch(error){


console.error(
"Project Save Error:",
error
);



alert(
"❌ Failed saving project: "+error.message
);



}



};









// ================= LOAD PROJECT =================



async function loadAdminProjects(){



const container =
document.getElementById("adminProjectList");



if(!container)return;



try{


const snapshot = await getDocs(

collection(
db,
"projects"
)

);



container.innerHTML="";





if(snapshot.empty){


container.innerHTML=
"<p>No projects.</p>";


return;


}





snapshot.forEach((item)=>{


const data=item.data();




container.innerHTML += `



<div class="expense">


<h3>
📂 ${data.title || "Project"}
</h3>



<p>
${data.description || ""}
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
📌 ${data.status || "Planning"}
</p>




<button class="btn"
onclick="editProject('${item.id}')">

✏️ Edit

</button>




<button class="logoutBtn"
onclick="deleteProject('${item.id}')">

🗑️ Delete

</button>



</div>



`;



});



}

catch(error){


console.error(error);


container.innerHTML=
"<p>Failed loading projects</p>";



}



}









// ================= EDIT PROJECT =================



window.editProject = async function(id){



try{


const snap = await getDoc(

doc(
db,
"projects",
id
)

);



const data=snap.data();




document.getElementById("projectTitle").value =
data.title || "";



document.getElementById("projectDescription").value =
data.description || "";



document.getElementById("projectBudget").value =
data.budget || 0;



document.getElementById("projectSpent").value =
data.spent || 0;



document.getElementById("projectStatus").value =
data.status || "Planning";




editingProjectID=id;



alert("✏️ Editing Project Mode");



}

catch(error){


console.error(error);


alert("Edit project failed");


}



};









// ================= DELETE PROJECT =================



window.deleteProject = async function(id){



if(!confirm("Delete this project?"))

return;




try{


await deleteDoc(

doc(
db,
"projects",
id
)

);



alert("🗑️ Project Deleted");


loadAdminProjects();



}

catch(error){


console.error(error);


alert("Delete failed");


}



};









function clearProjectForm(){



[
"projectTitle",
"projectDescription",
"projectBudget",
"projectSpent"

].forEach(id=>{


const el=document.getElementById(id);


if(el){

el.value="";


}



});



const status =
document.getElementById("projectStatus");


if(status){

status.value="Planning";

}



editingProjectID=null;


}







// LOAD PART 2 DATA


document.addEventListener(
"DOMContentLoaded",
()=>{


loadAdminExpenses();


loadAdminProjects();



}
);



console.log(
"✅ Expense + Project System Ready"
);

// =====================================================
// DALUBWIKAAN ADMIN SYSTEM
// ADMIN.JS PART 3
// ANNOUNCEMENT MANAGEMENT
// =====================================================



// =====================================================
// ANNOUNCEMENT SYSTEM
// =====================================================


let editingAnnouncementID = null;





// ================= SAVE ANNOUNCEMENT =================



window.saveAnnouncement = async function(){



try{



const title =

document.getElementById("announcementTitle")
.value
.trim();



const message =

document.getElementById("announcementMessage")
.value
.trim();



const priority =

document.getElementById("announcementPriority")
.value;





if(!title || !message){


alert(
"⚠️ Please complete announcement details."
);


return;


}







const data = {


title,

message,

priority,


updatedAt:new Date()



};






console.log(
"Saving Announcement:",
data
);








// UPDATE MODE


if(editingAnnouncementID){



await updateDoc(

doc(
db,
"announcements",
editingAnnouncementID
),

data

);




alert(
"✅ Announcement Updated"
);



editingAnnouncementID=null;



}







// ADD MODE


else{



await addDoc(

collection(
db,
"announcements"
),

{

...data,

createdAt:new Date()

}


);



alert(
"📢 Announcement Posted"
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

"❌ Failed saving announcement: "

+ error.message

);



}



};











// ================= LOAD ANNOUNCEMENTS =================



async function loadAdminAnnouncements(){



const container =

document.getElementById(
"adminAnnouncementList"
);




if(!container)
return;








try{



const snapshot = await getDocs(

collection(
db,
"announcements"
)

);





container.innerHTML="";








if(snapshot.empty){



container.innerHTML=

`

<p>
No announcements posted.
</p>

`;



return;



}









snapshot.forEach((item)=>{



const data=item.data();







container.innerHTML += `



<div class="expense">



<h3>

📢 ${data.title || "Announcement"}

</h3>




<p>

${data.message || ""}

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



container.innerHTML=

`

<p>
❌ Failed loading announcements.
</p>

`;



}



}












// ================= EDIT ANNOUNCEMENT =================



window.editAnnouncement = async function(id){



try{



const snap = await getDoc(

doc(

db,

"announcements",

id

)

);






if(!snap.exists()){


alert(
"Announcement not found"
);


return;


}







const data=snap.data();








document.getElementById(
"announcementTitle"
)
.value =

data.title || "";







document.getElementById(
"announcementMessage"
)
.value =

data.message || "";







document.getElementById(
"announcementPriority"
)
.value =

data.priority || "Low";







editingAnnouncementID=id;






alert(
"✏️ Editing Announcement Mode"
);



}



catch(error){



console.error(error);



alert(
"❌ Cannot edit announcement"
);



}



};












// ================= DELETE ANNOUNCEMENT =================



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
"🗑️ Announcement Deleted"
);



loadAdminAnnouncements();



}



catch(error){



console.error(error);



alert(
"❌ Delete failed"
);



}



};












// ================= CLEAR FORM =================



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












// ================= LOAD WHEN READY =================



document.addEventListener(

"DOMContentLoaded",

()=>{


loadAdminAnnouncements();



}

);






console.log(
"✅ Announcement System Ready"
);

// =====================================================
// DALUBWIKAAN ADMIN SYSTEM
// ADMIN.JS PART 4
// GLOBAL SEARCH + THEME + FINAL CHECK
// =====================================================




// =====================================================
// GLOBAL SEARCH SYSTEM
// =====================================================


const globalSearch = 
document.getElementById("globalSearch");


const searchResults = 
document.getElementById("searchResults");





let searchTimeout = null;







if(globalSearch){



globalSearch.addEventListener(
"input",
()=>{


clearTimeout(searchTimeout);



searchTimeout=setTimeout(()=>{


searchEverything();



},300);



}

);



}









async function searchEverything(){



if(!searchResults)
return;





const keyword =

globalSearch.value

.toLowerCase()

.trim();








if(keyword===""){



searchResults.innerHTML=`

<div class="expense">

<p>
Type something to search...
</p>

</div>

`;

return;


}







try{



let results="";





// ================= COLLECTION SEARCH =================



const collections = await getDocs(

collection(
db,
"collections"
)

);





collections.forEach(item=>{



const data=item.data();



const text = `

${data.week}

${data.collector}

${data.date}

`.toLowerCase();





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


<div class="expense">


<h3>
💰 Collection
</h3>


<p>
${data.week || "No Week"}
</p>


<p>
Collector:
${data.collector || "N/A"}
</p>


<p>
₱${total.toLocaleString()}
</p>


</div>


`;



}



});








// ================= EXPENSE SEARCH =================



const expenses = await getDocs(

collection(
db,
"expenses"
)

);





expenses.forEach(item=>{



const data=item.data();



const text=`

${data.title}

${data.category}

${data.remarks}

`.toLowerCase();





if(text.includes(keyword)){



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
₱${Number(data.amount || 0).toLocaleString()}
</p>


</div>


`;



}



});








// ================= PROJECT SEARCH =================



const projects = await getDocs(

collection(
db,
"projects"
)

);





projects.forEach(item=>{



const data=item.data();



const text=`

${data.title}

${data.description}

${data.status}

`.toLowerCase();






if(text.includes(keyword)){



results += `


<div class="expense">


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



const announcements = await getDocs(

collection(
db,
"announcements"
)

);





announcements.forEach(item=>{



const data=item.data();



const text=`

${data.title}

${data.message}

${data.priority}

`.toLowerCase();






if(text.includes(keyword)){



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









if(results===""){



searchResults.innerHTML=`

<div class="expense">


<h3>
❌ No Result Found
</h3>


<p>
No matching records.
</p>


</div>

`;



}

else{


searchResults.innerHTML=results;


}



}

catch(error){



console.error(
"Search Error:",
error
);



searchResults.innerHTML=`

<div class="expense">

<p>
❌ Search failed.
</p>

</div>

`;



}



}











// =====================================================
// DARK / LIGHT MODE
// =====================================================



const themeToggle =

document.getElementById(
"themeToggle"
);








function applyTheme(){



const savedTheme =

localStorage.getItem(
"dalubTheme"
);





if(savedTheme==="dark"){



document.body.classList.add(
"dark-mode"
);



if(themeToggle){

themeToggle.innerHTML=
"☀️ Light Mode";

}


}






}









if(themeToggle){



themeToggle.addEventListener(
"click",
()=>{



document.body.classList.toggle(
"dark-mode"
);





const isDark =

document.body.classList.contains(
"dark-mode"
);





localStorage.setItem(

"dalubTheme",

isDark
?
"dark"
:
"light"

);





themeToggle.innerHTML =

isDark

?

"☀️ Light Mode"

:

"🌙 Dark Mode";





}

);



}







applyTheme();












// =====================================================
// FINAL ADMIN INITIALIZATION
// =====================================================



async function startAdminSystem(){



console.log(
"⏳ Loading Dalubwikaan Admin..."
);





await loadAdminCollections();


await loadAdminExpenses();


await loadAdminProjects();


await loadAdminAnnouncements();





console.log(
"✅ Dalubwikaan Admin Fully Loaded"
);



}








document.addEventListener(

"DOMContentLoaded",

()=>{


startAdminSystem();


}

);









console.log(
"🚀 FINAL ADMIN.JS READY"
);
