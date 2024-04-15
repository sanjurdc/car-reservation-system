import { useStyles } from "./BenefitsCss";
import Slider from "react-slick";
import { createRef } from "react";
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';

export default function Benefits(){

    const classes=useStyles()
    var mySlider=createRef()

    var settings = {
        dots: false,
        infinite: true,
        speed: 500,
        slidesToShow: 3,
        slidesToScroll: 1,
        arrows:false
      };

    
    var images=[
    {id:1,images:"http://localhost:4000/images/10.png" },
    {id:2,images:"http://localhost:4000/images/11.png" },
    {id:3,images:"http://localhost:4000/images/12.png" },
    {id:4,images:"http://localhost:4000/images/13.png" },
    {id:5,images:"http://localhost:4000/images/14.png" },
    {id:6,images:"http://localhost:4000/images/15.png" },
    {id:7,images:"http://localhost:4000/images/16.png" }]

    const playSlide=()=>{
        return images.map((item)=>{
         return(   
         <div className={classes.container}>
                <img src={item.images} className={classes.img} />
          </div>
         )
         })
     }

    const handleLeft=()=>{
        mySlider.current.slickPrev()
   }

   const handleRight=()=>{
     mySlider.current.slickNext()
   }

    return(
        <div>
            <div className={classes.subContainer}>
               <span className={classes.heading}>Subscription Benefits</span>
               <span style={{paddingRight:50}}><ChevronLeftIcon style={{fontSize:28}} onClick={handleLeft} /><ChevronRightIcon style={{fontSize:28}} onClick={handleRight} /></span>
            </div>
        <div>
      <Slider ref={mySlider} {...settings}>
        {playSlide()}
        
        </Slider>
        </div>
        </div>
    )
}