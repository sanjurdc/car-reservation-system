const initialState={
    booking:{}, 
    userDetails:{},
    vehicle:{},
    city:{},
    subscription:{},
    month:{},
    log:{},
    amount:{},
    total:{},
    anchorE1:{}
}

export default function RootReducer(state=initialState,actions){
    switch(actions.type)
    {
        case 'ADD_BOOKING':
            console.log(actions)
        state.booking=actions.payload
        return {booking:state.booking,userDetails:state.userDetails,vehicle:state.vehicle,city:state.city,subscription:state.subscription,month:state.month,log:state.log,amount:state.amount,total:state.total,anchorE1:state.anchorE1}

        case 'ADD_USER':
           
        state.userDetails[actions.payload[0]]=actions.payload[1]
        return {booking:state.booking,userDetails:state.userDetails,vehicle:state.vehicle,city:state.city,subscription:state.subscription,month:state.month,log:state.log,amount:state.amount,total:state.total,anchorE1:state.anchorE1}

        case 'ADD_VEHICLE':
           
        state.vehicle[actions.payload[0]]=actions.payload[1]
        return {booking:state.booking,userDetails:state.userDetails,vehicle:state.vehicle,city:state.city,subscription:state.subscription,month:state.month,log:state.log,amount:state.amount,total:state.total,anchorE1:state.anchorE1}
            
        case 'ADD_CITY':
            
        state.city=actions.payload
        return {booking:state.booking,userDetails:state.userDetails,vehicle:state.vehicle,city:state.city,subscription:state.subscription,month:state.month,log:state.log,amount:state.amount,total:state.total,anchorE1:state.anchorE1}

        case 'ADD_SUBSCRIPTION':
            
        state.subscription[actions.payload[0]]=actions.payload[1]
        return {booking:state.booking,userDetails:state.userDetails,vehicle:state.vehicle,city:state.city,subscription:state.subscription,month:state.month,log:state.log,amount:state.amount,total:state.total,anchorE1:state.anchorE1}

        case 'ADD_MONTH':
           
        state.month=actions.payload
        return {booking:state.booking,userDetails:state.userDetails,vehicle:state.vehicle,city:state.city,subscription:state.subscription,month:state.month,log:state.log,amount:state.amount,total:state.total,anchorE1:state.anchorE1}

        case 'ADD_LOG':
           
        state.log=actions.payload
        return {booking:state.booking,userDetails:state.userDetails,vehicle:state.vehicle,city:state.city,subscription:state.subscription,month:state.month,log:state.log,amount:state.amount,total:state.total,anchorE1:state.anchorE1}

        case 'ADD_AMOUNT':
            
        state.amount=actions.payload
        return {booking:state.booking,userDetails:state.userDetails,vehicle:state.vehicle,city:state.city,subscription:state.subscription,month:state.month,log:state.log,amount:state.amount,total:state.total,anchorE1:state.anchorE1}

        case 'ADD_NETAMOUNT':
        //  console.log(actions)
        state.total=actions.payload
        return {booking:state.booking,userDetails:state.userDetails,vehicle:state.vehicle,city:state.city,subscription:state.subscription,month:state.month,log:state.log,amount:state.amount,total:state.total,anchorE1:state.anchorE1}

        case 'CARS':
            console.log(actions)
        state.anchorE1=actions.payload
        return {booking:state.booking,userDetails:state.userDetails,vehicle:state.vehicle,city:state.city,subscription:state.subscription,month:state.month,log:state.log,amount:state.amount,total:state.total,anchorE1:state.anchorE1}

        default:
        return state
}}