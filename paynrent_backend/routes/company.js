var express = require('express')
var router = express.Router()
var pool = require('./pool')
var upload = require('./multer')
var fs = require('fs')

router.post('/fetch_all_company_by_subcategory', function (req, res, next) {
    
    pool.query("select * from company  where subcategoryid=?",
        [req.body.subcategoryid], function (error, result) {
            
            if (error) {
                
                res.status(500).json({ status: false, message: 'Server Error ...', result: [] })
            }
            else {
               
                res.status(200).json({ status: true, message: 'Company Sumbitted Successfully ...', result: result })
            }
        })
})





router.post('/companysubmit', upload.any(), function (req, res, next) {
          
    pool.query("insert into company(categoryid,subcategoryid,companyname,icon) values(?,?,?,?)",[req.body.categoryid,req.body.subcategoryid, req.body.companyname, req.files[0].filename], function (error, result) {
              
        if (error) {
            
            res.status(500).json({ status: false, message: 'Server Error ...' })

        }
        else {
            res.status(200).json({ status: true, message: 'Company Sumbitted Successfully ...' })
        }
    })

});

router.get('/display_all_company', function (req, res, next) {
    pool.query("select CO.*,(select C.categoryname from category C where C.categoryid=CO.categoryid) as categoryname,(select S.subcategoryname from subcategory S where S.subcategoryid=CO.subcategoryid) as subcategoryname from company CO", function (error, result) {
        if (error) {
            
            res.status(500).json({ status: false, message: 'Server Error ...' })

        }
        else {
           
            res.status(200).json({ status: true, data: result })
        }
    })

});

////  Image Update On Click Save Button  //////


router.post('/edit_picture', upload.any(), function (req, res, next) {
    pool.query("update company set icon=? where companyid=? ", [req.files[0].filename, req.body.companyid], function (error, result) {
         if (error)
                  {         
                       res.status(500).json({ status: false, message: 'Server Error ...',result:[] })
                  }
         else {
             
           //  fs.unlinkSync(`D:/paynrent_backend/public/images/${req.body.oldicon}`)
             //  To Remove Old Images & double dot denote parents folder
             res.status(200).json({ status: true, message: 'Icon Updated Successfully ...' ,result:result})
         }
     })
 
 });
 
////////    Update Data In Modal  ////////

router.post('/edit_data', function (req, res, next) {

       
    pool.query("update company set companyname=?,categoryid=?,subcategoryid=? where companyid=? ", [req.body.companyname,req.body.categoryid,req.body.subcategoryid,req.body.companyid], function (error, result) {
        if (error) {
               
            res.status(500).json({ status: false, message: 'Server Error ...' })

        }
        else
         {   
            res.status(200).json({ status: true, message: 'Record Updated Successfully ...' })
        }
    })

});

/////     Delete Data   /////////

router.post('/delete_data', function (req, res, next){
    pool.query("delete from company where companyid=?", [req.body.companyid], function (error, result) {
       if (error) 
{      
    res.status(500).json({ status: false, message: 'Server Error ...' })
}
else {
       // fs.unlinkSync(`D:/paynrent_backend/public/images/${req.body.oldicon}`)      //  To Remove Old Images & double dot denote parents folder
        res.status(200).json({ status: true, message: 'Company Deleted  Successfully ...' })
}
})

})


module.exports = router;