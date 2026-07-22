import { initializeApp }
from "https://www.gstatic.com/firebasejs/11.0.2/firebase-app.js";

import {
    getAuth,
    signInWithEmailAndPassword,
    signOut
}
from "https://www.gstatic.com/firebasejs/11.0.2/firebase-auth.js";

const firebaseConfig = {
    apiKey: "AIzaSyDx5TRi1YZZsK4JqlvCmuR_0U6H1d3Mr80",
    authDomain: "dalubwikaan--26-8e646.firebaseapp.com",
    projectId: "dalubwikaan--26-8e646",
    storageBucket: "dalubwikaan--26-8e646.firebasestorage.app",
    messagingSenderId: "409516392020",
    appId: "1:409516392020:web:87d462a5927449c69eb7c1"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

// PALITAN MO LANG ITO KUNG MAGBABAGO ADMIN EMAIL MO
const ADMIN_EMAIL = "admin@dalubwikaan.com";

window.loginAdmin = async function () {

    const email = document.getElementById("email").value.trim();
    const password = document.getElementById("password").value;

    const message = document.getElementById("message");
    message.innerHTML = "";

    try {

        const credential = await signInWithEmailAndPassword(
            auth,
            email,
            password
        );

        // CHECK KUNG IKAW TALAGA ANG ADMIN
        if (credential.user.email !== ADMIN_EMAIL) {

            await signOut(auth);

            message.innerHTML = "❌ You are not authorized to access the Admin Dashboard.";

            return;
        }

        alert("✅ Welcome Admin!");

        window.location.href = "admin.html";

    }
    catch (error) {

        console.log(error);

        message.innerHTML = "❌ Invalid email or password.";

    }

}
