import { useAsyncStorage } from "@react-native-async-storage/async-storage";

export const writeItemToStorage = async newValue => {
    const { setItem, } = useAsyncStorage('@storage_APIKEY');
    await setItem(newValue);
};