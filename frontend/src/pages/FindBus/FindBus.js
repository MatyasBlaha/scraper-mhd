import {useState, useEffect} from 'react';
import axios from 'axios';

const FindBus = () => {

    const [transportNumbers, setTransportNumbers] = useState([])

    const [transportNumber, setTransportNumber] = useState([])
    const [transportType, setTransportType] = useState([])

useEffect( () => {
    try {
         axios.get('http://localhost:3003/api/transport/GetTransportCount')
            .then(res => {
                setTransportNumbers(res.data.map(transport_lines => transport_lines.line_number));
            })
    } catch (err) {
        console.log(err)
    }
}, [])

const handleTransportChange = async (e) => {
        try {
            const transportId = e.target.value
            await axios.get(`http://localhost:3003/api/transport/FilterTransport/${transportId}`)
                .then(res => {
                    setTransportNumber(res.data.map(transport_lines => transport_lines.line_number))
                    setTransportType(res.data.map(transport_lines => transport_lines.typ))
                })
        } catch (err) {
            console.log(err)
        }
}


    return (
        <div>
            <h2>find bus</h2>
            <form action="">
                <select name="findTransport" id="" onChange={handleTransportChange}>
                    <option value="">Select transport number</option>
                    {transportNumbers.map(number => (
                        <option value={number} key={number}>
                            {number}
                        </option>
                    ))}
                </select>
                <p>
                    {transportNumber.length > 0 ? `${transportType} ${transportNumber.join(', ')}` : 'No bus number selected'}
                </p>
            </form>
        </div>
    )
}

export default FindBus;