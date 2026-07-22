// =====================================================
// DALUBWIKAAN ADMIN SYSTEM
// ADMIN.JS PART 1/3
// FIREBASE CONNECTION + AUTH + DASHBOARD
// =====================================================



// ================= FIREBASE IMPORT =================


import { initializeApp }

from "https://www.gstatic.com/firebasejs/11.0.2/firebase-app.js";



import {

getFirestore,

collection,

getDocs,

getCountFromServer,

addDoc,

updateDoc,

deleteDoc,

doc,

getDoc

}

from "https://www.gstatic.com/firebasejs/11.0.2/firebase-firestore.js";



import {

getAuth,

signOut,

onAuthStateChanged

}

from "https://www.gstatic.com/firebasejs/11.0.2/firebase-auth.js";






// ================= FIREBASE CONFIG =================



const firebaseConfig = {


apiKey:
"AIzaSyDx5TR1iYZZsK4JqlvCmuR_0U6H1d3Mr80",


authDomain:
"dalubwikaan--26-8e646.firebaseapp.com",


projectId:
"dalubwikaan--26-8e646",


storageBucket:
"dalubwikaan--26-8e646.firebasestorage.app",


messagingSenderId:
"409516392020",


appId:
"1:409516392020:web:87d462a5927449c69eb7c1"


};







// ================= INITIALIZE =================



const app =
initializeApp(firebaseConfig);



const db =
getFirestore(app);



const auth =
getAuth(app);




console.log(
"🔥 Firebase Connected"
);







// =====================================================
// AUTH CHECK
// =====================================================



onAuthStateChanged(
auth,
(user)=>{


if(user){


console.log(
"✅ Admin Logged:",
user.email
);



}



else{


console.log(
"⚠️ No user logged in"
);



}



}

);








// =====================================================
// LOGOUT SYSTEM
// =====================================================



