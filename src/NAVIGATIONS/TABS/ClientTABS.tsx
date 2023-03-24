import { View, Text } from 'react-native'
import React from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeScreen from '../../screens/HomeScreen';
const ClientTABS = () => {
    const Tab = createBottomTabNavigator();
    return (
        <Tab.Navigator
            screenOptions={{
                tabBarStyle: {
                    backgroundColor: "black",
                },
                tabBarLabelStyle: { fontFamily: "Montserrat-Medium" },
                tabBarActiveTintColor: "#4fd1c5",
                // tabBarIndicatorStyle: { backgroundColor: "#4fd1c5", height: 1 },
                tabBarInactiveTintColor: "white",
                headerShown: false,

            }}
        >

            <Tab.Screen
                name="Home"
                component={HomeScreen}
            />

            {/* <Tab.Screen
                name="Automate BTC"
                component={AutomateBTC}

            />

            <Tab.Screen
                name="Automate ETH"
                component={AutomateETH}

            /> */}
        </Tab.Navigator>
    )
}

export default ClientTABS