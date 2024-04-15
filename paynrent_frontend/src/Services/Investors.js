import React from "react";
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';

export default function Investors(){

  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.up('sm'));

    return(
        <div>
            <h2 style={{marginBottom:10,paddingLeft:10,color:'#63cdda'}}>Our Investors</h2>
            <div style={{background:'#fff',width:'98%',height:matches?170:330,borderRadius:20}}>
              <div style={{paddingLeft:35,paddingTop:35,display:'flex',justifyContent:'space-between',paddingRight:55}}>
                <img src="assets/toyota.png" style={{position:'relative',left:10,width:100,height:100}} />
                <img src="assets/tata.png" style={{position:'relative',left:matches?10:-90,top:matches?0:160,width:100,height:100}} />
                <img src="assets/mahindra.png" style={{position:'relative',left:matches?10:40,width:100,height:100}} />
                <img src="assets/maruti.png" style={{position:'relative',left:matches?10:-185,top:matches?0:50,width:120,height:100}} />
                <img src="assets/hyundai.png" style={{position:'relative',left:matches?10:-180,top:matches?0:160,width:100,height:100}} />
              </div>
              
            </div>
        </div>
    )
}