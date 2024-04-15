import { makeStyles } from "@mui/styles";

export const useStyles= makeStyles({

mainContainer:{
    background:'#fff',
    borderRadius:20,
    marginTop:30,
},
subContainer:{
    display:'flex',
    flexDirection:'row',
},
box:{
   display:'flex',
   justifyContent:'center',
   flexDirection:'column',
   width:'100%',
   padding:20,
   marginLeft:50
},
heading:{
    color:'#aaa69d',
    fontFamily:'Roboto',
    fontWeight:'bold'
},
store:{
    display:'flex',
    justifyContent:'center',
    width:'100%'
},
storeIcon:{
    width:350,
    height:320,
    padding:30
},
playIcon:{
    width:400,
}    

})