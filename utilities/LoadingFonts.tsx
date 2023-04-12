import { View, Text, Alert } from 'react-native'
import React from 'react'
import * as Font from 'expo-font';

export const useLoadingFonts = () => {
    const [loaded, setLoaded] = React.useState(null)
    const loadFonts = async () => {
        await Font.loadAsync({
            'Montserrat-Medium': require('../assets/fonts/static/Montserrat-Medium.ttf'),
            'Montserrat-Bold': require('../assets/fonts/static/Montserrat-Bold.ttf'),
            'Montserrat-Regular': require('../assets/fonts/static/Montserrat-Regular.ttf'),
            'Montserrat-SemiBold': require('../assets/fonts/static/Montserrat-SemiBold.ttf'),
            'Montserrat-Light': require('../assets/fonts/static/Montserrat-Light.ttf'),
        })
            .then(() => setLoaded(true))
    }
    React.useEffect(() => {
        loadFonts();
    }, []);
    return { loaded }
}
