import { makeStyles } from "@mui/styles";
import { fontWeight, width } from "@mui/system";
export const useStyles= makeStyles({

mainContainer:{
    display:'flex',
    justifyContent:'center',
    alignItem:'center',
   
},
dialogbox :{
   
    display:'flex',
    justifyContent:'center',
    alignItem:'center',
    background:'#ffeaa7',
    width:'100vw',
    height:'100vh'
},
box :{
    background:'#FFF8DC',
    width:'40%',
    height:'60%',
   padding:10,
   
   borderRadius:10,
   marginBottom:50
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