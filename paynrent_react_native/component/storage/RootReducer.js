const initialState ={
    vehicle :{},
    booking :{},
    city :{}
}

export default function RootReducer(state=initialState,actions){

    switch (actions.type)
    {
        case 'ADD_VEHICLE' :
            
        state.vehicle[actions.payload[0]]=actions.payload[1]
        return {vehicle:state.vehicle,booking:state.booking,city:state.city}

        case 'ADD_BOOKING' :
        
        state.booking=actions.payload
        return {vehicle:state.vehicle,booking:state.booking,city:state.city}

        case 'ADD_CITY' :

        state.city=actions.payload
        return {vehicle:state.vehicle,booking:state.booking,city:state.city}

        default :
        return state
    }

}