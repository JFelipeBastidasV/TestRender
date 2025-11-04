import pkg from 'pg';
const { Pool } = pkg;

const pool = new Pool({
    connectionString: process.env.DATABASE_URL
});

export const query = (text, params) =>{
    return pool.query(text, params);
}

const initializeDataBase = async () => {
    try {
        await query(`
            CREATE TABLE IF NOT EXISTS posts (
            id SERIAL PRIMARY KEY,
            content TEXT NOT NULL,
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
            updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        );`);
        console.log('database tables created or already exist');
    } catch (err){
        console.error('Error initializing database:', err);
    }
}

initializeDataBase();

export default pool;
