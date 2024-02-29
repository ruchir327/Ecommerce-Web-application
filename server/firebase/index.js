import admin from "firebase-admin";

const serviceAccount = require("../config/firebase-key.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://fir-829ac.firebaseio.com",
});

export { admin };
