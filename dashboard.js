// =====================================================
// DALUBWIKAAN TRANSPARENCY PORTAL
// dashboard.js
// PART 1
// Firebase Initialization
// =====================================================

import { initializeApp } from "https://www.gstatic.com/firebasejs/11.0.2/firebase-app.js";

import {
    getFirestore,
    collection,
    getDocs
} from "https://www.gstatic.com/firebasejs/11.0.2/firebase-firestore.js";


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

console.log("✅ Firebase Connected");


// ================= GLOBAL DATA =================

const dashboard = {

    collections: [],
    expenses: [],
    projects: [],
    announcements: []

};

window.dashboard = dashboard;


// ================= LOAD COLLECTIONS =================

async function loadCollections(){

    dashboard.collections = [];

    const snapshot = await getDocs(collection(db,"collections"));

    snapshot.forEach(doc=>{

        dashboard.collections.push({

            id:doc.id,
            ...doc.data()

        });

    });

    console.log("Collections:",dashboard.collections.length);

}


// ================= LOAD EXPENSES =================

async function loadExpenses(){

    dashboard.expenses=[];

    const snapshot=await getDocs(collection(db,"expenses"));

    snapshot.forEach(doc=>{

        dashboard.expenses.push({

            id:doc.id,
            ...doc.data()

        });

    });

    console.log("Expenses:",dashboard.expenses.length);

}


// ================= LOAD PROJECTS =================

async function loadProjects(){

    dashboard.projects=[];

    const snapshot=await getDocs(collection(db,"projects"));

    snapshot.forEach(doc=>{

        dashboard.projects.push({

            id:doc.id,
            ...doc.data()

        });

    });

    console.log("Projects:",dashboard.projects.length);

}


// ================= LOAD ANNOUNCEMENTS =================

async function loadAnnouncements(){

    dashboard.announcements=[];

    const snapshot=await getDocs(collection(db,"announcements"));

    snapshot.forEach(doc=>{

        dashboard.announcements.push({

            id:doc.id,
            ...doc.data()

        });

    });

    console.log("Announcements:",dashboard.announcements.length);

}


// ================= MONEY FORMAT =================

function money(value){

    return "₱"+Number(value||0).toLocaleString();

}

window.money=money;


// ================= TOTAL COLLECTION =================

function totalCollections(){

    let total=0;

    dashboard.collections.forEach(item=>{

        total+=
        Number(item.firstYear||0)+
        Number(item.secondYear||0)+
        Number(item.thirdYear||0)+
        Number(item.fourthYear||0);

    });

    return total;

}

window.totalCollections=totalCollections;


// ================= TOTAL EXPENSE =================

function totalExpenses(){

    let total=0;

    dashboard.expenses.forEach(item=>{

        total+=Number(item.amount||0);

    });

    return total;

}

window.totalExpenses=totalExpenses;


// ================= START =================

async function initializeDashboard(){

    try{

        await loadCollections();

        await loadExpenses();

        await loadProjects();

        await loadAnnouncements();

        console.log("✅ Dashboard Data Ready");

    }

    catch(err){

        console.error(err);

    }

}

window.initializeDashboard=initializeDashboard;

console.log("✅ dashboard.js PART 1 READY");
