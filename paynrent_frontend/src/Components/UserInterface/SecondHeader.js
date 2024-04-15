import { Grid,Button,Box,TextField } from "@mui/material";
import InputAdornment from '@mui/material/InputAdornment';
import React, { useEffect, useState } from 'react';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { MobileDateTimePicker } from '@mui/x-date-pickers/MobileDateTimePicker';
import LocationOnOutlinedIcon from '@mui/icons-material/LocationOnOutlined';
import { getData } from "../../Services/FetchNodeServices";
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import ClearOutlinedIcon from '@mui/icons-material/ClearOutlined';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import { Divider } from "@material-ui/core";
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import { useSelector,useDispatch } from "react-redux";
import { useStyles } from "./MyComponents/SecondHeaderCss";
import DateDiff from 'date-diff';
import { useNavigate } from "react-router-dom";

  
export default function SecondHeader(){

    const classes = useStyles()
    const dispatch = useDispatch()
    const navigate=useNavigate() 

    const bookingDetails=useSelector(state => state.booking)
   
    const [city,setCity]=useState([])
    const [open,setOpen]=useState(false)
    const [selectedCity,setSelectedCity]=useState(bookingDetails.cities)
    const [startTime,setStartTime]=useState(bookingDetails.starttime)
    const [endTime,setEndTime]=useState(bookingDetails.endtime)
    const [daysTime,setDaysTime]=useState('')
    const [days,setDays]=useState('')
    const [hrs,setHrs]=useState('')
   
    const fetchAllCity=async()=>{
    const response=await getData('user/display_all_city')
    setCity(response.data)
    }

    useEffect(function(){
    fetchAllCity()
    },[])

    const handleTopCity=()=>{
    return city.map((item)=>{
    return(
          <> {item.status=='top city'?
                <><ListItem button>
            <ListItemText primary={item.cityname} onClick={()=>handleSelectedCity(item.cityname)} />
            </ListItem></>:<></> } </>
          )
        })
    }

    const handleOtherCity=()=>{
    return city.map((item)=>{
    return(
         <> {item.status=='other city'?
                <><ListItem button>
            <ListItemText primary={item.cityname} onClick={()=>handleOtherCity(item.cityname)} />
            </ListItem></>:<></> } </>
          )
        })
    }

    const handleSelectedCity=(selectCity)=>{
    setSelectedCity(selectCity)
    setOpen(false)
     }

    const handleClose=()=>{
    setOpen(false)
    }

    const handleDialog=()=>{
    setOpen(true)
    }

    const showDialog=()=>{
    return(
        <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        >
          <DialogTitle id="alert-dialog-title">
            {"Select City"}
              </DialogTitle>
                  <span className={classes.mainContainer} >< ClearOutlinedIcon onClick={handleClose}/></span>
                    <Divider />
                      <DialogContent className={classes.dialog}>
                        <div className={classes.topCity}>Top City
                          </div>
                        <div className={classes.topcityHeading}>
                      {handleTopCity()}
                    </div>
                  <Divider />
                <div className={classes.otherCity}>
              Other City
            </div>
          <div>
        {handleOtherCity()}
      </div>
    </DialogContent>
  </Dialog>
)}

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

    const handleModify=()=>{
    dispatch({type:'ADD_BOOKING',payload:{cities:selectedCity,starttime:startTime,endtime:endTime,duration:daysTime,days:days,hrs:hrs}})
    navigate('/showvehicle')
    }


    return(
        <Box sx={{ flexGrow: 1 }}>
          <AppBar position="static" color='inherit' >
            <Toolbar>
              <div style={{width:'100%',height:90}}>
                <div style={{padding:5,fontWeight:'bold'}}>Modify Search</div>
                  <Grid container spacing={0.5} >
                    <Grid item xs={2.5} className={classes.cityBox} onClick={handleDialog} >
                      <TextField 
                        variant="outlined" 
                        InputProps={{
                        startAdornment: <InputAdornment position="start"><LocationOnOutlinedIcon /> <span className={classes.city} >{selectedCity}</span></InputAdornment>,
                        }}
                      />
                        </Grid>
                          <Grid item xs={2.5}>
                            <LocalizationProvider dateAdapter={AdapterDayjs}>
                                <MobileDateTimePicker 
                                  label='Start Time'
                                  value={startTime}
                                  slotProps={{ textField: { fullWidth: true} }}
                                  onChange={(newValue) => handleSetStartTimeValue(newValue)} 
                                />
                                </LocalizationProvider>
                              </Grid>
                            <Grid item xs={2.5}>
                          <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <MobileDateTimePicker  
                          label='End Time'
                          value={endTime}
                          slotProps={{ textField: { fullWidth: true } }}
                          onChange={(newValue) => handleSetEndTimeValue(newValue)} 
                        />
                          </LocalizationProvider>
                        </Grid>
                      <Grid item xs={2.5} style={{marginLeft:20}}>
                    <Button variant='contained' className={classes.button} onClick={handleModify}>Modify Search</Button>
                  </Grid>
                </Grid>
              </div>
            <div>
          {showDialog()}
        </div>
      </Toolbar>
    </AppBar>
  </Box>
)}