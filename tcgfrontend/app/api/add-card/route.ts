import { sql } from '@vercel/postgres';
import { NextResponse } from 'next/server';
 
export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const cardid = searchParams.get('cardID');
  const CardName = searchParams.get('CardName');
  const CardSet = searchParams.get('CardSet');
  const CardNum = searchParams.get('CardNum');
  const Price = searchParams.get('Price');
  const Rarity = searchParams.get('Rarity')
  const CardPriceDate = searchParams.get('CardPriceDate');
  console.log(cardid)
  console.log(CardName)
  console.log(CardSet)
  console.log(CardNum)
  console.log(Price)
  console.log(Rarity)
  console.log(CardPriceDate)
 
  try {
    if (!cardid || !CardName || !CardSet || !CardNum || !Price || !Rarity || !CardPriceDate) throw new Error('cardID, Name, Set, cardNo, Price, Rarity and Date of card price is required');
    await sql`INSERT INTO Cards (cardID, CardName, CardSet, CardNum, Price, Rarity, CardPriceDate) 
              VALUES (${cardid}, ${CardName}, ${CardSet}, ${CardNum}, ${Price}, ${Rarity}, ${CardPriceDate});`;
  } catch (error) {
    return NextResponse.json({ error }, { status: 500 });
  }
 
  const cards = await sql`SELECT * FROM Cards;`;
  return NextResponse.json({ cards }, { status: 200 });
}
