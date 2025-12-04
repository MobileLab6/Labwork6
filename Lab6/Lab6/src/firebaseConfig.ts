// src/firebaseConfig.ts
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "PAINA-TÄHÄN-OMASI",
  authDomain: "PAINA-TÄHÄN-OMASI",
  projectId: "PAINA-TÄHÄN-OMASI",
  storageBucket: "PAINA-TÄHÄN-OMASI",
  messagingSenderId: "PAINA-TÄHÄN-OMASI",
  appId: "PAINA-TÄHÄN-OMASI"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
