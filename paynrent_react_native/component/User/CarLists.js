import React, { useEffect, useState} from "react"
import {View,Dimensions} from 'react-native'
import { getData } from "../../Service/FetchNodeService";
import DisplayVehicle from "../ui component/DisplayVehicle";
import { SafeAreaView,FlatList, StyleSheet } from "react-native";

export default function CarLists(){

   const[vehicle,setVehicle]=useState([])

   const fetchAllVehicle=async()=>{
   let response=await getData('vehicle/display_all_vehicle')
   
   setVehicle(response.data)
   }

   useEffect(()=>{
   fetchAllVehicle()
    },[])

   
   const RenderItem =({item})=>{
     
   return(
   <View style={styles.itemStyle}>
   <DisplayVehicle item={item}/>
   </View>
   )}
   
   
   return(
      <SafeAreaView style={styles.container}>
         
        <FlatList 
        data = {vehicle} 
        renderItem = {({item})=>< RenderItem item={item} /> }
        keyExtractor={item => item.vehicleid}/>
        </SafeAreaView>
   )
}

const styles = StyleSheet.create({
   container: {
     flex: 1,
     backgroundColor:'blue'
   },
   itemStyle:{
      marginTop:10,
      paddingLeft:15
   }
})
