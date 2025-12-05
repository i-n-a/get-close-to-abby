import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import {
  createBrowserRouter,
  RouterProvider,
} from 'react-router';
import App, { loader as appLoader } from './routes/home.jsx';

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    loader: appLoader,
  },
]);

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
);



// import { StrictMode } from 'react'
// import { createRoot } from 'react-dom/client'
// import App from './routes/home.jsx'

// createRoot(document.getElementById('root')).render(
//   <StrictMode>
//     <App />
//   </StrictMode>,
// )


    