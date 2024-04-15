import { makeStyles } from "@mui/styles";

export const useStyles=makeStyles({

subcontainer:{
    display:'flex',
    flexDirection:'row',
    
},
column:{
    width:600,
  
},
column1:{
    width:300,
    flexDirection:'row-reverse',
    
},
heading:{
fontFamily:'Roboto',
fontSize:26,
fontWeight:800,
color:'#474787',
marginTop:30,
marginLeft:60
},
fuel:{
    width:20,
    height:20
},
fuels:{
    marginTop:15,
    margin:5,
    marginLeft:60
},
fueltype:{
    fontFamily:'Roboto',
    fontSize:18,
    color:'rgba(89,89,105,.8)',
    paddingLeft:7
},
seater:{
    width:20,
    height:20,
    marginLeft:20
},
city:{
    fontFamily:'Roboto',
    fontSize:22,
    fontWeight:600,
    color:'rgba(89,89,105,.8)',
    paddingLeft:7,
   position:'relative',
   top:-4
},
cityicon:{
    marginTop:35,
    marginLeft:55
},
img:{
    marginLeft:60,
    marginTop:30
    
},
box:{
    width:570,
    height:500,
    background:'#FFFFF0',
    margin:30,
    borderRadius:8,
    boxShadow:'0 2px 6px 0 rgba(0,0,0,.1607843137254902)',
    marginLeft:100    
},
boxhead:{
    fontFamily:'Roboto',
    fontSize:24,
    fontWeight:500,
    color:'#474787',
    paddingTop:30,
    paddingLeft:30
},
month:{
    fontFamily:'Roboto',
    fontSize:24,
    fontWeight:700,
   
    paddingTop:30,
    paddingLeft:8
},
fee:{
    color:'rgba(27,28,36,.8)',
    fontFamily:'Poppin',
    fontSize:20,

    paddingLeft:30
},
tax:{
    color:'rgba(27,28,36,.8)',
    fontFamily:'Poppin',
    fontSize:16,
   paddingLeft:4,
  
},
fees:{
    marginTop:25,
    paddingRight:30
},
amt:{
    float:'right'
},
insurance:{
    color:'rgba(27,28,36,.8)',
    fontFamily:'Poppin',
    fontSize:20,
    paddingTop:25,
    paddingLeft:30
},
insur:{
    marginTop:12,
    paddingRight:30
},
divider:{
    
    marginTop:20,
    marginLeft:33
},
total:{
    color:'rgba(27,28,36,.8)',
    fontFamily:'Poppin',
    fontWeight:600,
    fontSize:22,
    paddingTop:25,
    paddingLeft:30
},
amount:{
    float:'right',
    fontWeight:600
},
process:{
    float:'right',
    paddingRight:30
},
final:{
    float:'right',
    paddingRight:30,
    fontWeight:700
},
button:{
    padding:40,
    paddingLeft:120,
    paddingRight:120,
    
},
buttons:{
   
    color:'#fff',
    fontSize:24,
    fontWeight:600
}

})