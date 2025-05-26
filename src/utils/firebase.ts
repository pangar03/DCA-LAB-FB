// Import the functions you need from the SDKs you need
import firebase from "firebase/compat/app";
// Required for side-effects
import "firebase/firestore";
import { initializeApp } from "firebase/app";
import { getFirestore, query } from "firebase/firestore";
import { getAnalytics } from "firebase/analytics";
import { collection, addDoc, getDocs} from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "",
    authDomain: "",
    projectId: "",
    storageBucket: "",
    messagingSenderId: "",
    appId: "",
    measurementId: ""
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// Add a new Product
export const addSong = async (song: any) => {
	try {
		const where = collection(db, "songs");
        await addDoc(where, song);
        console.log("Se ha añadido una cancion con exito", song);
	} catch (e) {
		console.error('Error adding document: ', e);
	}
};

// Get all Songs
export const getSongs = async () => {
    const where = collection(db, "songs");
	const querySnapshot = await getDocs(where);
    console.log('querysnapshot', querySnapshot);
    

    const data: any[] = [];
    querySnapshot.forEach((doc) => {
        data.push(doc.data())
        console.log(doc.data());
    });

    console.log('data', data);
    

    return data;
};