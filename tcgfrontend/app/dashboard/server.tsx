
import { sql } from "@vercel/postgres";


export const AllCards = async () => {
  const cards = await sql`SELECT * FROM cards`;
  const myJSON = JSON.stringify(cards);

  return (
    <div>
      {cards.rows?.map((card) => (
        <div key={card.cardnum}>
          {card.cardnum}
          {card.cardname}
          {card.cardset}
          {card.price}

        </div>
      ))}
    </div>
  );
};





