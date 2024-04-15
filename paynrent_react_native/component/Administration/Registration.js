import {View,Dimensions,StyleSheet,Text} from 'react-native'
import Inputs from '../ui component/Inputs'
import AppButton from '../ui component/AppButton'
import { useState } from 'react'
import { postData } from '../../Service/FetchNodeService'
import { useNavigation } from '@react-navigation/native'

const {width,height} =Dimensions.get("window")

export default function Registration(){

   var navigation=useNavigation()

    const [mobile,setMobile] = useState('')
    const [email,setEmail] = useState('')
    const [name,setName] = useState('')
    const [birth,setBirth] = useState('')
    const [address,setAddress]=useState('')
    const [aadhar,setAadhar] = useState('')
    const [license,setLicense] = useState('')

   const handleSubmit=async()=>{
      var formData=new FormData()
      formData.append('mobile',mobile)
      formData.append('email',email)
      formData.append('name',name)
      formData.append('birth',birth)
      formData.append('address',address)
      formData.append('aadhar',aadhar)
      formData.append('license',license)
      var response=await postData('user/userdetailssubmit', formData)
      if(response.status==true)
      {
         alert(response.message)
         navigation.navigate('Login')
      }
      else
      {
         alert(response.message)
         navigation.navigate('Registration')
      }
   }



return(
    <View style={styles.container}>
        <View style={styles.subContainer}>
        <View style={styles.heading}>
                   <View style={styles.line} />
                      <View>
                          <Text style={styles.text}>Registration</Text>
                      </View>
                   <View style={styles.line} />
                </View>
               <Inputs 
               inputWidth={0.85}
               placeholder="Enter Mobile Number"
               onChangeText={(txt)=>setMobile(txt)}
            />

               <Inputs 
               inputWidth={0.85}
               placeholder="Enter Email Address"
               onChangeText={(txt)=>setEmail(txt)}
            />

               <Inputs 
               inputWidth={0.85}
               placeholder="Enter Full Name"
               onChangeText={(txt)=>setName(txt)}
            />

               <Inputs 
               inputWidth={0.85}
               placeholder="Enter Birth Date"
               onChangeText={(txt)=>setBirth(txt)}
            />
            
               <Inputs 
               inputWidth={0.85}
               placeholder='Enter Address'
               onChangeText={(txt)=>setAddress(txt)}
            />

               <Inputs 
               inputWidth={0.85}
               placeholder="Enter Aadhar Number"
               onChangeText={(txt)=>setAadhar(txt)}
            />

               <Inputs 
               inputWidth={0.85}
               placeholder="Enter Driving License Number"
               onChangeText={(txt)=>setLicense(txt)}
            />

              <AppButton 
              btnWidth={0.45}
              btnHeight={0.08}
              btnTxt="Submit" 
              btnColor='#2ecc71'
              radius={15}
              onPress={handleSubmit}
              style={styles.button}/>
        </View>
    </View>
)

}

const styles = StyleSheet.create({
    container: {
       display:'flex',
       justifyContent:'center',
       alignItem:'center',
       backgroundColor:'#2c3e50',
       width:width,
       height:height,
       padding:10,
      // flex:1
    },
    subContainer:{
          width:width*0.95,
          height:height*0.97,
          backgroundColor:'#f2f2f2',
          paddingLeft:10,
          paddingRight:10,
          borderRadius:10
    },
    heading:{
        flexDirection: 'row', 
        alignItems: 'center',
        marginTop:10,
        padding:15
    },
    text:{
    width: 150, 
    textAlign: 'center',
    fontSize:24,
    },
    button:{
        marginLeft:80,
        marginTop:10
    },
    line:{
        flex: 1,
         height: 2, 
         backgroundColor: 'black'
    }
  })