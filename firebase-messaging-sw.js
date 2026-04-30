importScripts("https://www.gstatic.com/firebasejs/10.12.2/firebase-app-compat.js");
importScripts("https://www.gstatic.com/firebasejs/10.12.2/firebase-messaging-compat.js");

firebase.initializeApp({
  apiKey: "AIzaSyAhzR39wQx_z5Kyu-EYUHvilDkOElD9XJg",
  authDomain: "connect-mentorship.firebaseapp.com",
  projectId: "connect-mentorship",
  storageBucket: "connect-mentorship.firebasestorage.app",
  messagingSenderId: "229549559214",
  appId: "1:229549559214:web:254671d221c2aaebc80c3f"
});

const messaging = firebase.messaging();

messaging.onBackgroundMessage((payload) => {
  self.registration.showNotification(payload.notification?.title || "New message on Connect", {
    body: payload.notification?.body || "You received a new message",
    icon: "/connect-mentorship/icon.png",
    data: payload.data || {}
  });
});
