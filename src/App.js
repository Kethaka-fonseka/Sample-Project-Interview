import './App.css';
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import Register from './pages/Register';
import Login from './pages/Login';
import Home from './pages/Home';



function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Login/>,
    },
    {
      path: "signup",
      element: <Register/>,
    },{
      path: "home",
      element: <Home/>,
    }
  ]);
  return (
    <main>
       <RouterProvider router={router} />
    </main>
  );
}

export default App;
