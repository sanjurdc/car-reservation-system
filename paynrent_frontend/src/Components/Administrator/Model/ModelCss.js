import { makeStyles } from "@mui/styles";
import { fontWeight, width } from "@mui/system";
export const useStyles= makeStyles({

mainContainer:{
    display:'flex',
    justifyContent:'center',
    alignItem:'center',
    
},
box :{
    background:'#FFF8DC',
    width:'45%',
    height:'50%',
   padding:10,
   
   borderRadius:10,
   marginBottom:50
},
headingStyle:{
fontWidth:48 ,
fontWeight:'bold',
letterSpacing:1,
padding:10,
},
center:{
    display:'flex',
    justifyContent:'center',
    alignItem:'center'
},
leftcenter:{
    display:'flex',
    justifyContent:'left',
    alignItem:'center'
}
})