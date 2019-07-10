import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

// Replace this with your own config details
const firebaseConfig = {
    apiKey: "AIzaSyBI_Eg0-_IpRUa2Hqqbute8c9y2EO2V0sQ",
    authDomain: "market-watch-12b90.firebaseapp.com",
    databaseURL: "https://market-watch-12b90.firebaseio.com",
    projectId: "market-watch-12b90",
    storageBucket: "",
    messagingSenderId: "951840883158",
    appId: "1:951840883158:web:f06a282ba51f1b4e"
};
firebase.initializeApp(firebaseConfig);



export default firebase 