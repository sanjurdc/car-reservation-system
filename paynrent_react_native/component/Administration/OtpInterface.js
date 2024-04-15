import { View,Dimensions, StyleSheet,Text, TextInput,TouchableOpacity } from "react-native";
import { storeData } from "../storage/AsyncStorage";
import AppButton from "../ui component/AppButton";
import {postData } from "../../Service/FetchNodeService";
import { useNavigation } from "@react-navigation/native";
import { useState,useEffect,useRef } from "react";


const {width,height} =Dimensions.get("window")

export default function OtpInterface(props){

  var navigation =useNavigation()
  var pin1Ref =useRef('')
  var pin2Ref =useRef('')
  var pin3Ref =useRef('')
  var pin4Ref =useRef('')

  const [otp,setOtp]=useState('')
  const [txtOne,setTxtOne]=useState('')
  const [txtTwo,setTxtTwo]=useState('')
  const [txtThree,setTxtThree]=useState('')
  const [txtFour,setTxtFour]=useState('')
  const [seconds,setSeconds]=useState(true)
  const [time,setTime]=useState(30)
  const [refresh,setRefresh]=useState(false)

  var interval

  const handleTxtOne=(pin1)=>{
    if(pin1>=1)
   {   
    setTxtOne(pin1)         
    pin2Ref.current.focus()
 }
}

    const handleTxtTwo=(pin2)=>{
    if(pin2>=1)
    {   
        setTxtTwo(pin2)
        pin3Ref.current.focus()
    }
}

 const handleTxtThree=(pin3)=>{
    if(pin3>=1)
    {
        setTxtThree(pin3)
        pin4Ref.current.focus()
 }
}

 const handleTxtFour=(pin4)=>{
    if(pin4>=1)
  {
    setTxtFour(pin4)
    setOtp(txtOne+txtTwo+txtThree+pin4)
    props.onChangeText(txtOne+txtTwo+txtThree+pin4)
    
     }
}
   useEffect(function(){
  myTimer()
  },[]) 

  const myTimer=()=>{
  if(seconds)
  { var t=time
     interval=setInterval(()=>{
      if(t>0)
      {
        t=t-1
        setTime(t)
      }
      else
      {
        clearInterval(interval)
        setSeconds(false)
      }
    },1000)
    setRefresh(!refresh)
  }
 } 

  const validate=()=>{
    isValid =true
    if(!props.mobile)
    {
      handleError("Please Enter Mobile Number",'mobile')
      isValid = false
    }
    
    return isValid
  }

    const verifyOtp=async()=>{
        if(validate())
        {
         const response =await postData('user/check_user',{mobile:props.mobile})
         
         if(props.getOtp==otp)
         {
          if(response.status)
          {  
            storeData("USER",response.data)
            navigation.navigate('Home')
          }
          else{
            alert("Invalid Mobile Number or Password")
          }
        }
        else
        {
          alert('Incorrect OTP')
        }
        } 
    }

    return(
        <View style={styles.mainContainer}>
           <View style={styles.container}>

           <View style={styles.box}>
               <TextInput 
               ref={pin1Ref}
               maxLength={1} 
               blurOnSubmit={false} 
               onChangeText={(pin1)=>handleTxtOne(pin1)} 
               style={styles.txt}
               />
            </View>

            <View style={styles.box}>
               <TextInput 
               ref={pin2Ref}
               maxLength={1}
               blurOnSubmit={false} 
               onChangeText={(pin2)=>handleTxtTwo(pin2)} 
               style={styles.txt} 
               />
            </View>

            <View style={styles.box}>
               <TextInput
               ref={pin3Ref} 
               maxLength={1} 
               blurOnSubmit={false} 
               onChangeText={(pin3)=>handleTxtThree(pin3)} 
               style={styles.txt} 
               />
            </View>

            <View style={styles.box}>
               <TextInput 
               ref={pin4Ref}
               maxLength={1}
               onChangeText={(pin4)=>handleTxtFour(pin4)} 
               style={styles.txt} 
               />
            </View>
           </View> 

           <View style={styles.button}>
           {seconds?<Text style={styles.msg}>  Waiting for OTP : {time}</Text>:<TouchableOpacity onPress={props.handleOtp}><Text style={styles.msg}>Resend OTP</Text></TouchableOpacity>}
           </View>

           <View style={styles.button}>
              <AppButton 
               onPress ={verifyOtp}
               btnColor={"#fc4414"}
               btnHeight={0.08}
               radius={10}
               btnTxt="Verify"
               btnWidth={0.86}/>
           </View>
        </View>
    )
}

const styles=StyleSheet.create({

    mainContainer:{
        width:width,
        height:height*0.1,
        backgroundColor:'#dfe4ea',
      },
    container:{
       display:'flex',
       justifyContent:'space-evenly',
       alignItems:'center',
       flexDirection:'row',
       marginTop:5
      },
    box:{
        width:width*.17,
        height:height*.08,
        backgroundColor:'#fff',
        borderRadius:10,
        borderWidth:1,
        borderColor:'#3498db',
        padding:10,
        marginTop:10,
    },
      button:{
        marginLeft:30,
        marginTop:15
    },
    txt:{
        fontSize:22,
        paddingLeft:15,
        paddingTop:7
    },
    msg:{
        fontFamily:"Roboto,sans-serif",
        fontSize:18,
        fontWeight:'bold',
        textAlign:'center',
        color:'#1e272e'
    }
      
      
})