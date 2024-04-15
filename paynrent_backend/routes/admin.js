var express = require('express')
var router = express.Router()
var pool = require('./pool')
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
            {    console.log(error)
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
            res.json({auth:true,message:"Successfully Authenicate"})
         })


router.post('/adminlogin', function(req, res, next) {
    pool.query("select * from administrator where (emailid=? or mobileno=?) and password=?",[req.body.emailid,req.body.emailid,req.body.password],function(error,result){
        if (error)
        {   
            res.status(500).json({status:false,message:'Server Error'})
        }
        else
        {
            if(result.length==1)
            {  
               const  token=jwt.sign({emailid:result[0].emailid},"jwtSecret",{
                    expiresIn:'2h',
                 }) 
              res.status(200).json({status:true,admin:result[0],token:token}) 
            }
            else
            {  
                res.status(200).json({status:false,message:'Invalid Emailid/Mobileno or Password'})
            }
        }
    })
     });
  
     




  module.exports = router;
  