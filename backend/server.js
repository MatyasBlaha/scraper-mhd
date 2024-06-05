import express from 'express';
import cors from 'cors';
import db from './database/database.js'

const PORT = 3003;
const app = express();
app.use(express.json());
app.use(cors());


app.get('/api/transport', (req, res) => {
    const q = 'SELECT * FROM transport_lines';
    db.query(q, (err, data) => {
        if(err) console.log(err);
        res.json(data);
    })
})

app.listen(PORT, () => {
    console.log('listening on port: ' + PORT);
});