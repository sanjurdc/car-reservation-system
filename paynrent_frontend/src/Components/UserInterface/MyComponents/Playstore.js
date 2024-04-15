import React from "react";
import { useStyles } from "./PlaystoreCss";

export default function Playstore(){

    const classes = useStyles()

    return(
        <div>
            <div className={classes.mainContainer}>
                <div className={classes.subContainer}>
                    <div className={classes.box}>
                        <h1 className={classes.heading}>Download the PaynRent app</h1>
                            <img src="assets/play.png" className={classes.playIcon} />
                               </div>
                            <div className={classes.store}>
                        <img src="assets/store.jpg" className={classes.storeIcon} />
                    </div>
                </div>
            </div>
        </div>
    )
}