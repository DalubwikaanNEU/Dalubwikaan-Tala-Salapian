// =====================================================
// DALUBWIKAAN ADMIN SYSTEM
// ADMIN.JS PART 1/4
// FIREBASE + AUTH + COLLECTIONS
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





// ================= INITIALIZE FIREBASE =================



const app = initializeApp(firebaseConfig);


const db = getFirestore(app);


const auth = getAuth(app);



console.log("🔥 Dalubwikaan Firebase Connected!");







// =====================================================
// ================= AUTH LOGOUT =======================
// =====================================================



const logoutBtn = document.getElementById("logoutBtn");



if(logoutBtn){


logoutBtn.addEventListener(
"click",
async()=>{


try{


await signOut(auth);



alert("✅ Logged out successfully!");



window.location.href="login.html";



}

catch(error){


console.error(error);


alert("❌ Logout failed!");



}



}

);


}







// =====================================================
// ================= COLLECTIONS ========================
// =====================================================



let editingCollectionID = null;







window.saveCollection = async function(){



try{



const collectionData = {


week:

document.getElementById("week").value.trim(),



date:

document.getElementById("collectionDate").value,



firstYear:

Number(
document.getElementById("firstYearCollection").value || 0
),



secondYear:

Number(
document.getElementById("secondYearCollection").value || 0
),



thirdYear:

Number(
document.getElementById("thirdYearCollection").value || 0
),



fourthYear:

Number(
document.getElementById("fourthYearCollection").value || 0
),



collector:

document.getElementById("collector").value.trim(),



createdAt:new Date()

};







if(editingCollectionID){



await updateDoc(

doc(
db,
"collections",
editingCollectionID
),

collectionData

);



alert("✅ Collection updated!");



editingCollectionID=null;



}

else{



await addDoc(

collection(
db,
"collections"
),

collectionData

);



alert("✅ Collection saved!");



}






clearCollectionForm();


loadAdminCollections();



}



catch(error){


console.error(error);


alert("❌ Failed saving collection!");



}



};








async function loadAdminCollections(){



const container =

document.getElementById("adminCollectionList");



if(!container) return;





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



container.innerHTML=

"<p>No collection records yet.</p>";

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



console.error(error);


container.innerHTML=

"<p>❌ Failed loading collections.</p>";



}




}








loadAdminCollections();








window.deleteCollection = async function(id){



if(!confirm("Delete this collection record?"))

return;





await deleteDoc(

doc(
db,
"collections",
id

)

);




alert("🗑️ Collection deleted!");



loadAdminCollections();



};








window.editCollection = async function(id){



const snap =

await getDoc(

doc(
db,
"collections",
id

)

);





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



alert("✏️ Editing Collection Mode");



};








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


const element=document.getElementById(id);



if(element){

element.value="";

}



});



}





// END OF PART 1/4

// =====================================================
// DALUBWIKAAN ADMIN SYSTEM
// ADMIN.JS PART 2/4
// EXPENSES + PROJECTS
// =====================================================



// =====================================================
// ================= EXPENSES ==========================
// =====================================================



let editingExpenseID = null;





window.saveExpense = async function(){



try{



const expenseData = {


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



createdAt:new Date()



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



alert("✅ Expense updated!");



editingExpenseID=null;



}

else{



await addDoc(

collection(
db,
"expenses"
),

expenseData

);



alert("✅ Expense saved!");



}






clearExpenseForm();


loadAdminExpenses();



}




catch(error){



console.error(error);


alert("❌ Expense saving failed!");



}



};









async function loadAdminExpenses(){



const container =

document.getElementById("adminExpenseList");



if(!container)return;





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


container.innerHTML=

"<p>No expense records yet.</p>";

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

${data.category || "N/A"}

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


console.error(error);


container.innerHTML=

"<p>❌ Failed loading expenses.</p>";



}



}






loadAdminExpenses();








window.deleteExpense = async function(id){



if(!confirm("Delete this expense record?"))

return;





await deleteDoc(

doc(
db,
"expenses",
id

)

);





alert("🗑️ Expense deleted!");



loadAdminExpenses();



};








