import * as React from 'react';
import Box from '@mui/material/Box'
import Paper from '@mui/material/Paper'
import { LocationOn } from '@material-ui/icons';
import { useState,useEffect } from 'react';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import DialogTitle from '@mui/material/DialogTitle'; 
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import { getData } from '../../../Services/FetchNodeServices';
import { Divider } from '@mui/material';
import { MobileDateTimePicker } from '@mui/x-date-pickers/MobileDateTimePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import dayjs from 'dayjs';
import DateDiff from 'date-diff';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useStyles } from './SearchComponentCss';


export default function SearchComponents(){

   const classes = useStyles()

   const [selectCity,setSelectCity]=useState('Gwalior')
   const [open, setOpen] = useState(false);
   const [city,setCity]=useState([])
   const [startTime,setStartTime]=useState('')
   const [endTime,setEndTime]=useState('')
   const [daysTime,setDaysTime]=useState('')
   const [days,setDays]=useState('')
   const [hrs,setHrs]=useState('')

   const dispatch=useDispatch()
   const navigate=useNavigate() 

   useEffect(function(){
   fetchAllCity()
   },[])

   const fetchAllCity=async()=>{
   var response=await getData('user/display_all_city')
   setCity(response.data)
   }
   
   const handleSelectedCity=(selectedCity)=>{
   setSelectCity(selectedCity)
   setOpen(false)
   }

   const showTopCity=()=>{
   return  city.map((item)=>{
   return  ( 
      <> {item.status=='top city'?<> 
            <ListItem >
                  <ListItemText primary={item.cityname} onClick={()=>handleSelectedCity(item.cityname)} style={{cursor:'pointer'}}/>
            </ListItem></>:<></>}</>
   )}
   )} 

   const showOtherCity=()=>{
   return  city.map((item)=>{
   return  ( 
          <> {item.status=='other city'?<> 
             <ListItem >
                 <ListItemText primary={item.cityname} onClick={()=>handleSelectedCity(item.cityname)} style={{cursor:'pointer'}}/>
             </ListItem></>:<></>}</>
    )}
    )} 

   const handleCityDialog = () => {
   setOpen(true);
   };

   const handleClose = () => {
   setOpen(false);
   };

   const cityDialog=()=>{
    return (
      <div>
            <Dialog
              open={open}
              onClose={handleClose}
              aria-labelledby="alert-dialog-title"
              aria-describedby="alert-dialog-description"
            >
           <IconButton
          aria-label="close"
          onClick={handleClose}
          sx={{
            position: 'absolute',
            right: 8,
            top: 8,
            color: (theme) => theme.palette.grey[500],
          }}
        >
        <CloseIcon />  
        </IconButton>
          <DialogTitle id="alert-dialog-title">
            Select City
          </DialogTitle>
          <Divider />

          <DialogContent style={{width:200}}>
            <List>
              <div style={{fontWeight:'bold',paddingBottom:15, color:'#95afc0',cursor:'pointer'}}>Top Cities</div>
                 {showTopCity()}
              <Divider />
              <div style={{fontWeight:'bold',paddingBottom:15,paddingTop:10, color:'#95afc0'}}>Other Cities</div>
                {showOtherCity()}
           </List>
          </DialogContent>
      </Dialog>
      </div>
    );
  }
      
   const handleSetStartTimeValue=(newValue)=>{
   setStartTime(newValue)
   }

   const handleSetEndTimeValue=(newValue)=>{
   setEndTime(newValue)
   dateDiff(newValue)
   }

   const dateDiff=(et)=>{
   var startDay=new Date(startTime)
   var endDay=new Date(et)
   var diff = new DateDiff(endDay,startDay)
   setDays(parseInt(diff.days()))
   setHrs(Math.ceil(diff.hours()%24))
   setDaysTime("Duration : "+parseInt(diff.days()) + " Days   " + Math.ceil(diff.hours()%24)+" Hrs")
   }
   
   const handleClick=()=>{
   navigate('/subscriptions')
   }

   const handleSearch=()=>{
   dispatch({type:'ADD_BOOKING',payload:{cities:selectCity,starttime:startTime,endtime:endTime,duration:daysTime,days:days,hrs:hrs}})
   navigate('/showvehicle')
   }

   return (
    <Box>
      <div>
        <img src='/assets/slide.png' style={{width:'100%'}}/>
          <div style={{position:'absolute',left:50,top:135}}> 
             <Paper elevation={3} className={classes.paper} >
               <div className={classes.box}>
                  <div className={classes.messageBox}>
                   <img src='/assets/messagebox.png'  className={classes.messageBoxIcon} />
                     <div className={classes.heading}>Rentals</div>
                       <div className={classes.subHeading}>For hours & days</div>
                        </div>
                          <div onClick={handleClick} style={{cursor:'pointer'}}>
                            <div className={classes.subscription}>Subscription</div>
                              <div className={classes.subscriptionText}>For months & year</div>
                                </div>
                                  </div>
                                     <div className={classes.rentalIcon}>
                                        <img src='/assets/rentals.png' style={{width:130,height:28}} />
                                           </div>
                                              <div style={{position:'absolute',top:147}}>
                                                 <h5 style={{color:'#636e72'}}>Self Drive Car Rental in India</h5>
                                                    </div>
                                                       <div onClick={handleCityDialog} className={classes.city}>
                                                         <LocationOn/>
                                                            <span style={{paddingLeft:15,fontWeight:'bold'}}>{selectCity}</span>
                                                               </div>
                                                                 <div style={{display:'flex'}}>
                                                                    <div className={classes.startDate}>
                                                                       <LocalizationProvider dateAdapter={AdapterDayjs} >
                                                                          <MobileDateTimePicker
                                                                             label='Start Time'
                                                                             value={startTime}
                                                                             minDateTime={dayjs(new Date())}
                                                                             onChange={(newValue) => handleSetStartTimeValue(newValue)}
                                                                             slotProps={{ textField: { variant: 'standard' }  }}
                                                                            />
                                                                       </LocalizationProvider>
                                                                    </div>
                                                                  <div  className={classes.endDate}>     
                                                                <LocalizationProvider dateAdapter={AdapterDayjs} >
                                                              <MobileDateTimePicker
                                                                label='End Time'
                                                                value={endTime}
                                                                minDateTime={dayjs(new Date(startTime).getTime() + 60*60*1000)}
                                                                onChange={(newValue) => handleSetEndTimeValue(newValue)}
                                                                slotProps={{ textField: { variant: 'standard' }  }}
                                                              />
                                                            </LocalizationProvider> 
                                                          </div>
                                                        <div className={classes.dateDiff}>
                                                      {daysTime}
                                                    </div>
                                                  <div onClick={handleSearch} className={classes.button}>
                                                <span className={classes.buttonText}>Search</span>
                                              </div>
                                            </div>
                                          </Paper>
                                        </div>
                                      {cityDialog()}
                                  </div>
                              </Box>
                          )}