import React, { useState,useEffect } from "react";
import { Button, Dialog, Paper, Divider } from "@mui/material";
import { useStyles } from "./SubscriptionsCss";
import { useNavigate } from "react-router-dom";
import { LocationOn } from '@material-ui/icons';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import DialogTitle from '@mui/material/DialogTitle';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import { getData } from "../../../Services/FetchNodeServices";
import Benefits from "../../Administrator/Benefits/Benefits";
import Header from "./Header";
import WhypnrComponents from "./WhypnrComponents";
import Faq from "./Faq";
import Playstore from "./Playstore";
import Journey from "../../../Services/Journey";
import Investors from "../../../Services/Investors";
import City from "./City";
import Footer from "./Footer";
import { useDispatch } from "react-redux";

export default function Subscriptions(){

      const classes=useStyles()
      const navigate=useNavigate()
      const dispatch=useDispatch()
      
      const [selectCity,setSelectCity]=useState('Select City')
      const [open,setOpen]=useState(false)
      const [city,setCity]=useState([])
      const [alert,setAlert]=useState(false)

      useEffect(function(){
      fetchAllCity()
      },[])
     
      const fetchAllCity=async()=>{
      var response=await getData('user/display_all_city')
      setCity(response.data)
      }
        
      const handleSelectedCity=(selectedCity)=>{
      setSelectCity(selectedCity)
      dispatch({type:'ADD_CITY',payload:{city:selectedCity}})
      setOpen(false)
      }
     
      const showTopCity=()=>{
      return  city.map((item)=>{
      return  ( <> {item.status=='top city'?<> 
                 <ListItem >
                     <ListItemText primary={item.cityname} onClick={()=>handleSelectedCity(item.cityname)} style={{cursor:'pointer'}}/>
                 </ListItem></>:<></>}</>
      )
      })
      } 
     
      const showOtherCity=()=>{
      return  city.map((item)=>{
      return  (
         <> {item.status=='other city'?<> 
                  <ListItem>
                  <ListItemText primary={item.cityname} onClick={()=>handleSelectedCity(item.cityname)} style={{cursor:'pointer'}} />
                  </ListItem></>:<></>}</>
      )
      })
      } 
     
      const handleCityDialog = () => {
      setOpen(true);
      };
     
      const handleClose = () => {
      setOpen(false);
      };

      const handleClick=()=>{
      navigate('/')
      }

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
                {"Select City"}
              </DialogTitle>
              <Divider />
              <DialogContent style={{width:200}}>
                <List>
                  <div style={{fontWeight:'bold',paddingBottom:15, color:'#95afc0'}}>Top Cities</div>
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

      const handleSearch=()=>{
      if(selectCity!=='Select City')
      {
        navigate('/subscriptiondetail')
      }
      else{
           setAlert(true)
      }
      }

     return(
      <div>
        <div style={{width:'100%'}}>
            <Header />
               </div>
                 <div className={classes.container}>
                    <div className={classes.leftSlide}>
                        <Paper elevation={3} className={classes.paper}>
                          <div className={classes.paperContainer}>
                            <div onClick={handleClick} className={classes.leftPaper}>
                               <div className={classes.heading}>Rentals</div>
                                  <div className={classes.subheading}>For hours & days</div>
                                     </div>
                                        <div className={classes.rightPaper}>
                                          <div className={classes.head}>Subscriptions</div>
                                             <div className={classes.subhead}>For more than 1 month</div>
                                                </div>
                                                   </div>
                                                     <div>
                                                        <img src="/assets/subscription.png" className={classes.img2} />
                                                           </div>
                                                        <div className={classes.sub}>Car Subscriptions in <span style={{fontWeight:'bolder'}}> {selectCity}</span></div>
                                                     <div onClick={handleCityDialog}  className={classes.box}>{}
                                                   <LocationOn className={classes.icon}/><span style={{fontSize:24,fontWeight:'bold',paddingLeft:8}}>{selectCity}</span>
                                                </div>
                                                {alert? <div className={classes.alert}>Please Select City</div>:<></>}
                                             <div className={classes.button}>
                                          <Button onClick={handleSearch} variant='contained' fullWidth style={{borderRadius:20,paddingLeft:30,paddingRight:30,marginLeft:20,marginRight:20}}>Search</Button>
                                         
                                        </div>
                                      </Paper>
                                   </div>
                                 <div className={classes.rightSlide}>
                              <div className={classes.rightHead}> Smart & Luxury Car Subscriptions
                            </div>
                          <div className={classes.rightsubHead}> Door step delivery in 3 days
                        </div>
                      <img src="/assets/slide2.png" className={classes.img}/>
                    </div>
                      {cityDialog()}
                        </div>
                          <div className={classes.subContainer}>
                            <div style={{width:'99%'}}>
                              <Benefits />
                                </div>
                                  </div>
                                    <div className={classes.subContainer}>
                                      <div style={{width:'99%',marginLeft:25}}>
                                        <WhypnrComponents />
                                          </div>
                                            </div>  
                                              <div className={classes.subContainer} >
                                                <div style={{width:'97%'}}>
                                                  <Faq />
                                                    </div>
                                                      </div>
                                                    <div className={classes.subContainer} >
                                                 <div style={{width:'95%',marginRight:30}}>
                                               <Playstore />
                                              </div>
                                            </div>
                                          <div className={classes.subContainer} >
                                        <div style={{width:'97%'}}>
                                      <Journey />
                                    </div>
                                   </div>
                                 <div className={classes.subContainer} >
                              <div style={{width:'97%'}}>
                            <Investors />
                          </div>
                        </div>
                      <div className={classes.subContainer} >
                    <div style={{width:'95%',marginRight:30}}>
                  <City />
                 </div>
               </div>
            <div className={classes.subContainer} >
          <div style={{width:'100%',marginTop:20}}>
        <Footer />
      </div>
    </div>
  </div>  
)}