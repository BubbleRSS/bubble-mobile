import AsyncStorage from "@react-native-async-storage/async-storage";

export function useAsyncStorage() {
  const storeData = async (key: string, value: string) => {
    try {
      await AsyncStorage.setItem(key, value);
    } catch (e) {
      console.log(e);
    }
  };

  const getData = async (key: string) => {
    try {
      return await AsyncStorage.getItem(key);
    } catch (e) {
      console.log(e);
      return null;
    }
  };

  return {
    storeData,
    getData,
  };
}
