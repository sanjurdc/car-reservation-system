import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import { createRef } from "react";
import { useState,useEffect } from "react";
import {getData, ServerURL } from "../../../Services/FetchNodeServices";
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import { useStyles } from "./OfferComponentsCss";
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';

export default function OfferComponents() {

  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.up('sm'));

  const classes = useStyles()   

  const [offer,setOffer]=useState([])

  useEffect(function(){
  fetchAllOffer()
  },[])

  const fetchAllOffer=async()=>{
  var response=await getData('offer/display_all_offer')
  setOffer(response.data)
  }

  var settings = {
      dots: false,
      infinite: true,
      speed: 500,
      slidesToShow: matches?3:1,
      slidesToScroll: 1,
      arrows:false
    };

  var mySlider=createRef()  
    
  const playSlide=()=>{
  return offer.map((item)=>{
  return(
    <div key={item.offerid}>
      <div className={classes.wrapper} >
        <span className={classes.spanIcon}>
           <img src={`${ServerURL}/images/${item.image}`} className={classes.icon}/>
        </span>
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
        <div style={{display:'flex',justifyContent:'space-between'}}>
            <div className={classes.heading}>Offer</div>
          <span style={{paddingRight:matches?50:80,marginTop:30}}><ChevronLeftIcon style={{fontSize:28,marginTop:'6px'}} onClick={handleLeft} /><ChevronRightIcon style={{fontSize:28,marginTop:'6px'}} onClick={handleRight} /></span>
        </div>
      <Slider ref={mySlider} {...settings}>
        {playSlide()}
      </Slider>
    </div>
  )}