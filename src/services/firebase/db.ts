import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore/lite';

const firebaseConfig = {
    apiKey: "AIzaSyChqok1n559CDWPzYFmkmiIc84gve19UCA",
    authDomain: "afex-videos.firebaseapp.com",
    projectId: "afex-videos",
    storageBucket: "afex-videos.appspot.com",
    messagingSenderId: "525593102469",
    appId: "1:525593102469:web:593afce3b3fbb25293c1ec"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export default db
