import React from 'react' // Import the React library
import ReactDOM from 'react-dom/client' // Import the ReactDOM library for rendering React components
import App from './App.jsx' //  Import the main App component from the local file

// Import our global CSS (Tailwind directives live here)
import './styles/index.css'

/*
  This is the entry point for React.
  It grabs the #root div from index.html and mounts the App component into it.
  You rarely need to touch this file.
*/
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
)
