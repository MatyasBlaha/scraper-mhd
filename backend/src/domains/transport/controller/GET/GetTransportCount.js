const db  = require('../../../../../database/database');

exports.GetTransportCount = async (req, res) => {
    try {
        const q = 'SELECT * FROM transport_lines'
        db.query(q, (err, data) => {
            if(err) console.log(err)
            return res.json(data)
        })
    } catch (err) {
        console.log(err)
    }
}