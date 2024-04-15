import { View,Text,Dimensions,StyleSheet,TextInput, SafeAreaView, ScrollView } from "react-native";
import AppButton from "../ui component/AppButton";
import { useState } from "react";
import MCI from "react-native-vector-icons/MaterialCommunityIcons";
const {width,height} =Dimensions.get("window")

export default function Contact(){

    const [name,setName] =useState('')
    const [mobile,setMobile] =useState('')
    const [email,setEmail] =useState('')
    const [message,setMessage] =useState('')

    return(
       <SafeAreaView>
        <View style={styles.mainContainer}>
            <ScrollView>
            <View style={styles.container}>
                <Text style={styles.heading}>Hello,</Text>
                <Text style={styles.subHeading}>Welcome to PaynRent</Text>
                <Text style={styles.subHeading}>Kindly send your feedback Here !</Text>
            </View>
            <View style={styles.box}>
                <TextInput placeholder="Enter Your Name" onChangeText={text => setName(text)} style={styles.text}/>
                <TextInput placeholder="Enter Your Mobile Number" onChangeText={text => setMobile(text)} style={styles.text} />
                <TextInput placeholder="Enter Your Email Id" onChangeText={text => setEmail(text)} style={styles.text}/>
                <TextInput placeholder="Enter Your Message" onChangeText={text => setMessage(text)} style={styles.text}/>
                <View style={styles.button}>
                <AppButton btnWidth={0.75}
                           btnHeight={.08}
                           btnColor={'#0984e3'}
                           btnTxt="Book"
                           radius={20}
                 />
                </View>
            </View>
            <View style={styles.container}>
                <Text style={styles.heading}>Our Address :</Text>
            </View>
            <View style={styles.company}>
            <Text style={styles.textCompany}>PaynRent Car Pvt. Ltd.</Text>
            </View>
            <View style={styles.contacts}>
            <MCI name='map-marker' style={styles.location}  />
            <Text style={styles.subHeading}>Vinay Nagar Sec - 1,Gwalior (M.P.) INDIA</Text>
            </View>
            <View style={styles.contacts}>
               <MCI name='phone' style={styles.phone}  /> 
               <Text style={styles.subHeading}>+91-7879202636, +91-8358953054</Text>
            </View>

            <View style={styles.contacts}>
               <MCI name='email' style={styles.phone}  /> 
               <Text style={styles.subHeading}>sanju.kushwah1205@gmail.com</Text>
            </View>

            <View style={styles.container}>
                <Text style={styles.heading}>Social Links :</Text>
            </View>

            <View style={styles.social}>
               <MCI name='facebook'  size={50} /> 
               <MCI name='instagram'  size={50} />
               <MCI name='twitter'  size={50} />
               <MCI name='youtube' size={50}  />
               <MCI name='linkedin' size={50}  />
            </View>

            <View style={styles.footer}>
                <Text style={styles.footHead}>© 2024 PaynRent. All Rights Reserved.</Text>
            </View>

          </ScrollView>
        </View>
    </SafeAreaView>     
    )
}

const styles = StyleSheet.create({

    mainContainer:{
      display:'flex',
      width:width,
      height:height,
      backgroundColor:'#f1f1f1'
    },
    container:{
        padding:10,
        marginLeft:10,
        marginTop:10
    },
    company:{
       marginLeft:20
    },
    textCompany:{
        fontFamily:"Roboto,sans-serif",
        fontSize:20,
        fontWeight:'800',
        color:'#1e272e'
    },
    heading:{
        fontFamily:"Roboto,sans-serif",
        fontSize:22,
        fontWeight:'800',
        color:'#1e272e'
      },
      subHeading:{
        fontFamily:"Roboto,sans-serif",
        fontSize:18,
        fontWeight:'600',
        marginTop:3,
        color:'#1e272e',
       },
       box:{
        width:width*0.975,
        height:height*0.47,
        paddingTop:20,
        marginLeft:5,
        marginTop:10,
        borderWidth:2,
        borderColor:'#1e272e',
        borderRadius:15,
    },
    button:{
        display:'flex',
        justifyContent:'center',
        alignItems:'center',
        marginTop:5
    },
    text:{
        borderWidth:0.5,
        margin:2 ,
        marginHorizontal:6,
        paddingLeft:10,
        height:60,
        borderRadius:10
    },
    location:{
        fontSize:22,
       marginLeft:15,
       marginTop:5,
       paddingRight:10
    },
    contacts:{
        flexDirection:'row',
        marginTop:10
    },
    phone:{
       fontSize:22,
       marginLeft:17,
       marginTop:5,
       paddingRight:10
    },
    social:{
       flexDirection:'row',
       justifyContent:'space-evenly',
       marginLeft:8,
       marginTop:5,
       paddingRight:10,
    },
    footer:{
        
        marginLeft:10,
        marginTop:20,
        marginBottom:80
    },
    footHead:{
        display:'flex',
        textAlign:'center',
        fontFamily:"Roboto,sans-serif",
        fontSize:16,
        fontWeight:'600',
        marginTop:3,
        color:'#1e272e',
    }
    
})