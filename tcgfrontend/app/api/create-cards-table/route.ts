import { sql } from '@vercel/postgres';
import { NextResponse } from 'next/server';

 
export async function GET(request: Request) {
  try {
    const result =
      await sql`CREATE TABLE Cards ( ID varchar(50) PRIMARY KEY, cardName varchar(100), cardSet varchar(100), cardNum varchar(100), Price INT, Rarity varchar(50), cardPriceDate Date );`;
    return NextResponse.json({ result }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error }, { status: 500 });
  }
}