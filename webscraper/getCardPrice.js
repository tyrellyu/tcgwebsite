
const puppeteer = require('puppeteer');
const pg = require('pg');

const { Client } = pg;

const client = new Client({
    host: "localhost",
    user: "postgres",
    port: 5432,
    password: "",
    database: "tcgwebsite"
  })



const getCardPrice = async () => {
  const browser = await puppeteer.launch({
    headless: false,
    defaultViewport: null,
  });

  

  const page = await browser.newPage();

  await page.goto('https://www.cardmarket.com/en/OnePiece/Products/Singles/Romance-Dawn/Roronoa-Zoro-OP01-001-V2', {
    waitUntil: 'domcontentloaded',
  });

  // Wait for the h1 element to be loaded
  const h1Element = await page.waitForSelector('h1');

  // Get the text content of the h1 element
  const h1Text = await page.evaluate(element => element.textContent, h1Element);

  // Get the text content inside the element with id="tabContent-info"
  const infoText = await page.evaluate(() => {
    const infoElement = document.getElementById('tabContent-info');
    return infoElement ? infoElement.textContent : 'Element not found';
  });

  function checkPrice(cardPrice) {
    return cardPrice === "€1-day";
  }
  function checkCardID(cardID) {
    return cardID === "Number";
  }

  const arr = infoText.split(" ");
  const cardNum = arr.findIndex(checkCardID);
  const oneDayAvgIndex = arr.findIndex(checkPrice);
  
  const CardNumID = arr [cardNum + 1].replace("RarityNumber","").replace("00","").replace("Printed","");
  

  const formatPrice = arr[oneDayAvgIndex + 2].replace("price", "").replace(".", "").replace(",", ".");
  const numPrice = parseFloat(formatPrice) * 100;
  const formatCardID = parseInt(CardNumID)
  

  await browser.close();

  // Return both h1Text and numPrice as an object
  return { formatCardID, h1Text, numPrice };


};


// client.connect();

getCardPrice()
  .then(cardData => {
    console.log("Card ID:", cardData.formatCardID)
    console.log("Card Name:", cardData.h1Text);
    console.log("Price:", cardData.numPrice);
    const query = `INSERT INTO card (cardID, name, price) VALUES ($1, $2, $3)`;
    const values = [cardData.formatCardID, cardData.h1Text, cardData.numPrice];
    const url = `http://localhost:3000/api/add-card?CardID=${cardData.formatCardID}&CardName=${cardData.h1Text}&Price=${cardData.numPrice}`
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
    // client.end(); // Close connection on errors too
  });

 

  