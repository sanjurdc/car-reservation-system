import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import { createRef } from "react";
import { useState,useEffect } from "react";
import {getData, ServerURL } from "../../../Services/FetchNodeServices";
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import { useStyles } from "./WhypnrComponentsCss";


export default function WhypnrComponents() {


  const classes = useStyles() 
  const mySlider=createRef()   

  const [whypnr,setWhypnr]=useState([])

  useEffect(function(){
  fetchAllWhypnr()
  },[])

  const fetchAllWhypnr=async()=>{
  var response=await getData('whypnr/display_all_whypnr')
  setWhypnr(response.data)
  }

  var settings = {
      dots: false,
      infinite: true,
      speed: 500,
      slidesToShow:3,
      slidesToScroll: 1,
      arrows:false
    };

    
  const playSlide=()=>{
  return whypnr.map((item)=>{
  return(
      <div key={item.whypnrid}>
        <div className={classes.wrapper}>
          <span className={classes.spanIcon}>
            <img src={`${ServerURL}/images/${item.image}`} className={classes.icon}/>
          </span>
        <h2 className={classes.cardHeading}>{item.title}</h2>
      <h6 className={classes.cardDesc}>{item.description}</h6>
    </div>
  </div>
)}
)}
     
  const handleLeft=()=>{
  mySlider.current.slickPrev()
  }

  const handleRight=()=>{
  mySlider.current.slickNext()
  }

  return (
      <div style={{width:'100%'}}>
        <div style={{display:'flex',justifyContent:'space-between',paddingTop:10,width:'96%',}}>
          <div className={classes.heading} style={{marginBottom:'10px'}}>Why PaynRent</div>
            <span style={{marginTop:10}}><ChevronLeftIcon style={{fontSize:28}} onClick={handleLeft} /><ChevronRightIcon style={{fontSize:28,marginRight:10}} onClick={handleRight} /></span>
          </div>
        <Slider ref={mySlider} {...settings}>
      {playSlide()}
    </Slider>
  </div>
)}