import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import "./App.css"; 
import App from "./App";
import Home from "./pages/Home";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import SearchCharacters from "./pages/SearchCharacters";
import BattleArena from "./pages/BattleArena"; 

import Profile from "./pages/UserProfile"; // Ensure the Profile component exists in the ./pages directory

import ErrorPage from "./pages/Error";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <ErrorPage />,
    children: [
      { index: true, element: <Home /> },
      { path: "login", element: <Login /> },
      { path: "signup", element: <Signup /> },
      { path: "search", element: <SearchCharacters /> },
      { path: "battle", element: <BattleArena /> },
      // { path: "profile", element: <Profile /> },
    ],
  },
]);

const rootElement = document.getElementById("root");
if (rootElement) {
  ReactDOM.createRoot(rootElement).render(
    <RouterProvider router={router} />
  );
}
