import firebase from 'firebase/app'
import 'firebase/firestore'
import 'firebase/auth'
const firebaseConfig = {
  apiKey: "AIzaSyCWerd76gG7BKuCPILmnz9AC7D0_ykyef8",
  authDomain: "whatsapp-7898f.firebaseapp.com",
  projectId: "whatsapp-7898f",
  storageBucket: "whatsapp-7898f.appspot.com",
  messagingSenderId: "132891649375",
  appId: "1:132891649375:web:035752c2b3a1854e10c2ea",
  measurementId: "G-YHP71ZPWQ1"
};

const fire = firebase.initializeApp(firebaseConfig)
export default fire;





