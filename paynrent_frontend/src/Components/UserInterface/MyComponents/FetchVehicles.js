import { Button } from "@material-ui/core";
import React, { useEffect, useState } from "react";
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import { ServerURL } from "../../../Services/FetchNodeServices";
import LoginDrawer from "./LoginDrawer";
import DetailsDrawer from "./DetailsDrawer";
import { useDispatch,useSelector } from "react-redux";
import { useStyles } from "./FetchVehiclesCss";
import { useNavigate } from "react-router-dom";

export default function FetchVehicles(props){

    const item = props.item
    
    const dispatch = useDispatch()
    const classes = useStyles()
    const navigate = useNavigate()
    

    const bookingDetails=useSelector(state=>state.booking)
    
    const [status,setStatus]=useState(false)
    const [open,setOpen] = useState(false)
    const [userinfo,setUserinfo]=useState(JSON.parse(localStorage.getItem("ADD USER")))
    
    var rent=parseInt(item.fare*(bookingDetails.days*24))+parseInt(item.fare*(bookingDetails.hrs))+parseInt(item.fare*15)
  
    item['rent']=rent

    const handleBooking=(item)=>{
    dispatch({type:'ADD_VEHICLE',payload:[item.vehicleid,item]})
    if(userinfo!=null)
    {
        setStatus(false)
        navigate('/booking')
    }
    else{
        setStatus(true)
        setOpen(true)
       
    }
  }

    const handleStatus=()=>{
    setStatus(false)
    }
    console.log(rent)
    return(
          
        <div className={classes.mainContainer}>
           <div className={classes.carIcon}>
              <img src={`${ServerURL}/images/${item.icon}`} style={{width:130,height:65}} />
                </div>
                    <div className={classes.header}>
                        <div className={classes.heading} >
                            {item.companyname}  {item.modelname}
                              </div>
                                 <div className={classes.icon}>
                                     <img src="/assets/fuel.png" style={{width:15,height:15}}/>
                                       <span className={classes.iconText}>{item.fueltypename}</span>
                                          <img src="/assets/transmission.png" className={classes.iconPic}/>
                                              <span className={classes.iconText}>Manual</span>
                                          <img src="/assets/seater.png" className={classes.iconPic}/>
                                        <span className={classes.iconText}>{item.capacityno}</span>
                                     </div>
                                  <div className={classes.rupee}>
                                <div><img src="/assets/rupee.png" className={classes.rupeeIcon}/>
                             <span className={classes.fare}>{rent}</span></div>
                          <div><Button variant="contained" onClick={()=>handleBooking(item)} className={classes.button}>Book<ArrowForwardIosIcon style={{fontSize:16,fontWeight:'bold',paddingLeft:10,marginTop:-3}} /></Button></div>
                        </div>
                    <div style={{fontSize:12,marginTop:10}} >130 kms | Prices <strong>exclude </strong> fuel cost</div>
                </div>
            < LoginDrawer status={status} handleStatus={handleStatus} open={open} />
        <DetailsDrawer />
    </div>
)}