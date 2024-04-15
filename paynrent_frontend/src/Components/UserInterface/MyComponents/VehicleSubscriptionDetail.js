import React, { useState } from "react";
import { useStyles } from "./VehicleSubscriptionDetailCss";
import Footer from './Footer'
import Header from './Header'
import { Button, Divider, Grid } from "@mui/material";
import { useSelector } from "react-redux";
import { ServerURL } from "../../../Services/FetchNodeServices";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";


export default function VehicleSubscriptionDetail(props){

    const vehicle=useSelector(state=>state.subscription)
    const vehicleDetail=Object.values(vehicle)[0]

    const amount=vehicleDetail.fare 
    const dis=vehicleDetail.discount
    var net 
    const [call,setCall]=useState('Call us to know more')
    const [color1,setColor1]=useState(true)
    const [font1,setFont1]=useState(true)
    const [color2,setColor2]=useState(false)
    const [font2,setFont2]=useState(false)
    const [color3,setColor3]=useState(false)
    const [font3,setFont3]=useState(false)
    const [month,setMonth]=useState('1 month')
    const [fare,setFare]=useState(amount)
    const [discount,setDiscount]=useState(dis)
     
   

    const navigate=useNavigate()
    const dispatch=useDispatch()
    const classes=useStyles()
    
  
    
    
   
    

    const handleClick=()=>{
    setCall('Dial 7879202636 to get to us')
    }
    
    const handleProceed=()=>{
    dispatch({type:'ADD_MONTH',payload:{month:month,fare:fare,discount:discount}})
    navigate('/subscriptionvehicle')
    }

    const handleFirstMonth=()=>{
    setColor1(true)
    setFont1(true)
    setColor2(false)
    setFont2(false)
    setColor3(false)
    setFont3(false)
    amount=vehicleDetail.fare 
    setFare(amount)
    dis=amount*(106/100)
    setDiscount(dis)
    setMonth('1 month')
    }
    
    const handleSecondMonth=()=>{
    setColor1(false)
    setFont1(false)
    setColor2(true)
    setFont2(true)
    setColor3(false)
    setFont3(false)
    amount=parseInt(vehicleDetail.fare)+parseInt(2000)
    setFare(amount)
    net=(amount*6)/100
    dis=amount+net
    setDiscount(dis)
    setMonth('2 months')
    }

    const handleThirdMonth=()=>{
    setColor1(false)
    setFont1(false)
    setColor2(false)
    setFont2(false)
    setColor3(true)
    setFont3(true)
    amount=parseInt(vehicleDetail.fare)+parseInt(3500)
    setFare(amount)
    net=(amount*6)/100
    dis=amount+net
    setDiscount(dis)
    setMonth('3 months')
    }

    var months=["Jan", "Feb", "Mar", "Apr", "May", "Jun","Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
      
    var date=new Date()
     
    var  day= (date.getDate()+2)
    var days=(date.getDate()+4)
    var months=months[date.getMonth()]
     
    
    return(
        <div >
            <div style={{background:'#f2f2f2'}}>
                <Header />
                    <Divider />
                        </div>
                            <div className={classes.container}>
                                <div className={classes.box} >
                                    <div className={classes.head}>{vehicleDetail.companyname} {vehicleDetail.modelname}</div> 
                                        <div className={classes.subhead}>Subscription tenure</div>
                                            <Grid container spacing={2} className={classes.button1}>
                                                <Grid item xs={4} className={classes.button}>
                                                    <Button onClick={handleFirstMonth} variant="outlined" fullWidth style={{background:color1?"linear-gradient(270deg,#1caba2 25%,#1c7fab)":"",color:font1?"#fff":"#2d98da"}} >
                                                        <span className={classes.mon}>1 month</span>
                                                            </Button>
                                                        </Grid>
                                                    <Grid item xs={4} className={classes.button}>
                                                <Button onClick={handleSecondMonth} variant="outlined" fullWidth className={classes.button2} style={{background:color2?"linear-gradient(270deg,#1caba2 25%,#1c7fab)":"",color:font2?"#fff":"#2d98da"}}>
                                            <span className={classes.mon}>  2 months</span>
                                        </Button>
                                    </Grid>
                                <Grid item xs={4} className={classes.button}>
                            <Button onClick={handleThirdMonth} variant="outlined" fullWidth className={classes.button2} style={{background:color3?"linear-gradient(270deg,#1caba2 25%,#1c7fab)":"",color:font3?"#fff":"#2d98da"}}>
                        <span className={classes.mon}>  3 months </span> 
                    </Button>
                </Grid>
                     </Grid>
                        <div className={classes.rupees}>
                            <span className={classes.rupee}>₹ {fare}</span>
                                <span className={classes.month}>/month</span>
                                    <span className={classes.deduct}><s>₹ {discount}</s></span>
                                        <span className={classes.off}>(6% Off)</span>
                                            </div>
                                                <div className={classes.tax}>(Inclusive of taxes)</div>
                                                    <div className={classes.proceed}>
                                                        <Button onClick={()=>handleProceed()} variant="contained" fullWidth className={classes.proc}><h2>Proceed</h2></Button></div>
                                                            <div className={classes.place} >
                                                                <span className={classes.date}>Expected date of delivery</span>
                                                                    <span className={classes.delivery}>Place of delivery</span>
                                                                        </div>
                                                                            <div className={classes.place} >
                                                                        <span className={classes.dates}>Between {day}th - {days}th {months}</span>
                                                                    <span className={classes.doorstep}>At your doorstep</span>
                                                                </div>
                                                            <div className={classes.demand}>Due to high demand, delivery timelines may be impacted</div>
                                                        <div>
                                                    <span className={classes.green}>  <img src="/assets/greentick.png" className={classes.tick} /></span>
                                                <span className={classes.extend}>Extend anytime at normal prices</span>
                                            </div>
                                        <div>
                                    <span className={classes.green}>  <img src="/assets/greentick.png" className={classes.tick} /></span>
                                <span className={classes.extend}>Return anytime, Just pay fee difference</span>
                            </div>
                        <div className={classes.proceed}>
                    <Button variant="outlined" fullWidth onClick={handleClick} >
                <img src="/assets/Phone.png" className={classes.phone}/>
            <span className={classes.call}>{call}</span></Button>
        </div>
    </div>
</div>  
    <div style={{marginTop:30}}>
        <img src={`${ServerURL}/images/${vehicleDetail.icon}`} className={classes.img} />
            </div>
                <div style={{paddingTop:5}}>
                    <img src='/assets/fuel.png' className={classes.fuel} />
                        <img src="/assets/seater.png" className={classes.seat} />
                            <img src="/assets/transmission.png" className={classes.transmission} />
                                </div>
                                    <div >
                                        <span className={classes.fueltype}>{vehicleDetail.fueltypename}</span>
                                            <span className={classes.seater}>{vehicleDetail.capacityno}</span>
                                                <span className={classes.transmissiontype}>Manual</span>
                                                    </div>
                                                        <div className={classes.subcontainer}>
                                                            <div className={classes.heading}>Insurance and maintenance includes</div>
                                                                <div className={classes.subheading}>
                                                                    Comprehensive insurance policy</div>
                                                                        <img src="/assets/liability.png" className={classes.liability} />
                                                                            <img src="/assets/roads.png" className={classes.road} />
                                                                                <div className={classes.limited}>Limited liability
                                                                                    <span className={classes.roadside}>24X7 roadside assistance</span></div>
                                                                                <div className={classes.maintain}>Routine service and maintenance</div>
                                                                            <div>
                                                                        <img src="/assets/oil.png" className={classes.oil} />
                                                                    <img src="/assets/filter.png" className={classes.filter} />
                                                                <img src="/assets/tyre.png" className={classes.tyre} />
                                                            </div>
                                                        <div>
                                                    <span className={classes.replace}>Oil top-up or </span>
                                                <span className={classes.filters}>Filter </span>
                                            <span className={classes.topup}>Tyre </span>
                                        </div>
                                    <div>
                                <span className={classes.replacement1}>replacement</span> 
                            <span className={classes.replacement2}>replacement </span>
                        <span className={classes.rotation}>rotation </span>
                    </div>
                <div className={classes.wear}>
            Normal wear and tear
        </div>
    <div className={classes.cost}>Cost of excessive wear & tear or consequential damage, caused due to negligent or</div>
<div className={classes.covered}>
    inappropriate driving is not covered.
        </div>
            <div>
                <img src="/assets/tyre.png" className={classes.tyres} /> 
                    <img src="/assets/battery.png" className={classes.battery} />
                        <img src="/assets/clutch.png" className={classes.clutch} />
                            </div>
                                <div>
                                    <span className={classes.tyrehead}>Tyre </span>
                                        <span className={classes.batteries}>Battery </span>
                                            <span className={classes.clutches}>Clutch </span>
                                                </div>
                                                    <div>
                                                        <span className={classes.tyrehead}>replacement </span>
                                                            <span className={classes.batteryreplace}>replacement </span>
                                                                <span className={classes.parts}>Parts </span>
                                                                    </div>
                                                                        <div>
                                                                            <img src="/assets/break.png" className={classes.tyres} /> 
                                                                                <img src="/assets/suspension.png" className={classes.battery} />
                                                                            <img src="/assets/warrenty.png" className={classes.warrent} />
                                                                        </div>
                                                                    <div>
                                                                 <span className={classes.tyrehead}>Brake </span>
                                                            <span className={classes.suspension}>Suspension </span>
                                                        <span className={classes.manufacturer}>Manufacturer </span>
                                                    </div>
                                                <div>
                                            <span className={classes.tyrehead}>Parts </span>
                                        <span className={classes.suspens}>Parts </span>
                                    <span className={classes.warrenty}>Warrenty </span>
                                </div>
                            </div>
                        <div>
                    </div>
                <div>
            <Footer />
        </div>
    </div>
)}