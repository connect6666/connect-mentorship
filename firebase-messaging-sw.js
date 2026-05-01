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
  console.log("Background message:", payload);

  const title = payload.notification?.title || "New message";
  const options = {
    body: payload.notification?.body || "You received a message",
    icon: "/connect-mentorship/icon.png",
    badge: "/connect-mentorship/icon.png",
    data: {
      url: payload.data?.url || "/connect-mentorship/my-chats.html"
    }
  };

  self.registration.showNotification(title, options);
});

self.addEventListener("notificationclick", (event) => {
  event.notification.close();

  const url = event.notification.data?.url;

  event.waitUntil(
    clients.matchAll({ type: "window", includeUncontrolled: true }).then((clientList) => {
      for (const client of clientList) {
        if (client.url.includes("/connect-mentorship/") && "focus" in client) {
          return client.focus();
        }
      }
      return clients.openWindow(url);
    })
  );
});
