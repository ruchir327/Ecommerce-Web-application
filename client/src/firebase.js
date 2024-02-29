import * as firebase from "firebase";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyD8GaidJgAUodMgVSKnOBzqxj5TtfsSalo",
  authDomain: "fir-829ac.firebaseapp.com",
  projectId: "fir-829ac",
  storageBucket: "fir-829ac.appspot.com",
  messagingSenderId: "1079684216543",
  appId: "1:1079684216543:web:420900a29fac0fdf511b6a"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

// export
export const auth = firebase.auth();
export const googleAuthProvider = new firebase.auth.GoogleAuthProvider();
export const facebookAuthProvider = new firebase.auth.FacebookAuthProvider(); // Add this line
