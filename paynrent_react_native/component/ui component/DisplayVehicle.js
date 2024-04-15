import {View,Dimensions,Image,Text,StyleSheet} from 'react-native'
import {ServerURL } from "../../Service/FetchNodeService";
import MI from "react-native-vector-icons/MaterialIcons";
import AppButton from "../ui component/AppButton";
import { useNavigation } from "@react-navigation/native"
import {useDispatch,useSelector} from 'react-redux'

const {width,height} =Dimensions.get("window")

export default function DisplayVehicle({item}){
 

    var navigation =useNavigation()
    var dispatch =useDispatch()
    
    var bookingDetails=useSelector(state=>state.booking)
    let day = bookingDetails.days
    var days=day + 1

    var amt= item.fare*130*days
    
      const handleBook=(item)=>{
        
      dispatch({type:"ADD_VEHICLE",payload:[item.vehicleid,item]})
      navigation.navigate("Booking")
      }
   
   

    return(
        
           <View style={styles.mainContainer}>
              <View style={styles.container}>
                <View>
                    <Image style={styles.img} source={{uri:`${ServerURL}/images/${item.icon}`}}/>
                  <View style={styles.container}>
                     <Image style={styles.fuelImg} source={require('../assets/petrol-pump.png')}/>
                     <Image style={styles.seatImg} source={require('../assets/seat.png')}/>
                  </View>

                  <View style={styles.subContainer}>
                     <Text style={styles.fuelType}>{item.fueltypename}</Text>
                     <Text style={styles.capacity}>{item.capacityno}</Text>
                  </View>
                </View>

                   <View style={styles.heading}>
                        <Text style={styles.company}>{item.companyname} {item.modelname}</Text>
                      <View style={styles.currency}>
                        <MI name="currency-rupee" size={32} style={{marginTop:6,color:'#000000'}} />
                        <Text style={styles.fare}>{amt}</Text>
                      </View> 

                      <View style={{marginLeft:30}}>
                          <AppButton btnWidth={0.35}
                           btnHeight={.08}
                           btnColor={'#fbc531'}
                           btnTxt="Book"
                           radius={20}
                           onPress={()=>handleBook(item)}
                           />
                      </View>
                    </View>
              </View>
              <Text style={styles.subHead}>230 kms | Prices exclude fuel cost</Text>
           </View>           
        
    )
   }


   const styles=StyleSheet.create({

    mainContainer:{
      width:width*0.95,
      height:height*0.235,
      backgroundColor:'#fff',
      borderRadius:15,
      borderWidth:1,
      flex:1
      },
    container :{
      display:'flex',
      flexDirection:"row"
      },
    img:{
      padding:10,
      width:200,
      height:80,
      resizeMode:'contain',
      marginTop:10
    },
    fuelImg:{
      padding:12,
      width:20,
      height:10,
      resizeMode:'contain',
      marginLeft:35,
      marginTop:12
    },
    seatImg:{
      padding:12,
      width:20,
      height:10,
      resizeMode:'contain',
      marginLeft:50,
      marginTop:12
    },
    subContainer:{
      display:'flex',
      flexDirection:'row',
      marginLeft:20
    },
    fuelType:{
      fontSize:16,
      fontWeight:'600',
      margin:7,
      marginTop:5
    },
    capacity:{
      fontSize:16,
      fontWeight:'600',
      marginLeft:20,
      marginTop:5
    },
    heading:{
      display:'flex',
      justifyContent:'center',
      alignItems:'center'
    },
    company:{
      fontSize:22,
      fontWeight:'800',
      paddingTop:10
    },
    currency:{
      display:'flex',
      flexDirection:'row',
      marginTop:7,
      marginLeft:15
    },
    fare:{
      fontSize:32,
      fontWeight:'700',
      color:'#000000'
    },
    subHead:{
      marginLeft:25,
      fontWeight:'700'
    }


    })