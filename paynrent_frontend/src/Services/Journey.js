import React from "react";
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';

export default function Journey(){

    const theme = useTheme();
    const matches = useMediaQuery(theme.breakpoints.up('sm'));
  

    return(
        <div style={{marginTop:40}}>
            <h2 style={{marginLeft:8,color:'#63cdda',marginBottom:10}}>Our Journey so far</h2>
            
            <div style={{background:'#fff',width:'96%',height:matches?80:250,borderRadius:20,padding:10,display:'flex',paddingBottom:60}}> 
            
            <div style={{paddingTop:10}}>
                <img src='assets/happy.png' style={{width:50,height:50,position:'relative',left:matches?150:60,}} />
                <img src='assets/city.png' style={{width:70,height:50,position:'relative',left:matches?380:230}} />
                <img src='assets/km.png' style={{width:70,height:50,position:'relative',left:matches?550:50,top:matches?0:100}} />
                <img src='assets/star.png' style={{width:50,height:50,position:'relative',left:matches?760:210,top:matches?0:93}} />
                </div> 
                
                <h3 style={{position:'relative',right:matches?85:106,top:42,display:'block'}}>1M+</h3>
                <h3 style={{position:'relative',left:matches?135:-170,top:matches?40:190}}>20+Cities</h3>
                <h3 style={{position:'relative',left:matches?310:-10,top:45}}>50M+ </h3>
                <h3 style={{position:'relative',left:matches?530:-68,top:matches?50:190}}>4.8/5</h3>
                
                <div style={{position:'absolute'}}>
                <p style={{position:'relative',left:matches?110:30,top:70}}>
                    Happy PaynRenters
                </p>
                <p style={{position:'relative',left:matches?410:275,top:30}}>
               Across India
               </p>
               <p style={{position:'relative',left:matches?655:40,top:matches?0:140}}>
                Kms travelled <span style={{position:'relative',left:matches?165:107}}>20K+ reviewers</span>
                    </p>
               
                    
                </div>
                
                
               
                  
               
               
                
               
                
                
                    
                
               
                
                
                
            </div>
        </div>
    )
}