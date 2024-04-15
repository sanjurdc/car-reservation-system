import * as React from 'react';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import DashboardIcon from '@mui/icons-material/Dashboard';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import PeopleIcon from '@mui/icons-material/People';
import BarChartIcon from '@mui/icons-material/BarChart';
import LayersIcon from '@mui/icons-material/Layers';
import { useNavigate } from 'react-router-dom';

export default function SideBar (){
  var navigate=useNavigate()
    return(<>
  <React.Fragment>
    <ListItemButton onClick={()=>navigate('/dashboard')}>
      <ListItemIcon>
        <DashboardIcon />
      </ListItemIcon>
      <ListItemText primary="Dashboard" />
    </ListItemButton>
    <ListItemButton onClick={()=>navigate('/dashboard/displayallcategory')}>
      <ListItemIcon>
        <ShoppingCartIcon />
      </ListItemIcon>
      <ListItemText primary="Category" />
    </ListItemButton>
    <ListItemButton onClick={()=>navigate('/dashboard/displayallsubcategory')}>
      <ListItemIcon >
        <PeopleIcon />
      </ListItemIcon>
      <ListItemText primary="Sub Category" />
    </ListItemButton>
    <ListItemButton onClick={()=>navigate('/dashboard/displayallcompany')}>
      <ListItemIcon>
        <BarChartIcon />
      </ListItemIcon>
      <ListItemText primary="Company" />
    </ListItemButton>
    <ListItemButton onClick={()=>navigate('/dashboard/displayallmodel')}>
      <ListItemIcon>
        <LayersIcon />
      </ListItemIcon>
      <ListItemText primary="Model" />
    </ListItemButton>
    <ListItemButton onClick={()=>navigate('/dashboard/displayallvehicle')}>
      <ListItemIcon>
        <LayersIcon />
      </ListItemIcon>
      <ListItemText primary="Vehicle" />
    </ListItemButton>
    <ListItemButton onClick={()=>navigate('/dashboard/displayallsubvehicle')}>
      <ListItemIcon>
        <LayersIcon />
      </ListItemIcon>
      <ListItemText primary="SubVehicle" />
    </ListItemButton>
    <ListItemButton onClick={()=>navigate('/dashboard/displayalloffer')}>
      <ListItemIcon>
        <LayersIcon />
      </ListItemIcon>
      <ListItemText primary="Offer" />
    </ListItemButton>
    <ListItemButton onClick={()=>navigate('/dashboard/displayallfeatured')}>
      <ListItemIcon>
        <LayersIcon />
      </ListItemIcon>
      <ListItemText primary="Featured" />
    </ListItemButton>
    <ListItemButton onClick={()=>navigate('/dashboard/displayallwhypnr')}>
      <ListItemIcon>
        <LayersIcon />
      </ListItemIcon>
      <ListItemText primary="Why PaynRent" />
    </ListItemButton>
  </React.Fragment>

  
  </>
);
}