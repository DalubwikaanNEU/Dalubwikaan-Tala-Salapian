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






// ================= DATE HELPER =================


function convertDate(value){


    if(!value) return null;



    if(value.seconds){

        return new Date(value.seconds * 1000);

    }



    return new Date(value);


}







// ================= LOAD REPORT =================



async function loadReport(){


    try{


        const monthFilter =
        document.getElementById("monthFilter");



        if(!monthFilter) return;



        const selectedMonth =
        Number(monthFilter.value);




        let totalCollection = 0;

        let totalExpense = 0;



        let expenseList = [];





        // ================= COLLECTIONS =================



        const collectionSnap =
        await getDocs(
            collection(db,"collections")
        );




        collectionSnap.forEach((doc)=>{


            const data = doc.data();



            const date =
            convertDate(data.date);



            if(date && date.getMonth() === selectedMonth){



                totalCollection +=

                Number(data.firstYear || 0) +

                Number(data.secondYear || 0) +

                Number(data.thirdYear || 0) +

                Number(data.fourthYear || 0);



            }



        });









        // ================= EXPENSES =================



        const expenseSnap =
        await getDocs(
            collection(db,"expenses")
        );




        expenseSnap.forEach((doc)=>{


            const data = doc.data();



            const date =
            convertDate(data.date);



            if(date && date.getMonth() === selectedMonth){



                const amount =
                Number(data.amount || 0);



                totalExpense += amount;



                expenseList.push({

                    title:data.title || "No Title",

                    category:data.category || "-",

                    amount:amount,

                    date:data.date || "-",

                    remarks:data.remarks || "-"

                });



            }



        });








        // SORT EXPENSES



        expenseList.sort((a,b)=>{

            return b.amount - a.amount;

        });








        displayExpenses(expenseList);



        displayTotals(
            totalCollection,
            totalExpense
        );



        displayReportInfo();



    }



    catch(error){


        console.error(
            "Report Error:",
            error
        );



        const list =
        document.getElementById(
            "expenseReportList"
        );



        if(list){

            list.innerHTML = `

            <tr>

            <td colspan="5">

            ❌ Failed to load report.

            </td>

            </tr>

            `;

        }



    }



}









// ================= DISPLAY EXPENSE TABLE =================



function displayExpenses(list){



    const table =
    document.getElementById(
        "expenseReportList"
    );



    if(!table) return;



    table.innerHTML = "";





    if(list.length === 0){



        table.innerHTML = `

        <tr>

        <td colspan="5">

        No expense records for this month.

        </td>

        </tr>

        `;



        return;


    }






    list.forEach((expense)=>{



        table.innerHTML += `


        <tr>


        <td>

        ${expense.title}

        </td>



        <td>

        ${expense.category}

        </td>



        <td>

        ₱${expense.amount.toLocaleString()}

        </td>



        <td>

        ${expense.date}

        </td>



        <td>

        ${expense.remarks}

        </td>



        </tr>



        `;



    });



}









// ================= DISPLAY TOTALS =================



function displayTotals(
collection,
expense
){



    const balance =
    collection - expense;



    const reportCollection =
    document.getElementById(
        "reportCollection"
    );



    const reportExpense =
    document.getElementById(
        "reportExpense"
    );



    const reportBalance =
    document.getElementById(
        "reportBalance"
    );





    if(reportCollection){

        reportCollection.innerHTML =
        "₱" + collection.toLocaleString();

    }





    if(reportExpense){

        reportExpense.innerHTML =
        "₱" + expense.toLocaleString();

    }






    if(reportBalance){

        reportBalance.innerHTML =
        "₱" + balance.toLocaleString();

    }



}









// ================= REPORT INFO =================



function displayReportInfo(){



    const filter =
    document.getElementById(
        "monthFilter"
    );



    if(!filter) return;



    const month =

    filter.options[
        filter.selectedIndex
    ].text;





    const reportMonth =
    document.getElementById(
        "reportMonth"
    );



    const generatedDate =
    document.getElementById(
        "generatedDate"
    );





    if(reportMonth){

        reportMonth.innerHTML =
        "📅 Month: " + month;

    }





    if(generatedDate){

        generatedDate.innerHTML =

        "Generated: " +

        new Date()
        .toLocaleDateString();

    }



}








// ================= EVENTS =================



const monthFilter =
document.getElementById(
    "monthFilter"
);



if(monthFilter){


    monthFilter.addEventListener(
        "change",
        loadReport
    );


}






const printButton =
document.getElementById(
    "printButton"
);



if(printButton){


    printButton.addEventListener(
        "click",
        ()=>{

            window.print();

        }
    );


}








// ================= START =================


loadReport();
