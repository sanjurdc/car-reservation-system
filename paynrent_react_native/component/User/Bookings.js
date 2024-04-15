import { View,Text,StyleSheet,ScrollView,Dimensions,Image, TouchableOpacity } from "react-native";
import { ServerURL,getData } from "../../Service/FetchNodeService";
import { useState,useEffect } from "react";
import MCI from "react-native-vector-icons/MaterialCommunityIcons";

const {width,height}=Dimensions.get('window')

export default function Bookings(){

    const [booking,setBooking] =useState([])

    const fetchAllBookings=async()=>{
        let response = await getData('booking/display_all_bookings')
        setBooking(response.data)
        console.log(response.data)
      }

    useEffect(()=>{
        fetchAllBookings()
      },[])

    return(
        <View style={styles.mainContainer}>
            <ScrollView>
              <View style={styles.container}>
                <View style={styles.textLine} />
                    <View style={styles.head}>
                       <Text style={styles.heading}>
                          Booked History
                       </Text>
                    </View>
                <View style={styles.textLine} />
              </View>
            <TouchableOpacity>
                <View style={styles.box}>
                  <View style={styles.box1}>
                     <Text style={styles.subHeading}>
                        Transcation Id : psg5276@#!gs56
                     </Text>
                     <Text style={styles.subHeading}>
                        Booking Id : 1
                     </Text>
                  </View>  

                    <View style={styles.box2}>
                         <View>
                            <Image style={styles.img} source={require('../assets/car.png')}/>
                            <Text style={styles.subHead}>
                                Toyota Innova
                            </Text>
                         </View> 
                         
                      <View>
                        <View style={styles.city}>
                            <Text style={styles.subHead}>
                                City :
                            </Text>

                            <Text style={styles.company}>
                                Bhopal
                            </Text>
                        </View>
                        <View style={styles.amount}>
                            <Text style={styles.subHead}>
                                Amount :
                            </Text>
                            <MCI name='currency-inr' size={20} style={styles.location}/>
                            <Text style={styles.company}>
                                25000
                             </Text>
                        </View>
                        <View style={styles.status}>
                            <Text style={styles.subHead}>
                               Status :
                            </Text>
                            <Text style={styles.company}>
                                Booked
                            </Text>
                        </View>
                      </View>
                    </View> 
                    
                    <View style={styles.box1}>
                       <Text style={styles.date}>
                                Start Date : 10/06/2024
                        </Text>
                        <Text style={styles.date}>
                                End Date : 10/06/2024
                        </Text>
                    </View>
                </View>
             </TouchableOpacity>   
        </ScrollView>

        </View>
    )
}

const styles =StyleSheet.create({

    mainContainer:{
        flex:1,
        width:width,
        height:height,
        backgroundColor:'#ffeaa7',
        alignItems:'center'
    },
    container :{
        flexDirection: 'row',
        alignItems: 'center',
        marginTop:10,
        padding:10
      },
    textLine:{
        flex: 1,
        height: 2,
        backgroundColor: 'black'
      },
      heading:{
        fontFamily:"Roboto,sans-serif",
        fontSize:28,
        fontWeight:'bold',
        color:'#1e272e',
        paddingLeft:10,
        paddingRight:10
      },
      box:{
        width:width*0.95,
        height:height*0.212,
        backgroundColor:'#fdcb6e',
        marginTop:5,
        borderRadius:10,
        borderWidth:0.3,
      },
      box1:{
        paddingTop:8,
        flexDirection:'row',
        justifyContent:'space-evenly'
      },
      box2:{
        flexDirection:'row',
        paddingLeft:15,
        paddingTop:5
      },
      subHeading:{
        fontFamily:"Roboto,sans-serif",
        fontSize:16,
        fontWeight:'600',
        color:'#1e272e',
      },
      img:{
        width:150,
        height:70,
        resizeMode:'contain',
      },
      company:{
        fontFamily:"Roboto,sans-serif",
        fontSize:20,
        fontWeight:'600',
        color:'#1e272e',
        paddingLeft:5,
      },
      subHead:{
        fontFamily:"Roboto,sans-serif",
        fontSize:20,
        fontWeight:'bold',
        color:'#1e272e',
      },
      city:{
        marginTop:5,
        marginLeft:40,
        flexDirection:'row'
      },
      location:{
        marginLeft:5,
        marginTop:4
      },
      amount:{
        marginLeft:40,
        flexDirection:'row'
     },
      status:{
        marginLeft:40,
        flexDirection:'row'
      },
      date:{
        fontFamily:"Roboto,sans-serif",
        fontSize:16,
        fontWeight:'bold',
        color:'#1e272e',
      }
})