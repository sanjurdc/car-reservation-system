import { DrawerActions } from "@react-navigation/native"
import { Image,Avatar } from "@rneui/base"
import {View,Dimensions,StyleSheet} from "react-native"
import MCI from "react-native-vector-icons/MaterialCommunityIcons"
import { useNavigation } from "@react-navigation/native"
import { removeStoreData } from "../storage/AsyncStorage"
var {width,height} = Dimensions.get("window")

export default function AppHeader(){

    var navigation =useNavigation()

    let handleLogout=()=>{
      removeStoreData('USER')
      navigation.navigate('Login')
    }

    return(
        <View style={styles.mainContainer}>
            <MCI name="menu" size={28} style={{padding:20}} onPress={()=>navigation.dispatch(DrawerActions.openDrawer())}/>
            <Image style={styles.img} source={require('../assets/logo.png')} />
            <Avatar size={36} marginTop={15} marginRight={20} rounded source={require('../assets/user.png')} onPress={handleLogout} />
        </View>
    )
}


const styles=StyleSheet.create({
    mainContainer:{
        width:width,
        height:height*0.08, 
        display:'flex',
        justifyContent:'space-between',
        backgroundColor:'#fff',
        flexDirection:'row'
        },
    img :{
        width:120,
        height:55,
        resizeMode:'contain',
        marginTop:3
    } ,
      
    })