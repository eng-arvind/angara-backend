import { Pool } from 'pg';

export const pool = new Pool({
    user: 'postgres',
    host: 'localhost',
    database: 'Demo',
    password: '12345',
    port: 5432,
});

export default pool;
