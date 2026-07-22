import { initializeApp } from "https://www.gstatic.com/firebasejs/11.0.2/firebase-app.js";

import {
    getFirestore,
    collection,
    getDocs
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



console.log("🔥 Collections Firebase Connected!");





let collectionsData = [];







// ================= LOAD DATA =================


async function loadCollections(){


try{


const snapshot =
await getDocs(collection(db,"collections"));



collectionsData = [];



snapshot.forEach((doc)=>{


collectionsData.push(doc.data());


});



displayCollections("all");



}



catch(error){


console.error(
"Collection Error:",
error
);


}



}










// ================= DISPLAY =================


function displayCollections(filter){



const container =
document.getElementById("collectionList");



const totalDisplay =
document.getElementById("totalCollection");



if(!container) return;



container.innerHTML = "";



let total = 0;




if(collectionsData.length === 0){


container.innerHTML = `

<p>
No collection records yet.
</p>

`;


if(totalDisplay){

totalDisplay.innerHTML="₱0";

}


return;


}






collectionsData.forEach((data)=>{


let amount = 0;



// ALL YEARS

if(filter === "all"){


amount =

Number(data.firstYear || 0) +

Number(data.secondYear || 0) +

Number(data.thirdYear || 0) +

Number(data.fourthYear || 0);


}




// FILTER YEAR LEVEL


if(filter === "1"){


amount =
Number(data.firstYear || 0);


}



if(filter === "2"){


amount =
Number(data.secondYear || 0);


}



if(filter === "3"){


amount =
Number(data.thirdYear || 0);


}



if(filter === "4"){


amount =
Number(data.fourthYear || 0);


}




total += amount;





container.innerHTML += `


<div class="expense">


<h3>

Week: ${data.week || "No Week"}

</h3>



<p>

📅 Date:
${data.date || "No Date"}

</p>



<p>

👤 Collector:
${data.collector || "Unknown"}

</p>



<hr>



<p>

💰 Amount:

₱${amount.toLocaleString()}

</p>



</div>


`;



});







if(totalDisplay){


totalDisplay.innerHTML =

"₱" + total.toLocaleString();


}



}










// ================= FILTER =================



const filter =
document.getElementById("yearFilter");



if(filter){


filter.addEventListener(
"change",
function(){


displayCollections(
this.value
);


});



}








// START

loadCollections();
