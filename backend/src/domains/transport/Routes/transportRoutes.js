const express = require('express');
const router = express.Router();


//GET
const {FilterTransport} = require('../controller/GET/FilterTransport.js')
const {GetTransportCount} = require('../controller/GET/GetTransportCount.js')


//GET
router.get('/filterTransport/:id', FilterTransport)
router.get('/GetTransportCount', GetTransportCount)


module.exports = router;