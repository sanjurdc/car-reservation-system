import {useState} from "react"
import { View,Dimensions,StyleSheet,Text } from "react-native";
import Inputs from "../ui component/Inputs";
import { useNavigation } from "@react-navigation/native";
import AppButton from "../ui component/AppButton";
import OtpInterface from "./OtpInterface";

var {width,height}=Dimensions.get("window")

export default function Login({navigation}){

    var navigation =useNavigation()
    
    const[mobile,setMobile]=useState('')
    const[error,setError]=useState({})
    const[btnMsg,setBtnMsg]=useState('Login')
    const[btnStatus,setBtnStatus]=useState(false)
    const[getOtp,setGetOtp]=useState('')
    const[inputOtp,setInputOtp]=useState('')

    

    const handleLogin=()=>{
      if(mobile) 
      {
        if(btnMsg=='Change Mobile Number')
        { 
          setBtnStatus(false)
          setBtnMsg('Login')
          setMobile('')
        }
        else
        {   
        var otp=parseInt(Math.random()*8999)+1000
        alert(otp)
        setBtnStatus(true)
        setBtnMsg('Change Mobile Number')
        setGetOtp(otp)
        }
      }
      else
      {
          alert("Please Enter your Mobile Number")
      }
    }

    const handleOtp=()=>{
      var otp=parseInt(Math.random()*8999)+1000
      alert(otp)
      setBtnStatus(true)
      setBtnMsg('Change Mobile Number')
      setGetOtp(otp) 
    }

    const handleValues=(txt,val)=>{
     // setInput(preval=>({...preval,[val]:txt}))
     setMobile(txt)
    }

    const handleOtpChange=(value)=>{
      setInputOtp(value)
    }

    const handleError=(txt,val)=>{
         setError(preval=>({...preval,[val]:txt}))
    }

    const handleSignup=()=>{
      navigation.navigate('Registration')
    }


    return(
      
        /*  For First Input Box   */ 

        <View style={styles.container}>

          
          <View>
            <Text style={styles.heading}>
              Login/Sign up
            </Text>
          </View>
          
        <View style={styles.box}>
        <Inputs 
        iconName='phone'
        // onChangeText={(txt)=>handleValues(txt,'email')}
        onChangeText={(txt)=>handleValues(txt)}
        onFocus={()=>handleError(null,'mobile')}
        error={error.mobile}
        placeholder="Enter Mobile Number"
        inputWidth={0.9}
        value={mobile}
        />
      </View>
        
        { /*   For Button    */}

        <View style={styles.button}>
          <AppButton 
          onPress ={handleLogin}
          btnColor={"#96a2ba"}
          btnHeight={0.08}
          radius={10}
          btnTxt={btnMsg}
          btnWidth={0.87}
         />
        </View> 

        <View>
           {btnStatus?<OtpInterface mobile={mobile} inputOtp={inputOtp} onChangeText={handleOtpChange} handleLogin={handleLogin} handleOtp={handleOtp} getOtp={getOtp} />:<></>}
        </View>

        <View style={[{marginTop:70 }, btnStatus && {marginTop:170}]}>
          <Text style={styles.subHeading}>
             Don’t have an account?
          </Text>
        </View>
        
        <View style={styles.box}>
          <AppButton 
          onPress ={handleSignup}
          btnColor={"#96a2ba"}
          btnHeight={0.08}
          radius={10}
          btnTxt="Sign up"
          btnWidth={0.87}
         />
        </View>

      </View>
    )
}


const styles =StyleSheet.create({
 
  container:{
  width:'width',
  height:height,
  backgroundColor:'#dfe4ea',
  display:'flex',
  justifyContent:'center',
  alignItems:'center'
  },
  heading:{
    fontFamily:"Roboto,sans-serif",
    fontSize:28,
    fontWeight:'bold',
    color:'#1e272e'
  },
  box:{
    marginTop:20
  },
  button:{
    margin:5,
    marginTop:10
  },
  txt:{
    marginTop:30,
    
  },
  subHeading:{
    fontFamily:"Roboto,sans-serif",
    fontSize:20,
    fontWeight:'bold',
    color:'#1e272e'
  }
})