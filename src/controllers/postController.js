import { query } from "../db.js";

export const createPost = async (req, res) => {
    const { content } = req.body;

    try {
        const insertPostQuery = `
            INSERT INTO posts (content)
            VALUES ($1) RETURNING *
            RETURNING id, content, created_at`;

        const result = await query(insertPostQuery, [content]);
        res.json(result.rows[0]);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

export const getAllPosts = async (req, res) => {
    try {
        const selectPostsQuery = `
            SELECT id, content, created_at
            FROM posts
            ORDER BY created_at DESC`;

        const result = await query(selectPostsQuery);
        res.json(result.rows);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}