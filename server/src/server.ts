import express, { Request, Response } from 'express';
import path from 'node:path';
import db from './config/connection.js';
import { ApolloServer } from '@apollo/server'; // Apollo Server
import { expressMiddleware } from '@apollo/server/express4'; // Express 4 middleware
import { typeDefs, resolvers } from './schemas/index.js';
import { authenticateToken } from './utils/auth.js';
// import leaderboardRoutes from "./routes/leaderboardRoutes";

const server = new ApolloServer({
  typeDefs,
  resolvers,
});

const startApolloServer = async () => {
  // Start the Apollo server
  await server.start();

  // Connect to the database
  await db();

  const app = express();
  const PORT = process.env.PORT || 3001;

  // Middleware for parsing
  app.use(express.urlencoded({ extended: false }));
  app.use(express.json());

  // Apollo server as middleware
  app.use(
    '/graphql',
    expressMiddleware(server, {
      context: authenticateToken, // Token authentication middleware
    })
  );

  // Serve static files in production
  if (process.env.NODE_ENV === 'production') {
    app.use(express.static(path.join(process.cwd(), '../client/dist')));

    // Handle routing for React app in production
    app.get('*', (_req: Request, res: Response) => {
      res.sendFile(path.join(process.cwd(), '../client/dist/index.html'));
    });
  }

  // Start the server
  app.listen(PORT, () => {
    console.log(`API server running on port ${PORT}!`);
    console.log(`Use GraphQL at http://localhost:${PORT}/graphql`);
  });
};

// dotenv.config();
// connectDB();

// const app = express();
// const PORT = process.env.PORT || 5001;

// app.use(cors());
// app.use(express.json());
// app.use("/api/leaderboard", leaderboardRoutes);

// app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

startApolloServer();
