import {createBrowserRouter,Navigate } from "react-router-dom";
import App from "./App"
import { ProductCard } from "./pages/Home/ProductCard/ProductCard";
import { ProductHistoryCard } from "./pages/History/ProductHistoryCard/ProductHistoryCard";

import {NotsoldwList} from "./pages/Notsoldwspecifictime/NotsoldwList";
import {SolditemList} from "./pages/Solditem/SoliditemList";
import {Createitem} from './pages/create_tems/Createitem';
import {Updateitem}from './pages/update items/Updateitem';
import{Specificitem}from'./pages/specific item/Specificitem';
import {ExpiredList} from './pages/Expired/ExpiredList';
import {Home} from './pages/Home_Seller/home'
import { Register } from "./pages/auth/register/register";
import { Login } from "./pages/auth/login/login";
import {AuthGuard} from "./guards/auth-guard";
import {Header } from "./shared/Header/Header";
import AdminRouter from './pages/admin-panel/components/AdminRouter';

export const router = createBrowserRouter([
  {
    path: "",
    element: <Navigate to="/register" replace />,
  },   
  {
        path: "/",
        element: <App/>,
        // Nesting routes
        children:[

          {   path:"",
        // Guard 
        element: <AuthGuard roles={[]} />,
        children: [
          {
            path: "/login",
            element: (
                  <>
                    <Login />
                  </>
                ),
          },
          {
            path: "/register",
            element: (
                  <>
                    <Register />
                  </>
                ),
          },
        ],
      },
          {
            element: <AuthGuard roles={["Bidder"]} />,
            children:[
              {
                path: "/bidder-home",
                element: <ProductCard />,
              },
              
              {
                path: "/history",
                element: <ProductHistoryCard />,
              },
            ],
          },
          {
            element: <AuthGuard roles={["Seller"]} />,
            children:[
          {
            path: "/seller-home",
            element: <Home />,
          },
          {
            path: "/Sold",
            element: <SolditemList />,
          },
          {
            // id is dynamic segment in url
            path: "/Create",
            element: <Createitem />,
          },
          {
            path: "/Update/:id",
            element: <Updateitem />,
          },
          {
            path: "/Specificitem/:id",
            element: <Specificitem />,
          },
          {
            path: "/Expired",
            element: <ExpiredList />,
          },
          {
            path: "/Item",
            element: <NotsoldwList />,
          },
        ],
      },
      {
        element: <AuthGuard roles={["Admin"]} />,
        children:[
          {
            path: "/admin-home/*",
            element: <AdminRouter/>,
          },
        ],
      },
    ],
  },
    {
        //wild card route
        path: "*",
        element: <div style={{color : 'red',textAlign : 'center',margin : '100px',font : '100px bold', border :'5px solid black',}}>Page doesn't exist</div>
    },
  ]);