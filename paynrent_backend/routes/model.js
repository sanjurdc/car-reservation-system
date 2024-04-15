var express = require('express')
var router = express.Router()
var pool = require('./pool')
var upload = require('./multer')
var fs = require('fs')

router.post('/fetch_all_model_by_company', function (req, res, next) {
    
       pool.query("select * from model  where companyid=?",
        [req.body.companyid], function (error, result) {
            
            if (error) {
                
                res.status(500).json({ status: false, message: 'Server Error ...', result: [] })
            }
            else {
                    
                res.status(200).json({ status: true, message: 'Model Sumbitted Successfully ...', result: result })
            }
        })
})





     router.post('/modelsubmit', upload.any(), function (req, res, next) {
     pool.query("insert into model(categoryid,subcategoryid,companyid,modelname,year, icon) values(?,?,?,?,?,?)",[req.body.categoryid,req.body.subcategoryid, req.body.companyid, req.body.modelname,req.body.year, req.files[0].filename], function (error, result) {
        if (error) {
           
            res.status(500).json({ status: false, message: 'Server Error ...' })
           }
        else 
          {
            res.status(200).json({ status: true, message: 'Company Sumbitted Successfully ...' })
            }
    })
  });

router.get('/display_all_model', function (req, res, next) {
    pool.query("select M.*,(select C.categoryname from category C where C.categoryid=M.categoryid) as categoryname,(select S.subcategoryname from subcategory S where S.subcategoryid=M.subcategoryid) as subcategoryname,(select CO.companyname from company CO where CO.companyid=M.companyid) as companyname from model M", function (error, result) {
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
 
    pool.query("update model set icon=? where modelid=? ",[req.files[0].filename, req.body.modelid],function(error, result) {
        
        if(error)
                  {       
                       res.status(500).json({status:false, message: 'Server Error ...', })
                       
                  }
         else
          {      
             res.status(200).json({ status: true, message: 'Icon Updated Successfully ...' ,result:result})
           //  fs.unlinkSync(`D:/paynrent_backend/public/images/${req.body.oldicon}`) //  To Remove Old Images & double dot denote parents folder
         }
     })
 
 });
 
////////    Update Data In Modal  ////////

router.post('/edit_data', function (req, res, next) {
 

    pool.query("update model set modelname=?,year=? where modelid=?",[req.body.modelname,req.body.year,req.body.modelid],function (error,result){
        if(error) 
        {
            res.status(500).json({ status: false, message: 'Server Error ...' })
         }
        else
         {   
            res.status(200).json({ status: true, message: 'Category Name Updated Successfully ...' })
        }
    })
});

/////     Delete Data   /////////

router.post('/delete_data', function (req, res, next){
   
    pool.query("delete from model where modelid=?", [req.body.modelid], function (error, result) {
        
        if (error) 
{        
    res.status(500).json({ status: false, message: 'Server Error ...'})
}
else 
{
     //   fs.unlinkSync(`D:/paynrent_backend/public/images/${req.body.oldicon}`)      //  To Remove Old Images & double dot denote parents folder
        res.status(200).json({ status: true, message: 'Model Deleted  Successfully ...' })
}
})

})


module.exports = router;