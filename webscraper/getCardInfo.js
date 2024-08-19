
import puppeteer from 'puppeteer';
import pg from 'pg';
import { nanoid } from 'nanoid'

//const puppeteer = require('puppeteer');
// const pg = require('pg');

// const { Client } = pg;

// const client = new Client({
//     host: "localhost",
//     user: "postgres",
//     port: 5432,
//     password: "",
//     database: "tcgwebsite"
//   })





const createUniqueId = () => {
  return nanoid(6)
}

const cardUniqueId = createUniqueId()

console.log(cardUniqueId)


const getCardId = (cardFullID)=>{
  const codeIdMatch = cardFullID.match(/\(([^)]+)\)/gm);
  const fullcardID = codeIdMatch[0].replace("(","").replace(")","")
  return fullcardID;
}

 const getCardName = (cardName)=>{
 const cardNameSplit= cardName.split('(')
 const cardNameOnly = cardNameSplit[0].trim()
 return cardNameOnly;
 }
 
 const getCardSet = (cardSet)=>{
  const cardSetMatch = cardSet.match(/\(.*\)(.*)-/);
  const cardSetOnly = cardSetMatch[1].trim();
  return cardSetOnly
}
 
function getCurrentDate() {
  const currentDate = new Date();
  const options = { year: 'numeric', month: 'numeric', day: 'numeric' };
  const formattedDate = currentDate.toLocaleDateString('en-US', options);
  return formattedDate;
}

const getCardInfo = async () => {
  const browser = await puppeteer.launch({
    headless: false,
    defaultViewport: null,
  });

  


  const page = await browser.newPage();

  await page.goto('https://www.cardmarket.com/en/OnePiece/Products/Singles/Wings-of-the-Captain/Nami-ST01-007', {
    waitUntil: 'domcontentloaded',
  });

  // Wait for the h1 element to be loaded
  const h1Element = await page.waitForSelector('h1');

  // Get the text content of the h1 element
  const h1Text = await page.evaluate(element => element.textContent, h1Element);
  
  const cardFullID = getCardId(h1Text)
  const cardName = getCardName(h1Text)
  const cardExpansion = getCardSet(h1Text)
  const cardEntryDate = getCurrentDate();
  console.log(h1Text)
  console.log(cardFullID)
  console.log(cardName)
  console.log(cardExpansion)
  console.log(cardEntryDate);


  
  // Get the text content inside the element with id="tabContent-info"
  const infoText = await page.evaluate(() => {
    const infoElement = document.getElementById('tabContent-info');
  return infoElement ? infoElement.textContent : 'Element not found';
  });

  const rarity = await page.evaluate(
    () => { const svgObj = document.querySelector('svg[data-bs-original-title]')
            const rarityObj = svgObj.dataset.bsOriginalTitle
            return rarityObj
    })

    console.log(infoText)
    console.log(rarity)


 
  const getCardPrice = (cardPrice) => {
    const cardPriceMatch = cardPrice.match(/1-day average price(\d+\,\d{2}) €/);
    const cardPriceOnly = cardPriceMatch[1].replace('.', '').replace(',', '');
    const numCardPrice = parseInt(cardPriceOnly);
    return numCardPrice;
  };

  // const getCardNum = (cardNum) => {
  //   const cardNumMatch = cardNum.match(/Number(\d+)Printed/);
  //   const cardNumOnly = cardNumMatch[1];
  //   return cardNumOnly;
  // };

  
  // const cardNum = getCardNum(infoText);
  const priceOfCard = getCardPrice(infoText);




   
 

  await browser.close();

  
  return { cardUniqueId, cardName, cardExpansion, cardFullID, priceOfCard, rarity, cardEntryDate };
  
};



// client.connect();

getCardInfo()
  .then(cardData => {
    console.log("ID:", cardData.cardUniqueId);
    console.log("Name:", cardData.cardName);
    console.log("Set:", cardData.cardExpansion);
    console.log("Card No.:", cardData.cardFullID);
    console.log("Price:", cardData.priceOfCard);
    console.log("Rarity:", cardData.rarity)
    console.log("Date of card price:", cardData.cardEntryDate);
    const query = `INSERT INTO card (ID, name, set, cardno, price, rarity, datecardprice) VALUES ($1, $2, $3, $4, $5, $6, $7)`;
    const values = [cardData.cardUniqueId, cardData.cardName, cardData.cardExpansion, cardData.cardFullID, cardData.priceOfCard, cardData.rarity, cardData.cardEntryDate];
    const url = `http://localhost:3000/api/add-card?ID=${cardData.cardUniqueId}&CardName=${cardData.cardName}&CardSet=${cardData.cardExpansion}&CardNum=${cardData.cardFullID}&Price=${cardData.priceOfCard}&Rarity=${cardData.rarity}&CardPriceDate=${cardData.cardEntryDate}`
    console.log(url)
    fetch(url)
    .then(response => response.json())
    .then(jsonData => console.log(jsonData))

    // client.query(query, values, (err) => {
    //   if (err) {
    //     console.error('Error inserting data:', err.message);
    //   } else {
    //     console.log('Card data inserted successfully!');
    //   }
    //   client.end(); // Close the connection after insertion
    // });
  })
  .catch(error => {
    console.error('Error fetching card data:', error.message);
    client.end(); // Close connection on errors too
  });

 
