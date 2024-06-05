const request = require('request-promise')
const cheerio = require('cheerio')

const URL = 'https://www.dpmp.cz/cestovani-mhd/vyhledat-spojeni.html?active-tab=timeTables'

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

                console.log(`Inserted number: ${number}, type: ${type}`);
                await new Promise(resolve => setTimeout(resolve, delay));
            }
        };

        // Insert numbers with a delay of 1000 milliseconds (1 second)
        insertNumberWithDelay(uniqueNumbersWithType, 1000);
    } catch (error) {
        console.error('Error fetching data:', error);
    }
}

getData();