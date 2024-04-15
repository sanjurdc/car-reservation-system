import { Paper } from "@mui/material";
import { useState } from "react";
import { ServerURL } from "../../../Services/FetchNodeServices";
import { useStyles } from "./VehicleSubscriptionCss";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import LoginDrawer from "./LoginDrawer";

export default function VehicleSubscription(props){

  const item=props.item
    
  const [status,setStatus]=useState(false)
  const [nav,setNav]=useState(false)
  const [userinfo,setUserinfo]=useState(JSON.parse(localStorage.getItem("ADD USER")))
  const dispatch=useDispatch()
  const classes=useStyles()
  const navigate=useNavigate()
   
  const handleClick=()=>{
  dispatch({type:'ADD_VEHICLE',payload:[item.vehicleid,item]})
  dispatch({type:'ADD_SUBSCRIPTION',payload:[props.item,item]})
  if(userinfo==null ||undefined)
  {
  setStatus(true)
  setNav(true)
  }
  else
  {   
  setStatus(false)
  navigate("/vehiclesubscriptiondetail")
  }}

  const handleStatus=()=>{
  setStatus(false)
   }

  return(
        <div className={classes.container}>
          <Paper evaluation={3} className={classes.Paper} onClick={()=>handleClick(item)}>
            <div style={{paddingLeft:25,cursor:'pointer'}}   >
              <img src={`${ServerURL}/images/${item.icon}`} style={{width:220,height:140}} />
                <span className={classes.heading}>{item.companyname} {item.modelname} </span>
                  <img src="/assets/fuel.png" className={classes.fuel} />
                    <span className={classes.subheading}>{item.fueltypename}</span>
                    <img src="/assets/seater.png" className={classes.seater} />
                  <span className={classes.seatheading}>{item.capacityno}</span>
                <img src="/assets/rupee.png" className={classes.rupee} />
              <span className={classes.rupees}>{item.fare}</span>
            <span className={classes.month}>/month</span>
          <span className={classes.rupees1}><s>₹ {parseInt(item.fare)+parseInt(item.discount)}</s></span>
        </div>
      </Paper>
    < LoginDrawer status={status} handleStatus={handleStatus} nav={nav}/>
  </div>
)}