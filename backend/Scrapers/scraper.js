const request = require('request-promise');
const cheerio = require('cheerio');
const mysql = require('mysql2');
const dotenv = require('dotenv');

dotenv.config();

const URL = process.env.URL;

const db =  mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME
});

const getData = async () => {
    try {

        const response = await request(URL);
        let $ = cheerio.load(response);

        let busElements = $('a.bus');
        let trolejElements = $('a.trolej');

        let numbersWithType = [];

        busElements.each((i, el) => {
            numbersWithType.push({
                number: $(el).text().trim(),
                type: 'bus'
            });
        });

        trolejElements.each((i, el) => {
            numbersWithType.push({
                number: $(el).text().trim(),
                type: 'trolej'
            });
        });

        // Remove duplicates based on number and type
        let uniqueNumbersWithType = Array.from(new Set(numbersWithType.map(JSON.stringify))).map(JSON.parse);

        const insertNumberWithDelay = async (data, delay) => {
            for (let i = 0; i < data.length; i++) {
                const {number, type} = data[i];
                const q = 'INSERT INTO transport_lines (line_number, type) VALUES(?, ?)';
                db.query(q, [number, type], (err, result) => {
                    if (err) {
                        console.error('Error inserting data:', err);
                    } else {
                        console.log(`Inserted number: ${number}, type: ${type}`);
                    }
                });
                await new Promise(resolve => setTimeout(resolve, delay));
            }
        };

        // Insert numbers with a delay of 1000 milliseconds (1 second)
        await insertNumberWithDelay(uniqueNumbersWithType, 5000);
    } catch (error) {
        console.error('Error fetching data:', error);
    }
}

getData();

