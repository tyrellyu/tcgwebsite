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

  await page.goto('https://www.cardmarket.com/en/OnePiece/Products/Singles/Special-Tournaments-Promos/MonkeyDLuffy-ST01-001', {
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

  function checkPrice(item) {
    return item === "€1-day";
  }

  const arr = infoText.split(" ");
  const oneDayAvgIndex = arr.findIndex(checkPrice);

  const formatPrice = arr[oneDayAvgIndex + 2].replace("price", "").replace(".", "").replace(",", ".");
  const numPrice = parseFloat(formatPrice) * 100;

  await browser.close();

  // Return both h1Text and numPrice as an object
  return { h1Text, numPrice };


};


client.connect();

getCardPrice()
  .then(cardData => {
    console.log("h1 Text:", cardData.h1Text);
    console.log("Price:", cardData.numPrice);
    const query = `INSERT INTO card (name, price) VALUES ($1, $2)`;
    const values = [cardData.h1Text, cardData.numPrice];

    client.query(query, values, (err) => {
      if (err) {
        console.error('Error inserting data:', err.message);
      } else {
        console.log('Card data inserted successfully!');
      }
      client.end(); // Close the connection after insertion
    });
  })
  .catch(error => {
    console.error('Error fetching card data:', error.message);
    client.end(); // Close connection on errors too
  });

  