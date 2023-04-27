import React, { Component } from 'react';
import {
    ActivityIndicator,
    Dimensions,
    FlatList,
    Image,
    SafeAreaView,
    ScrollView,
    Text,
    TouchableOpacity,
    View,
    BackHandler,
    RefreshControl,

} from "react-native";


import { Icon, Input, Divider } from "@ui-kitten/components";

import {
    DrawerContentScrollView,
    DrawerItem
} from '@react-navigation/drawer';
import { Drawer } from 'react-native-paper';
import RootComponent from '../components/RootComponent';
import { LinearGradient } from 'expo-linear-gradient';
import { BlurView } from 'expo-blur';
// import { AuthContext } from '../contexts/context';
// import { getFromLocalStorage } from '../Reducer/LoginReducer';


const { width: windowWidth, height: windowHeight } = Dimensions.get("window");

const DrawerContent = (props) => {
    // const [userData, setuserData] = React.useState({})

    // const loadUser = async () => {
    //     let userToken = JSON.parse(await getFromLocalStorage());
    //     if (userToken) {
    //         setuserData(userToken)
    //     }
    // }

    // React.useEffect(() => {
    //     loadUser()
    // }, [])

    // const { signOut } = React.useContext(AuthContext)

    return (



        <LinearGradient
            start={{ x: 0.1, y: 0.2 }}
            end={{ x: 0.9, y: 0.8 }}
            // Button Linear Gradient
            colors={['#2b2b29', '#1c0b04', '#421403']}
            style={{ flex: 1 }}>
            <BlurView
                tint='dark'
                intensity={80} style={{ flex: 1, }}>

                <View style={{ flex: 1,position:"relative" }}>
                    <DrawerContentScrollView {...props}>
                        <View style={{
                            backgroundColor: "rgba(10,10,10,.5)",
                            paddingHorizontal: 15,
                            padding:35,
                            flexDirection: "row", alignItems: "center",
                        }}>
                            <View style={{
                            height: windowHeight * .38,
                            width: windowHeight * .38,
                            borderRadius: windowHeight * .38,
                            backgroundColor: "rgba(254,254,254,.08)",
                            position: "absolute",
                            top: -windowHeight * .25,
                            left: windowWidth * .25,
                            zIndex: -3.5
                        }} />
                        <View style={{
                            height: windowHeight * .42,
                            width: windowHeight * .42,
                            borderRadius: windowHeight * .42,
                            backgroundColor: "rgba(254,254,254,.1)",
                            position: "absolute",
                            top: -windowHeight * .1,
                            right: -windowWidth * .49,
                            zIndex: -2.5
                        }} />
                            {/* <View style={{ backgroundColor: "black", borderRadius: 50, padding: 20 }}> */}
                            <Image
                                resizeMode="stretch"
                                style={{ width: 80, height: 80, borderRadius: 50 }}
                                source={require("../../assets/images/1.png")} />
                            {/* </View> */}

                            <View style={{ flex: 1, marginLeft: 15, justifyContent: "center" }}>
                                <View style={{ alignItems: "flex-start", marginBottom: 5 }}>
                                    <Text
                                        numberOfLines={1}
                                        style={{
                                            fontSize: 15, textTransform: "uppercase", color: "#319795",
                                            fontFamily: "Montserrat-Bold", backgroundColor: "white", padding: 2.5, borderRadius: 10, paddingHorizontal: 10,
                                        }}>
                                        Jean</Text>
                                </View>
                                <View style={{ alignItems: "flex-start", }}>
                                    <Text style={{
                                        fontSize: 20, color: "white",
                                        fontFamily: "Montserrat-SemiBold"
                                    }}
                                        numberOfLines={1}
                                    >
                                        Gontran</Text>
                                </View>
                                <View style={{ alignItems: "flex-start", }}>
                                    <Text
                                        numberOfLines={1} style={{
                                            fontSize: 10, color: "rgba(255,255,255,.5)",
                                            fontFamily: "Montserrat-SemiBold"
                                        }}>Bignon</Text>
                                </View>
                            </View>
                        </View>
                    </DrawerContentScrollView>
                </View>
            </BlurView>
        </LinearGradient>

    );
}


export default DrawerContent;










