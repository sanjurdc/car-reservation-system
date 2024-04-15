import React from "react";
import {TextInput, StyleSheet, View ,Dimensions} from "react-native";
import {Text,Icon } from "@rneui/base";



var {width,height}=Dimensions.get("window")

export default function Inputs({labelTxt,textWidth,error,setValue,inputWidth,iconName,...props}){

    return(
        
          <View style={{ paddingLeft:6,width:width*inputWidth,marginTop:2,marginBottom:4 }}>
          {labelTxt? <Text style={{fontSize:16,fontWeight:'bold'}}>{labelTxt}</Text> :<></> }
           
          <View style={styles.textContainer}>
          <Icon name={iconName} style={{fontSize:22}}/>
          <TextInput
          fontSize={22}
          {...props}
          
    />
          </View>
       {error? <Text style={{fontSize:16,fontWeight:600,color:'red'}}>{error}</Text>:<></>}
        </View>   
    )
}


const styles =StyleSheet.create({
    textContainer:{
        width:width*.86,
        backgroundColor:'#fff',
        borderRadius:10,
        borderWidth:1,
        borderColor:'#3498db',
        padding:10,
        marginTop:10,
        display:'flex',
        flexDirection:'row',
        alignItems:'center',
        
    }
})