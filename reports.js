// =====================================================
// DALUBWIKAAN TRANSPARENCY PORTAL
// FINAL REPORTS.JS
// PART 1/4
// FIREBASE CONNECTION + HELPERS
// =====================================================



// ================= FIREBASE IMPORT =================


import { initializeApp } 
from "https://www.gstatic.com/firebasejs/11.0.2/firebase-app.js";



import {

getFirestore,

collection,

getDocs

}

from "https://www.gstatic.com/firebasejs/11.0.2/firebase-firestore.js";





// =====================================================
// FIREBASE CONFIG
// =====================================================


const firebaseConfig = {


    apiKey: "AIzaSyDx5TR1iYZZsK4JqlvCmuR_0U6H1d3Mr80",


    authDomain: "dalubwikaan--26-8e646.firebaseapp.com",


    projectId: "dalubwikaan--26-8e646",


    storageBucket: "dalubwikaan--26-8e646.firebasestorage.app",


    messagingSenderId: "409516392020",


    appId: "1:409516392020:web:87d462a5927449c69eb7c1"


};






// INITIALIZE FIREBASE


const app = initializeApp(firebaseConfig);



const db = getFirestore(app);






console.log(

"🔥 Reports Firebase Connected"

);









// =====================================================
// DATE CONVERTER
// SUPPORTS FIRESTORE TIMESTAMP + NORMAL DATE
// =====================================================



function convertDate(value){



    if(!value){

        return null;

    }





    if(value.seconds){


        return new Date(

            value.seconds * 1000

        );


    }






    const date = new Date(value);





    if(isNaN(date)){


        return null;


    }



    return date;


}







// =====================================================
// LOAD REPORT FUNCTION
// =====================================================



async function loadReport(){


    try{


        const monthFilter =

        document.getElementById(

            "monthFilter"

        );



        if(!monthFilter){


            console.warn(

            "Month filter missing"

            );


            return;


        }





        const selectedMonth =

        Number(

            monthFilter.value

        );






        let totalCollection = 0;


        let totalExpense = 0;


        let expenseList = [];





        console.log(

        "Loading month:",

        selectedMonth

        );

    // =====================================================
// PART 2/4
// COLLECTIONS + EXPENSES DATA FETCHING
// =====================================================





// =====================================================
// LOAD COLLECTIONS
// =====================================================


const collectionSnap =

await getDocs(

    collection(

        db,

        "collections"

    )

);






collectionSnap.forEach((doc)=>{



    const data = doc.data();




    const date =

    convertDate(

        data.date

    );






    // IF DATE EXISTS AND MATCHES SELECTED MONTH


    if(

        date &&

        date.getMonth() === selectedMonth

    ){



        const amount =



        Number(data.firstYear || 0)

        +

        Number(data.secondYear || 0)

        +

        Number(data.thirdYear || 0)

        +

        Number(data.fourthYear || 0);






        totalCollection += amount;



    }



});









// =====================================================
// LOAD EXPENSES
// =====================================================



const expenseSnap =

await getDocs(

    collection(

        db,

        "expenses"

    )

);






expenseSnap.forEach((doc)=>{



    const data = doc.data();





    const date =

    convertDate(

        data.date

    );






    if(

        date &&

        date.getMonth() === selectedMonth

    ){





        const amount =

        Number(

            data.amount || 0

        );





        totalExpense += amount;







        expenseList.push({



            title:

            data.title || "No Title",




            category:

            data.category || "Others",




            amount:

            amount,




            date:

            formatDate(data.date),




            remarks:

            data.remarks || "No remarks"




        });




    }





});









// =====================================================
// SORT EXPENSES
// HIGHEST AMOUNT FIRST
// =====================================================



expenseList.sort(

    (a,b)=>{


        return b.amount - a.amount;


    }

);








console.log(

"Collections:",

totalCollection

);



console.log(

"Expenses:",

totalExpense

);







// DISPLAY DATA


displayExpenses(

    expenseList

);




displayTotals(

    totalCollection,

    totalExpense

);




displayReportInfo();



    }



    catch(error){



        console.error(

        "Report Loading Error:",

        error

        );




        const table =

        document.getElementById(

            "expenseReportList"

        );





        if(table){


            table.innerHTML = `

            <tr>

            <td colspan="5">

            ❌ Unable to load financial report.

            </td>


            </tr>


            `;


        }


    }



}









