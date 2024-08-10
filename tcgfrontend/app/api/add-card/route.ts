import { sql } from '@vercel/postgres';
import { NextResponse } from 'next/server';
 
export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const CardID = searchParams.get('CardID');
  const CardName = searchParams.get('CardName');
  const Price = searchParams.get('Price');
 
  try {
    if (!CardID || !CardName || !Price) throw new Error('Card ID, name and Price is required');
    await sql`INSERT INTO Cards (CardID, CardName, Price) VALUES (${CardID}, ${CardName}, ${Price});`;
  } catch (error) {
    return NextResponse.json({ error }, { status: 500 });
  }
 
  const cards = await sql`SELECT * FROM Cards;`;
  return NextResponse.json({ cards }, { status: 200 });
}