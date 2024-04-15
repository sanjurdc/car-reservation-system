var multer = require('multer')
const { uuid } = require('uuidv4');
var storage = multer.diskStorage({
   destination:(req,file,path)=>
   {
      path(null,'public/images')
 },
   filename:(req,file,path)=>{
     //  path(null,file.originalname)
     path(null,uuid()+file.originalname.substring(file.originalname.lastIndexOf('.')))  //  it used for unique id
   }
 })
var upload=multer({storage:storage})
module.exports=upload
