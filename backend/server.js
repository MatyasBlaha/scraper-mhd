const express = require('express');
const cors = require('cors');

const PORT = 3003;
const app = express();
app.use(express.json());
app.use(cors());

const transportRoutes = require('./src/domains/transport/Routes/transportRoutes.js')

app.use('/api/transport', transportRoutes)





app.listen(PORT, () => {
    console.log('listening on port: ' + PORT);
});