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
    width:360,
    height:150,
    marginLeft:9,
    marginTop:-20
},

heading:{
    marginTop:10,
    opacity:"0.4",
    fontWeight:'bold',
    fontSize:24,
    marginLeft:20
},
spanIcon:{
display:'inline-block',
position:'absolute',
top:'50%',
transform:'translateY(-50%)',
height:'100px',
width:'70px',
left:'20px'
},
icon:{
    width:'100%',
    height:'100%',
    objectFit:'contain'
},
cardHeading:{
    
    fontStretch:'normal',
    position:'relative',
    fontSize:20,
    fontWeight:'bolder',
    left:114,
    top:30
},
cardDesc:{
    display:'flex',
    fontFamily:'Poppins',
    fontStretch:'normal',
    position:'absolute',
    fontSize:16,
    fontWeight:600,
    left:114,
    top:30,
    right:5,
    lineHeight:1.2
},


})