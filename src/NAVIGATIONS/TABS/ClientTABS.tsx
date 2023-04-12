import { View, Text } from 'react-native'
import React, { Component } from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeScreen from '../../screens/HomeScreen';
import { createStackNavigator } from '@react-navigation/stack';
import Profile from '../../screens/Profile';



const HomeScreenss = createStackNavigator();

export class HomeScreenssScreen extends Component {
    render() {
        return (
            <HomeScreenss.Navigator
                screenOptions={{
                    headerShown: false
                }}


                initialRouteName={'Home'}
            >
                <HomeScreenss.Screen name="Home" component={HomeScreen} />
                <HomeScreenss.Screen name="Profile" component={Profile} />
            </HomeScreenss.Navigator>
        )
    }
}



const ClientTABS = () => {
    const Tab = createBottomTabNavigator();
    return (
        <Tab.Navigator
            screenOptions={{
                tabBarStyle: {
                    backgroundColor: "black",
                    borderTopColor: "black",
                    borderTopWidth: 1,
                },
                tabBarLabelStyle: { fontFamily: "Montserrat-Medium" },
                tabBarActiveTintColor: "rgb(99, 102, 241)",
                // tabBarIndicatorStyle: { backgroundColor: "rgb(99, 102, 241)", height: 1 },
                tabBarInactiveTintColor: "white",
                headerShown: false,

            }}
        >

            <Tab.Screen
                name="HomeStacks"
                component={HomeScreenssScreen}
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