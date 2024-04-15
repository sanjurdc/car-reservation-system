import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import { createRef } from "react";
import { ServerURL } from "../../../Services/FetchNodeServices";
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';

export default function FeaturedComponents(props) {

   const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.up('sm'));


    var settings = {
      dots: false,
      infinite: true,
      speed: 500,
      slidesToShow: matches?3:1,
      slidesToScroll: 1,
      arrows:false
    };
    var mySlider=createRef()  
    var images=props.images
  
   

    const playSlide=()=>{
    return images.map((item)=>{
    return(<div>
      <div style={{paddingLeft:10,paddingRight:10}}>
         <img src={`${ServerURL}/images/${item.image}`} style={{borderRadius:20,width:350,height:180}}/>
         </div>
      </div>
)
})}
     
    const handleLeft=()=>{
    mySlider.current.slickPrev()
    }

    const handleRight=()=>{
    mySlider.current.slickNext()
    }

    return (
      <div>
        <div style={{display:'flex',justifyContent:'space-between',paddingBottom:15,paddingTop:20}}>
              <span style={{fontWeight:"bold",fontSize:24,paddingLeft:20,color:'#3dc1d3'}}>Featured</span>
                <span style={{paddingRight:matches?45:70}}><ChevronLeftIcon style={{fontSize:28}} onClick={handleLeft} /><ChevronRightIcon style={{fontSize:28}} onClick={handleRight} /></span>
                  </div>
                <Slider ref={mySlider} {...settings}>
              {playSlide()}
            </Slider>
          </div>
  )}