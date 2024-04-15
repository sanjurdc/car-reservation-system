import { View,Text,Dimensions, SafeAreaView, ScrollView,StyleSheet } from "react-native";

const {width,height}=Dimensions.get('window')

export default function Manual(){

return(
    <SafeAreaView>
        <View style={styles.mainContainer}>
            <ScrollView>
             <View style={styles.container}>
                  <Text style={styles.textHeading}>User Manual</Text>
            </View> 

            <View style={styles.firstBox}>
           <Text style={styles.heading}>
                What is Revv?
           </Text>
           <Text style={styles.subHeading}>
                Revv is a self drive car rental service that provides you with all the privacy, fun and convenience of your own car, without the hassles of owning and maintaining one. We drop and pick-up cars from your doorstep, so that you can spend time on the more important thing - your drive! The doorstep drop and pick-up of cars is our standard way of serving you, and is available throughout the areas served by us.
           </Text>
       </View>

       <View style={styles.secondBox}>
           <Text style={styles.heading}>
              Am I eligible to use Revv's services?
           </Text>
           <Text style={styles.subHeading}>
             To avail Revv's services, you must be at least 21 years old, and your driving license for "Light Motor Vehicles" must be at least 1 year old (at the time of starting the trip). Driving license printed on A4 sheet of paper (original or otherwise), driving license on Digilocker or M-Parivaahan app and commercial driving licenses will not be accepted.
           </Text>
       </View>

       <View style={styles.thirdBox}>
           <Text style={styles.heading}>
               Is there a "Kilometres limit" to how much I can drive?
           </Text>
           <Text style={styles.subHeading}>
               This depends on the pricing plan that you select. If you go for the “Unlimited kms” pricing plans (available only without fuel, and only for bookings whose duration is more than 72 hours), there is absolutely no limit to the kilometres that you can drive, and you have complete flexibility of driving the car as much as you want. Revv it up! Other pricing plans have a "Kilometres limit", which varies based on the plan selected. You can still drive beyond the kilometres limit, but the additional kilometres clocked will attract an additional charge.
           </Text>
       </View>

       <View style={styles.fourthBox}>
           <Text style={styles.heading}>
              Are there restrictions on where I can travel?
           </Text>
           <Text style={styles.subHeading}>
           All of our cars are equipped with an All India Tourist Permit, so you are free to drive anywhere in the country. All India Tourist Permit means that the car is legally permitted to ply in any state in the country, after paying the inter-state taxes at the state borders. However, we do not permit taking Revv vehicles to Leh/Ladakh region, Kaza/Nako region and spiti valley. We also advise you to avoid bad terrains (especially in non- SUV cars) and areas affected by civil unrest.

             Please note: Interstate taxes at the state borders are to be paid and borne by the customer. Our cars are equipped with Fast tag devices for your convenience. The toll charges incurred during your trip will be billed to you in your invoice.
           </Text>
       </View>

       <View style={styles.fifthBox}>
           <Text style={styles.heading}>
              Do I have to bring the car back to the same location?
           </Text>
           <Text style={styles.subHeading}>
               No, you can choose different delivery and pickup locations within the same city, without any extra cost other than the standard delivery/pickup charges. However, this option needs to be availed while creating of the booking, before it is confirmed. You may also modify the booking later, however, it will then attract applicable modification charges.
           </Text>
       </View>

       <View style={styles.secondBox}>
           <Text style={styles.heading}>
              Can I book a one-way trip?
           </Text>
           <Text style={styles.subHeading}>
              Yes, you can choose different delivery and pickup locations within the same city, without any extra cost other than the standard delivery/pickup charges. However, this option needs to be availed while creating of the booking, before it is confirmed. You may also modify the booking later, however, it will then attract applicable modification charges.
           </Text>
       </View>

       <View style={styles.sixthBox}>
           <Text style={styles.heading}>
               What kind of cars can I choose from?
           </Text>
           <Text style={styles.subHeading}>
                We have a curated selection of cars, which includes block-buster models across segments such as SUVs, ultra-luxury cars, hatchbacks and sedans. We are constantly increasing our portfolio; so keep a close watch for your favourite car, just in case we don’t have it already.
           </Text>
       </View>

       <View style={styles.seventhBox}>
           <Text style={styles.heading}>
               Is Revv 24/7?
           </Text>
           <Text style={styles.subHeading}>
                Yes, we are accessible 24x7. But as of now, we don’t allow bookings starting or ending between 12 midnight and 4 am.
           </Text>
       </View>
       <View style={styles.eightBox}>
           <Text style={styles.heading}>
              Is there any speed limit?
           </Text>
           <Text style={styles.subHeading}>
               125 Kms/Hr is the speed limit. Exceeding it will attract a penalty for over-speeding. In some states (e.g., Karnataka, Maharashtra, Delhi-NCR), some cars might be equipped with speed governors, which will automatically restrict the speed to 80Kms/Hr. This is as per government directives.
           </Text>
       </View>

            </ScrollView>
        </View>
    </SafeAreaView>
)
}

