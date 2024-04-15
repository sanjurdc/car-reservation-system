import { makeStyles } from "@mui/styles";

export const useStyles= makeStyles({


mainContainer:{
    display:'flex',
    justifyContent:'center',
    alignItem:'center',
    
},
box :{
    background:'#FFF8DC',
    width:'90%',
    height:'100%',
   padding:20,
   margin:'2%',
   borderRadius:10,
   
},
center :{

    display:'flex',
    justifyContent:'center',
    alignItems:'center'

},

wrapper:{
position:'sticky',
borderRadius:20,
background:'#fff',
width:350,
height:100,
marginLeft:'10px'

},

heading:{
    marginTop:25,
    opacity:"0.4",
    fontWeight:'bold',
    fontSize:24,
    marginLeft:15
},
spanIcon:{
display:'inline-block',
position:'absolute',
top:'50%',
transform:'translateY(-50%)',
height:'300px',
width:'300px',
left:'20px'
},
icon:{
    width:'100%',
    height:'100%',
    objectFit:'contain',
    borderRadius:'20px'
},
cardHeading:{
    fontFamily:'Poppins',
    fontStretch:'normal',
    position:'relative',
    transform:'translateY(-50%)',
    fontSize:28,
    fontWeight:800,
    left:114,
    top:40
},
cardDesc:{
    fontFamily:'Poppins',
    fontStretch:'normal',
    position:'absolute',
    fontSize:18,
    fontWeight:400,
    left:114,
    bottom:5,
    right:5
},
"city:hover":{
background:'#fff'
}

})