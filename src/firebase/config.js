import firebase from 'firebase/app'
import 'firebase/firestore'

const firebaseConfig = {
    apiKey: "AIzaSyBMG896gdcwlZyUVwrqp0iypgoal7relFM",
    authDomain: "cooking-ninja-7bf9f.firebaseapp.com",
    projectId: "cooking-ninja-7bf9f",
    storageBucket: "cooking-ninja-7bf9f.appspot.com",
    messagingSenderId: "254979164220",
    appId: "1:254979164220:web:2125948bdfc65e5a451b39"
  };

// init firebase
firebase.initializeApp(firebaseConfig)

// init services
const projectFirestore = firebase.firestore()

export { projectFirestore }
