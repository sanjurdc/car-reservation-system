var express = require('express')
var router = express.Router()
var pool = require('./pool')
var upload = require('./multer')
var fs = require('fs')


router.post('/vehiclesubmit', upload.any(), function (req, res, next) {
   pool.query("insert into vehicle(categoryid, subcategoryid, companyid, modelid, registrationno, vendor, color, fueltypeid, average, capacityid, feature, remark,fare, stat, ratings, icon) values(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)",
    [req.body.categoryid,req.body.subcategoryid, req.body.companyid, req.body.modelid,  req.body.registrationno, req.body.vendor, req.body.color,req.body.fueltypeid,req.body.average,req.body.capacityid,req.body.feature,req.body.remark,req.body.fare,req.body.stat, req.body.ratings, req.files[0].filename], function (error, result) {
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

  pool.query("select V.*,(select C.categoryname from category C where C.categoryid=V.categoryid) as categoryname,(select S.subcategoryname from subcategory S where S.subcategoryid=V.subcategoryid) as subcategoryname,(select CO.companyname from company CO where CO.companyid=V.companyid) as companyname, (select M.modelname from model M where M.modelid=V.modelid) as modelname,(select F.fueltypename from fueltype F where F.fueltypeid=V.fueltypeid) as fueltypename,(select CA.capacityno from capacity CA where CA.capacityid=V.capacityid) as capacityno from vehicle V",function(error,result){
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

    //  HatchBack Vehicle  // 

    router.get('/display_all_hatchback_vehicle', function (req, res, next) {
      pool.query("select V.*,(select C.categoryname from category C where C.categoryid=V.categoryid) as categoryname,(select S.subcategoryname from subcategory S where S.subcategoryid=V.subcategoryid) as subcategoryname,(select CO.companyname from company CO where CO.companyid=V.companyid) as companyname, (select M.modelname from model M where M.modelid=V.modelid) as modelname,(select F.fueltypename from fueltype F where F.fueltypeid=V.fueltypeid) as fueltypename,(select CA.capacityno from capacity CA where CA.capacityid=V.capacityid) as capacityno from vehicle V where subcategoryid=8", function (error, result) {
          if (error) 
          {
               res.status(500).json({ status: false, message: 'Server Error ...' })
           }
          else {  console.log("a",result)
              res.status(200).json({ status: true, data: result })
          }
      })
  });

   //  Sedan Vehicle  // 

   router.get('/display_all_sedan_vehicle', function (req, res, next) {
    pool.query("select V.*,(select C.categoryname from category C where C.categoryid=V.categoryid) as categoryname,(select S.subcategoryname from subcategory S where S.subcategoryid=V.subcategoryid) as subcategoryname,(select CO.companyname from company CO where CO.companyid=V.companyid) as companyname, (select M.modelname from model M where M.modelid=V.modelid) as modelname,(select F.fueltypename from fueltype F where F.fueltypeid=V.fueltypeid) as fueltypename,(select CA.capacityno from capacity CA where CA.capacityid=V.capacityid) as capacityno from vehicle V where subcategoryid=9", function (error, result) {
        if (error) 
        {
             res.status(500).json({ status: false, message: 'Server Error ...' })
         }
        else {
            res.status(200).json({ status: true, data: result })
        }
    })
});

 //  HatchBack Vehicle  // 

 router.get('/display_all_suv_vehicle', function (req, res, next) {
  pool.query("select V.*,(select C.categoryname from category C where C.categoryid=V.categoryid) as categoryname,(select S.subcategoryname from subcategory S where S.subcategoryid=V.subcategoryid) as subcategoryname,(select CO.companyname from company CO where CO.companyid=V.companyid) as companyname, (select M.modelname from model M where M.modelid=V.modelid) as modelname,(select F.fueltypename from fueltype F where F.fueltypeid=V.fueltypeid) as fueltypename,(select CA.capacityno from capacity CA where CA.capacityid=V.capacityid) as capacityno from vehicle V where subcategoryid=10", function (error, result) {
      if (error) 
      {
           res.status(500).json({ status: false, message: 'Server Error ...' })
       }
      else {
          res.status(200).json({ status: true, data: result })
      }
  })
});


  

    

   ////////    Update Data In Modal  ////////

   router.post('/edit_data', function (req, res, next) {
   pool.query("update vehicle set registrationno=?,vendor=?,color=?,fueltypeid=?,average=?,capacityid=?,feature=?,remark=?,fare=?,stat=?,ratings=? where vehicleid=?",[req.body.registrationno,req.body.vendor,req.body.color,req.body.fueltypeid,req.body.average,req.body.capacityid,req.body.feature,req.body.remark,req.body.fare,req.body.stat,req.body.ratings,req.body.vehicleid],function (error,result){
    
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
    pool.query("update vehicle set icon=? where vehicleid=? ",[req.files[0].filename, req.body.vehicleid],function(error, result) {
         if(error)
                {       
                     res.status(500).json({status:false, message: 'Server Error ...', })
                     
                }
       else
        {      
           res.status(200).json({ status: true, message: 'Icon Updated Successfully ...' ,result:result})
         //  fs.unlinkSync(`D:/paynrent_backend/public/images/${req.body.oldicon}`) 
           //  To Remove Old Images & double dot denote parents folder
       }
   })

});

/////     Delete Data   /////////

router.post('/delete_data', function (req, res, next){
   pool.query("delete from vehicle where vehicleid=?", [req.body.vehicleid], function (error, result) {
if (error) 
{       
  res.status(500).json({ status: false, message: 'Server Error ...' })
}
else {
    //  fs.unlinkSync(`D:/paynrent_backend/public/images/${req.body.oldicon}`)      
      
      res.status(200).json({ status: true, message: 'Record Deleted  Successfully ...' })
}
})
})

router.get('/display_all_capacity', function (req, res, next) {
  pool.query("select * from capacity", function (error, result) {
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

router.get('/display_all_fueltype', function (req, res, next) {
  pool.query("select * from fueltype", function (error, result) {
       
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