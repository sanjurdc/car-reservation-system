import React from "react";
import { useState,useEffect } from "react";
import {getData} from "../../../Services/FetchNodeServices";
import { useStyles } from "./CityCss"
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';

export default function Cities(){
  
  const classes = useStyles()  
  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.up('sm'));
    
    const [city,setCity]=useState([])

     useEffect(function(){
        fetchAllCity()
     },[])

     const fetchAllCity=async()=>{
     var response=await getData('user/display_all_city')
     setCity(response.data)
     }
     
     const showCity=()=>{
     return city.map((item)=>{
     return(
          <div className={classes.mainContainer}>
            <div className={classes.subContainer}>
                <ul >
                    <li className={classes.cityText}>
                        <a href="#" className={classes.carText} >
                           Self Drive Car Rental in <>{item.cityname}</>
                        </a>
                    </li>
                </ul>
            </div>
        </div>
    )
    })}

    return(

        <div style={{marginTop:40}}>
            <div className={classes.box}>
                <div className={classes.textHeading}>Servicable Cities</div>
                <div style={{columnCount:matches?3:2 }}>
                    <div className={classes.city}>
                    {showCity()}
                </div>
                </div>
                
            </div>
        </div>
    )
}