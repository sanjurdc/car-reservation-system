import { View,Text,Dimensions,StyleSheet,ScrollView } from "react-native";
import Inputs from "../ui component/Inputs";
import { getStoreData } from "../storage/AsyncStorage";
import { useState,useEffect } from "react";
import AppButton from "../ui component/AppButton";
import { useNavigation } from "@react-navigation/native";
import Setting from "./Setting";

const {width,height} = Dimensions.get('window')

export default function Profile(){

   var navigation=useNavigation()

    const [userInfo,setUserInfo] = useState('')

    const fetchAllUser=async()=>{
        var user = await getStoreData('USER')
       setUserInfo(user)
    }

    useEffect(()=>{
        fetchAllUser()
      },[])

     const handleUpdate=()=>{
       navigation.navigate('Setting')
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
               editable={false}
               value ={userInfo.mobile}
            />

               <Inputs 
               inputWidth={0.85}
               labelTxt='Email Id'
               autoCapitalize
               editable={false}
               value ={userInfo.email}
            />

               <Inputs 
               inputWidth={0.85}
               labelTxt='Name'
               autoCapitalize
               editable={false}
               value ={userInfo.name}
            />

               <Inputs 
               inputWidth={0.85}
               labelTxt='Birth Date'
               editable={false}
               value ={userInfo.birth}
            />

               <Inputs 
               inputWidth={0.85}
               labelTxt='Address'
               autoCapitalize
               editable={false}
               value ={userInfo.address}
            />

               <Inputs 
               inputWidth={0.85}
               labelTxt='Aadhar Number'
               editable={false}
               value ={userInfo.aadhar}
            />

               <Inputs 
               inputWidth={0.85}
               labelTxt='License Number'
               
               editable={false}
               value ={userInfo.license}
            />

            <View style={styles.button}>
            <AppButton 
            onPress ={handleUpdate}
            btnColor={"#96a2ba"}
            btnHeight={0.08}
            radius={10}
            btnTxt={'Update'}
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
    