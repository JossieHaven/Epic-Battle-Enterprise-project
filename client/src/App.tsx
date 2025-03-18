import './App.css';
import { Outlet, Route, Routes } from 'react-router-dom';
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  createHttpLink,
} from '@apollo/client';
import { setContext } from '@apollo/client/link/context';

import Navbar from '../src/components/NavBar';
import { CharacterProvider } from './context/CharacterContext';
import LoginPage from "./pages/Login";
import SignupPage from "./pages/Signup"; // Ensure the file exists at this path or update the path accordingly
// import { AuthProvider } from './context/AuthContext'; // Removed as it is unused
import UserProfile from './pages/UserProfile';

// Construct our main GraphQL API endpoint
const httpLink = createHttpLink({
  uri: '/graphql',
});

// Construct request middleware that will attach the JWT token to every request as an `authorization` header
const authLink = setContext((_, { headers }) => {
  // get the authentication token from local storage if it exists
  const token = localStorage.getItem('id_token');
  // return the headers to the context so httpLink can read them
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : '',
    },
  };
});

const client = new ApolloClient({
  // Set up our client to execute the `authLink` middleware prior to making the request to our GraphQL API
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});

function App() {
  return (
    <ApolloProvider client={client}>
      <CharacterProvider> {/* ✅ Wrap CharacterProvider to ensure context is available */}
        <Navbar />
        <Outlet />
        <Routes>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignupPage />} />
          <Route path="/profile" element={<UserProfile />} />
        </Routes>
      </CharacterProvider>
    </ApolloProvider>
  );
}

export default App;
