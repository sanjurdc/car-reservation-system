import { Icon,Divider } from '@rneui/base'
import {View,Dimensions,StyleSheet,Text,Image,TouchableOpacity, SafeAreaView} from 'react-native'
import MI from "react-native-vector-icons/MaterialIcons";
import AppButton from '../ui component/AppButton';
import { Dialog } from "@rneui/themed";
import { ScrollView } from 'react-native';
import { ListItem } from '@rneui/themed';
import {useEffect, useState} from 'react'
import { useDispatch,useSelector } from 'react-redux';
import { getData,ServerURL } from '../../Service/FetchNodeService';
import { getStoreData } from '../storage/AsyncStorage';
import RazorpayCheckout from 'react-native-razorpay';

const {width,height}= Dimensions.get("window")

export default function Booking(){

    let dispatch=useDispatch()
    
    let bookingDetails = useSelector(state=>state.booking)
    let day = bookingDetails.days
    var days=day + 1
      
    let currentCity = useSelector(state=>state.city)
   
    let vehicles = useSelector(state=>state.vehicle)
    let vehicleDetails = Object.values(vehicles)[0]
    
    const [visible, setVisible] = useState(false);
    const [city,setCity] = useState([])
    const[userInfo,setUserInfo] = useState('')
    
   var fare =vehicleDetails.fare*130*days
  
   var total_amount = parseInt(fare) + parseInt(3000)
   
    const toggleDialog = () => {
        setVisible(!visible);
      };

      const handleCity=()=>{
        setVisible(true)
      }

      const fetchAllCity=async()=>{
        let response = await getData('user/display_all_city')
        setCity(response.data)
      }
      
      useEffect(()=>{
        fetchAllCity()
      },[])
    
      const handleSelectCity =(selectedCity)=>{
        dispatch({type:'ADD_CITY',payload:{cities:selectedCity}})
             setVisible(!visible);
      }

      
    
      const ShowCity =()=>{
        return city.map((item,index)=>{
          return (
            <ListItem key={index}>
                 <Text style={styles.company} onPress={()=>handleSelectCity(item.cityname)} key={item.id}>{item.cityname}</Text>  
            </ListItem>
         )
        })
      }
       
      useEffect(()=>{
        checkAuth()
     },[])
    
      const checkAuth =async()=>{
       var user = await getStoreData('USER')
       setUserInfo(user)
      }

      
      var options = {
        description: 'Credits towards car rent',
       image: 'https://i.imgur.com/3g7nmJC.png',
        currency: 'INR',
        key: 'rzp_test_GQ6XaPC6gMPNwH', // Your api key
        amount: total_amount*100,
        name: 'PaynRent' ,
        prefill: {
          email: userInfo.email,
          contact: '+91'+userInfo.mobile,
          name: userInfo.name
        },
        theme: {color: '#F37254'}
      }

  const handlePayment=()=>{
    
      RazorpayCheckout.open(options).then((data) => {
      // handle success
      alert(`Success: ${data.razorpay_payment_id}`);
    }).catch((error) => {
      // handle failure
      alert(`Error: ${error.code} | ${error.description}`);
    })
   
  }

      
    return(

      <SafeAreaView style={styles.newContainer}>
        <View style={styles.mainContainer}>
           <ScrollView>
            <View style={styles.subContainer}>
                <View style={styles.box}>
                   <View style={styles.textLine} />
                      <View>
                          <Text style={styles.text}>Booking Details</Text>
                      </View>
                   <View style={styles.textLine} />
                </View>
                     <View style={styles.container}>
                        <View style={styles.heading}> 
                            <Text style={styles.company}>{vehicleDetails.companyname}</Text>
                            <Text style={styles.model}>{vehicleDetails.modelname}</Text>
                        </View> 
                        
                         <View style={{marginLeft:30 }}>
                            <Image style={styles.img} source={{uri:`${ServerURL}/images/${vehicleDetails.icon}`}}/>
                         </View>
                     </View>

                     <View style={styles.feature}>
                         <Image style={styles.featureImg} source={require('../assets/petrol-pump.png')}/>
                         <Text style={styles.fuel}>{vehicleDetails.fueltypename}</Text>
                         <Image style={styles.featureImg} source={require('../assets/seat.png')}/>
                         <Text style={styles.capacity}>{vehicleDetails.capacityno}</Text>
                         <Image style={styles.featureImg} source={require('../assets/transmission.png')}/>
                         <Text style={styles.capacity}>{vehicleDetails.remark}</Text>
                     </View>
                          <Text style={styles.remark}>130 kms | Prices exclude fuel cost</Text>
            </View>
            <View style={styles.firstSubContainer}>
                   <Text style={styles.diff}>
                      {bookingDetails.days} days
                   </Text>
                   <Text style={styles.date}>
                       {bookingDetails.start}   --------------  {bookingDetails.end}
                   </Text>
                </View>

                <View style={styles.secondSubContainer}>
                    <View style={styles.thirdBox}>
                        <Icon name='location-on' style={styles.location}/>
                        <Text style={styles.city}> {currentCity.cities} </Text>
                        
                    </View>
                       <TouchableOpacity onPress={handleCity}>
                            <View >
                                <Text style={styles.textCity}>Change City</Text>
                            </View>
                        </TouchableOpacity>
                 </View>   

                      <View style={styles.thirdSubContainer}>
                          <View style={styles.fourthBox}>
                             <View style={styles.textLine} />
                          <View>
                          <Text style={styles.textFare}>Fare Details</Text>
                      </View>
                          <View style={styles.textLine} />
                 </View>
                    <View style={styles.textBaseFare}>
                        <Text style={styles.font}>Base fare</Text> 
                        <MI name="currency-rupee" size={18} style={{marginTop:3,marginLeft:200}} />
                        <Text style={styles.font}>{fare}</Text>
                    </View>
                    <View style={styles.pickup}>
                        <Text style={styles.font}>Doorstep delivery & pickup</Text> 
                        <MI name="currency-rupee" size={18} style={{marginTop:3,marginLeft:65}} />
                        <Text style={styles.font}>500</Text>
                    </View>
                    <View style={styles.pickup}>
                       <Text style={styles.font}>Refundable security deposit</Text> 
                       <MI name="currency-rupee" size={18} style={{marginTop:3,marginLeft:55}} />
                       <Text style={styles.font}>2500</Text>
                    </View>
                    <View style={styles.pickup}>
                       <Text style={styles.font}>Insurance & GST</Text> 
                       <Text style={styles.included}>Included</Text>
                    </View>
                    <Divider width={2} style={{marginTop:15}}/>
                    <View style={styles.totalAmt}>
                       <Text style={styles.company}>Total</Text> 
                       <MI name="currency-rupee" size={24} fontWeight={800} style={{marginTop:5,marginLeft:222}} />
                       <Text style={styles.company}>{total_amount}</Text>
                    </View>
                    <Divider width={2} style={{marginTop:15}}/>
                    <View style={styles.kms}>
                      <Text style={styles.font}>Kms limit</Text> 
                      <Text style={{fontSize:18,marginLeft:210}}>230 kms</Text>
                    </View>
                    <View style={styles.pickup}>
                      <Text style={styles.font}>Fuel</Text> 
                      <Text style={styles.exclude}>Excluded</Text>
                    </View>
                    <View style={styles.pickup}>
                      <Text style={styles.font}>Total</Text> 
                      <MI name="currency-rupee" size={18}  style={{marginTop:5,marginLeft:242}} />
                      <Text style={styles.font}>{total_amount}</Text>
                    </View>
                    <View style={styles.button}>
                       <AppButton onPress={()=>handlePayment()} btnWidth={0.4} btnHeight={0.075} radius={10} btnColor='#7ed6df' btnTxt="Proceed"  />
                    </View>
            </View>
            <Dialog
      isVisible={visible}
      onBackdropPress={toggleDialog}
      style={{flex:1}}
    >
      
       <ScrollView>
      <Text style={styles.company}>Select City</Text>
      <Divider width={1.5} marginTop={15} />
      {ShowCity()}
       </ScrollView> 
      </Dialog>
      </ScrollView>
        </View>
        
      </SafeAreaView>
        
    )
}

