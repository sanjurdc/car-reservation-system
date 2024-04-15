var express = require('express')
var router = express.Router()
var pool = require('./pool')
var upload = require('./multer')
var fs = require('fs')
const { Router } = require('express')
var jwt= require('jsonwebtoken')

const verifyJWT=(req,res,next)=>{
   
    const token=req.headers.authorization
    if(!token)
    {
        res.send('we need a token,please give it to us next time')
    }
    else
    {
        jwt.verify(token,"jwtSecret",(error,decode)=>{
            
            if(error)
            {
                res.json({auth:false,message:"you are to failed to authenicate"})
            }
            else
            {
                req.userId=decode.id
                next()
            }
        })
        }
         }

         router.get("/isUserAuth",verifyJWT,(req,res)=>{
            res.json({auth:true,message:"you are to failed to authenicate"})
         })

router.get('/display_all_category', function (req, res, next) {
    pool.query("select * from category", function (error, result) {
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

router.get('/display_all_subcategory', function (req, res, next) {
    pool.query("select * from subcategory", function (error, result) {
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

router.post('/fetch_all_subcategory_by_category', function (req, res, next) {
    pool.query("select * from subcategory where categoryid=?",
      [req.body.categoryid], function (error, result) {
          if (error)
           {
              res.status(500).json({ status: false, message: 'Server Error ...', result: [] })
          }
          else 
          {
              res.status(200).json({ status: true, message: 'Sub Category Sumbitted Successfully ...', data: result })
          }
      })
})

router.get('/display_all_city', function (req, res, next) {
    pool.query("select * from city", function (error, result) {
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

router.get('/display_all_company', function (req, res, next) {
    pool.query("select * from company", function (error, result) {
        if (error) 
        {
             res.status(500).json({ status: false, message: 'Server Error ...' })
         }
        else {
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


router.get('/display_all_segments',function(req,res,next){

    pool.query("select V.*,(select C.categoryname from category C where C.categoryid=V.categoryid) as categoryname,(select S.subcategoryname from subcategory S where S.subcategoryid=V.subcategoryid) as subcategoryname,(select CO.companyname from company CO where CO.companyid=V.companyid) as companyname, (select M.modelname from model M where M.modelid=V.modelid) as modelname,(select F.fueltypename from fueltype F where F.fueltypename=V.fueltype) as fueltypename,(select CA.capacityno from capacity CA where CA.capacityno=V.capacity) as capacityno,(select FT.fueltypeid from fueltype FT where FT.fueltypename=V.fueltype) as fueltypeid,(select CN.capacityid from capacity CN where CN.capacityno=V.capacity) as capacityid from vehicle V where V.categoryid in(select C.categoryid from category C where C.categoryid in (?))",[req.body.categoryid],function(error,result){
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

      router.get('/display_all_vehicle', function (req, res, next) {
        pool.query("select * from vehicle", function (error, result) {
            if (error) 
            {
                 res.status(500).json({ status: false, message: 'Server Error ...' })
             }
            else {
                res.status(200).json({ status: true, data: result })
            }
        })
    });
    
    router.post('/userdetailssubmit', function (req, res, next) {
        console.log(req.body)
        pool.query("insert into user(mobile,email,name,birth,address,aadhar,license ) values(?,?,?,?,?,?,?)",
         [req.body.mobile,req.body.email, req.body.name, req.body.birth,req.body.address,req.body.aadhar, req.body.license], function (error, result) {
            console.log(req.body.mobile)       
            if (error) 
                {   
                    res.status(500).json({ status: false, message: 'Server Error ...' })
               }
            else 
              {    console.log(result)
                res.status(200).json({ status: true, message: 'Record Sumbitted Successfully ...' })
                }
        })
      });

      router.post('/check_user', function (req, res, next) {
        
        pool.query("select * from user where mobile=?", [req.body.mobile], function (error, result) {
           
            if (error) 
    {
        res.status(500).json({ status: false, message: 'Server Error ...' })
    }
    else {
         if(result.length==1)
         {    
            const  token=jwt.sign({mobile:result[0].mobile},"jwtSecret",{
                expiresIn:'1h',
             })
           res.status(200).json({ status: true,data:result[0],token:token })
         }
         else
         {  
            res.status(200).json({ status:false,data:[] }) 
         }
    }
})

router.post('/edit_data', function (req, res, next) {
    console.log("aa",body)
    pool.query("update user set mobile=?,email=?,name=?,birth=?,address=?,aadhar=?,license=? where userid=?",
    [req.body.mobile,req.body.email,req.body.name,req.body.birth,req.body.address,req.body.aadhar,req.body.license,req.body.userid],
    function (error,result){
     
       if(error) 
        {   console.log("aa",error)
         res.status(500).json({ status: false, message: 'Server Error ...' })
         }
       else
        {   console.log("bb",result)
           res.status(200).json({ status: true, message: 'User Details Updated Successfully ...' })
       }
   })
 });

})
      
module.exports = router;