import app from 'firebase/app'
import 'firebase/firestore'
 
var firebaseConfig = {
    apiKey: "AIzaSyCuiS7GTeQ0FGsOu_6T1jBfi79GUA49pJc",
    authDomain: "crud-react-firebase-312614.firebaseapp.com",
    projectId: "crud-react-firebase-312614",
    storageBucket: "crud-react-firebase-312614.appspot.com",
    messagingSenderId: "148356775824",
    appId: "1:148356775824:web:4868505a8ebfc9482e7d15"
};
// Initialize Firebase
app.initializeApp(firebaseConfig);

export {app}