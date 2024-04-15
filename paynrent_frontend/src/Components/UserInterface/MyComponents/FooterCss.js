import { makeStyles } from "@mui/styles";

export const useStyles= makeStyles({

mainContainer:{
    display:'flex',
    justifyContent:'center',
    alignItems:'center',
    backgroundColor:'#fff'
},
subContainer:{
    display:'flex',
    justifyContent:'space-evenly',
    flexDirection:'row',
    paddingBottom:10
},
logoIcon:{
    width:100,
    paddingLeft:70,
    paddingTop:80
},
link:{
    fontSize:18,
    fontWeight:'bold',
    marginTop:50,
    marginLeft:30
},
linkIcon:{
    textDecoration:'none',
    color:'#596275'
},
social:{
    fontSize:20,
    fontWeight:'bold',
    marginTop:17,
    marginLeft:40
},
socialIcon:{
    fontSize:36,
    paddingLeft:10,
    padding:5
},
contact:{
    fontSize:24,
    fontWeight:800,
    fontFamily:'Poppin',
    paddingTop:40,
    paddingBottom:15
},
address:{
     padding:5
}

})