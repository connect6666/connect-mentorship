import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";
import { getAuth, onAuthStateChanged, signOut } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";
import { getFirestore, doc, getDoc } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "AIzaSy...",
  authDomain: "connect-mentorship.firebaseapp.com",
  projectId: "connect-mentorship"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

const userArea = document.getElementById("userArea");

if (userArea) {
  userArea.style.display = "none";

  onAuthStateChanged(auth, async (user) => {
    if (user) {
      const snap = await getDoc(doc(db, "users", user.uid));
      const name = snap.exists() ? snap.data().name : "User";

      userArea.innerHTML = `
        <span style="color:white;">👤 ${name}</span>
        <button onclick="logout()" class="btn">Logout</button>
      `;
    } else {
      userArea.innerHTML = `
        <a href="login.html" class="btn">Login</a>
        <a href="signup.html" class="btn btn-outline">Signup</a>
      `;
    }

    userArea.style.display = "flex";
  });

  window.logout = async function() {
    await signOut(auth);
    window.location.href = "login.html";
  };
}
