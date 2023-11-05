// // Give the service worker access to Firebase Messaging.
// // Note that you can only use Firebase Messaging here. Other Firebase libraries
// // are not available in the service worker.
// // eslint-disable-next-line no-undef
// importScripts('https://www.gstatic.com/firebasejs/8.10.1/firebase-app.js');
// // eslint-disable-next-line no-undef
// importScripts('https://www.gstatic.com/firebasejs/8.10.1/firebase-messaging.js');

// // Initialize the Firebase app in the service worker by passing in
// // your app's Firebase config object.
// // https://firebase.google.com/docs/web/setup#config-object
// // eslint-disable-next-line no-undef
// firebase.initializeApp({
//     apiKey: "AIzaSyBKyLOWaOao_Pg0N2y4ij2kaFYTLaRPTrA",
//     authDomain: "cofee-flutter.firebaseapp.com",
//     projectId: "cofee-flutter",
//     storageBucket: "cofee-flutter.appspot.com",
//     messagingSenderId: "1067733042753",
//     appId: "1:1067733042753:web:b966f48a1d48c8263e28c0",
//     measurementId: "G-S2HJ448SBM"
//   });

// // Retrieve an instance of Firebase Messaging so that it can handle background
// // messages.
// // eslint-disable-next-line no-undef
// const messaging = firebase.messaging();

// messaging.onBackgroundMessage((payload) => {
//     console.log(
//       '[firebase-messaging-sw.js] Received background message ',
//       payload
//     );
//     // Customize notification here
//     const notificationTitle = payload.notification.title;
//     const notificationOptions = {
//       body: payload.notification.body,
//       icon: '/icon.png'
//     };
  
//     self.registration.showNotification(notificationTitle, notificationOptions);
//   });