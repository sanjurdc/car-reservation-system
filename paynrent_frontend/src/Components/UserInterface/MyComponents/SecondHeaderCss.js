import { makeStyles } from "@mui/styles";

export const useStyles= makeStyles({

mainContainer:{
    display:'flex',
    justifyContent:'right',
    paddingRight:10,
    marginTop:-43,
    paddingBottom:15
},
dialog:{
    width:200,
    height:300,
    borderRadius:50
},
topCity:{
    fontSize:18,
    fontWeight:'bold',
    marginTop:-10,
    color:'#dfe4ea',
    fontFamily:'sans-serif' 
},
topcityHeading:{
    fontSize:28,
    fontWeight:'bold'
},
otherCity:{
    fontSize:18,
    fontWeight:'bold',
    marginTop:10,
    padding:10,
    color:'#dfe4ea'
},

cityBox:{
    cursor:'pointer',
    display:'flex',
    flexDirection:'row'
},
city:{
     paddingLeft:15,
    fontSize:18,
    fontWeight:'bold'
},
button:{
    marginLeft:20,
    height:55,
    borderRadius:5,
},

})