import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import App from './App.jsx'
import './index.css'

// Take scroll-position restoration out of the browser's hands. Left on
// 'auto', Safari/Chrome try to replay a page's last scroll offset on
// back/forward and swipe-back navigation, which races the app's own
// scroll-to-top reset and can leave a new page landed mid-way down.
if (typeof window !== 'undefined' && 'scrollRestoration' in window.history) {
  window.history.scrollRestoration = 'manual'
}

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>
)
