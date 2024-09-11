import dotenv from 'dotenv';
dotenv.config();

import express from 'express';
import bodyParser from 'body-parser';
import todoRoutes from './routes/todoRoutes';
import cors from 'cors';
import { initializeDatabase } from './db'; // Import the initialization function

const app = express();
const port = process.env.PORT || 5000;

// Initialize the database
initializeDatabase().then(() => {
  console.log('Database initialization complete.');

  app.use(cors());
  app.use(bodyParser.json());
  app.use('/api', todoRoutes);

  app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
  });
}).catch(error => {
  console.error('Database initialization failed:', error);
  process.exit(1); // Exit process if database initialization fails
});
