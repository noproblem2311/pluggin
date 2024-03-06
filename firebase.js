// Import the functions you need from the SDKs you need
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
// Your web app's Firebase configuration

const firebaseConfig = {
  apiKey: "AIzaSyC8ZpYpRUHDgFXeCci6fxyJ45HhoIbNohc",
  authDomain: "dscount-extension-reactjs.firebaseapp.com",
  projectId: "dscount-extension-reactjs",
  storageBucket: "XXXXXXXXXXXXXXXXXX",
  messagingSenderId: "243170643867",
  appId: "XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
const provider = new GoogleAuthProvider();
provider.setCustomParameters({ prompt: "select_account" });

export default app;
