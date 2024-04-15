import React, { useEffect, useState } from "react";
import { Button, Grid,TextField } from "@mui/material";
import DetailsDrawer from "./DetailsDrawer";
import { postData } from "../../../Services/FetchNodeServices";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

export default function OtpInterface(props){
  console.log(props)
   
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const [otp,setOtp]=useState('')
    const [txtOne,setTxtOne]=useState('')
    const [txtTwo,setTxtTwo]=useState('')
    const [txtThree,setTxtThree]=useState('')
    const [txtFour,setTxtFour]=useState('')
    const [seconds,setSeconds]=useState(true)
    const [time,setTime]=useState(30)
    const [refresh,setRefresh]=useState(false)
    const [status,setStatus]=useState(false)
    const [userDetails,setUserDetails]=useState('')
   
    var interval

    const fetchUserDetails=async()=>{
    var response=await postData('user/check_user',{mobile:props.mobile})
    setUserDetails(response)
    }

    useEffect(function(){
    myTimer()
    fetchUserDetails()
    },[]) 
    
    const myTimer=()=>{
      if(seconds)
      { var t=time
         interval=setInterval(()=>{
          if(t>0)
          {
            t=t-1
            setTime(t)
          }
          else
          {
            clearInterval(interval)
            setSeconds(false)
          }
        },1000)
        setRefresh(!refresh)
      }
     } 
    
    const handleTxtOne=(event)=>{
        if(event.target.value>=1)
       {   
        setTxtOne(event.target.value)         
        document.getElementById('t2').focus()
     }
    }

    const handleTxtTwo=(event)=>{
    if(event.target.value>=1)
    {   
    setTxtTwo(event.target.value)
    document.getElementById('t3').focus()
    }}

    const handleTxtThree=(event)=>{
    if(event.target.value>=1)
    {
    setTxtThree(event.target.value)
    document.getElementById('t4').focus()
    }}

    const handleTxtFour=(event)=>{
    if(event.target.value>=1)
    {
    setTxtFour(event.target.value)
    setOtp(txtOne+txtTwo+txtThree+event.target.value)
    props.onChange(txtOne+txtTwo+txtThree+event.target.value)
    }}
      
    const verifyOTP=()=>{
    alert(props.getOtp+" "+otp)
    if(props.getOtp==otp)
    {  
    if(userDetails.status)
    {
    dispatch({type:'ADD_USER',payload:[props.mobile,userDetails.data]})
    localStorage.setItem("ADD USER",JSON.stringify(userDetails.data))
    props.handleClose(false)
   if (props.login===true)
   {
     window.location.reload()
   }
    if(props.open==true)
    {
      navigate('/booking')
    }
    if(props.nav==true) 
    {
    navigate("/vehiclesubscriptiondetail")
    } 
    
  }
    
    
    else
    {
    setStatus(true)  
    }
    }
    else
    {
       alert('Incorrect OTP')
    }
    }
     

    return(
        <div>
         <Grid container spacing={3} style={{width:370,padding:20,fontWeight:1600}}>
            <Grid item xs={3}>
                <TextField id='t1' onChange={handleTxtOne} variant="outlined" ></TextField>
            </Grid>
            <Grid item xs={3}>
                <TextField id='t2' onChange={handleTxtTwo} variant="outlined" ></TextField>
            </Grid>
           <Grid item xs={3}>
                <TextField id='t3' onChange={handleTxtThree} variant="outlined" ></TextField>
           </Grid>
           <Grid item xs={3}>
                <TextField id='t4' onChange={handleTxtFour} variant="outlined" ></TextField>
           </Grid>
          <Grid item xs={12}>
              <div>
                  {seconds?<div>  Waiting for OTP : {time}</div>:<div style={{cursor:'pointer'}} onClick={props.generateOtp}>Resend OTP</div>}
              </div>
          </Grid>
          <Grid item xs={12} >
              <Button onClick={verifyOTP}  variant="contained" fullWidth color='primary' >Verify</Button>
          </Grid>
        </Grid>  
        <DetailsDrawer mobile={props.mobile} status={status}/>          
    </div>
)}