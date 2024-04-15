import React from "react"
import { useStyles } from "./FaqCss"

export default function Faq(){

      const classes = useStyles()

      return(
     
      <div>
          <div className={classes.heading}>FAQs</div>
              <div className={classes.header}>
                  <h3>Is there a speed limit?</h3>
                    <p>PaynRent allows up to 125 km/hr. However it is 80 km/hr in a few cities where some cars might be equipped with speed governors as per government directives. PaynRent strictly advises to follow local speed limits.</p>
                      <hr></hr>
                        <h3>Can I extend/ cancel/ modify?</h3>
                          <p>Yes, extensions are possible subject to availability & charges. Cancellations & modifications will attract nominal charges as per our policy. </p>
                            <hr></hr>
                          <h3>Booking criteria & documents?</h3>
                        <p>Min. 21 years old, have valid original government ID (Aadhar, Passport, or PAN only) and a valid driving licence for “Light Motor Vehicles”, which is min. 1 year old at the time of starting the trip.</p>
                     <hr ></hr>    
                  <h3>Are there any restricted areas?</h3>
               <p>Leh/Ladhakh, Spiti Valley & Kaza/Nako regions are not permitted to take PaynRent cars. Customer will be fully liable for any damages incurred to the car in that region.</p>
           </div>
      </div>
 )}