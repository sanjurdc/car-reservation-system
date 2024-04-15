var express = require('express')
var router = express.Router()
var pool = require('./pool')
var upload = require('./multer')    // single dot denote current folder
var fs = require('fs')

router.post('/categorysumbit', upload.any(), function (req, res, next) {

    pool.query("insert into category(categoryname,icon) values(?,?)", [req.body.categoryname, req.files[0].filename], function (error, result) {
        if (error) 
        {
            console.log(error)
            res.status(500).json({ status: false, message: 'Server Error ...' })
          }
        else {
            res.status(200).json({ status: true, message: 'Category Sumbitted Successfully ...' })
        }
    })

});
////  Image Update On Click Save Button  //////


        router.post('/edit_picture', upload.any(), function (req, res, next) {
           
        pool.query("update category set icon=? where categoryid=? ", [req.files[0].filename, req.body.categoryid], function (error, result) {
                  if (error)
                 {
                      res.status(500).json({ status: false, message: 'Server Error ...' })
                 }
        else {
            
         //   fs.unlinkSync(`D:/paynrent_backend/public/images/${req.body.oldicon}`)
            //  To Remove Old Images & double dot denote parents folder
            res.status(200).json({ status: true, message: 'Icon Updated Successfully ...' })
        }
    })

});

////////    Update Data In Modal  ////////

router.post('/edit_data', function (req, res, next) {


    pool.query("update category set categoryname=? where categoryid=? ", [req.body.categoryname, req.body.categoryid], function (error, result) {
        if (error) {

            res.status(500).json({ status: false, message: 'Server Error ...' })

        }
        else
         {   
            res.status(200).json({ status: true, message: 'Category Name Updated Successfully ...' })
        }
    })

});


/////     Delete Data   /////////

router.post('/delete_data', function (req, res, next) {
            pool.query("delete from category where categoryid=?", [req.body.categoryid], function (error, result) {
        if (error) 
        {    console.log(error)
            res.status(500).json({ status: false, message: 'Server Error ...' })
        }
        else {
              console.log(result)
          //  fs.unlinkSync(`D:/paynrent_backend/public/images/${req.body.oldicon}`)      //  To Remove Old Images & double dot denote parents folder
            res.status(200).json({ status: true, message: 'Category Deleted  Successfully ...' })
        }
    })

})



router.get('/display_all_category', function (req, res, next) {
    pool.query("select * from category", function (error, result) {
        if (error) {
            
            res.status(500).json({ status: false, message: 'Server Error ...' })

        }
        else {
            
            res.status(200).json({ status: true, data: result })
        }
    })

});

module.exports = router;