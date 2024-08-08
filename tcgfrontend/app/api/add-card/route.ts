import { sql } from '@vercel/postgres';
import { NextResponse } from 'next/server';
 
export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const CardName = searchParams.get('CardName');
  const Price = searchParams.get('Price');
 
  try {
    if (!CardName || !Price) throw new Error('Card name and Price is required');
    await sql`INSERT INTO Cards (CardName, Price) VALUES (${CardName}, ${Price});`;
  } catch (error) {
    return NextResponse.json({ error }, { status: 500 });
  }
 
  const cards = await sql`SELECT * FROM Cards;`;
  return NextResponse.json({ cards }, { status: 200 });
}