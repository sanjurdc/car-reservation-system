import { useState } from "react";
import { ServerURL } from "../../../Services/FetchNodeServices";
import { useSelector} from "react-redux";
import Swal from "sweetalert2";

export default function PaymentGateWay(){

    const [loading,setLoading]=useState(true)

    const user = useSelector(state=>state.userDetails)
    const userDetails = Object.values(user)[0]

    const netamount = useSelector(state=>state.total) 
    const total = netamount.total
  
    const gotoRozarpay=()=>{

    return(
        <div>
            {openPayModal()}
         </div>
    )
   }

    const openPayModal=async()=>{
    var rzp1=new window.Razorpay(options)
    await rzp1.open()
    setLoading(!loading)
    }

    var options = {
    key: 'rzp_test_GQ6XaPC6gMPNwH',        // Enter the Key ID generated from the Dashboard
    amount: total*100,          // Amount is in currency subunits. Default currency is INR. Hence, 50000 refers to 50000 paise
    currency: 'INR',
    name: 'PaynRent',
    "description": "Test Transaction",
    image: `${ServerURL}/images/logo.png`,   //This is a sample Order ID. Pass the `id` obtained in the response of Step 1

    handler: function (response){
        alert(response.razorpay_payment_id);
      //  alert(response.razorpay_order_id);
     //   alert(response.razorpay_signature)

        Swal.fire({
            icon: 'success',
            title: 'Transcation Succesfully',
            showConfirmButton: false,
            timer: 800
        })
        window.location.href=`/home`
    },
    prefill: {
        name: userDetails.name,
        email: userDetails.email,
        contact: userDetails.mobile
    },
    notes: {
        address: 'Razorpay Corporate Office' 
    },
    theme: {
        color:'#3399cc'
    }};

return(
    <div>
       {gotoRozarpay()}
    </div>
)
}
  