import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { Provider } from 'react-redux';
import { store } from './store.js';
import { CartProvider } from 'react-use-cart';


createRoot(document.getElementById('root')).render(

  <StrictMode>
    <CartProvider>
      <Provider store={store}>
        <App />
      </Provider>,
    </CartProvider>,
  </StrictMode>,
)
