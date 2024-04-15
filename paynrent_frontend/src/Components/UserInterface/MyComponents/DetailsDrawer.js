import { Grid, TextField,Button } from "@mui/material";
import Drawer from '@mui/material/Drawer';
import { useState } from "react";
import { postData } from "../../../Services/FetchNodeServices";
import React from "react";
import Swal from "sweetalert2";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";


export default function DetailsDrawer(props) {
  
    const [state, setState] = useState({
      top: false,
      left: false,
      bottom: false,
      right: false,
    });

    const dispatch=useDispatch()
    const navigate=useNavigate()

    const [mobile,setMobile]=useState('')
    const [email,setEmail]=useState('')
    const [name,setName]=useState('')
    const [aadhar,setAadhar]=useState('')
    const [license,setLicense]=useState('')
    const [dob,setDob]=useState('') 
    
    React.useEffect(function(){
        setState({ ...state, ['right']: props.status });
    },[props])

    const toggleDrawer = (right, open) => (event) => {
      if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
        return;
      }
       setState({ ...state, [right]: open });
    };
      
      const fetchUserDetails=async()=>{
      var response=await postData('user/check_user',{mobile:props.mobile})
      dispatch({type:'ADD_USER',payload:[props.mobile,response.data]})
      }
   

       const handleProceed=async()=>{
       var body={mobile:props.mobile,email:email,name:name,birth:dob,aadhar:aadhar,license:license}
       var response=await postData('user/userdetailssubmit',body)
       if (response.status) {
        Swal.fire({
  
          icon: 'success',
          title: 'Registerd Succesfully',
          showConfirmButton: false,
          timer: 1000,
         
        })
        setState({ ...state, ['right']: false });
        fetchUserDetails()
      // navigate('/booking')
      window.location.href = "/";
      }
      else {
        Swal.fire({
          icon: 'error',
          title: 'Oops',
          text: 'Something went wrong!',
  
        })
      }}
  
    const list = (right) => (
     <Grid container spacing={2} style={{width:450,padding:20}}>
        <Grid item xs={12} fullWidth>
        <img src='/assets/logo.png'  style={{width:70}}/> 
     </Grid>
     <Grid item xs={12} style={{textAlign:'center',fontFamily:'poppins',fontSize:20,fontWeight:'bolder'}}>
       Sign Up
     </Grid>
      <Grid item xs={12}>
      <TextField onChange={(event)=>setMobile(event.target.value)} value={props.mobile} variant='outlined' label='Mobile Number' fullWidth> Mobile Number</TextField>
      </Grid>
      <Grid item xs={12}>
      <TextField onChange={(event)=>setEmail(event.target.value)} variant='outlined' label='Email Id' fullWidth>Email Id</TextField>
      </Grid>
      <Grid item xs={12}>
      <TextField onChange={(event)=>setName(event.target.value)} variant='outlined' label='User Name' fullWidth> User Name</TextField>
      </Grid>
      <Grid item xs={12}>
      <TextField onChange={(event)=>setDob(event.target.value)}  variant='outlined' label='Address' fullWidth> Address</TextField>
      </Grid>
      <Grid item xs={12}>
      <TextField onChange={(event)=>setAadhar(event.target.value)} variant='outlined' label='Aadhar Number' fullWidth> Aadhar Number</TextField>
      </Grid>
      <Grid item xs={12}>
      <TextField onChange={(event)=>setLicense(event.target.value)} variant='outlined' label='Driving License Number' fullWidth>Driving License Number</TextField>
      </Grid>
      <Grid item xs={12} >
      <Button onClick={handleProceed} variant='contained' fullWidth style={{backgroundImage:' linear-gradient(270deg,#1caba2 20%,#1c7fab)',borderRadius:40}} >Proceed</Button>
      </Grid>
      </Grid>
    );
  
    return (
      <div>
           <Drawer
              anchor={'right'}
              open={state.right}
              onClose={toggleDrawer('right', false)}
            >
              {list('right')}
            </Drawer>
       </div>
    );
  }