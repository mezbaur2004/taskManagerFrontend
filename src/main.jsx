import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import 'bootstrap/dist/css/bootstrap.css'
import "./assets/css/animate.min.css"
import "./assets/css/style.css"
import App from './App.jsx'
import {Provider} from "react-redux";
import store from "./redux/store/store.js"

createRoot(document.getElementById('root')).render(
  <StrictMode>
      <Provider store={store}>
          <App />
      </Provider>
  </StrictMode>
)
