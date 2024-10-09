import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'

import {
  createBrowserRouter,
  RouterProvider,
} from 'react-router-dom';
import About from './pages/About/Blurb.jsx';
import Portfolio from './pages/Portfolio/Projects.jsx';
import Resume from './pages/Resume/CV.jsx';

const router = createBrowserRouter([
  {
    path: '/',
    element: <App/>,
    children: [
      {
        path: '/',
        element: <About/>,
      },
      {
        path: '/resume',
        element: <Resume/>,
      },
      {
        path: '/portfolio',
        element: <Portfolio/>,
      }
    ]
  },
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
)