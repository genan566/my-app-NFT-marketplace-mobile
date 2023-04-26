import { View, Text, ScrollView, Dimensions, TouchableOpacity } from 'react-native'
import React from 'react'
import { LinearGradient } from 'expo-linear-gradient';
import RootComponent from '../components/RootComponent';

import { Divider, Icon, Input } from "@ui-kitten/components";
import { BlurView } from 'expo-blur';

const WIDTH = Dimensions.get("screen").width;
const HEIGHT = Dimensions.get("screen").height;

import { Image } from 'expo-image'
import { blurhash } from '../../utilities/Hasher';

const Profile = ({ navigation }) => {
    const [showModalsLogin, setshowModalsLogin] = React.useState<boolean>(false)
    return (

        <RootComponent>

            {
                showModalsLogin && <View style={{
                    position: "absolute", backgroundColor: "rgba(10,10,10,.5)", top: 0, left: 0, bottom: 0,
                    right: 0, zIndex: 10, width: "100%", height: "100%"
                }}>
                    <BlurView intensity={20} tint="dark" style={{
                        flex: 1,
                        elevation: 10, display: "flex",
                        justifyContent: 'center', flexDirection: "row", alignItems: "center"
                    }}>
                        <View style={{ width: "90%", backgroundColor: "#0f071d", padding: 25, borderRadius: 10, elevation: 10, position: "relative" }}>
                            <TouchableOpacity
                                activeOpacity={.8}
                                style={{
                                    borderRadius: 50,
                                    top: 15, right: 15,
                                    overflow: "hidden",
                                    width: 35, height: 35,
                                    position: "absolute",
                                    display: "flex",
                                    alignItems: "center",
                                    justifyContent: "center",
                                    backgroundColor: "#1a202c"
                                }}
                                onPress={() => setshowModalsLogin(false)}
                            >

                                <Icon name="close"
                                    style={{
                                        width: 20,
                                        height: 20,
                                        tintColor: "rgb(99, 102, 241)",
                                        alignSelf: 'center',
                                    }} />
                            </TouchableOpacity>
                            <Image
                                style={{ height: WIDTH * .15, width: WIDTH * .15, alignSelf: "center" }}
                                source={require("../../assets/images/nft.png")}
                                placeholder={blurhash}
                                contentFit="cover"
                                transition={1000}
                            />
                            <Text style={{
                                color: "white", fontFamily: "Montserrat-SemiBold",
                                fontSize: 20, marginTop: 12.5, alignSelf: "center",
                            }}>Sign In</Text>
                            <Text style={{
                                color: "rgba(255,255,255,.5)", fontFamily: "Montserrat-SemiBold",
                                fontSize: 12, marginTop: 12.5, alignSelf: "center",
                            }}>Please login to your account</Text>

                            <Divider style={{ marginTop: 15, backgroundColor: "rgba(255,255,255,.2)" }} />

                            <View style={{ marginTop: 20 }}>
                                <Text style={{
                                    color: "rgba(255,255,255,.8)", fontFamily: "Montserrat-SemiBold",
                                    fontSize: 12, marginTop: 5.5, alignSelf: "center", marginBottom: 5
                                }}>Your Email</Text>

                                <Input
                                    placeholder='Ex: xxx@gmail.com'
                                    style={{ marginTop: 10, backgroundColor: "transparent" }}
                                />
                            </View>


                            <View style={{ marginTop: 15 }}>
                                <Text style={{
                                    color: "rgba(255,255,255,.8)", fontFamily: "Montserrat-SemiBold",
                                    fontSize: 12, marginTop: 5.5, alignSelf: "center", marginBottom: 5
                                }}>Your Password</Text>

                                <Input
                                    placeholder='Ex: xxxxx.xxx'
                                    style={{ marginTop: 10, backgroundColor: "transparent" }}
                                />
                            </View>

                            <View style={{ marginTop: 15 }}>
                                <TouchableOpacity
                                    style={{
                                        backgroundColor: "rgba(59, 130, 246,.5)", display: "flex",
                                        justifyContent: "center", alignItems: "center", padding: 12.5, borderRadius: 5, flexDirection: "row",
                                    }}>

                                    <Text style={{
                                        color: "white", fontSize: 18,
                                        fontFamily: "Montserrat-Medium",
                                    }}>Submit</Text>
                                </TouchableOpacity>
                            </View>

                            <View style={{ flexDirection: "row", justifyContent: "center", alignItems: "center", marginTop: 20 }}>
                                <Text style={{
                                    color: "rgba(255,255,255,.5)", fontFamily: "Montserrat-SemiBold",
                                    fontSize: 12, alignSelf: "center",
                                }}>You have not an account yet /
                                </Text>

                                <TouchableOpacity>
                                    <Text style={{
                                        color: "rgba(255,255,255,.9)", fontFamily: "Montserrat-SemiBold",
                                        fontSize: 12, alignSelf: "center", marginLeft: 5
                                    }}>Sign Up</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </BlurView>
                </View>
            }
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
                        onPress={() => setshowModalsLogin(true)}
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