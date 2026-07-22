import { initializeApp } from "https://www.gstatic.com/firebasejs/11.0.2/firebase-app.js";

import {
    getFirestore,
    collection,
    addDoc,
    getDocs,
    deleteDoc,
    doc,
    getDoc,
    updateDoc
} from "https://www.gstatic.com/firebasejs/11.0.2/firebase-firestore.js";


// ================= FIREBASE =================

const firebaseConfig = {
  apiKey: "AIzaSyDx5TR1iYZZsK4JqlvCmuR_0U6H1d3Mr80",
  authDomain: "dalubwikaan--26-8e646.firebaseapp.com",
  projectId: "dalubwikaan--26-8e646",
  storageBucket: "dalubwikaan--26-8e646.firebasestorage.app",
  messagingSenderId: "409516392020",
  appId: "1:409516392020:web:87d462a5927449c69eb7c1"
};


const app = initializeApp(firebaseConfig);

const db = getFirestore(app);


console.log("🔥 Admin Firebase Connected!");



// =================================================
// ================= EXPENSES ======================
// =================================================


let editingExpenseID = null;



window.saveExpense = async function(){


const data = {

title:
document.getElementById("expenseTitle").value,

category:
document.getElementById("expenseCategory").value,

amount:
Number(document.getElementById("expenseAmount").value || 0),

date:
document.getElementById("expenseDate").value,

receipt:
document.getElementById("expenseReceipt").value,

remarks:
document.getElementById("expenseRemarks").value,

createdAt:new Date()

};



if(editingExpenseID){


await updateDoc(
doc(db,"expenses",editingExpenseID),
data
);


alert("✅ Expense updated!");


editingExpenseID=null;


}

else{


await addDoc(
collection(db,"expenses"),
data
);


alert("✅ Expense saved!");

}


clearExpenseForm();

loadAdminExpenses();


};







async function loadAdminExpenses(){


const container =
document.getElementById("adminExpenseList");


if(!container)return;


const snapshot =
await getDocs(collection(db,"expenses"));


container.innerHTML="";



snapshot.forEach(item=>{


const data=item.data();



container.innerHTML += `

<div class="expense">

<h3>${data.title}</h3>

<p>
${data.category}
</p>

<p>
₱${Number(data.amount).toLocaleString()}
</p>


<button onclick="editExpense('${item.id}')">
✏️ Edit
</button>


<button onclick="deleteExpense('${item.id}')">
🗑️ Delete
</button>


</div>

`;

});


}


loadAdminExpenses();







window.deleteExpense = async function(id){


await deleteDoc(
doc(db,"expenses",id)
);


alert("🗑️ Expense deleted!");


loadAdminExpenses();


};





window.editExpense = async function(id){


const snap =
await getDoc(
doc(db,"expenses",id)
);


const data=snap.data();



document.getElementById("expenseTitle").value=data.title;

document.getElementById("expenseCategory").value=data.category;

document.getElementById("expenseAmount").value=data.amount;

document.getElementById("expenseDate").value=data.date;

document.getElementById("expenseReceipt").value=data.receipt || "";

document.getElementById("expenseRemarks").value=data.remarks || "";


editingExpenseID=id;


alert("✏️ Edit Expense Mode");


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

document.getElementById(id).value="";

});


}









// =================================================
// ================= COLLECTIONS ===================
// =================================================


let editingCollectionID=null;



window.saveCollection = async function(){


const data={


week:
document.getElementById("week").value,


date:
document.getElementById("collectionDate").value,


firstYear:
Number(document.getElementById("firstYearCollection").value||0),


secondYear:
Number(document.getElementById("secondYearCollection").value||0),


thirdYear:
Number(document.getElementById("thirdYearCollection").value||0),


fourthYear:
Number(document.getElementById("fourthYearCollection").value||0),


collector:
document.getElementById("collector").value,


createdAt:new Date()


};



if(editingCollectionID){


await updateDoc(
doc(db,"collections",editingCollectionID),
data
);


alert("✅ Collection updated!");


editingCollectionID=null;


}

else{


await addDoc(
collection(db,"collections"),
data
);


alert("✅ Collection saved!");


}



clearCollectionForm();

loadAdminCollections();


};







