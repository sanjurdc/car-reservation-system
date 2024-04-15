import { StyleSheet, View,Dimensions,Text,Image,TouchableOpacity,StatusBar, SafeAreaView, ScrollView} from "react-native"
import { ListItem } from '@rneui/themed';
import { useNavigation } from "@react-navigation/native";
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import {Icon, Divider } from "@rneui/base";
import { Dialog } from "@rneui/themed";
import { useEffect, useState } from "react";
import AppButton from "../ui component/AppButton";
import { getData } from "../../Service/FetchNodeService";
import { useDispatch } from "react-redux";
import DateDiff from 'date-diff';

var {width,height} =Dimensions.get("window")

export default function Home(){

  var navigation=useNavigation()
  var dispatch = useDispatch()

  const [city,setCity] =useState([])
  const [day,setDay] =useState('')
  const [days,setDays] =useState('')
  const [selectCity,setSelectCity] = useState('Gwalior')
  const [visible, setVisible] = useState(false);
  const [selectedStartDate, setSelectedStartDate] = useState();
  const [selectedEndDate, setSelectedEndDate] = useState();
  const [datePickerVisible, setDatePickerVisible] = useState(false);
  const [datePickerVisible1, setDatePickerVisible1] = useState(false);
  

  const fetchAllCity =async()=>{
    const response = await getData('user/display_all_city')
    setCity(response.data)
  }

  useEffect(()=>{
    fetchAllCity()
  },[])

  const ShowCity =()=>{
    return city.map((item,index)=>{
      return (
        <ListItem key={index}>
             <Text style={{fontSize:24,fontWeight:800,}} onPress={()=>handleSelectCity(item.cityname)} key={item.id}>{item.cityname}</Text>  
        </ListItem>
     )
    })
  }

  const handleSelectCity =(selectedCity)=>{

         setSelectCity(selectedCity)
         setVisible(!visible);
  }

  
  const showDatePicker = () => {
     setDatePickerVisible(true);
  };


  const showDatePicker1 = () => {
    setDatePickerVisible1(true);
  };

  const hideDatePicker = () => {
    setDatePickerVisible(false);
  };

  const handleStartConfirm = (date) => {
   setSelectedStartDate(date);
   hideDatePicker();
  };

  

  const handleEndConfirm = (date) => {
    setSelectedEndDate(date);
    dateDiff(date)
    hideDatePicker();
  };

  
  const toggleDialog = () => {
    setVisible(!visible);
  };

    const dateDiff=(et)=>{
    var startDay=new Date(selectedStartDate)
    var endDay=new Date(et)
    var diff = Math.abs(endDay-startDay)
    var diffDay=Math.floor(diff/1000)
    var days=(Math.floor(diffDay/86400))
    setDay(days)
    daydiff(days)
    }

    const daydiff=(days)=>{
       setDays("Duration : "+ days+" " +"days")
    }

     const handleSearch =()=>{
      if(city && selectedStartDate && selectedEndDate)
      {
        dispatch({type:'ADD_CITY',payload:{cities:selectCity}})
        dispatch({type:'ADD_BOOKING',payload:{start:selectedStartDate.toLocaleDateString(),end:selectedEndDate.toLocaleDateString(),days:day}})  
        navigation.navigate("CarLists")
      }
      else
      {
        alert("Please Select Date")
      }
     }
  
    return(
      <SafeAreaView style={{ flex: 1 }}> 
        <View style={styles.mainContainer}>
            <View style={styles.container}>
                 <View>
                      <Image style={styles.img} source={require('../assets/logo-rentals.png')}/>
                      <Text style={styles.text1}>Self drive car rentals in India</Text>
                     
                      <TouchableOpacity onPress={toggleDialog}>
                      <View style={styles.cityButton}>
                      <Icon name='location-on' style={styles.location}/>
                      <Text style={styles.textCity}>{selectCity}</Text>
                      </View>
                      </TouchableOpacity>
                  </View>

            <View style={styles.datePick}>
                
                 <TouchableOpacity onPress={showDatePicker}>
                     <View style={styles.startDate}>
                       <Icon name='calendar-month' style={{fontSize:22}}/>
                         <Text style={styles.textDate}>
                            {selectedStartDate ? selectedStartDate.toLocaleDateString(): 'Start Date'}
                         </Text> 
                     </View>
                 </TouchableOpacity>

                     <DateTimePickerModal
                         isVisible={datePickerVisible}
                         mode="date"
                         minimumDate={new Date()}
                         maximumDate={new Date('2050-11-20')}
                         date={selectedStartDate}
                         onConfirm={handleStartConfirm}
                         onCancel={hideDatePicker}
                      /> 
                       
                       <TouchableOpacity onPress={showDatePicker1} >
                    <View style={styles.endDate}>
                       <Icon name='calendar-month' style={{fontSize:22,paddingLeft:10}}/>
                       <Text style={styles.textDate}>
                          {selectedEndDate ? selectedEndDate.toLocaleDateString() : 'End Date'}
                       </Text> 
                    </View>
                  </TouchableOpacity>  

                  <DateTimePickerModal
                         isVisible={datePickerVisible1}
                         mode="date"
                         minimumDate={new Date(selectedStartDate)}
                         maximumDate={new Date('2050-11-20')}
                         date={selectedEndDate}
                         onConfirm={handleEndConfirm}
                         onCancel={hideDatePicker}
                        />
            </View>

              <View>
                <Text style={styles.day}> {days}</Text>
              </View>
                      <View style={{marginLeft:8,marginTop:3}}>
                         
                           <AppButton 
                           btnWidth={0.86}
                           btnHeight={.075}
                           btnColor={'#3498db'}
                           btnTxt="Search"
                           radius={30}
                           onPress={handleSearch}
                           />
                        </View>
                    </View> 
            
          
            <Dialog
             isVisible={visible}
             onBackdropPress={toggleDialog}
            >
                  <ScrollView>
                      <Text style={{fontSize:24,fontWeight:800}}>Select City</Text>
                         <Divider width={1.5} marginTop={15} />
                            {ShowCity()}
                  </ScrollView>
            </Dialog>

        </View>
     </SafeAreaView>   
    )
    }

    const styles=StyleSheet.create({

      mainContainer:{
        width:width,
        height:height,
        display:'flex',
        justifyContent:'center',
        alignItems:'center',
        padding:10,
        backgroundColor:'#2c3e50'
        },

        container:{
          width:width*.95,
          height:height*0.48,
          backgroundColor:'#bdc3c7',
          borderRadius:10,
          padding:10
        } ,
        img:{
          marginLeft:90,
          padding:10,
          width:170,
          height:50,
          resizeMode:'contain',
          marginTop:20
        },
        text1:{
          fontFamily:'poppins',
          fontSize:20,
          textAlign:'center',
          marginTop:10
        },
        cityButton:{
          width:width*.86,
          height:height*.08,
          backgroundColor:'#fff',
          borderTopLeftRadius:10,
          borderTopRightRadius:10,
          borderTopWidth:2,
          borderBottomWidth:1,
          borderLeftWidth:2,
          borderRightWidth:2,
          borderColor:'#3498db',
          marginLeft:6,
          marginTop:25,
          display:'flex',
          alignItems:'center',
          flexDirection:'row'
        },
        location:{
          fontSize:22,
          paddingLeft:14
        },
        textCity:{
          fontSize:22,
          paddingLeft:10,
          fontWeight:'600',
          color:'#222f3e'
        },
        datePick:{
          display:'flex',
          flexDirection:'row',
          paddingLeft:6
        },
        startDate:{
          width:width*.43,
          height:height*.08,
          backgroundColor:'#fff',
          borderBottomLeftRadius:10 ,
          borderBottomWidth:2,
          borderLeftWidth:2,
          borderRightWidth:1,
          borderTopWidth:0.5,
          borderColor:'#3498db',
          padding:10,display:'flex',
          alignItems:'center',
          flexDirection:'row'
        },
        textDate:{
          fontSize: 20, 
          fontWeight: 'bold', 
          marginLeft: 10
        },
        endDate:{
          width:width*.43,
          height:height*.08,
          backgroundColor:'#fff',
          borderBottomRightRadius:10,
          borderBottomWidth:2,
          borderLeftWidth:.5,
          borderRightWidth:2,
          borderTopWidth:0.5,
          borderColor:'#3498db',
          display:'flex',
          alignItems:'center',
          flexDirection:'row'
        },
        day:{
          fontSize:18,
          textAlign:'center',
          paddingTop:5
        }
      })



