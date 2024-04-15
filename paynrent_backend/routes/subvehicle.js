var express = require('express')
var router = express.Router()
var pool = require('./pool')
var upload = require('./multer')
var fs = require('fs')


router.post('/vehiclesubmit', upload.any(), function (req, res, next) {
   pool.query("insert into subvehicle(categoryid, subcategoryid, companyid, modelid, registrationno, vendor, color, fueltypeid, average, capacityid, feature, remark,fare,discount, stat, ratings, icon) values(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)",
    [req.body.categoryid,req.body.subcategoryid, req.body.companyid, req.body.modelid,  req.body.registrationno, req.body.vendor, req.body.color,req.body.fueltypeid,req.body.average,req.body.capacityid,req.body.feature,req.body.remark,req.body.fare,req.body.discount,req.body.stat, req.body.ratings, req.files[0].filename], function (error, result) {
                if (error) 
           {   
               res.status(500).json({ status: false, message: 'Server Error ...' })
          }
       else 
         { 
           res.status(200).json({ status: true, message: 'Record Sumbitted Successfully ...' })
           }
   })
 });

   router.get('/display_all_vehicle',function(req,res,next){

  pool.query("select V.*,(select C.categoryname from category C where C.categoryid=V.categoryid) as categoryname,(select S.subcategoryname from subcategory S where S.subcategoryid=V.subcategoryid) as subcategoryname,(select CO.companyname from company CO where CO.companyid=V.companyid) as companyname, (select M.modelname from model M where M.modelid=V.modelid) as modelname,(select F.fueltypename from fueltype F where F.fueltypeid=V.fueltypeid) as fueltypename,(select CN.capacityno from capacity CN where CN.capacityid=V.capacityid) as capacityno from subvehicle V",function(error,result){
    if(error)
    {   
      res.status(500).json({status:false,message:'Server Error ...'})
    }
    else
    {  
      res.status(200).json({status:true,data:result})
    }
     })
    })

    

   ////////    Update Data In Modal  ////////

   router.post('/edit_data', function (req, res, next) {
   pool.query("update subvehicle set registrationno=?,vendor=?,color=?,fueltypeid=?,average=?,capacityid=?,feature=?,remark=?,stat=?,ratings=? where vehicleid=?",[req.body.registrationno,req.body.vendor,req.body.color,req.body.fueltypeid,req.body.average,req.body.capacityid,req.body.feature,req.body.remark,req.body.stat,req.body.ratings,req.body.vehicleid],function (error,result){
    
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

////  Image Update On Click Save Button  //////


     router.post('/edit_picture', upload.any(), function (req, res, next) {
    pool.query("update subvehicle set icon=? where vehicleid=? ",[req.files[0].filename, req.body.vehicleid],function(error, result) {
         if(error)
                {       
                     res.status(500).json({status:false, message: 'Server Error ...', })
                     
                }
       else
        {      
           res.status(200).json({ status: true, message: 'Icon Updated Successfully ...' ,result:result})
           fs.unlinkSync(`D:/paynrent_backend/public/images/${req.body.oldicon}`) 
           //  To Remove Old Images & double dot denote parents folder
       }
   })

});

/////     Delete Data   /////////

router.post('/delete_data', function (req, res, next){
   pool.query("delete from subvehicle where vehicleid=?", [req.body.vehicleid], function (error, result) {
if (error) 
{       
  res.status(500).json({ status: false, message: 'Server Error ...' })
}
else {
      fs.unlinkSync(`D:/paynrent_backend/public/images/${req.body.oldicon}`)      
      
      res.status(200).json({ status: true, message: 'Record Deleted  Successfully ...' })
}
})
})

router.get('/display_all_capacity', function (req, res, next) {
  pool.query("select * from capacity", function (error, result) {
      if (error)
       {    console.log("ss",error)
          res.status(500).json({ status: false, message: 'Server Error ...' })
       }
      else 
      {
          res.status(200).json({ status: true, data: result })
      }
  })
});

router.get('/display_all_fueltype', function (req, res, next) {
  pool.query("select * from fueltype", function (error, result) {
       
      if (error)
       {  console.log("ff",error)
          res.status(500).json({ status: false, message: 'Server Error ...' })
       }
      else 
      {            
          res.status(200).json({ status: true, data: result })
      }
  })
});



 module.exports = router;