import { Pool } from "pg";

const pool = new Pool({
  user: "postgres",
  host: "localhost",
  database: "student-management",
  password: "3080",
  port: 5432,
});

export default pool;