window.editExpense = async function(id){



const snap =

await getDoc(

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


const element=document.getElementById(id);



if(element){

element.value="";

}



});



}









// =====================================================
// ================= PROJECTS ===========================
// =====================================================



let editingProjectID=null;








window.saveProject = async function(){



try{



const projectData={



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





createdAt:new Date()



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



alert("✅ Project updated!");



editingProjectID=null;



}

else{



await addDoc(

collection(
db,
"projects"
),

projectData

);



alert("✅ Project saved!");



}






clearProjectForm();


loadAdminProjects();



}





catch(error){



console.error(error);


alert("❌ Project saving failed!");



}



};









async function loadAdminProjects(){



const container=

document.getElementById("adminProjectList");



if(!container)return;






try{



const snapshot=

await getDocs(

collection(
db,
"projects"
)

);





container.innerHTML="";







if(snapshot.empty){



container.innerHTML=

"<p>No projects available.</p>";

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


console.error(error);


container.innerHTML=

"<p>❌ Failed loading projects.</p>";



}



}






loadAdminProjects();








window.deleteProject = async function(id){



if(!confirm("Delete this project?"))

return;





await deleteDoc(

doc(
db,
"projects",
id

)

);





alert("🗑️ Project deleted!");



loadAdminProjects();



};









window.editProject = async function(id){



const snap=

await getDoc(

doc(
db,
"projects",
id

)

);





const data=snap.data();






document.getElementById("projectTitle").value=

data.title || "";



document.getElementById("projectDescription").value=

data.description || "";



document.getElementById("projectBudget").value=

data.budget || 0;



document.getElementById("projectSpent").value=

data.spent || 0;



document.getElementById("projectStatus").value=

data.status || "Planning";





editingProjectID=id;



alert("✏️ Editing Project Mode");



};








function clearProjectForm(){



const fields=[


"projectTitle",

"projectDescription",

"projectBudget",

"projectSpent"


];





fields.forEach(id=>{


const element=document.getElementById(id);



if(element){

element.value="";

}



});





document.getElementById("projectStatus").value="Planning";



}






// END OF PART 2/4

// =====================================================
// DALUBWIKAAN ADMIN SYSTEM
// ADMIN.JS PART 3/4
// ANNOUNCEMENTS + LOGOUT
// =====================================================






// =====================================================
// ================= ANNOUNCEMENTS =====================
// =====================================================



let editingAnnouncementID = null;







window.saveAnnouncement = async function(){



try{



const announcementData = {


title:

document.getElementById("announcementTitle").value.trim(),




message:

document.getElementById("announcementMessage").value.trim(),





priority:

document.getElementById("announcementPriority").value,





createdAt:new Date()



};








if(editingAnnouncementID){



await updateDoc(

doc(
db,
"announcements",
editingAnnouncementID
),

announcementData

);



alert("✅ Announcement updated!");



editingAnnouncementID=null;



}

else{



await addDoc(

collection(
db,
"announcements"
),

announcementData

);



alert("📢 Announcement posted!");



}






clearAnnouncementForm();


loadAdminAnnouncements();



}





catch(error){



console.error(error);


alert("❌ Failed saving announcement!");



}



};









async function loadAdminAnnouncements(){



const container =

document.getElementById("adminAnnouncementList");



if(!container)return;






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



container.innerHTML=

"<p>No announcements yet.</p>";

return;


}








snapshot.forEach((item)=>{



const data=item.data();






container.innerHTML += `



<div class="expense">



<h3>

📢 ${data.title || "Untitled Announcement"}

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



console.error(error);



container.innerHTML=

"<p>❌ Failed loading announcements.</p>";



}



}






loadAdminAnnouncements();









window.deleteAnnouncement = async function(id){



if(!confirm("Delete this announcement?"))

return;






await deleteDoc(

doc(
db,
"announcements",
id

)

);






alert("🗑️ Announcement deleted!");



loadAdminAnnouncements();



};









window.editAnnouncement = async function(id){



const snap =

await getDoc(

doc(
db,
"announcements",
id

)

);






const data=snap.data();








document.getElementById("announcementTitle").value =

data.title || "";






document.getElementById("announcementMessage").value =

data.message || "";







document.getElementById("announcementPriority").value =

data.priority || "Low";








editingAnnouncementID=id;






alert("✏️ Editing Announcement Mode");



};









function clearAnnouncementForm(){



const title =

document.getElementById("announcementTitle");



const message =

document.getElementById("announcementMessage");





if(title){

title.value="";

}




if(message){

message.value="";

}






const priority =

document.getElementById("announcementPriority");




if(priority){

priority.value="Low";

}



}










// =====================================================
// ================= LOGOUT SYSTEM =====================
// =====================================================






const logoutButton =

document.getElementById("logoutBtn");






if(logoutButton){



logoutButton.addEventListener(

"click",

async()=>{



try{



await signOut(auth);




alert("✅ Successfully logged out!");





window.location.href="login.html";





}



catch(error){



console.error(error);



alert("❌ Logout error!");



}



}



);



}








console.log("📢 Announcement System Loaded!");




// END OF PART 3/4

// =====================================================
// DALUBWIKAAN ADMIN SYSTEM
// ADMIN.JS PART 4/4
// GLOBAL SEARCH EVERYTHING
// =====================================================






// =====================================================
// ================= GLOBAL SEARCH =====================
// =====================================================



const globalSearch =

document.getElementById("globalSearch");



const searchResults =

document.getElementById("searchResults");








if(globalSearch){



globalSearch.addEventListener(

"input",

searchEverything

);



}









async function searchEverything(){



const keyword =

globalSearch.value

.toLowerCase()

.trim();








if(keyword === ""){



searchResults.innerHTML = `



<div class="expense">


<p>

Type something to search...

</p>


</div>



`;



return;



}








let results = "";










// =====================================================
// ================= COLLECTION SEARCH =================
// =====================================================




const collectionSnap =

await getDocs(

collection(
db,
"collections"
)

);






collectionSnap.forEach((item)=>{



const data=item.data();






const text =

`

${data.week}

${data.collector}

${data.date}

`

.toLowerCase();






if(text.includes(keyword)){





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

Date:

${data.date || "N/A"}

</p>



</div>



`;



}



});









