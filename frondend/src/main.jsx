import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { Provider } from 'react-redux';
import { store } from './store.js';
// import { NavbarProvider } from './layouts/navbar/NavbarContext'; // Adjust path as needed
// import Navbar from './layouts/navbar/Navbar';

createRoot(document.getElementById('root')).render(

  <StrictMode>
    <Provider store={store}>
        <App />
    </Provider>,
  </StrictMode>,
)
