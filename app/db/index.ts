import {Pool} from "pg";

const pool = new Pool({
  user: "user",
  password: "1234",
  host: "localhost",
  port: 5432,
  database: "jira_next",
});

export const initializeTables = async () => {
  await pool.query(`
    CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
    CREATE TABLE IF NOT EXISTS statuses (id SERIAL PRIMARY KEY, name VARCHAR(255), hidden BOOLEAN);
    CREATE TABLE IF NOT EXISTS epics (id SERIAL PRIMARY KEY, name VARCHAR(255));
    CREATE TABLE IF NOT EXISTS tickets (
        id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
        title VARCHAR(255),
        summary VARCHAR(255),
        status_id INTEGER REFERENCES statuses(id),
        epic_id INTEGER REFERENCES epics(id)
    );
  `);
};

export default pool;
