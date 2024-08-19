import { sql } from '@vercel/postgres';



  export async function getCards() {
    const result = await sql`SELECT * FROM cards`;
    return result.rows;
  }

