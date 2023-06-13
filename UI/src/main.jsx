import React from 'react'
import ReactDOM from 'react-dom/client'
import {createBrowserRouter, RouterProvider} from "react-router-dom"
import App from './App'
import NotFound from './notFound'
import Dash from './pages/dash/Dash'
import { DashBoard } from './layout/Dashboard'
import './index.scss'
import { Info } from './pages/dash/Info'
import Protected from './Hooks/Protect'
import { retriveData } from './utils/localStorage'
const user = retriveData("userDr")
const router  = createBrowserRouter([
  {
    path: "/",
    element: <App/>,
    errorElement:<NotFound />,
    
  }, {
    path: "/auth/:id",
    element:<Protected isSignedIn={user}><DashBoard/></Protected>,
    errorElement: <NotFound/>,
    children:[
      {
        index:true,
        element: <Dash/>,
        
      },
      {
        path: "info",
        element: <Info/>
      },
    ]
    
  }
], {basename:"/D-fuse"})
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
)
