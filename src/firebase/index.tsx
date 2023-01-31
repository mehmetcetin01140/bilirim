import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyAl44HAt38IHuojWdEXSHaOSrgFT48vk8U",
  authDomain: "bilirim-dad06.firebaseapp.com",
  projectId: "bilirim-dad06",
  storageBucket: "bilirim-dad06.appspot.com",
  messagingSenderId: "45739727658",
  appId: "1:45739727658:web:b9bf74d96af1fce9cedc53",
};
const app = initializeApp(firebaseConfig);

const db = getFirestore();
export { db };
