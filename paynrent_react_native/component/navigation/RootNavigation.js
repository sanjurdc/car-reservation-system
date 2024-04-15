import { useEffect,useState } from "react";
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { getStoreData,removeStoreData } from "../storage/AsyncStorage";
import AppHeader from "../ui component/AppHeader";
import MCI from "react-native-vector-icons/MaterialCommunityIcons";
import { Avatar } from '@rneui/themed';
import { createDrawerNavigator,DrawerContentScrollView,DrawerItemList,DrawerItem } from "@react-navigation/drawer";
import { View } from "react-native";
import { Text } from "@rneui/base";
import Login from "../Administration/Login";
import Registration from "../Administration/Registration";
import Home from "../User/Home";
import CarLists from "../User/CarLists";
import Booking from "../User/Booking";
import Manual from "../User/Manual";
import Contact from "../User/Contact";
import OtpInterface from "../Administration/OtpInterface";
import Profile from "../User/Profile";
import Setting from "../User/Setting";
import Bookings from "../User/Bookings";

var Stack= createNativeStackNavigator()
var Drawer = createDrawerNavigator()


export default function RootNavigation(){

  const[initialScreen,setInitialScreen] = useState(null)
  const[userInfo,setUserInfo] = useState('')


  useEffect(()=>{
    checkAuth()
 },[])

  const checkAuth =async()=>{
   var user = await getStoreData('USER')
   setUserInfo(user)
   if(!user)
   {
      setInitialScreen("Login")
   }
   else
   {  
       setInitialScreen("Home")
   }
  }

  const handleLogout=(props)=>{
    removeStoreData('USER')
    props.navigation.navigate('Login')
   }
    
   const handleManual=(props)=>{
    props.navigation.navigate('Manual')
   }

   const handleContact=(props)=>{
    props.navigation.navigate('Contact')
   }
   const handleOtp=(props)=>{
    props.navigation.navigate('OtpInterface')
   }

   const handleProfile=(props)=>{
    props.navigation.navigate('Profile')
   }

   const handleBookings=(props)=>{
    props.navigation.navigate('Bookings')
   }

    const ProjectDrawer=()=>{
      return(
        <Drawer.Navigator initialRouteName="Home" drawerContent={props=><CustomDrawerContent {...props} />} >
           <Drawer.Screen name="Home." component={Home} options={{headerShown:false, drawerIcon:()=><MCI name='home-city' size={24} />}} />
          
        </Drawer.Navigator>
      )
    } 

    const CustomDrawerContent=(props)=>{

        return(
            <DrawerContentScrollView {...props}>
              
              <View style={{display:'flex',flexDirection:'column',alignItems:'center',padding:20}} >
               <Avatar size={96} rounded source={require('../assets/user.png')}  />
               <Text style={{fontSize:16,fontWeight:800,marginTop:15}} >{userInfo.name}</Text>
               <Text style={{fontSize:14,fontWeight:800}} >+91-{userInfo.mobile}</Text>
               <Text style={{fontSize:14,fontWeight:700}} >{userInfo.email}</Text>
              </View>

              <DrawerItemList {...props} />
                <DrawerItem label="My Profile" onPress={()=>handleProfile(props)} icon={()=><MCI name='account' size={24} />} />
                <DrawerItem label="Bookings" onPress={()=>handleBookings(props)} icon={()=><MCI name='alpha-b-box-outline' size={24} />} />
                <DrawerItem label="Manual" onPress={()=>handleManual(props)} icon={()=><MCI name='book-open-outline' size={24} />} />
                <DrawerItem label="Contact Us" onPress={()=>handleContact(props)} icon={()=><MCI name='phone-message' size={24} />} /> 
                <DrawerItem label="Logout" onPress={()=>handleLogout(props)} icon={()=><MCI name='logout' size={24} />} />
                
             </DrawerContentScrollView>
        )
    }

     return(
      <NavigationContainer>
     {initialScreen?  <Stack.Navigator initialRouteName={initialScreen}  >
            <Stack.Screen name="Login" component={Login} options={{headerShown:false}} />
            <Stack.Screen name="Registration" component={Registration} options={{headerShown:false}} />
            <Stack.Screen name="Home"  component={ProjectDrawer} options={{header:AppHeader}}/>
            <Stack.Screen name="CarLists"  component={CarLists} options={{header:AppHeader}}/>
            <Stack.Screen name="Booking"  component={Booking} options={{header:AppHeader}}/>
            <Stack.Screen name="AppHeader"  component={AppHeader} options={{headerShown:false}} />
            <Stack.Screen name="Manual" component={Manual} options={{header:AppHeader}} />
            <Stack.Screen name="Contact" component={Contact} options={{header:AppHeader}} />
            <Stack.Screen name="Profile" component={Profile} options={{header:AppHeader}} />
            <Stack.Screen name="Setting" component={Setting} options={{header:AppHeader}} />
            <Stack.Screen name="Bookings" component={Bookings} options={{header:AppHeader}} />
            <Stack.Screen name="OtpInterface" component={OtpInterface} options={{headerShown:false}} />
            
        </Stack.Navigator> :<Text> Please Wait ... </Text> }
      </NavigationContainer>  
     )
}