import { View, Text, ScrollView, Dimensions, Image, TouchableOpacity } from 'react-native'
import React from 'react'
import { LinearGradient } from 'expo-linear-gradient';
import RootComponent from '../components/RootComponent';

import { Icon } from "@ui-kitten/components";
const WIDTH = Dimensions.get("screen").width;
const HEIGHT = Dimensions.get("screen").height;


const Profile = ({ navigation }) => {
    return (

        <RootComponent>
            <View style={{
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "space-between",
                paddingHorizontal: 25,
                position: "absolute",
                top: 25,
                zIndex: 2,
                width: "100%"
            }}>
                <TouchableOpacity
                    activeOpacity={.8}
                    style={{
                        borderRadius: 50,
                        overflow: "hidden",
                        width: 35, height: 35,
                        position: "relative",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        position: "relative",
                        backgroundColor: "#1a202c"
                    }}
                    onPress={() => navigation.goBack()}
                >

                    <Icon name="arrow-circle-left-outline"
                        style={{
                            width: 20,
                            height: 20,
                            tintColor: "rgb(99, 102, 241)",
                            alignSelf: 'center',
                        }} />
                </TouchableOpacity>
                <TouchableOpacity
                    activeOpacity={.8}
                    style={{
                        borderRadius: 50,
                        overflow: "hidden",
                        width: 35, height: 35,
                        position: "relative",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        position: "relative",
                        backgroundColor: "#1a202c"
                    }}
                >

                    <Icon name="edit"
                        style={{
                            width: 20,
                            height: 20,
                            tintColor: "white",
                            alignSelf: 'center',
                        }} />
                </TouchableOpacity>
            </View>

            <ScrollView>
                <View style={{ height: HEIGHT * .3, width: "100%", position: "relative" }}>
                    <LinearGradient
                        start={{ x: 0, y: 0 }}
                        end={{ x: 1, y: 1 }}
                        // useAngle
                        // angle={200}
                        colors={["rgba(0,0,0,.9)", "transparent",]}
                        style={{
                            position: "absolute", top: 0, left: 0,
                            width: "100%", height: "100%",
                            zIndex: 5,
                        }} />

                    <Image source={require("../../assets/images/1.png")} style={{
                        width: "100%", height: "100%"
                    }} />
                    <View style={{
                        alignSelf: "center", position: "absolute", bottom: -35, width: 100,
                        height: 100, borderWidth: 5, borderColor: "#fff", borderRadius: 50, zIndex: 6
                    }}>
                        <Image source={require("../../assets/images/1.png")} style={{
                            width: "100%", height: "100%", borderRadius: 50,
                        }} />
                    </View>
                </View>

                <View style={{ display: "flex", alignItems: "center", justifyContent: "center", marginTop: 55 }}>
                    <Text style={{ color: "white", fontSize: 24, marginBottom: 5, fontFamily: "Montserrat-Medium", }}>Avodagbe Jean-Gontran</Text>
                    <Text style={{ color: "rgba(255,255,255,.5)", fontFamily: "Montserrat-Medium", }}>avodagbejean@gmail.com</Text>
                </View>

                <View style={{ paddingHorizontal: 25, marginTop: 15 }}>
                    <TouchableOpacity
                        // onPress={async () => {
                        //     setLoading(true);
                        //     dispatch(cleanStore())
                        //     await signOut()
                        // }}
                        style={{
                            backgroundColor: "rgb(99, 102, 241)", display: "flex",
                            justifyContent: "center", alignItems: "center", padding: 8, borderRadius: 5, flexDirection: "row",
                        }}>

                        {/* {
                            loading ? <ActivityIndicator size="large" color="white" />
                                : <Text style={{
                                    color: "white", fontSize: 16,
                                    fontFamily: "Montserrat-Medium",
                                }}>Déconnexion</Text>
                        } */}

                        <Text style={{
                            color: "white", fontSize: 16,
                            fontFamily: "Montserrat-Medium",
                        }}>Log In</Text>
                        <Icon name="log-in-outline"
                            style={{ width: 20, height: 20, tintColor: "white", fontWeight: "bold", marginLeft: 10 }} />
                    </TouchableOpacity>
                </View>

                {/* <View style={{ paddingHorizontal: 25, marginTop: 15 }}>
                    <TouchableOpacity
                        style={{
                            backgroundColor: "#e53e3e", display: "flex",
                            justifyContent: "center", alignItems: "center", padding: 8, borderRadius: 5, flexDirection: "row",
                        }}>
                        <Text style={{
                            color: "white", fontSize: 16,
                            fontFamily: "Montserrat-Medium",
                        }}>Déconnexion</Text>
                        <Icon name="log-out-outline"
                            style={{ width: 20, height: 20, tintColor: "white", fontWeight: "bold", marginLeft: 10 }} />
                    </TouchableOpacity>
                </View> */}

            </ScrollView>

        </RootComponent>
    )
}

export default Profile