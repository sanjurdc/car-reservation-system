import { Divider } from "@material-ui/core";
import React, { useEffect, useState } from "react";
import SecondHeader from "../SecondHeader";
import Header from "./Header";
import FilterSideBar from "./FilterSideBar";
import FetchVehicles from "./FetchVehicles";
import { getData } from "../../../Services/FetchNodeServices";
import { Grid } from "@mui/material";


export default function ShowVehicle() {


    const [vehiclesList, setVehiclesList] = useState([])
    const [tempVehicleList, setTempVehicleList] = useState([])

    useEffect(function () {
        fecthAllVehicles()
    }, [])

    const fecthAllVehicles = async () => {
        const response = await getData('vehicle/display_all_vehicle')
        setVehiclesList(response.data)
        setTempVehicleList(response.data)
    }
    
    const vehicleList = () => {
        return vehiclesList.map((item) => {
            return (
                <div style={{ display: 'flex', justifyContent: 'center', marginTop: 20 }}>
                    <FetchVehicles item={item} />
                </div>)
        })
    }
   

    const filterSegment=(ids)=>{
        
        var company = Object.values(ids?.company?ids.company:{})
        var fueltype=Object.values(ids?.fuel?ids.fuel:{})
        var capacity=Object.values(ids?.capacity?ids.capacity:{})
         
      
        // for Company  //
       
        var company_str = ''       

        if(company.length>0)
        {
            for(var i=0;i<company.length;i++)
            {
                company_str = company_str + "item.companyid==" + company[i] + "||"
            }
           
            company_str = company_str.substring(0,company_str.lastIndexOf("||"))
          
        }
       
       var fuel_str =''

        if(fueltype.length>0)
        {
           for(i=0;i<fueltype.length;i++)
           {
            fuel_str=fuel_str + "item.fueltypeid==" + fueltype[i] +"||"
           }
           fuel_str = fuel_str.substring(0,fuel_str.lastIndexOf("||"))
        }
      
       var capacity_str = " "

       if(capacity.length>0)
       {
        for(i=0;i<capacity.length;i++)
        {
         capacity_str=capacity_str + "item.capacityid==" + capacity[i] +"||"
        } 
        capacity_str = capacity_str.substring(0,capacity_str.lastIndexOf("||"))
       }
    
       var final_query = ''

       if(company_str!== '')
       {
        final_query = final_query + company_str + " && "
       }
     
       if(fuel_str!== '')
       {
        final_query = final_query + fuel_str + " && "
       
       }
       
          if(capacity_str != " ")
          {
           final_query = final_query + capacity_str + " && "
          }
           
         if(capacity_str === " ")
         {
           final_query = final_query.substring(0, final_query.lastIndexOf('&&')-1)
         } 

         else if(fuel_str === " ")
         {
          final_query = final_query.substring(0, final_query.lastIndexOf('&&')-1 )
         }
          else if(company_str === " ")
           {
          final_query = final_query.substring(0, final_query.lastIndexOf('&&')-1 )
          }
         else 
         {
           final_query = final_query.substring(0, final_query.lastIndexOf('&&')-1 )
         }
       
      
       var temp=tempVehicleList.filter((item)=>{
        return eval(final_query)
        })
        setVehiclesList(temp)
    }  

    const filterOperations = (parameter) => {
    filterSegment(parameter)
    }



    return (
        <div>
            <div style={{ display: 'flex', flexDirection: 'column' }}>
                <div style={{ width: '100%' }}>
                    <Header />
                </div>
            </div>
            <Divider />
            <div style={{ display: 'flex', justifyContent: 'center', paddingTop: 1 }}>
                <div style={{ width: '100%' }}>
                    <SecondHeader />
                </div>
            </div>
            <Grid container spacing={1}>
                <Grid item xs={3} style={{ marginTop: 5 }}>
                    <div style={{ display: 'flex', justifyContent: 'center', paddingTop: 1, }}>
                        <div style={{ marginTop: 10 }}>
                            <FilterSideBar filterOperations={filterOperations} />
                        </div>
                    </div>
                </Grid>
                <Grid item xs={9} style={{ marginTop: 24, background: '#f6e58d' }}>
                    <div style={{ display: 'flex', flexWrap: 'wrap', marginTop: 30 }}>
                        {vehicleList()}
                    </div>
                </Grid>
            </Grid>
        </div>
    )
}