document.addEventListener(

"DOMContentLoaded",

()=>{


const logoutBtn =
document.getElementById(
"logoutBtn"
);





if(logoutBtn){



logoutBtn.onclick =
async()=>{



try{


await signOut(auth);



alert(
"✅ Logged out successfully"
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



};



}



}

);









// =====================================================
// DASHBOARD STATISTICS
// =====================================================



async function loadDashboardStats(){



try{



const collectionCount =

await getCountFromServer(

collection(
db,
"collections"
)

);





const expenseCount =

await getCountFromServer(

collection(
db,
"expenses"
)

);





const projectCount =

await getCountFromServer(

collection(
db,
"projects"
)

);





const announcementCount =

await getCountFromServer(

collection(
db,
"announcements"
)

);







const totalCollections =

document.getElementById(
"totalCollections"
);





const totalExpenses =

document.getElementById(
"totalExpenses"
);





const totalProjects =

document.getElementById(
"totalProjects"
);





const totalAnnouncements =

document.getElementById(
"totalAnnouncements"
);









if(totalCollections){


totalCollections.innerHTML =

collectionCount.data().count;


}




if(totalExpenses){


totalExpenses.innerHTML =

expenseCount.data().count;


}





if(totalProjects){


totalProjects.innerHTML =

projectCount.data().count;


}





if(totalAnnouncements){


totalAnnouncements.innerHTML =

announcementCount.data().count;


}






console.log(
"📊 Dashboard Connected"
);




}



catch(error){



console.error(

"Dashboard Error:",

error

);



}



}









// =====================================================
// START PART 1
// =====================================================



document.addEventListener(

"DOMContentLoaded",

()=>{


loadDashboardStats();



}

);





console.log(
"✅ ADMIN PART 1 READY"
);
// =====================================================
// DALUBWIKAAN ADMIN SYSTEM
// ADMIN.JS PART 2/3
// COLLECTION + EXPENSE + PROJECT MANAGEMENT
// =====================================================





// =====================================================
// COLLECTION SYSTEM
// =====================================================


let editingCollectionID = null;




// ================= SAVE COLLECTION =================


window.saveCollection = async function(){


try{


const data = {


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



updatedAt:new Date()


};






if(editingCollectionID){



await updateDoc(

doc(
db,
"collections",
editingCollectionID
),

data

);



alert(
"✅ Collection Updated"
);



editingCollectionID=null;



}




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



alert(
"✅ Collection Saved"
);



}





clearCollectionForm();


loadAdminCollections();



}



catch(error){



console.error(
"Collection Error:",
error
);



alert(
"❌ "+error.message
);



}



};








// ================= LOAD COLLECTION =================



async function loadAdminCollections(){



const container =

document.getElementById(
"adminCollectionList"
);





if(!container)return;





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
💰 ${data.week || "Collection"}
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



<button onclick="editCollection('${item.id}')">

✏️ Edit

</button>



<button onclick="deleteCollection('${item.id}')">

🗑️ Delete

</button>



</div>

`;



});



}



catch(error){



console.error(error);



}



}








window.deleteCollection = async function(id){



await deleteDoc(

doc(
db,
"collections",
id
)

);



alert(
"🗑️ Deleted"
);



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



};









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


const element =
document.getElementById(id);



if(element)
element.value="";



});


editingCollectionID=null;


}









// =====================================================
// EXPENSE SYSTEM
// =====================================================



let editingExpenseID=null;






window.saveExpense = async function(){



try{



const data={



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





alert(
"✅ Expense Saved"
);



clearExpenseForm();


loadAdminExpenses();



}



catch(error){



console.error(error);



alert(
"❌ Expense Error: "+error.message
);



}



};









async function loadAdminExpenses(){



const container =

document.getElementById(
"adminExpenseList"
);





if(!container)return;





const snapshot =

await getDocs(

collection(
db,
"expenses"
)

);





container.innerHTML="";





snapshot.forEach((item)=>{



const data=item.data();





container.innerHTML += `


<div class="expense">


<h3>
💸 ${data.title}
</h3>


<p>
${data.category}
</p>


<p>
₱${Number(data.amount || 0).toLocaleString()}
</p>



<button onclick="deleteExpense('${item.id}')">

🗑️ Delete

</button>



</div>


`;



});



}







window.deleteExpense = async function(id){



await deleteDoc(

doc(
db,
"expenses",
id
)

);



alert(
"🗑️ Expense Deleted"
);



loadAdminExpenses();



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


const element =
document.getElementById(id);



if(element)
element.value="";



});



}









// =====================================================
// PROJECT SYSTEM
// =====================================================



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






alert(
"✅ Project Saved"
);



loadAdminProjects();



}



catch(error){



console.error(error);



alert(
"❌ Project Error: "+error.message
);



}



};








async function loadAdminProjects(){



const container =

document.getElementById(
"adminProjectList"
);





if(!container)return;





const snapshot =

await getDocs(

collection(
db,
"projects"
)

);






container.innerHTML="";






snapshot.forEach((item)=>{



const data=item.data();





container.innerHTML += `


<div class="expense">


<h3>
📂 ${data.title}
</h3>


<p>
${data.description}
</p>


<p>
Budget: ₱${Number(data.budget || 0).toLocaleString()}
</p>


<p>
Status: ${data.status}
</p>



<button onclick="deleteProject('${item.id}')">

🗑️ Delete

</button>



</div>


`;



});



}








window.deleteProject = async function(id){



await deleteDoc(

doc(
db,
"projects",
id
)

);



alert(
"🗑️ Project Deleted"
);



loadAdminProjects();



};








// =====================================================
// LOAD PART 2 DATA
// =====================================================


document.addEventListener(

"DOMContentLoaded",

()=>{


loadAdminCollections();


loadAdminExpenses();


loadAdminProjects();


}

);





console.log(
"✅ ADMIN PART 2 READY"
);
// =====================================================
// DALUBWIKAAN ADMIN SYSTEM
// ADMIN.JS PART 3/3
// ANNOUNCEMENT + SEARCH + FINAL INITIALIZATION
// =====================================================






// =====================================================
// ANNOUNCEMENT SYSTEM
// =====================================================



let editingAnnouncementID = null;






window.saveAnnouncement = async function(){



try{



const data = {


title:
document.getElementById("announcementTitle").value.trim(),



message:
document.getElementById("announcementMessage").value.trim(),



priority:
document.getElementById("announcementPriority").value,



updatedAt:new Date()



};







if(!data.title || !data.message){



alert(
"⚠️ Please complete announcement details."
);



return;



}







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







clearAnnouncementForm();


loadAdminAnnouncements();





}



catch(error){



console.error(
"Announcement Error:",
error
);



alert(
"❌ "+error.message
);



}



};











// ================= LOAD ANNOUNCEMENTS =================



async function loadAdminAnnouncements(){



const container =

document.getElementById(
"adminAnnouncementList"
);





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



container.innerHTML =
"<p>No announcements posted.</p>";



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
${data.priority || "Low"}
</p>





<button onclick="deleteAnnouncement('${item.id}')">

🗑️ Delete

</button>



</div>


`;



});



}



