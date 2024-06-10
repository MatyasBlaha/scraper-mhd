const db  = require('../../../../../database/database');

exports.FilterTransport = async (req, res) => {
    try {
        const q = 'SELECT * FROM transport_lines WHERE line_number = ?'
        const values = req.params.id;
        db.query(q, [values], (err, data) => {
            if(err) res.json(err)
            res.json(data)
            console.log(data)
        })
    } catch (err) {
        console.log(err)
    }
}