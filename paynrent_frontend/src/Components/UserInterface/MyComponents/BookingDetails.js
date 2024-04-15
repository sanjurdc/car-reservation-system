import React from "react";
import { Button, Grid, TextField } from "@mui/material";
import Divider from '@mui/material/Divider';
import CurrencyRupeeIcon from '@mui/icons-material/CurrencyRupee';
import Cities from "./Cities";
import Footer from "./Footer"
import Header from "./Header"
import { useSelector } from "react-redux";
import { ServerURL } from "../../../Services/FetchNodeServices";
import { useNavigate } from "react-router-dom";
import { useStyles } from "./BookingDetailsCss";

export default function BookingDetails(){

  const classes = useStyles()
  const navigate = useNavigate() 

  const vehicle=useSelector(state=>state.vehicle)
  const vehicleDetails=Object.values(vehicle)[0]
   
  const bookingDetails=useSelector(state=>state.booking)
    console.log(bookingDetails)
  const start=Object.values(bookingDetails.starttime)[2]
  const startdate=start.toDateString()
  const starthrs=start.getHours()+":"+start.getMinutes()+":"+start.getSeconds()
  
  const end=Object.values(bookingDetails.endtime)[2]
  const enddate=end.toDateString()
  const endhrs=end.getHours()+":"+end.getMinutes()+":"+end.getSeconds();
  
  const fare=vehicleDetails.rent
  const delivery=400
  const deposite=5000
  const total=fare+delivery+deposite

  const handleSubmit=()=>{
  navigate('/rental')
  }

   return(
        <div className={classes.mainContainer}>
          <Grid container spacing={2}>
             <Grid item xs={12}>  <Header /> </Grid> 
                <Grid item xs={12} className={classes.box} > 
                 <Grid item xs={7} style={{display:'flex',flexDirection:'column'}}>
                 <Grid item xs={12} className={classes.firstBox} >
                 <Grid item className={classes.box} >
                           <Grid item xs={12}>
                             <div className={classes.heading} >
                                {vehicleDetails.companyname} {vehicleDetails.modelname}
                             </div>
                            <div className={classes.img} >
                               <img src={`${ServerURL}/images/${vehicleDetails.icon}`} style={{width:200,height:110}}></img>
                            </div>
                            <div className={classes.icon}>
                                <img src="/assets/fuel.png" style={{width:15,height:15}}/>
                                   <span className={classes.fuelIcon}>{vehicleDetails.fueltypename}</span>
                                      <img src="/assets/transmission.png" className={classes.transmissionIcon}/>
                                         <span className={classes.transmission}>Manual</span>
                                            <img src="/assets/seater.png" className={classes.seatIcon}/>
                                               <span className={classes.capacity}>
                                                  {vehicleDetails.capacityno}
                                               </span>
                                          </div>
                                    </Grid>
                               </Grid> 
                           <Grid>
                              <Grid item xs={12}>
                                  <div className={classes.divider}><Divider>BOOKING DETAILS</Divider></div>
                                      </Grid>
                                        <div className={classes.date}>
                                           <span> {startdate +" "+starthrs} </span>   
                                               <span className={classes.to}>To</span>
                                            <span> {enddate+ " " +endhrs} </span>
                                          </div>
                                        <div className={classes.duration}>
                                      <img src="/assets/clock.png" className={classes.clockImage} />
                                    <span> {bookingDetails.duration}</span>
                                 </div>
                              <div className={classes.city}> 
                           <span> City : </span>
                        <span className={classes.cityText}> {bookingDetails.cities} </span> 
                     </div>
                  <div className={classes.pricePlan}> Pricing Plan: Includes 306 kms, excludes fuel
               </div>
            </Grid>  
                 </Grid> 
                    <Grid item xs={12} style={{margin:5}}></Grid>
                      <Grid item xs={12} className={classes.thirdBox}>
                         <Grid item xs={12} className={classes.pointHeading}>
                            <Divider spacing={2}> IMPORTANT POINTS TO REMEMBER </Divider>
                              </Grid>
                                 <Grid item xs={12}>
                                    <div style={{display:'flex',justifyContent:'left',marginTop:5,paddingTop:5,paddingLeft:5}}>
                                        <table className={classes.table}>
                                            <tr className={classes.textFront}>
                                                <td >CHANGE IN PRICING PLAN:</td>
                                                    <td style={{width:'72%'}}>The pricing plan (6 kms/hr, without fuel) cannot be changed after the booking is made</td>
                                                         </tr> 
                                                            <tr className={classes.textFront}>
                                                         <td>FUEL:</td>
                                                      <td>In case you are returning the car at a lower fuel level than what was received, we will charge a flat Rs 500 refuelling service charge + actual fuel cost to get the tank to the same level as what was received</td>
                                                   </tr> 
                                                <tr className={classes.textFront}>
                                             <td>TOLLS, PARKING, INTER-STATE TAXES:</td>
                                          <td>To be paid by you.</td>
                                        </tr>  
                                      <tr className={classes.textFront}>
                                   <td>ID VERIFICATION:</td>
                                <td>Please keep your original Driving License handy. While delivering the car to you, our executive will verify your original Driving License and ID proof (same as the ones whose details were provided while making the booking). This verification is mandatory. In the unfortunate case where you cannot show these documents, we will not be able to handover the car to you, and it will be treated as a late cancellation (100% of the fare would be payable). Driving license printed on A4 sheet of paper (original or otherwise) will not be considered as a valid document.</td>
                              </tr>  
                            <tr className={classes.textFront}>
                        <td >PRE-HANDOVER INSPECTION:</td>
                    <td>Please inspect the car (including the fuel gauge and odometer) thoroughly before approving the checklist.</td>
                 </tr>
            </table>
        </div>
     </Grid>
   </Grid>
      </Grid>   
         <Grid item xs={0.1}></Grid>
               <Grid item xs={4.8} className={classes.secondBox}>
                   <Grid item xs={12} className={classes.fareHeading}>
                       <Divider>FARE DETAILS</Divider>
                           </Grid>
                             <Grid item xs={12} className={classes.fare}>
                               <div >Base fare</div>
                                  <div className={classes.currency}> 
                                     <span><CurrencyRupeeIcon style={{fontSize:13,marginTop:6}}/></span>
                                         <span>{fare}</span></div>
                                            </Grid>
                                              <Grid className={classes.pickup}>
                                                 <div>Doorstep delivery & pickup</div>
                                                     <div className={classes.currency}>
                                                        <span><CurrencyRupeeIcon style={{fontSize:13}}/></span> 
                                                            <span>{delivery}</span></div>
                                                               </Grid>
                                                            <Grid className={classes.pickup}>
                                                         <div>Insurance & GST</div>
                                                      <div className={classes.currency}>Included</div>
                                                   </Grid>
                                                <Grid className={classes.pickup}>
                                              <div>Refundable security deposit</div>
                                          <div className={classes.currency}>
                                       <span><CurrencyRupeeIcon style={{fontSize:13}}/></span>
                                    <span>{deposite}</span></div>
                                 </Grid>   
                              <Grid item xs={12} className={classes.promo}>
                           <Grid item xs={9}>
                        <TextField variant='standard' fullWidth label="Promo code" >Promo code</TextField>
                     </Grid>
                  <Grid item xs={3} style={{marginLeft:30,marginTop:13}}>
               <Button variant='contained' className={classes.buttonText}>Apply</Button>
            </Grid>
         </Grid> 
      <Divider style={{marginTop:50}} />   
         <Grid item xs={12}  className={classes.total} >
            <div>Total</div>
                 <div className={classes.currency}> 
                     <span><CurrencyRupeeIcon style={{fontSize:14}}/></span>
                          <span style={{fontFamily:'Poppin',fontSize:18,fontWeight:600}}>{total}
                             </span>
                               </div>
                                  </Grid>  
                                      <Divider style={{marginTop:20}} />
                                          <Grid className={classes.pickup}>
                                              <div style={{marginTop:30}}>Kms limit</div>
                                                   <div style={{marginTop:30}}>306 kms</div>
                                                     </Grid>
                                                   <Grid className={classes.pickup}>
                                                <div>Fuel</div>
                                             <div>Excluded</div>
                                          </Grid>
                                       <Grid className={classes.pickup}>
                                    <div style={{fontFamily:'Poppin'}}>Extra kms charge</div>
                                 <div>
                              <span><CurrencyRupeeIcon style={{fontSize:13}}/></span>
                           <span>11/km</span></div>
                        </Grid>  
                     <Grid className={classes.pickup}>
                  <div>Tolls, Parking & Inter-state taxes</div>
               <div>To be paid by you</div>
            </Grid> 
         <Grid item xs={11} className={classes.location}>
              <TextField variant='standard' label='Delivery location' fullWidth  />
                 </Grid>  
                   <Grid item xs={11} className={classes.location}>
                         <TextField variant='standard' label='Pick up location' fullWidth  />
                   </Grid>  
               <Grid item xs={12} className={classes.button}>
            <Button onClick={handleSubmit} variant="contained" className={classes.buttonText}>Proceed</Button>
         </Grid>       
      </Grid>    
   </Grid>
   <Grid item xs={12} >
          <Cities />
             </Grid >
                <Grid item xs={12}>
             <Footer />
          </Grid> 
      </Grid>
   </div>
)}