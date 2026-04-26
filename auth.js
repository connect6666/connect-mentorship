import { initializeApp, getApps, getApp } 
from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";

import { 
  getAuth, 
  onAuthStateChanged, 
  signOut, 
  signInWithPopup, 
  GoogleAuthProvider 
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";

import { 
  getFirestore, 
  doc, 
  getDoc, 
  setDoc 
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";

/* 🔐 FULL Firebase Config */
const firebaseConfig = {
  apiKey: "AIzaSyAhzR39wQx_z5Kyu-EYUHvilDkOElD9XJg",
  authDomain: "connect-mentorship.firebaseapp.com",
  projectId: "connect-mentorship",
  storageBucket: "connect-mentorship.appspot.com",
  messagingSenderId: "229549559214",
  appId: "1:229549559214:web:254671d221c2aaebc80c3f"
};

/* ✅ Prevent duplicate init */
const app = getApps().length ? getApp() : initializeApp(firebaseConfig);

const auth = getAuth(app);
const db = getFirestore(app);

export { auth, db };

/* =========================
   🔥 GOOGLE LOGIN (POPUP)
========================= */
window.googleLogin = async function () {
  try {
    const provider = new GoogleAuthProvider();
    const result = await signInWithPopup(auth, provider);

    const user = result.user;

    // ✅ Save user in Firestore (first time)
    const userRef = doc(db, "users", user.uid);
    const snap = await getDoc(userRef);

    if (!snap.exists()) {
      await setDoc(userRef, {
        name: user.displayName || "User",
        email: user.email,
        phone: "",
        role: "user",
        verified: false,
        experience: 0,
        createdAt: new Date()
      });
    }

    // redirect
    window.location.href = "profile.html";

  } catch (error) {
    console.error(error);
    alert("Google login failed");
  }
};

/* =========================
   🔐 NAVBAR AUTH SYSTEM
========================= */
window.addEventListener("DOMContentLoaded", () => {

  const userArea = document.getElementById("userArea");
  if (!userArea) return;

  userArea.style.display = "none";

  onAuthStateChanged(auth, async (user) => {

    if (user) {
      try {
        const snap = await getDoc(doc(db, "users", user.uid));

        const name = snap.exists()
          ? snap.data().name
          : user.email || "User";

        userArea.innerHTML = `
          <span style="color:white;">👤 ${name}</span>
          <a href="profile.html" class="btn btn-outline">Profile</a>
          <button id="logoutBtn" class="btn">Logout</button>
        `;

        document.getElementById("logoutBtn").onclick = async () => {
          await signOut(auth);
          window.location.reload();
        };

      } catch (e) {
        console.error(e);
      }

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
