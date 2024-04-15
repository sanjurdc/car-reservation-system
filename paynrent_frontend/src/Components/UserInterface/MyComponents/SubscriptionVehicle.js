import { Divider } from "@material-ui/core";
import React, { useState } from "react";
import { useStyles } from "./SubscriptionVehicleCss";
import LocationOnOutlinedIcon from '@mui/icons-material/LocationOnOutlined';
import Button from '@mui/material/Button';
import Header from './Header'
import { useSelector,useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { ServerURL } from "../../../Services/FetchNodeServices";


export default function SubscriptionVehicle(){

   const classes=useStyles()
   const navigate=useNavigate()
   const dispatch=useDispatch()

   const vehicle=useSelector(state=>state.vehicle)
   const vehicleDetail=Object.values(vehicle)[0]
   const city=useSelector(state=>state.city)
   const month=useSelector(state=>state.month)
   
   const fare=month.fare
   const insurance=5100
   const total=parseInt(fare)+parseInt(insurance)
   const processing=1000
   const deposite=5000
   const netamount=parseInt(total)+parseInt(processing)+parseInt(deposite)

   
   const handleClick=()=>{
   dispatch({type:'ADD_AMOUNT',payload:{amount:netamount}})
   navigate('/subscriptionpayment')
   }
   
    return(
        <div>
            <div>
              <Header />
                </div>
                   <div className={classes.container}>
                      <div className={classes.subcontainer}>
                        <div className={classes.column}>
                          <div className={classes.heading}>{vehicleDetail.companyname} {vehicleDetail.modelname}</div>
                             <div className={classes.fuels}>
                                <img src="/assets/fuel.png" className={classes.fuel} />
                                  <span className={classes.fueltype}>{vehicleDetail.fueltypename}</span>
                                    <img src="/assets/seater.png" className={classes.seater} />
                                      <span className={classes.fueltype}>{vehicleDetail.capacityno}</span>
                                        <img src="/assets/transmission.png" className={classes.seater} />
                                          <span className={classes.fueltype}>Manual</span>
                                            </div>
                                              <div className={classes.cityicon}>
                                                <LocationOnOutlinedIcon />
                                                  <span className={classes.city}>{city.city}</span>
                                                    </div>
                                                      <div className={classes.img}>
                                                        <img src={`${ServerURL}/images/${vehicleDetail.icon}`} style={{width:550,height:360}}/>
                                                          </div>
                                                            </div>
                                                              <div className={classes.column1}>
                                                                <div className={classes.box}>
                                                                  <div className={classes.boxhead}>Subscription tenure :
                                                                    <span className={classes.month}>{month.month}</span></div>
                                                                      <div className={classes.fees}>
                                                                        <span className={classes.fee}>Monthly fee</span>
                                                                          <span className={classes.tax}>(inclusive of taxes) </span>
                                                                            <span className={classes.amt}>/month</span>
                                                                          <span className={classes.amt}>₹ {fare}</span>
                                                                        </div>
                                                                      <div className={classes.insur}>
                                                                    <span className={classes.insurance}>Insurance and maintenance fee</span>
                                                                  <span className={classes.amt}>/month</span>
                                                                <span className={classes.amt}>₹ {insurance}</span> 
                                                              <div className={classes.divider}>  <Divider /> </div>
                                                            </div>
                                                          <div className={classes.insur}>
                                                        <span className={classes.total}>Total monthly fee</span>
                                                      <span className={classes.amt}>/month</span>
                                                    <span className={classes.amount}>₹ {total}</span> 
                                                  </div>
                                                <div className={classes.insur}>
                                              <span className={classes.fee}>Processing Fee</span>
                                            <span className={classes.tax}>(One time) </span>
                                          <span className={classes.process}>₹ {processing}</span>
                                        </div>
                                      <div className={classes.insur}>
                                    <span className={classes.fee}>Refundable deposit</span>
                                  <span className={classes.tax}>(One time) </span>
                                <span className={classes.process}>₹ {deposite}</span>
                              <div className={classes.divider}>  <Divider /> </div>
                            </div>
                          <div className={classes.insur}>
                        <span className={classes.total}>Booking amount</span>
                      <span className={classes.final}>₹ {netamount}</span>
                    <div className={classes.divider}>  <Divider /> </div>
                  </div>
                <div className={classes.button}>
              <Button onClick={handleClick} variant="contained" fullWidth style={{background:'linear-gradient(270deg,#1caba2 25%,#1c7fba)'}} ><span className={classes.buttons}>Reserve </span></Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
)}