var express = require('express')
var router = express.Router()
var pool = require('./pool')
var upload = require('./multer')
var fs = require('fs')

router.post('/submitdata', upload.any(), function (req, res, next) {
               
    pool.query("insert into whypnr(title,description,image) values(?,?,?)", [req.body.title,req.body.description, req.files[0].filename], function (error, result) {
        
        if (error) 
        {
         console.log(error)
            res.status(500).json({ status: false, message: 'Server Error ...' })

        }
        else {
            res.status(200).json({ status: true, message: 'Record Sumbitted Successfully ...' })
        }
    })

});

router.get('/display_all_whypnr', function (req, res, next) {
    pool.query("select * from whypnr", function (error, result) {
        if (error) {
            
            res.status(500).json({ status: false, message: 'Server Error ...' })

        }
        else {
           
            res.status(200).json({ status: true, data: result })
        }
    })

});

router.post('/edit_picture', upload.any(), function (req, res, next) {

 
    pool.query("update whypnr set image=? where whypnrid=? ", [req.files[0].filename, req.body.whypnrid], function (error, result) {
       
        if (error) {
            
            res.status(500).json({ status: false, message: 'Server Error ...', result: [] })
        }
        else {
           
            fs.unlinkSync(`D:/paynrent_backend/public/images/${req.body.oldicon}`)
            //  To Remove Old Images & double dot denote parents folder
            res.status(200).json({ status: true, message: 'Record Updated Successfully ...', data: result })
        }
    })

});

router.post('/edit_data',function (req,res,next){
    pool.query("update whypnr set title=?,description=? where whypnrid=?",[req.body.title, req.body.description, req.body.whypnrid],function (error,result){
        
        if (error) 
        {          
            res.status(500).json({ status: false, message: 'Server Error ...' ,result:[]} )
        }
        else 
        {
           res.status(200).json({ status: true, message: 'Record Updated Successfully ...' ,data:result })
        }
    })
});

router.post('/delete_data', function (req, res, next) {
    pool.query("delete from whypnr where whypnrid=?", [req.body.whypnrid], function (error, result) {
       
        if (error) {
           
            res.status(500).json({ status: false, message: 'Server Error ...' })
        }
        else {
         
            fs.unlinkSync(`D:/paynrent_backend/public/images/${req.body.oldicon}`)      //  To Remove Old Images & double dot denote parents folder
            res.status(200).json({ status: true, message: 'Record Deleted  Successfully ...' })
        }
    })

})

module.exports = router;