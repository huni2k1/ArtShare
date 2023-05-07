// Import necessary modules and components
import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { initializeApp } from "firebase/app";
import { getStorage} from "firebase/storage";
import { firebaseConfig } from './helper/ConnectFireBase';
// Create a root component for rendering the app
const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
// Initialize the Firebase app with the configuration details
const app = initializeApp(firebaseConfig);
// Get the storage instance from the initialized app
export const storage = getStorage(app);
// Render the app within the root component
root.render(
    <App />
);

// Measure the performance of the app and report it to the console or analytics endpoint
reportWebVitals();
