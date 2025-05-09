// Import the functions you need from the SDKs you need
import admin from "firebase-admin";

const initializeFirebaseApp = async () => {
  admin.initializeApp({
    credential: admin.credential.cert("/etc/secrets/firebase.json"), // Replace with your service account key
  });
};

export default initializeFirebaseApp;
