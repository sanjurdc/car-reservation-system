var express = require('express')
var router = express.Router()
var pool = require('./pool')
var upload = require('./multer')
var fs = require('fs')

     router.post('/fetch_all_subcategory_by_category', function (req, res, next) {
      pool.query("select * from subcategory where categoryid=?",
        [req.body.categoryid], function (error, result) {
            if (error)
             {
                res.status(500).json({ status: false, message: 'Server Error ...', result: [] })
            }
            else 
            {
                res.status(200).json({ status: true, message: 'Sub Category Sumbitted Successfully ...', result: result })
            }
        })
})

router.post('/subcategorysumbit', upload.any(), function (req, res, next) {
 
    pool.query("insert into subcategory(categoryid,subcategoryname,priority,icon) values(?,?,?,?)", [req.body.categoryid, req.body.subcategoryname, req.body.priority, req.files[0].filename], function (error, result) {

        if (error) {
           
            res.status(500).json({ status: false, message: 'Server Error ...' })

        }
        else {
            res.status(200).json({ status: true, message: 'Sub Category Sumbitted Successfully ...' })
        }
    })

});

router.get('/display_all_subcategory', function (req, res, next) {
    pool.query("select S.*,(select C.categoryname from category C where C.categoryid=S.categoryid) as categoryname from subcategory S", function (error, result) {
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

router.post('/submit_order', function (req, res, next) {
 
    pool.query("insert into order(firstname,lastname,email,contactno,orderno,totalamt,description,discountamt,taxamt,unitprice,shippingprice,currency) values(?,?,?,?,?,?,?,?,?,?,?,?)", [ 
              console.log(req.body),
              req.body.firstname, 
              req.body.lastname, 
              req.body.email, 
              req.body.contactno, 
              req.body.orderno, 
              req.body.totalamt, 
              req.body.description, 
              req.body.discountamt, 
              req.body.taxamt, 
              req.body.unitprice, 
              req.body.shippingprice, 
              req.body.currency], function (error, result) {

        if (error) {
           console.log("Error :",error)
            res.status(500).json({ status: false, message: 'Server Error ...' })

        }
        else {
              console.log("Result :",result)
            res.status(200).json({ status: true, message: 'Sub Category Sumbitted Successfully ...' })
        }
    })

});



////  Image Update On Click Save Button  //////


router.post('/edit_picture', upload.any(), function (req, res, next) {
    pool.query("update subcategory set icon=? where subcategoryid=? ", [req.files[0].filename, req.body.subcategoryid], function (error, result) {
        
        if (error) {
            
            res.status(500).json({ status: false, message: 'Server Error ...', result: [] })
        }
        else 
        {
            fs.unlinkSync(`D:/paynrent_backend/public/images/${req.body.oldicon}`)
            //  To Remove Old Images & double dot denote parents folder
            res.status(200).json({ status: true, message: 'Icon Updated Successfully ...', result: result })
        }
    })

});



////////    Update Data In Modal  ////////

    router.post('/edit_data',function (req,res,next){
    pool.query("update subcategory set subcategoryname=?,priority=? where subcategoryid=?",[req.body.subcategoryname, req.body.priority, req.body.subcategoryid],function (error,result){
        
        if (error) 
        {          
            res.status(500).json({ status: false, message: 'Server Error ...' ,result:[]} )
        }
        else 
        {
           res.status(200).json({ status: true, message: 'Sub ategory Updated Successfully ...' ,result:result })
        }
    })
});


/////     Delete Data   /////////

router.post('/delete_data', function (req, res, next) {
    pool.query("delete from subcategory where subcategoryid=?", [req.body.subcategoryid], function (error, result) {
        if (error)
         {
           res.status(500).json({ status: false, message: 'Server Error ...' })
        }
        else 
        {
           // fs.unlinkSync(`D:/paynrent_backend/public/images/${req.body.oldicon}`)      //  To Remove Old Images & double dot denote parents folder
            res.status(200).json({ status: true, message: 'SubCategory Deleted  Successfully ...' })
        }
    })
})



module.exports = router;