import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { initializeApp } from "firebase/app";
import { getStorage} from "firebase/storage";
import { firebaseConfig } from './helper/ConnectFireBase';
const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
const app = initializeApp(firebaseConfig);
export const storage = getStorage(app);

root.render(
    <App />
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();