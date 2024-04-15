import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import { Grid,Avatar } from '@mui/material'
import SideBar from './Sidebar';
import Category from "../Category/Category";
import DisplayAllCategory from "../Category/DisplayAllCategory";
import SubCategory from "../SubCategory/SubCategory"
import DisplayAllSubCategory from "../SubCategory/DisplayAllSubCategory"
import Company from "../Company/Company"
import DisplayAllCompany from "../Company/DisplayAllCompany"
import Model from "../Model/Model";
import DisplayAllModel from "../Model/DisplayAllModel";
import Vehicle from "../Vehicle/Vehicle";
import DisplayAllVehicle from "../Vehicle/DisplayAllVehicle";
import Offer from '../Offer/Offer';
import DisplayAllOffer from '../Offer/DisplayAllOffer'
import Featured from '../Featured/Featured';
import DisplayAllFeatured from '../Featured/DisplayAllFeatured';
import Whypnr from '../Whypnr/Whypnr';
import DisplayAllWhypnr from '../Whypnr/DiaplayAllWhypnr';
import { BrowserRouter as Router,Routes,Route } from "react-router-dom";
import { isValidAuth } from '../../../Services/FetchNodeServices';
import SubVehicle from '../Vehicle/SubVehicle';
import DisplayAllSubVehicle from '../Vehicle/DisplayAllSubVehicle';

export default function Dashboard() {
   
  const [auth,setAuth]=React.useState(false)
  
 /* const authCheck=async()=>{
    var result=await isValidAuth()
      if(result.auth)
   {
         setAuth(true) 
     }
     else
     {
      setAuth(false)
     }
    } 

    React.useEffect(function(){
      authCheck()
    })
    */

  return (
    <div>
      
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
          >
            <MenuIcon />
          </IconButton>

          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                  PaynRent
          </Typography>
          <Avatar alt="Remy Sharp" src="/assets/bike.png" />
        </Toolbar>
      </AppBar>

      <Grid container spacing={2}>
        <Grid item xs={12}>
          <div style={{paddingLeft:15,paddingTop:15}}>
            <img src='/assets/logo.png' style={{width:100}}/>
          </div>
        </Grid>

        <Grid item xs={2}>
            <SideBar/>
        </Grid>
        
        <Grid item xs={10}>
        <Routes>
          <Route element={<Category/>} path="/category" />
          <Route element={<DisplayAllCategory/>} path="/displayallcategory" />
          <Route element={<SubCategory/>} path="/subcategory" />
          <Route element={<DisplayAllSubCategory/>} path="/displayallsubcategory" />
          <Route element={<Company/>} path="/company" />
          <Route element={<DisplayAllCompany/>} path="/displayallcompany" />
          <Route element={<Model/>} path="/model" />
          <Route element={<DisplayAllModel/>} path="/displayallmodel" />
          <Route element={<Vehicle/>} path="/vehicle" />
          <Route element={<DisplayAllVehicle/>} path="/displayallvehicle" />
          <Route element={<SubVehicle/>} path="/subvehicle" />
          <Route element={<DisplayAllSubVehicle/>} path="/displayallsubvehicle" />
          <Route element={<Offer/>} path="/offer" />
          <Route element={<DisplayAllOffer/>} path="/displayalloffer" />
          <Route element={<Featured/>} path="/featured" />
          <Route element={<DisplayAllFeatured/>} path="/displayallfeatured" />
          <Route element={<Whypnr/>} path="/whypnr" />
          <Route element={<DisplayAllWhypnr/>} path="/displayallwhypnr" />
          </Routes>
        </Grid>
      </Grid>
    </Box>
    </div>
  );
}
