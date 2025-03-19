import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  createHttpLink,
} from "@apollo/client";
import { setContext } from "@apollo/client/link/context";

import App from "./App";
import Home from "./pages/Home";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import SearchCharacters from "./pages/SearchCharacters";
import BattleArena from "./pages/BattleArena";
import UserProfile from "./pages/UserProfile";
import ErrorPage from "./pages/Error";
import { CharacterProvider } from "./context/CharacterContext";

// GraphQL API link
const httpLink = createHttpLink({
  uri: "/graphql",
});

// Middleware to attach auth token
const authLink = setContext((_, { headers }) => {
  const token = localStorage.getItem("id_token");
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : "",
    },
  };
});

// Initialize Apollo Client
const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});

// Router configuration
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
      { path: "profile", element: <UserProfile /> },
    ],
  },
]);

// Render the application
ReactDOM.createRoot(document.getElementById("root")!).render(
  <ApolloProvider client={client}>
    <CharacterProvider>
      <RouterProvider router={router} />
    </CharacterProvider>
  </ApolloProvider>
);


