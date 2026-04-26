import { initializeApp, getApps, getApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";
import { getAuth, onAuthStateChanged, signOut } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";
import { getFirestore, doc, getDoc } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";

/* 🔐 Firebase Config */
const firebaseConfig = {
  apiKey: "AIzaSy...",
  authDomain: "connect-mentorship.firebaseapp.com",
  projectId: "connect-mentorship"
};

/* ✅ Prevent duplicate Firebase error */
const app = getApps().length ? getApp() : initializeApp(firebaseConfig);

const auth = getAuth(app);
const db = getFirestore(app);

/* ✅ Wait for DOM */
window.addEventListener("DOMContentLoaded", () => {
  const userArea = document.getElementById("userArea");

  if (!userArea) return;

  // Hide initially (smooth UI)
  userArea.style.display = "none";

  onAuthStateChanged(auth, async (user) => {
    if (user) {
      try {
        const snap = await getDoc(doc(db, "users", user.uid));

        const name = snap.exists()
          ? snap.data().name
          : user.email || "User";

        userArea.innerHTML = `
          <span style="color:white; margin-right:10px;">👤 ${name}</span>
          <a href="profile.html" class="btn btn-outline">Profile</a>
          <button id="logoutBtn" class="btn">Logout</button>
        `;

        // Logout event
        document.getElementById("logoutBtn").onclick = async () => {
          await signOut(auth);
          window.location.reload();
        };

      } catch (error) {
        console.error("Firestore error:", error);

        userArea.innerHTML = `
          <span style="color:white;">👤 User</span>
          <button id="logoutBtn" class="btn">Logout</button>
        `;

        document.getElementById("logoutBtn").onclick = async () => {
          await signOut(auth);
          window.location.reload();
        };
      }

    } else {
      // Not logged in
      userArea.innerHTML = `
        <a href="login.html" class="btn">Login</a>
        <a href="signup.html" class="btn btn-outline">Signup</a>
      `;
    }

    // Show after load
    userArea.style.display = "flex";
    userArea.style.gap = "10px";
    userArea.style.alignItems = "center";
  });
});
