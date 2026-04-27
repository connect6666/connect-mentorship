import { initializeApp, getApps, getApp } 
from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";

import { 
  getAuth,
  onAuthStateChanged,
  signOut
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";

import { 
  getFirestore,
  doc,
  getDoc
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "AIzaSyAhzR39wQx_z5Kyu-EYUHvilDkOElD9XJg",
  authDomain: "connect-mentorship.firebaseapp.com",
  projectId: "connect-mentorship",
  storageBucket: "connect-mentorship.firebasestorage.app",
  messagingSenderId: "229549559214",
  appId: "1:229549559214:web:254671d221c2aaebc80c3f"
};

const app = getApps().length ? getApp() : initializeApp(firebaseConfig);

const auth = getAuth(app);
const db = getFirestore(app);

export { auth, db };

window.addEventListener("DOMContentLoaded", () => {
  const userArea = document.getElementById("userArea");
  if (!userArea) return;

  userArea.style.display = "none";

  onAuthStateChanged(auth, async (user) => {
    if (user) {
      let name = user.email || "User";

      try {
        const snap = await getDoc(doc(db, "users", user.uid));
        if (snap.exists()) {
          name = snap.data().name || name;
        }
      } catch (error) {
        console.error(error);
      }

      userArea.innerHTML = `
        <span style="color:white;">👤 ${name}</span>
        <a href="profile.html" class="btn btn-outline">Profile</a>
        <button id="logoutBtn" class="btn">Logout</button>
      `;

      document.getElementById("logoutBtn").addEventListener("click", async () => {
        await signOut(auth);
        window.location.href = "login.html";
      });

    } else {
      userArea.innerHTML = `
        <a href="login.html" class="btn">Login</a>
        <a href="signup.html" class="btn btn-outline">Signup</a>
      `;
    }

    userArea.style.display = "flex";
    userArea.style.gap = "10px";
    userArea.style.alignItems = "center";
  });
});
