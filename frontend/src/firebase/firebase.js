import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyA8UcXPnqqJ7ZH-qlyZOd6zMSQO1Jsryzg",
  authDomain: "eritomata-e5b36.firebaseapp.com",
  projectId: "eritomata-e5b36",
  storageBucket: "eritomata-e5b36.appspot.com",
  messagingSenderId: "498309070076",
  appId: "1:498309070076:web:02e30e219308c4012e6b79",
  measurementId: "G-2JZGBC480W"
};

export const app = initializeApp(firebaseConfig);
export const analytics = getAnalytics(app);