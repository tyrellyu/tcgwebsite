import {getCards} from '../lib/data';






export default async function MyComponent() {
  const users = await getCards();
 console.log(users)
  return (
    <div>
        {JSON.stringify(users)}
      {/* {users.map((card) => (
       <div key={card.id}> <div>{card.cardname}</div>
        <div>{card.price}</div>
        <div>{card.cardnum}</div>
        <div>{card.rarity}</div>
        </div>
      ))} */}
    </div>
  );
}