catch(error){



console.error(error);



}



}









window.deleteAnnouncement = async function(id){



if(!confirm("Delete announcement?"))
return;






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



};








function clearAnnouncementForm(){



const title =
document.getElementById(
"announcementTitle"
);



const message =
document.getElementById(
"announcementMessage"
);



if(title)
title.value="";



if(message)
message.value="";



}












// =====================================================
// GLOBAL SEARCH SYSTEM
// =====================================================



const globalSearch =

document.getElementById(
"globalSearch"
);





const searchResults =

document.getElementById(
"searchResults"
);








if(globalSearch){



globalSearch.addEventListener(

"input",

()=>{


searchEverything();


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







let results="";








// COLLECTION SEARCH



const collections =

await getDocs(

collection(
db,
"collections"
)

);





collections.forEach((item)=>{



const data=item.data();





if(
JSON.stringify(data)
.toLowerCase()
.includes(keyword)
){



results += `


<div class="expense">


<h3>
💰 Collection
</h3>


<p>
${data.week || ""}
</p>


<p>
Collector:
${data.collector || ""}
</p>



</div>


`;



}



});










// EXPENSE SEARCH



const expenses =

await getDocs(

collection(
db,
"expenses"
)

);






expenses.forEach((item)=>{



const data=item.data();





if(
JSON.stringify(data)
.toLowerCase()
.includes(keyword)
){



results += `


<div class="expense">


<h3>
💸 Expense
</h3>


<p>
${data.title || ""}
</p>


<p>
₱${Number(data.amount || 0).toLocaleString()}
</p>


</div>


`;



}



});









// PROJECT SEARCH



const projects =

await getDocs(

collection(
db,
"projects"
)

);







projects.forEach((item)=>{



const data=item.data();





if(
JSON.stringify(data)
.toLowerCase()
.includes(keyword)
){



results += `


<div class="expense">


<h3>
📂 Project
</h3>


<p>
${data.title || ""}
</p>


<p>
${data.status || ""}
</p>


</div>


`;



}



});









// ANNOUNCEMENT SEARCH



const announcements =

await getDocs(

collection(
db,
"announcements"
)

);






announcements.forEach((item)=>{



const data=item.data();





if(
JSON.stringify(data)
.toLowerCase()
.includes(keyword)
){



results += `


<div class="expense">


<h3>
📢 Announcement
</h3>


<p>
${data.title || ""}
</p>



</div>


`;



}



});










if(results===""){



searchResults.innerHTML =

`

<div class="expense">

<h3>
❌ No Result Found
</h3>


</div>

`;



}

else{



searchResults.innerHTML =
results;



}



}











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
"🚀 Dalubwikaan Admin Fully Loaded"
);



}








document.addEventListener(

"DOMContentLoaded",

()=>{


startAdminSystem();



}

);







console.log(
"✅ ADMIN PART 3 READY"
);