const styles=StyleSheet.create({
  mainContainer:{
     width:width,
     height:height,
     padding:10,
     backgroundColor:'#f1ff',
     flex:1
    },
  newContainer:{
    flex: 1,
     },
  
    subContainer:{
        width:width*0.95,
        height:height*0.323,
        backgroundColor:'#f1f1f1',
        marginTop:5,
        borderRadius:10,
        borderWidth:0.3
      } ,
      firstSubContainer:{
        width:width*0.95,
        height:height*0.1,
        backgroundColor:'#f1f1f1',
        marginTop:5,
        borderRadius:10,
        borderWidth:0.3
      },
      secondSubContainer:{
        width:width*0.95,
        height:height*0.1,
        backgroundColor:'#f1f1f1',
        marginTop:5,
        borderRadius:10,
        borderWidth:0.3,
        flexDirection:'row'
      },
      thirdSubContainer:{
        width:width*0.95,
        height:height*0.56,
        backgroundColor:'#f1f1f1',
        marginTop:5,
        borderRadius:10,
        borderWidth:0.3
      },
      diff:{
        display:'flex',
        textAlign:'center',
        marginTop:15,
        fontSize:16,
        fontWeight:'800'
      },
      date:{
        display:'flex',
        textAlign:'center',
        fontSize:20,
        fontWeight:"900",
        paddingLeft:5,
        paddingRight:5
      },
      box :{
        flexDirection: 'row',
        alignItems: 'center',
        marginTop:10,
        padding:15
      },
      textLine:{
        flex: 1,
        height: 1,
        backgroundColor: 'black'
      },
      text:{
        width: 200, 
        textAlign: 'center',
        fontSize:24,
        fontWeight:"700"
      },
      container:{
        display:'flex',
        flexDirection:'row'
      },
      heading:{
        marginTop:30,
        paddingLeft:15
      },
      company:{
        fontSize:24,
        fontWeight:'800'
      },
      model:{
        fontSize:22,
        fontWeight:'600',
        marginLeft:3
      },
      img:{
        width:250,
        height:120,
        resizeMode:'contain'
      },
      feature:{
        display:'flex',
        flexDirection:'row',
        marginTop:5
      },
      featureImg:{
        width:20,
        height:20,
        resizeMode:'contain',
        marginLeft:35,
        marginTop:5
      },
      fuel:{
        fontSize:16,
        fontWeight:'600',
        marginLeft:5,
        marginTop:5
      },
      capacity:{
        fontSize:16,
        fontWeight:'600',
        marginTop:5,
        marginLeft:10
      },
      remark:{
        padding:10,
        fontWeight:'800',
        marginLeft:24
      },
      thirdBox:{
        width:width*.51,
        height:height*.08,
        backgroundColor:'#fff',
        borderRadius:10 ,
        borderWidth:1,
        borderColor:'#3498db',
        marginLeft:12,
        flexDirection:'row',
        marginTop:8
      },
      location:{
        fontSize:22,
        paddingLeft:10,
        marginTop:17
      },
      city:{
        fontSize:22,
        paddingLeft:20,
        fontWeight:'600',
        color:'#222f3e',
        marginTop:15
      },
      textCity:{
        fontSize:20,
        marginLeft:20,
        fontWeight:'600',
        color:'#222f3e',
        marginTop:25
      },
      fourthBox:{
        flexDirection: 'row', 
        alignItems: 'center',
        marginTop:10,
        padding:15
      },
      textFare:{
        width: 150, 
        textAlign: 'center',
        fontSize:24,
        fontWeight:'700'
      },
      textBaseFare:{
        flexDirection:'row',
        paddingLeft:10,
        paddingRight:10
      },
      font:{
        fontSize:18
      },
      pickup:{
        flexDirection:'row',
        paddingLeft:10,
        paddingRight:10,
        paddingTop:5
      },
      totalAmt:{
        flexDirection:'row',
        paddingLeft:10,
        paddingRight:10,
        paddingTop:10
      },
      kms:{
        flexDirection:'row',
        paddingLeft:10,
        paddingRight:10,
        paddingTop:15
      },
      included:{
        fontSize:18,
        marginLeft:150
      },
      exclude:{
        fontSize:18,
        marginLeft:252
      },
      button:{
        display:'flex',
        justifyContent:'center',
        alignItems:'center',
        marginTop:10
      }
      
     
       

})