async function loadAdminCollections(){


const container =
document.getElementById("adminCollectionList");


if(!container)return;



const snapshot =
await getDocs(collection(db,"collections"));



container.innerHTML="";



snapshot.forEach(item=>{


const data=item.data();


let total =
Number(data.firstYear||0)+
Number(data.secondYear||0)+
Number(data.thirdYear||0)+
Number(data.fourthYear||0);



container.innerHTML += `

<div class="expense">

<h3>${data.week}</h3>

<p>
Collector: ${data.collector}
</p>

<p>
Total: ₱${total.toLocaleString()}
</p>


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


loadAdminCollections();







window.deleteCollection = async function(id){


await deleteDoc(
doc(db,"collections",id)
);


alert("🗑️ Collection deleted!");


loadAdminCollections();


};






window.editCollection = async function(id){


const snap =
await getDoc(
doc(db,"collections",id)
);


const data=snap.data();



document.getElementById("week").value=data.week;

document.getElementById("collectionDate").value=data.date;

document.getElementById("firstYearCollection").value=data.firstYear;

document.getElementById("secondYearCollection").value=data.secondYear;

document.getElementById("thirdYearCollection").value=data.thirdYear;

document.getElementById("fourthYearCollection").value=data.fourthYear;

document.getElementById("collector").value=data.collector;



editingCollectionID=id;


alert("✏️ Edit Collection Mode");


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


document.getElementById(id).value="";


});


}




// =================================================
// ================= PROJECTS ======================
// =================================================


let editingProjectID = null;



window.saveProject = async function(){


const projectData = {


title:
document.getElementById("projectTitle").value,


description:
document.getElementById("projectDescription").value,


budget:
Number(document.getElementById("projectBudget").value || 0),


spent:
Number(document.getElementById("projectSpent").value || 0),


status:
document.getElementById("projectStatus").value,


createdAt:new Date()


};




if(editingProjectID){


await updateDoc(
doc(db,"projects",editingProjectID),
projectData
);


alert("✅ Project updated!");


editingProjectID=null;


}

else{


await addDoc(
collection(db,"projects"),
projectData
);


alert("✅ Project saved!");


}



clearProjectForm();

loadAdminProjects();


};








async function loadAdminProjects(){


const container =
document.getElementById("adminProjectList");


if(!container)return;



const snapshot =
await getDocs(collection(db,"projects"));



container.innerHTML="";



if(snapshot.empty){


container.innerHTML =
"<p>No projects available.</p>";

return;


}




snapshot.forEach(item=>{


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
💰 Budget:
₱${Number(data.budget).toLocaleString()}
</p>



<p>
💸 Spent:
₱${Number(data.spent).toLocaleString()}
</p>



<p>
📌 Status:
${data.status}
</p>




<button onclick="editProject('${item.id}')">

✏️ Edit

</button>



<button onclick="deleteProject('${item.id}')">

🗑️ Delete

</button>



</div>


`;



});


}



loadAdminProjects();








window.deleteProject = async function(id){


if(!confirm("Delete this project?")) return;



await deleteDoc(
doc(db,"projects",id)
);



alert("🗑️ Project deleted!");



loadAdminProjects();


};








window.editProject = async function(id){


const snap =
await getDoc(
doc(db,"projects",id)
);



const data=snap.data();



document.getElementById("projectTitle").value =
data.title;


document.getElementById("projectDescription").value =
data.description;


document.getElementById("projectBudget").value =
data.budget;


document.getElementById("projectSpent").value =
data.spent;


document.getElementById("projectStatus").value =
data.status;



editingProjectID=id;



alert("✏️ Edit Project Mode ON");


};








function clearProjectForm(){


document.getElementById("projectTitle").value="";


document.getElementById("projectDescription").value="";


document.getElementById("projectBudget").value="";


document.getElementById("projectSpent").value="";


document.getElementById("projectStatus").value="Planning";


}







// =================================================
// ================= ANNOUNCEMENTS ================
// =================================================


let editingAnnouncementID=null;



window.saveAnnouncement = async function(){



const data={


title:
document.getElementById("announcementTitle").value,


message:
document.getElementById("announcementMessage").value,


priority:
document.getElementById("announcementPriority").value,


createdAt:new Date()


};





if(editingAnnouncementID){


await updateDoc(
doc(db,"announcements",editingAnnouncementID),
data
);


alert("✅ Announcement updated!");


editingAnnouncementID=null;


}

else{


await addDoc(
collection(db,"announcements"),
data
);


alert("✅ Announcement posted!");


}



clearAnnouncementForm();

loadAdminAnnouncements();


};







async function loadAdminAnnouncements(){


const container =
document.getElementById("adminAnnouncementList");



if(!container)return;



const snapshot =
await getDocs(collection(db,"announcements"));



container.innerHTML="";



snapshot.forEach(item=>{


const data=item.data();



container.innerHTML += `


<div class="expense">


<h3>
📢 ${data.title}
</h3>


<p>
${data.message}
</p>


<p>
Priority: ${data.priority}
</p>


<button onclick="editAnnouncement('${item.id}')">
✏️ Edit
</button>


<button onclick="deleteAnnouncement('${item.id}')">
🗑️ Delete
</button>


</div>


`;


});


}


loadAdminAnnouncements();







window.deleteAnnouncement = async function(id){


await deleteDoc(
doc(db,"announcements",id)
);


alert("🗑️ Announcement deleted!");


loadAdminAnnouncements();


};







window.editAnnouncement = async function(id){


const snap =
await getDoc(
doc(db,"announcements",id)
);



const data=snap.data();



document.getElementById("announcementTitle").value=data.title;


document.getElementById("announcementMessage").value=data.message;


document.getElementById("announcementPriority").value=data.priority;



editingAnnouncementID=id;


alert("✏️ Edit Announcement Mode");


};







function clearAnnouncementForm(){


document.getElementById("announcementTitle").value="";


document.getElementById("announcementMessage").value="";


document.getElementById("announcementPriority").value="Low";


}

// ================= LOGOUT =================

import { getAuth, signOut } from "https://www.gstatic.com/firebasejs/11.0.2/firebase-auth.js";

const auth = getAuth(app);

const logoutBtn = document.getElementById("logoutBtn");

if (logoutBtn) {
    logoutBtn.addEventListener("click", async () => {

        await signOut(auth);

        alert("✅ Logged out successfully.");

        window.location.href = "login.html";

    });
}
