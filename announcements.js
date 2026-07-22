import { initializeApp } from "https://www.gstatic.com/firebasejs/11.0.2/firebase-app.js";

import {
    getFirestore,
    collection,
    getDocs,
    query,
    orderBy
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


console.log("📢 Announcements Connected!");



// ================= LOAD =================


async function loadAnnouncements(){

    const container = document.getElementById("announcementList");


    if(!container) return;


    try{


        const q = query(

            collection(db,"announcements"),

            orderBy("createdAt","desc")

        );


        const snapshot = await getDocs(q);



        container.innerHTML = "";



        if(snapshot.empty){


            container.innerHTML = `

            <div class="announcementCard">

                <h3>
                📭 No Announcements Yet
                </h3>

                <p>
                No announcements have been posted.
                </p>

            </div>

            `;

            return;

        }





        let dataList = [];



        snapshot.forEach((doc)=>{

            dataList.push({

                id:doc.id,

                ...doc.data()

            });


        });





        // HIGH PRIORITY FIRST

        const priorityOrder = {

            "High":1,

            "Medium":2,

            "Low":3

        };



        dataList.sort((a,b)=>{


            return (

                (priorityOrder[a.priority] || 3)

                -

                (priorityOrder[b.priority] || 3)

            );


        });







        dataList.forEach((data)=>{



            let badgeText = "🟢 LOW";

            let badgeClass = "low";



            if(data.priority === "High"){

                badgeText = "🔴 HIGH";

                badgeClass = "high";

            }


            else if(data.priority === "Medium"){


                badgeText = "🟡 MEDIUM";

                badgeClass = "medium";

            }





            let datePosted = "No Date";



            if(data.createdAt?.seconds){


                datePosted = new Date(

                    data.createdAt.seconds * 1000

                ).toLocaleDateString(
                    "en-PH",
                    {
                        year:"numeric",
                        month:"long",
                        day:"numeric"
                    }
                );


            }







            container.innerHTML += `


            <div class="announcementCard ${badgeClass}">


                <div class="announcementTop">


                    <h2>

                    📢 ${data.title || "Untitled Announcement"}

                    </h2>



                    <span class="priorityBadge">

                    ${badgeText}

                    </span>


                </div>





                <p class="announcementMessage">

                ${data.message || "No message available."}

                </p>





                <p class="announcementDate">

                📅 Posted: ${datePosted}

                </p>



            </div>


            `;


        });




    }


    catch(error){


        console.error(
            "Announcement Error:",
            error
        );


        container.innerHTML = `


        <div class="announcementCard">


            <h3>
            ❌ Failed Loading Announcements
            </h3>


            <p>
            ${error.message}
            </p>


        </div>


        `;


    }



}



loadAnnouncements();
