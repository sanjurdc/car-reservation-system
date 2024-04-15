import React from "react";
import { Grid } from "@mui/material";
import FacebookIcon from '@mui/icons-material/Facebook';
import InstagramIcon from '@mui/icons-material/Instagram';
import TwitterIcon from '@mui/icons-material/Twitter';
import YouTubeIcon from '@mui/icons-material/YouTube';
import { useStyles } from "./FooterCss";

export default function Footer(){

  const classes = useStyles()

      return(
                  <div className={classes.mainContainer}>
                    <Grid container spacing={1}>
                      <Grid item xs={12} className={classes.subContainer}>
                        <div>
                          <img src='/assets/logo.png'  className={classes.logoIcon} />
                            <p>© 2023 PaynRent All rights reserved</p>
                              </div>
                                <div className={classes.link}>
                                  <a href="/home" className={classes.linkIcon}>Home</a> <br/><br/>
                                    <a href="/home" className={classes.linkIcon}>FAQs</a> <br/><br/>
                                      <a href="/home" className={classes.linkIcon}>Offer</a> <br/><br/>
                                        <a href="#" className={classes.linkIcon}>Blog</a> 
                                      </div>
                                    <div className={classes.social}>
                                  <h3>Social</h3>
                                <FacebookIcon className={classes.socialIcon} /><br/>
                              <InstagramIcon className={classes.socialIcon} /><br/>
                            <TwitterIcon className={classes.socialIcon} /><br/>
                          <YouTubeIcon className={classes.socialIcon} /><br/>
                        </div>
                      <div>
                    <div className={classes.contact}>Contact Us</div>
                  <div className={classes.address}>Vinay Nagar Sector - 1, Bahodapur</div>
                <div className={classes.address}>Gwalior (Madhya Pradesh)</div>
              <div className={classes.address}>Phone No.: 0751-2451737,38</div>
            <div className={classes.address}>Mobile No.:+91-7879202636,8358953054</div>
          <div className={classes.address}>Email : sanju.kushwah37@yahoo.com</div>
        </div>
      </Grid>
    </Grid>
  </div>
)}