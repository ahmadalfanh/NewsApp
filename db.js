import Firebase from 'firebase';
//let agar bisa di gunakan di file ini
let firebaseConfig = {
    apiKey: "AIzaSyDlbxUG5AKRP_Bqm96xfdy8PfvUnWSWXP4",
    authDomain: "newsapp-f4n.firebaseapp.com",
    databaseURL: "https://newsapp-f4n.firebaseio.com",
    projectId: "newsapp-f4n",
    storageBucket: "newsapp-f4n.appspot.com",
    messagingSenderId: "1079143034534",
    appId: "1:1079143034534:web:e9a12e863b6feb13c7ce67",
    measurementId: "G-S7DHE724FV"
  };
  // Initialize Firebase
  // Firebase.analytics();
  export const app = Firebase.initializeApp(firebaseConfig);
  