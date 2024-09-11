// db.ts
import { Sequelize } from 'sequelize';
import * as dotenv from 'dotenv';
import { setupModels } from './models/todo'; // Adjust path if necessary

dotenv.config(); // Load environment variables

const sequelize = new Sequelize(
  process.env.DB_NAME!,
  process.env.DB_USER!,
  process.env.DB_PASSWORD!,
  {
    host: process.env.DB_HOST,
    dialect: 'postgres',
    port: parseInt(process.env.DB_PORT || '5432', 10),
  }
);

setupModels(sequelize); // Initialize models

async function initializeDatabase() {
  try {
    await sequelize.authenticate(); // Check connection
    console.log('Database connection established successfully.');

    await sequelize.sync({ force: true }); // Use 'force: false' in production
    console.log('Database & tables created!');
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }
}

export { initializeDatabase };
