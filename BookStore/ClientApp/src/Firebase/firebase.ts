import firebase from 'firebase/app'
import 'firebase/storage'
import 'firebase/analytics'

var firebaseConfig = {
    apiKey: "AIzaSyBzE8MfLHDkdnBEBhFwufm7PcemXP9Arjw",
    authDomain: "bookshop-9bea7.firebaseapp.com",
    projectId: "bookshop-9bea7",
    storageBucket: "bookshop-9bea7.appspot.com",
    messagingSenderId: "657395139025",
    appId: "1:657395139025:web:30724668f21afee46220f0",
    measurementId: "G-K8BXQFR1LH"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
firebase.analytics();

const storage = firebase.storage();

export {
    storage, firebase as default
}