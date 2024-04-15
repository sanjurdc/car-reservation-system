import React, { useEffect, useState } from "react";
import { getData } from "../../../Services/FetchNodeServices";
import FilterSideBar from "./FilterSideBar";
import Header from "./Header";
import VehicleSubscription from "./VehicleSubscription";
import { useSelector } from "react-redux";

export default function SubscriptionDetails(props){

    const [vehiclesList,setVehiclesList]=useState([])
    const [tempVehicleList,setTempVehicleList]=useState([])

     
    var city=useSelector(state=>state.city)
    
     useEffect(function(){
        fetchAllVehicle()
     },[])

     const fetchAllVehicle=async()=>{
       var response=await getData('subvehicle/display_all_vehicle')
          setVehiclesList(response.data)
          setTempVehicleList(response.data)
     }

     const listVehicle=()=>{
        return vehiclesList.map((item)=>{
            return(
                <div style={{margin:5,padding:5}}>
                  <VehicleSubscription item={item} />    
                </div>
            )
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
        alert(JSON.stringify(temp))
        setVehiclesList(temp)
    }  

    const filterOperations = (parameter) => {
    filterSegment(parameter)
    }

     

    return(
          <div>
        <div>
            <Header />
        </div>
        <div style={{display:'inline-block', position:'absolute',width:'75%',left:320,flexWrap:'wrap'}}>
        <div style={{fontFamily:'Roboto',fontSize:28,fontWeight:600,margin:10,paddingLeft:20,color:'burlywood'}}>Subscription in {city.city}</div>
         {listVehicle()}
        </div>
        <div style={{background:'#f1f1f1',width:130,marginTop:10}}>
           
            <FilterSideBar filterOperations={filterOperations}/>
        </div>
        
        </div>
    )
}