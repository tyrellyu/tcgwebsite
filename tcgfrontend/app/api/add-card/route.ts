import { sql } from '@vercel/postgres';
import { NextResponse } from 'next/server';
 
export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const id = searchParams.get('ID');
  const CardName = searchParams.get('CardName');
  const CardSet = searchParams.get('CardSet');
  const CardNum = searchParams.get('CardNum');
  const Price = searchParams.get('Price');
  const Rarity = searchParams.get('Rarity')
  const CardPriceDate = searchParams.get('CardPriceDate');
  console.log(id)
  console.log(CardName)
  console.log(CardSet)
  console.log(CardNum)
  console.log(Price)
  console.log(Rarity)
  console.log(CardPriceDate)
 
  try {
    if (!id || !CardName || !CardSet || !CardNum || !Price || !Rarity || !CardPriceDate) throw new Error('ID, Name, Set, cardNo, Price, Rarity and Date of card price is required');
    await sql`INSERT INTO Cards (ID, CardName, CardSet, CardNum, Price, Rarity, CardPriceDate) 
              VALUES (${id}, ${CardName}, ${CardSet}, ${CardNum}, ${Price}, ${Rarity}, ${CardPriceDate});`;
  } catch (error) {
    return NextResponse.json({ error }, { status: 500 });
  }
 
  const cards = await sql`SELECT * FROM Cards;`;
  return NextResponse.json({ cards }, { status: 200 });
}
