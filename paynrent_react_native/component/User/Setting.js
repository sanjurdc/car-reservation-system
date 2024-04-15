import { useState,useEffect } from "react";
import { View,Text,StyleSheet,Dimensions,ScrollView } from "react-native";
import Inputs from "../ui component/Inputs";
import AppButton from "../ui component/AppButton";
import { getStoreData } from "../storage/AsyncStorage";
import { postData } from "../../Service/FetchNodeService";

const {width,height} =Dimensions.get('window')

export default function Setting(){

    const [mobile,setMobile] = useState('')
    const [email,setEmail] = useState('')
    const [name,setName] = useState('')
    const [birth,setBirth] = useState('')
    const [address,setAddress] = useState('')
    const [aadhar,setAadhar] = useState('')
    const [license,setLicense] = useState('')
    const [userId,setUserId] = useState('')
    

    const fetchAllUser=async()=>{
        var user = await getStoreData('USER')
        setName(user.name)
        setMobile(user.mobile)
        setEmail(user.email)
        setBirth(user.birth)
        setAddress(user.address)
        setAadhar(user.aadhar)
        setLicense(user.license)
        setUserId(user.userid)
    }

    useEffect(()=>{
        fetchAllUser()
      },[])

      const handleSubmit = async () => {
        var body = { mobile: mobile, email:email,name:name,  birth:birth,address:address,aadhar:aadhar,license:license,userid:userId }
        var response = await postData('user/edit_data', body)
        alert(response.message)
      }

    return(
        <View style={styles.container}>
            <ScrollView>
        <View style={styles.subContainer}>
        <View style={styles.heading}>
                   <View style={styles.line} />
                      <View>
                          <Text style={styles.text}>User Details</Text>
                      </View>
                   <View style={styles.line} />
                </View>

               <Inputs 
               inputWidth={0.85}
               labelTxt='Mobile Number'
               onChangeText={(txt)=>setMobile(txt)}
               value ={mobile}
            />

               <Inputs 
               inputWidth={0.85}
               labelTxt='Email Id'
               autoCapitalize
               onChangeText={(txt)=>setEmail(txt)}
               value ={email}
            />

               <Inputs 
               inputWidth={0.85}
               labelTxt='Name'
               autoCapitalize
               onChangeText={(txt)=>setName(txt)}
               value ={name}
            />

               <Inputs 
               inputWidth={0.85}
               labelTxt='Birth Date'
               onChangeText={(txt)=>setBirth(txt)}
               value ={birth}
            />

               <Inputs 
               inputWidth={0.85}
               labelTxt='Address'
               autoCapitalize
               onChangeText={(txt)=>setAddress(txt)}
               value ={address}
            />

               <Inputs 
               inputWidth={0.85}
               labelTxt='Aadhar Number'
               onChangeText={(txt)=>setAadhar(txt)}
               value ={aadhar}
            />

               <Inputs 
               inputWidth={0.85}
               labelTxt='License Number'
               autoCapitalize
               onChangeText={(txt)=>setLicense(txt)}
               value ={license}
            />

            <View style={styles.button}>
            <AppButton 
            onPress ={handleSubmit}
            btnColor={"#96a2ba"}
            btnHeight={0.08}
            radius={10}
            btnTxt={'Submit'}
            btnWidth={0.37}/>
            </View>
                         
        </View>
        </ScrollView>

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
       flex:1
    },
    subContainer:{
        width:width*0.95,
        height:height*1.2,
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
      marginLeft:100,
      marginTop:30
  },
  line:{
      flex: 1,
       height: 2, 
       backgroundColor: 'black'
  }
})