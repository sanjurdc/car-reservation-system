var express = require('express')
var router = express.Router()
var pool = require('./pool')
var upload = require('./multer')
var fs = require('fs')

router.post('/submitdata', upload.any(), function (req, res, next) {
 
    pool.query("insert into featured(link,image) values(?,?)", [req.body.link, req.files[0].filename], function (error, result) {
         
        if (error) {
           
            res.status(500).json({ status: false, message: 'Server Error ...' })

        }
        else {
            res.status(200).json({ status: true, message: 'Record Sumbitted Successfully ...' })
        }
    })

});

router.get('/display_all_featured', function (req, res, next) {
   
    pool.query("select * from featured ", function (error, result) {
        if (error) {
           
            res.status(500).json({ status: false, message: 'Server Error ...' })

        }
        else {
           
            res.status(200).json({ status: true, data: result })
        }
    })

});

module.exports = router;