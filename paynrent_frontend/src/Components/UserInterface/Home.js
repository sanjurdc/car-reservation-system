import { useEffect } from "react"
import { useState } from "react"
import { getData } from "../../Services/FetchNodeServices"
import Header from "./MyComponents/Header"
import SearchComponents from "./MyComponents/SearchComponents"
import FeaturedComponents from "./MyComponents/FeaturedComponents"
import OfferComponents from "./MyComponents/OfferComponents"
import WhypnrComponents from "./MyComponents/WhypnrComponents"
import Faq from "./MyComponents/Faq"
import Playstore from "./MyComponents/Playstore"
import Journey from "../../Services/Journey"
import Investors from "../../Services/Investors"
import Cities from "./MyComponents/Cities"
import Footer from "./MyComponents/Footer"
import { useStyles } from "./MyComponents/HomeCss"

export default function Home(){

    const classes = useStyles() 

    const [features,setFeatures]=useState([])


    const fetchAllFeatures=async()=>{
    var response=await getData('featured/display_all_featured')
    setFeatures(response.data)
    }
      
    useEffect(function(){
    fetchAllFeatures()
    },[])

      
    return(
        <div className={classes.mainContainer}>
            <div >
                <Header/>
            </div> 

            <div >
            <SearchComponents/>
            </div>

            <div className={classes.center} >
                <div style={{width:'90%'}}>
                    <FeaturedComponents images={features} />
                </div>
            </div>

            <div className={classes.center}>
                <div style={{width:'90%'}}>
                    <OfferComponents />
                </div>
            </div>

            <div className={classes.center}>
                <div style={{width:'90%'}}>
                    <WhypnrComponents  />
                </div>
            </div>

            <div className={classes.center}>
                <div style={{width:'90%'}}>
                    <Faq  />
                </div>
            </div>

            <div className={classes.center}>
                <div style={{width:'89%',marginRight:10}}>
                    <Playstore   />
                </div>
            </div>

            <div className={classes.center}>
                <div style={{width:'90%'}}>
                    <Journey  />
                </div>
            </div>

            <div className={classes.center}>
                <div style={{width:'90%'}}>
                    <Investors  />
                </div>
            </div>

            <div className={classes.center}>
                <div style={{width:'100%'}}>
                    <Cities  />
                </div>
            </div>

            <div className={classes.center}>
                <div style={{width:'100%',marginTop:20}}>
                    <Footer  />
                </div>
            </div>
        </div>
   )}