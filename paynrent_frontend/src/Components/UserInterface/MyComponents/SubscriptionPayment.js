import React, { useState } from "react";
import { useStyles } from "./SubscriptionPaymentCss";
import { useSelector } from "react-redux";
import LocationOnOutlinedIcon from '@mui/icons-material/LocationOnOutlined';
import Radio from '@mui/material/Radio';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { TextField } from "@mui/material";
import CalendarMonthOutlinedIcon from '@mui/icons-material/CalendarMonthOutlined';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import { MobileDateTimePicker } from '@mui/x-date-pickers/MobileDateTimePicker';
import Map from "./Map";
import Header from "./Header";
import { ServerURL } from "../../../Services/FetchNodeServices";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";


export default function SubscriptionPayment(props){

 

  

    var classes=useStyles()
    var navigate=useNavigate()
    var dispatch=useDispatch()

    var vehicle=useSelector(state=>state.subscription)
   var vehicleDetail=Object.values(vehicle)[0] 
   var city=useSelector(state=>state.city)
   var month=useSelector(state=>state.month)
   var amount=useSelector(state=>state.amount) 

   var netamount=amount.amount
   
   var advance=2000
   var dueamount=netamount-advance

   const [total, setTotal] = useState(netamount);
   
    const [location, setLocation] = React.useState('');
    const [open, setOpen] = React.useState(false);
    
    const [date,setDate]=useState('')

   

    const handlePayment=()=>{
    dispatch({type:'ADD_NETAMOUNT',payload:{total:total}})
    navigate('/paymentgateway')
    }

    const handleChange = (event) => {
    setLocation(event.target.value);
    };

    const handleClickOpen = () => {
    setOpen(true);
    };

    const handleClickClose = () => {
    setOpen(false);
    }

    const showDialogLocation=()=>{
      return(
          <div style={{display:'flex',justifyContent:'center',alignItems:'center', width:'100%'}}>
              <div style={{width:600,height:600}} >
                 <Dialog
                    open={open}
                    keepMounted
                    contentStyle={{
                    width: '80%',
                    maxWidth: 'none',
                    }}
                    onClose={handleClickClose}
                    aria-describedby="alert-dialog-slide-description"
                  >
                    <DialogContent>
                       <Map />
                    </DialogContent>
                  <DialogActions>
                <Button onClick={handleClickClose}>Close</Button>
              </DialogActions>
            </Dialog>
          </div>
      </div>
    )}

   const handleSetDate=(newValue)=>{
   setDate(newValue)
   }

   const handleChangeDialog = (event) => {
   setTotal(event.target.value);
   };

    
    return(
      <div>
        <div >
          <Header />
          </div>
            <div className={classes.container}>
                <div className={classes.column}>
                  <div className={classes.heading}>
                     {vehicleDetail.companyname} {vehicleDetail.modelname} 
                       </div>
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
                                                               <img src={`${ServerURL}/images/${vehicleDetail.icon}`} style={{width:550,height:360}} />
                                                                  </div>
                                                                    </div>
                                                                      <div>
                                                                        <div className={classes.head}>
                                                                           Thank you for reserving the {vehicleDetail.categoryname}! Please select the payment plan.
                                                                        </div>
                                                                      <div className={classes.box}>
                                                                    <div className={classes.radio}>
                                                                  <Radio
                                                                     checked={total == netamount}
                                                                     onChange={handleChangeDialog}
                                                                     value={netamount}
                                                                     name="radio-buttons"
                                                                     inputProps={{ 'aria-label': 'Fast' }}
                                                                  />
                                                                <span className={classes.fast}>Fast</span>
                                                              </div>
                                                            <div className={classes.booking}>
                                                          <span className={classes.pay}>Pay</span>
                                                        <span className={classes.bookamt}> ₹ {netamount} </span>
                                                      <span className={classes.pay}>to confirm booking</span>
                                                    </div>
                                                  <div style={{height:0,marginTop:10}}>
                                                <span className={classes.refundable}> Fully refundable for next 24 hours</span>
                                              <div className={classes.dot}> </div>
                                            </div>
                                          <div className={classes.delivery} >
                                        <TextField variant='standard' label="Delivery location" fullWidth onClick={handleClickOpen}/>
                                      </div>
                                    <span className={classes.location}>
                                  <LocationOnOutlinedIcon sx={{ fontSize: 30 }}  />
                                </span>
                              <span className={classes.arrow}>
                            <ExpandMoreIcon sx={{ fontSize: 30 }}  />
                          </span>
                        <div className={classes.calendar} >
                      <LocalizationProvider dateAdapter={AdapterDayjs} >
                    <MobileDateTimePicker
                       label='Select delivery date '
                       value={date}
                       style={{
                       width: 232
                       }}
                       onChange={(newValue) => handleSetDate(newValue)}
                       slotProps={{ textField: { variant: 'standard',fullWidth:true } }}
                    />
                  </LocalizationProvider>
                </div>
              <span className={classes.calendaricon}>
            <CalendarMonthOutlinedIcon sx={{ fontSize: 30 }}  />
          </span>
        <span className={classes.arrowicon}>
      <ExpandMoreIcon sx={{ fontSize: 30 }}  />
    </span>
  <div>
<div className={classes.note}>(Car delivery between 10:00 am - 7:00 pm)</div>
  </div>
      </div>
        <div className={classes.box1}>
          <div className={classes.radio}>
            <Radio
              checked={total == advance}
              onChange={handleChangeDialog}
              width='50px'
              value={advance}  
              name="radio-buttons"
              inputProps={{ 'aria-label': 'Flexi' }}
            />
              <span className={classes.fast}>Flexi</span>
                </div>
                  <div className={classes.booking}>
                    <span className={classes.pay}>Pay </span>
                      <span className={classes.bookamt}> ₹ 2,000 </span>
                        < span className={classes.pay}>to reserve</span>
                           </div>
                             <div style={{paddingTop:13}}>
                                <span className={classes.refundable}> Fully refundable for next 24 hours</span>
                                  <div className={classes.dot}> </div>
                                     </div>
                                  <div>
                                <span className={classes.refundable}> We will contact you to start processing</span>
                              <div className={classes.dot}> </div>
                            </div>
                          <div >
                        <span className={classes.refundable}> Pay balance Rs {dueamount} of booking amount anytime later</span>
                      <div className={classes.dot}> </div>
                    </div>
                 </div>
              <div className={classes.proceed}>
            <Button onClick={handlePayment} variant="contained" fullWidth style={{background:'linear-gradient(270deg,#1caba2 25%,#1c7fba)'}}><span className={classes.button}>Proceed to pay</span></Button>
          </div>
        </div>
      </div>
    {showDialogLocation()}
  </div>
)}