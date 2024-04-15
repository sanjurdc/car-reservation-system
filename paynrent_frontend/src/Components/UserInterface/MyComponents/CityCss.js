import { makeStyles } from "@mui/styles";

export const useStyles= makeStyles({

mainContainer:{
    display:'flex',
},
subContainer:{
    position:'relative',
    width:'100%',
    paddingLeft:10,
    paddingRight:10,
    
},
cityText:{
    display:'inline',
    textAlign:'match-parent'
},
carText:{
    textDecoration:'#fff',
    color:'#218c74',
    
},
box:{
    background:'#2C3A47',
    width:'100%',
    height:'90%',
    borderRadius:10,
    paddingBottom:20
},
textHeading:{
    padding:15,
    paddingLeft:55,
    color:'#fff',
    fontSize:26,
    fontWeight:'bold'
}
})