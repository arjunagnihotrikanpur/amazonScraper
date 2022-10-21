require('dotenv').config();
// Reqeust Data
const axios = require('axios');
// Parse
const cheerio = require('cheerio');

const url = 'https://www.amazon.in/Boldfit-Basketball-Professional-Indoor-Outdoor-Women-Dunkmaster/dp/B0BJ93527C/ref=sr_1_1_sspa?crid=QOE2LCW587XC&keywords=basketball&qid=1666340900&qu=eyJxc2MiOiI1LjY2IiwicXNhIjoiNS41MiIsInFzcCI6IjQuNzQifQ%3D%3D&sprefix=basketball%2Caps%2C258&sr=8-1-spons&psc=1';
const product = {
    name: '',
    price: '',
    link: ''
}

let sendSms = () => {
    console.log('sample sms sent');
}

async function scrape() {
    // Fetch the data from the url using axios
    const { data } = await axios.get(url);
    
    

    const $ = cheerio.load(data);
    // Extract the data that we need

    const item = $('div#dp-container');

    product.name = $(item).find('h1 span#productTitle').text();
    product.link = url;
    const price = $(item).find('span .a-price-whole').first().text().replace(/[,.]/g, "");
    product.price = parseInt(price);
    console.log(product);
    sendSms(product);
}

scrape();