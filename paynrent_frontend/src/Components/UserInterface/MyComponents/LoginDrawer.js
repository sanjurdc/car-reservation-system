import * as React from 'react';
import Drawer from '@mui/material/Drawer';
import Button from '@mui/material/Button';
import { TextField,Grid } from '@material-ui/core';
import OtpInterface from './OtpInterface';

export default function LoginDrawer(props) {
  
    const [state, setState] = React.useState({
      top: false,
      left: false,
      bottom: false,
      right: false,
    });
    const [getOtp, setGetOtp] = React.useState('');
    const [btnStatus,setBtnStatus]=React.useState(false)
    const [btnMsg,setBtnMsg]=React.useState('Login')
    const [mobile,setMobile]=React.useState('')
    const [inputOtp,setInputOtp]=React.useState('')
    const [drawer,setDrawer]=React.useState(false)
   
      
    React.useEffect(function(){
      if(props.userinfo==null || undefined)   
      {
        setState({ ...state, ['right']: props.status });
      }
      
    },[props])

    const handleOtpChange=(value)=>{
      setInputOtp(value)
    }
    

    const generateOtp=()=>{
      if(btnMsg=='Change Mobile Number')
      {
        setBtnStatus(false)
        setBtnMsg('Login')
        setMobile('')
      }
      else
      {
      var otp=parseInt(Math.random()*8999)+1000
      alert(otp)
      setBtnStatus(true)
      setBtnMsg('Change Mobile Number')
      setGetOtp(otp)
      }
    }

    const toggleDrawer = (right, open) => (event) => {
      if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
        return;
      }
           props.handleStatus(open)
    
      setState({ ...state, [right]: open });
    };
  
    const handleClose =()=>{
      setState({ ...state, ["right"]: false });
      setDrawer(false)
    }

    const list = () => (
     <Grid container spacing={3} style={{width:400,padding:30}}>
       <Grid item xs={12}> 
       <img src='/assets/logo.png'  style={{width:100}}/> 
       </Grid>
       <Grid item xs={12} style={{textAlign:'center',fontFamily:'poppins',fontSize:24,fontWeight:'bolder'}}>
        Login
       </Grid>
       <Grid item xs={12}>
        <TextField onChange={(event)=>setMobile(event.target.value)} value={mobile} label=<span style={{textAlign:'center',fontFamily:'poppins',fontSize:18,fontWeight:600}}>Mobile Number</span> fullWidth variant="outlined" ></TextField>
       </Grid>
      
       <Grid item xs={12}>
        <Button onClick={generateOtp} variant='contained' fullWidth color='inherit'>{btnMsg}</Button>
        </Grid>
       {btnStatus?
          <Grid item xs={12}>
       <OtpInterface getOtp={getOtp} inputOtp={inputOtp} generateOtp={generateOtp} onChange={handleOtpChange} mobile={mobile} handleClose={handleClose} nav={props.nav} open={props.open} login={props.login}/>
       </Grid>:<></>}
       
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