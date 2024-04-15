import React from "react";
import { useState,useEffect } from "react";
import {getData} from "../../../Services/FetchNodeServices";
import { useStyles } from "./CityCss";

export default function City(){
      
     const classes = useStyles() 

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
                       <ul>
                            <li className={classes.cityText}>
                               <a href="#"className={classes.carText} >
                                   Self Drive Car Subscription in <>{item.cityname}</>
                                </a>
                            </li>
                        </ul>
                    </div>
                </div>
            )}
        )}

    return(

        <div style={{marginTop:40}}>
            <div className={classes.box}>
                <div className={classes.textHeading}>Servicable Cities</div>
                    <div style={{columnCount:3 }}>
                        <div className={classes.city}>
                            {showCity()}
                        </div>
                    </div>
                </div>
            </div>
    )}