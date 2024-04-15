import { makeStyles } from "@mui/styles";


export const useStyles=makeStyles({

    container:{
        padding:5,
        marginLeft:30,
        paddingBottom:10
    },
    img:{
        width:320,
        height:120,
        background:'#f1f1f1',
        borderRadius:15
    },
   
    subContainer:{
        display:'flex',
        justifyContent:'space-between',
        flexDirection:'row',
        paddingBottom:10,
        paddingTop:20,
        marginTop:20,
        width:'100%'
    },
    heading:{
        fontWeight:"bold",
        fontSize:28,
        marginLeft:35,
        color:'#3dc1d3'
    }
})