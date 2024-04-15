

import RootNavigation from './component/navigation/RootNavigation';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import RootReducer from './component/storage/RootReducer';



function App(){

    var store = createStore(RootReducer)
    
return (
    <Provider store={store}>
        <RootNavigation />
    </Provider>

     

) 
}
export default App;
