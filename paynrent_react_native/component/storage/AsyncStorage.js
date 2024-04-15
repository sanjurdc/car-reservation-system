import AsyncStorage from '@react-native-community/async-storage';

export const storeData = async (key,body) => {
    try 
    {    
      await AsyncStorage.setItem(key,JSON.stringify(body));
    } 
    catch (e) 
    {
      console.log("Error for"+key,e)
    }
  };

  export const getStoreData = async(key) => {
    try
     {
      var data = await AsyncStorage.getItem(key);
      
      return (JSON.parse(data))
    }
     catch (e) 
     {
        console.log("Error for"+key,e)
    }
  };

  export const removeStoreData = async () => {
        try
        {
          await AsyncStorage.removeItem(key)
        }
        catch(e)
        {
            console.log("Error for" + key,e)
        }

  }