// =====================================================
// DALUBWIKAAN ADMIN SYSTEM
// FINAL POLISHED ADMIN.JS
// PART 1/3
// =====================================================


import { initializeApp } from 
"https://www.gstatic.com/firebasejs/11.0.2/firebase-app.js";


import {

getFirestore,
collection,
addDoc,
getDocs,
deleteDoc,
doc,
getDoc,
updateDoc

} from 
"https://www.gstatic.com/firebasejs/11.0.2/firebase-firestore.js";


import {

getAuth,
signOut

} from
"https://www.gstatic.com/firebasejs/11.0.2/firebase-auth.js";



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

const auth = getAuth(app);



console.log("🔥 Dalubwikaan Admin Connected!");




// =====================================================
// ================= COLLECTIONS ========================
// =====================================================



let editingCollectionID = null;



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



}



catch(error){


console.error(error);

alert("❌ Failed saving collection");


}



};






async function loadAdminCollections(){


const container =
document.getElementById("adminCollectionList");


if(!container) return;



try{


const snapshot =
await getDocs(
collection(db,"collections")
);



container.innerHTML="";



if(snapshot.empty){


container.innerHTML =
"<p>No collection records yet.</p>";

return;


}




let records=[];



snapshot.forEach(item=>{


records.push({

id:item.id,

...item.data()

});


});




records.sort((a,b)=>{


return (

(b.createdAt?.seconds || 0)

-

(a.createdAt?.seconds || 0)

);


});





records.forEach(data=>{


let total =


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
👤 Collector:
${data.collector || "N/A"}
</p>


<p>
📅 Date:
${data.date || "N/A"}
</p>



<h3>

Total:
₱${total.toLocaleString()}

</h3>



<button onclick="editCollection('${data.id}')">

✏️ Edit

</button>



<button onclick="deleteCollection('${data.id}')">

🗑️ Delete

</button>


</div>


`;



});




}

catch(error){


console.error(error);


container.innerHTML =
"<p>❌ Failed loading collections.</p>";

}



}





loadAdminCollections();







window.deleteCollection = async function(id){



if(!confirm("Delete this collection?")) return;



await deleteDoc(

doc(db,"collections",id)

);



alert("🗑️ Collection deleted!");


loadAdminCollections();



};







window.editCollection = async function(id){


const snap = await getDoc(

doc(db,"collections",id)

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


alert("✏️ Editing Collection");



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


const element=document.getElementById(id);


if(element){

element.value="";

}


});



}




// =====================================================
// ================= EXPENSES ===========================
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


}



catch(error){


console.error(error);

alert("❌ Expense saving failed");


}



};

// =================================================
// ================= COLLECTIONS ===================
// =================================================

let editingCollectionID = null;


window.saveCollection = async function(){

    const data = {

        week: document.getElementById("week").value,

        date: document.getElementById("collectionDate").value,

        firstYear: Number(
            document.getElementById("firstYearCollection").value || 0
        ),

        secondYear: Number(
            document.getElementById("secondYearCollection").value || 0
        ),

        thirdYear: Number(
            document.getElementById("thirdYearCollection").value || 0
        ),

        fourthYear: Number(
            document.getElementById("fourthYearCollection").value || 0
        ),

        collector:
        document.getElementById("collector").value,

        createdAt:new Date()

    };


    try{


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



    }
    catch(error){

        console.error(error);

        alert("❌ Failed saving collection.");

    }


};





async function loadAdminCollections(){


    const container =
    document.getElementById("adminCollectionList");


    if(!container) return;



    const snapshot =
    await getDocs(collection(db,"collections"));



    container.innerHTML="";



    if(snapshot.empty){


        container.innerHTML=
        `<p>No collection records yet.</p>`;


        return;

    }





    snapshot.forEach(item=>{


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
            📅 ${data.date || "No Date"}
            </p>


            <p>
            👤 Collector:
            ${data.collector || "N/A"}
            </p>



            <p>
            Total:
            ₱${total.toLocaleString()}
            </p>



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



loadAdminCollections();






window.deleteCollection = async function(id){


    if(!confirm("Delete this collection record?"))
    return;



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



    alert("✏️ Editing Collection");



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


}






// =================================================
// ================= PROJECTS ======================
// =================================================


let editingProjectID=null;



window.saveProject = async function(){


const projectData = {


    title:
    document.getElementById("projectTitle").value,


    description:
    document.getElementById("projectDescription").value,


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



try{


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



}
catch(error){

    console.error(error);

    alert("❌ Project saving failed.");

}



};






async function loadAdminProjects(){


const container =
document.getElementById("adminProjectList");


if(!container) return;



const snapshot =
await getDocs(collection(db,"projects"));



container.innerHTML="";



if(snapshot.empty){


container.innerHTML=
"<p>No projects available.</p>";

return;

}





snapshot.forEach(item=>{


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



loadAdminProjects();

// =================================================
// ================= PROJECT CONTINUATION ==========
// =================================================


window.deleteProject = async function(id){


    if(!confirm("Delete this project?"))
    return;


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


};






function clearProjectForm(){


const fields=[

"projectTitle",
"projectDescription",
"projectBudget",
"projectSpent"

];



fields.forEach(id=>{


const element =
document.getElementById(id);



if(element)
element.value="";


});



document.getElementById("projectStatus").value="Planning";


}








// =================================================
// ================= ANNOUNCEMENTS =================
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





try{


    if(editingAnnouncementID){


        await updateDoc(

            doc(
                db,
                "announcements",
                editingAnnouncementID
            ),

            data

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

            data

        );



        alert("📢 Announcement posted!");


    }




    clearAnnouncementForm();


    loadAdminAnnouncements();



}

catch(error){


    console.error(error);


    alert("❌ Failed saving announcement.");


}



};








async function loadAdminAnnouncements(){


const container =
document.getElementById("adminAnnouncementList");



if(!container)
return;



const snapshot =
await getDocs(
collection(db,"announcements")
);



container.innerHTML="";




if(snapshot.empty){


container.innerHTML=
"<p>No announcements yet.</p>";


return;


}





snapshot.forEach(item=>{


const data=item.data();




container.innerHTML += `


<div class="expense">


<h3>
📢 ${data.title || "Untitled"}
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



if(title)
title.value="";



if(message)
message.value="";



document.getElementById("announcementPriority").value="Low";


}








// =================================================
// ================= LOGOUT ========================
// =================================================


import {

getAuth,

signOut

}

from "https://www.gstatic.com/firebasejs/11.0.2/firebase-auth.js";




const auth =
getAuth(app);




const logoutBtn =
document.getElementById("logoutBtn");




if(logoutBtn){



logoutBtn.addEventListener(

"click",

async()=>{


try{


await signOut(auth);



alert("✅ Logged out successfully.");



window.location.href="login.html";



}

catch(error){


console.error(error);


alert("❌ Logout failed.");



}



}



);



}



// =================================================
// =============== GLOBAL SEARCH ==================
// =================================================


const globalSearch =
document.getElementById("globalSearch");


if(globalSearch){


globalSearch.addEventListener(
"input",
searchEverything
);


}





async function searchEverything(){


const keyword =
document
.getElementById("globalSearch")
.value
.toLowerCase()
.trim();



const resultBox =
document.getElementById("searchResults");



if(keyword===""){


resultBox.innerHTML =
"<p>Type something to search...</p>";

return;


}





let results = "";




// ================= EXPENSES =================


const expenseSnap =
await getDocs(
collection(db,"expenses")
);



expenseSnap.forEach(doc=>{


const data=doc.data();



if(

(data.title || "")
.toLowerCase()
.includes(keyword)

||

(data.category || "")
.toLowerCase()
.includes(keyword)

){


results += `


<div class="expense">

<h3>
💸 Expense
</h3>


<p>
${data.title}
</p>


<p>
₱${Number(data.amount||0)
.toLocaleString()}
</p>


</div>


`;


}


});






// ================= PROJECTS =================


const projectSnap =
await getDocs(
collection(db,"projects")
);



projectSnap.forEach(doc=>{


const data=doc.data();



if(

(data.title || "")
.toLowerCase()
.includes(keyword)

||

(data.description || "")
.toLowerCase()
.includes(keyword)

){


results += `


<div class="expense">


<h3>
📂 Project
</h3>


<p>
${data.title}
</p>


<p>
${data.description}
</p>


</div>


`;


}


});






// ================= ANNOUNCEMENTS =================


const announcementSnap =
await getDocs(
collection(db,"announcements")
);



announcementSnap.forEach(doc=>{


const data=doc.data();



if(

(data.title || "")
.toLowerCase()
.includes(keyword)

||

(data.message || "")
.toLowerCase()
.includes(keyword)

){


results += `


<div class="expense">


<h3>
📢 Announcement
</h3>


<p>
${data.title}
</p>


<p>
${data.message}
</p>


</div>


`;


}


});






// ================= COLLECTIONS =================


const collectionSnap =
await getDocs(
collection(db,"collections")
);



collectionSnap.forEach(doc=>{


const data=doc.data();



if(

(data.week || "")
.toLowerCase()
.includes(keyword)

||

(data.collector || "")
.toLowerCase()
.includes(keyword)

){


results += `


<div class="expense">


<h3>
💰 Collection
</h3>


<p>
${data.week}
</p>


<p>
Collector:
${data.collector}
</p>


</div>


`;


}


});






if(results===""){


resultBox.innerHTML = `

<div class="expense">

<h3>
❌ No Results
</h3>

<p>
No matching records found.
</p>

</div>

`;


}

else{


resultBox.innerHTML = results;


}



}


console.log("✅ Admin Dashboard Fully Loaded!");
