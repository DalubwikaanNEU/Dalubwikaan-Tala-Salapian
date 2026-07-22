import { initializeApp }
from "https://www.gstatic.com/firebasejs/11.0.2/firebase-app.js";

import {
    getAuth,
    signInWithEmailAndPassword,
    signOut,
    setPersistence,
    browserSessionPersistence
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

// PALITAN ITO KUNG MAGBABAGO ANG ADMIN EMAIL
const ADMIN_EMAIL = "admin@dalubwikaan.neu.com";

window.loginAdmin = async function () {

    const email = document.getElementById("email").value.trim();
    const password = document.getElementById("password").value;
    const message = document.getElementById("message");

    message.innerHTML = "";

    try {

        // Huwag tandaan ang login pagkatapos ng session
        await setPersistence(auth, browserSessionPersistence);

        const credential = await signInWithEmailAndPassword(
            auth,
            email,
            password
        );

        if (credential.user.email !== ADMIN_EMAIL) {

            await signOut(auth);

            message.innerHTML =
                "❌ You are not authorized to access the Admin Dashboard.";

            return;
        }

        alert("✅ Maligayang pagdating, Admin!");

        window.location.replace("admin.html");

    } catch (error) {

        console.error(error);

        switch (error.code) {

            case "auth/invalid-credential":
            case "auth/wrong-password":
            case "auth/user-not-found":
            case "auth/invalid-email":
                message.innerHTML = "❌ Invalid email or password.";
                break;

            default:
                message.innerHTML = "❌ " + error.message;
        }

    }

};
