import { TouchableOpacity, View } from "react-native";

import { Dimensions } from "react-native";
import { Text } from "react-native";

var {width,height} =Dimensions.get("window")

export default function AppButton({btnWidth,btnHeight,btnTxt,radius,btnColor,...props}){

      
    return(
        <View>
            <TouchableOpacity {...props}>
              <View style={{ width:width*btnWidth,height:height*btnHeight,borderRadius:radius, backgroundColor:btnColor,display:'flex',justifyContent:'center',alignItems:'center'}}>
              

 <Text style={{fontSize:24,color:'#fff',borderRadius:radius, backgroundColor:btnColor,justifyContent:'center',alignItems:'center',fontWeight:800,paddingBottom:4}}>{btnTxt}</Text>
            
           </View>  
            </TouchableOpacity>
        </View>
    )
}