const styles = StyleSheet.create({

mainContainer:{
  display:'flex',
  justifyContent:'center',
  alignItems:'center',
  width:width,
  height:height,
  backgroundColor:'#EAB543'
},
container:{
  display:'flex',
  justifyContent:'center',
  alignItems:'center',
  marginTop:10,
},
textHeading:{
  fontFamily:"Roboto,sans-serif",
  fontSize:28,
  fontWeight:'bold',
  color:'#1e272e'
},
firstBox:{
  width:width*0.975,
  height:height*0.25,
  padding:10,
  borderRadius:10,
  borderWidth:1,
  borderColor:'#EA2027',
  backgroundColor:'#dfe6e9',
  marginTop:10
},
heading:{
  fontFamily:"Roboto,sans-serif",
  fontSize:18,
  fontWeight:'800',
  color:'#1e272e'
},
subHeading:{
  fontFamily:"Roboto,sans-serif",
  fontSize:16,
  fontWeight:'600',
  marginTop:5,
  color:'#1e272e'
},
secondBox:{
  width:width*0.98,
  height:height*0.23,
  padding:10,
  borderRadius:10,
  borderWidth:1,
  borderColor:'#EA2027',
  backgroundColor:'#dfe6e9',
  marginTop:10
},
thirdBox:{
  width:width*0.98,
  height:height*0.35,
  padding:10,
  borderRadius:10,
  borderWidth:1,
  borderColor:'#EA2027',
  backgroundColor:'#dfe6e9',
  marginTop:10
},
fourthBox:{
  width:width*0.98,
  height:height*0.4,
  padding:10,
  borderRadius:10,
  borderWidth:1,
  borderColor:'#EA2027',
  backgroundColor:'#dfe6e9',
  marginTop:10
},
fifthBox:{
  width:width*0.98,
  height:height*0.26,
  padding:10,
  borderRadius:10,
  borderWidth:1,
  borderColor:'#EA2027',
  backgroundColor:'#dfe6e9',
  marginTop:10
},
sixthBox:{
  width:width*0.98,
  height:height*0.21,
  padding:10,
  borderRadius:10,
  borderWidth:1,
  borderColor:'#EA2027',
  backgroundColor:'#dfe6e9',
  marginTop:10
},
seventhBox:{
  width:width*0.98,
  height:height*0.135,
  padding:10,
  borderRadius:10,
  borderWidth:1,
  borderColor:'#EA2027',
  backgroundColor:'#dfe6e9',
  marginTop:10
},
eightBox:{
  width:width*0.98,
  height:height*0.205,
  padding:10,
  borderRadius:10,
  borderWidth:1,
  borderColor:'#EA2027',
  backgroundColor:'#dfe6e9',
  marginTop:10,
  marginBottom:75
}
})