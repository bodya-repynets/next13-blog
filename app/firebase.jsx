import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyCz9mtxtrKy6roIQiv1624BHopTZg_DHUM",
  authDomain: "blog-7234e.firebaseapp.com",
  projectId: "blog-7234e",
  storageBucket: "blog-7234e.appspot.com",
  messagingSenderId: "500058630737",
  appId: "1:500058630737:web:9a76787791173e68e9a670",
};

const app = initializeApp(firebaseConfig);
export const provider = new GoogleAuthProvider();
export const auth = getAuth(app);
export const storage = getStorage(app);
export const db = getFirestore(app);
