import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import { RouterProvider ,createBrowserRouter} from 'react-router-dom';
import Home from './pages/Home';
import ErrorPage from './pages/Errorpage';
import About from './pages/About';
const routes = createBrowserRouter([
  {
    path: "/", // caminho
    element: <Home/>,
    errorElement: <ErrorPage />,
  },
  {
    path: "/about",
    element: <About/>
  }, 
])

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<RouterProvider router={routes}/>)


// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