// =====================================================
// DATE FORMATTER
// =====================================================



function formatDate(value){



    const date =

    convertDate(value);





    if(!date){


        return "-";


    }





    return date.toLocaleDateString(

        "en-PH",

        {


            year:"numeric",


            month:"short",


            day:"numeric"


        }


    );



}

// =====================================================
// PART 3/4
// DISPLAY EXPENSES + DISPLAY TOTALS
// =====================================================






// =====================================================
// DISPLAY EXPENSE DETAILS
// COMPACT TABLE FORMAT
// =====================================================



function displayExpenses(list){



    const table =

    document.getElementById(

        "expenseReportList"

    );





    if(!table){

        return;

    }






    table.innerHTML = "";








    if(list.length === 0){



        table.innerHTML = `


        <tr>


            <td colspan="5" class="emptyData">


                No expense records found.


            </td>



        </tr>



        `;


        return;


    }









    list.forEach((expense)=>{



        table.innerHTML += `



        <tr>


            <td data-label="Expense">

                <strong>

                ${expense.title}

                </strong>


            </td>





            <td data-label="Category">


                <span class="expenseTag">

                ${expense.category}

                </span>


            </td>





            <td data-label="Amount">


                <strong class="amountText">


                ₱${expense.amount.toLocaleString()}


                </strong>


            </td>





            <td data-label="Date">


                ${expense.date}


            </td>





            <td data-label="Remarks">


                ${expense.remarks}


            </td>



        </tr>



        `;



    });



}











// =====================================================
// DISPLAY SUMMARY CARDS
// =====================================================



function displayTotals(

collection,

expense

){



    const balance =

    collection - expense;







    const collectionBox =

    document.getElementById(

        "reportCollection"

    );





    const expenseBox =

    document.getElementById(

        "reportExpense"

    );





    const balanceBox =

    document.getElementById(

        "reportBalance"

    );









    if(collectionBox){


        collectionBox.innerHTML =


        "₱" +

        collection.toLocaleString();



    }







    if(expenseBox){


        expenseBox.innerHTML =


        "₱" +

        expense.toLocaleString();



    }







    if(balanceBox){


        balanceBox.innerHTML =


        "₱" +

        balance.toLocaleString();



    }





}










// =====================================================
// REPORT HEADER INFORMATION
// =====================================================



function displayReportInfo(){



    const filter =

    document.getElementById(

        "monthFilter"

    );





    if(!filter){


        return;


    }





    const selectedMonth =


    filter.options[

        filter.selectedIndex

    ].text;








    const monthDisplay =

    document.getElementById(

        "reportMonth"

    );







    const dateDisplay =

    document.getElementById(

        "generatedDate"

    );







    if(monthDisplay){


        monthDisplay.innerHTML =


        "📅 Month: " +

        selectedMonth;



    }







    if(dateDisplay){


        dateDisplay.innerHTML =


        "Generated: " +

        new Date()

        .toLocaleDateString(

            "en-PH"

        );



    }




}

// =====================================================
// PART 4/4
// EVENTS + PRINT + AUTO START
// =====================================================






// =====================================================
// MONTH FILTER EVENT
// =====================================================



const monthFilter =

document.getElementById(

    "monthFilter"

);






if(monthFilter){



    monthFilter.addEventListener(

        "change",

        ()=>{


            loadReport();



        }

    );


}









// =====================================================
// PRINT REPORT BUTTON
// =====================================================



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









// =====================================================
// AUTO LOAD REPORT
// =====================================================



document.addEventListener(

"DOMContentLoaded",

()=>{



    loadReport();



}

);








console.log(

"✅ Reports System Ready"

);





// =====================================================
// END OF FINAL REPORTS.JS
// =====================================================
