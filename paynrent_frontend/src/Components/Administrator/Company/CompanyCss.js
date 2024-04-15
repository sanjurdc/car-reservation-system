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
    width:'40%',
    height:'46%',
    padding:10,
    borderRadius:10,
 },
headingStyle:{
fontWidth:48 ,
fontWeight:'bold',
letterSpacing:1,
padding:3,
paddingTop:15
},
center:{
    display:'flex',
    justifyContent:'center',
    alignItem:'center'
},
leftCenter:{
    display:'flex',
    justifyContent:'left',
    alignItem:'center'
}
})