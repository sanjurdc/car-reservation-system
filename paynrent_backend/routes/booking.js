var express = require('express')
var router = express.Router()
var pool = require('./pool')
var upload = require('./multer')
const { Router } = require('express')

router.get('/display_all_bookings', function (req, res, next) {
    pool.query("select * from bookings", function (error, result) {
        if (error) 
        {
             res.status(500).json({ status: false, message: 'Server Error ...' })
        }
        else 
        {
            res.status(200).json({ status: true, data: result })
        }
    })
});

module.exports = router;