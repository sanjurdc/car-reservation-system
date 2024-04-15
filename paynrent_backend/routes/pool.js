var mysql=require('mysql');
var pool=mysql.createConnection({

    host:'localhost',
    port:3306,
    database:'paynrent',
    user:'root',
    password:'1234',
    multiStatements:'true'

})
module.exports=pool