// =====================================================
// ================= EXPENSE SEARCH ====================
// =====================================================




const expenseSnap =

await getDocs(

collection(
db,
"expenses"
)

);






expenseSnap.forEach((item)=>{



const data=item.data();






const text =

`

${data.title}

${data.category}

${data.remarks}

`

.toLowerCase();







if(text.includes(keyword)){





results += `



<div class="expense">



<h3>

💸 Expense

</h3>




<p>

${data.title || "Untitled"}

</p>




<p>

Category:

${data.category || "N/A"}

</p>



<p>

Amount:

₱${Number(data.amount || 0).toLocaleString()}

</p>



</div>



`;



}



});









// =====================================================
// ================= PROJECT SEARCH ====================
// =====================================================




const projectSnap =

await getDocs(

collection(
db,
"projects"
)

);






projectSnap.forEach((item)=>{



const data=item.data();







const text =

`

${data.title}

${data.description}

${data.status}

`

.toLowerCase();








if(text.includes(keyword)){





results += `



<div class="expense">



<h3>

📂 Project

</h3>





<p>

${data.title || "Untitled"}

</p>




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









// =====================================================
// =============== ANNOUNCEMENT SEARCH ================
// =====================================================




const announcementSnap =

await getDocs(

collection(
db,
"announcements"
)

);







announcementSnap.forEach((item)=>{



const data=item.data();






const text =

`

${data.title}

${data.message}

${data.priority}

`

.toLowerCase();








if(text.includes(keyword)){





results += `



<div class="expense">



<h3>

📢 Announcement

</h3>




<p>

${data.title || "Untitled"}

</p>




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









// =====================================================
// ================= DISPLAY RESULTS ===================
// =====================================================






if(results === ""){



searchResults.innerHTML = `



<div class="expense">



<h3>

❌ No Results Found

</h3>



<p>

No matching records available.

</p>



</div>



`;



}

else{



searchResults.innerHTML = results;



}



}











// =====================================================
// ================= FINAL CHECK =======================
// =====================================================



console.log(

"✅ Dalubwikaan Admin Dashboard Fully Loaded!"

);




// END OF PART 4/4 

