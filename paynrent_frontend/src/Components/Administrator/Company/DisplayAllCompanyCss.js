import { makeStyles } from "@mui/styles";
import { fontWeight, width } from "@mui/system";
export const useStyles= makeStyles({

    mainContainer:{
         
        display:'flex',
        justifyContent:'center',
        alignItem:'center'
            
        },
box :{
    marginBottom:'4%',
     width:'90%',
    height:'auto',
    padding:10,
    borderRadius:10,
},
dialogbox :{
    background:'#7FFFD4',
    width:'95%',
   padding:10,
   marginTop:'3%',
   borderRadius:10,
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
        justifyContent:'center',
        alignItem:'center'
    }
})