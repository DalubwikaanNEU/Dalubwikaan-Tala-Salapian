import { initializeApp } from "https://www.gstatic.com/firebasejs/11.0.2/firebase-app.js";

import {
    getFirestore,
    collection,
    getDocs
} from "https://www.gstatic.com/firebasejs/11.0.2/firebase-firestore.js";



// FIREBASE

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



console.log("Collections Firebase Connected!");





async function loadCollections(){


const container =
document.getElementById("collectionList");



const snapshot =
await getDocs(collection(db,"collections"));



container.innerHTML = "";



if(snapshot.empty){

container.innerHTML =
`
<p>No collection records yet.</p>
`;

return;

}





snapshot.forEach((doc)=>{


const data = doc.data();



container.innerHTML += `

<div class="expense">


<h3>
Week: ${data.week}
</h3>


<p>
📅 Date: ${data.date}
</p>


<p>
👤 Collector: ${data.collector}
</p>


<hr>


<p>
1st Year:
₱${Number(data.firstYear).toLocaleString()}
</p>


<p>
2nd Year:
₱${Number(data.secondYear).toLocaleString()}
</p>


<p>
3rd Year:
₱${Number(data.thirdYear).toLocaleString()}
</p>


<p>
4th Year:
₱${Number(data.fourthYear).toLocaleString()}
</p>


</div>


`;



});



}



loadCollections();
