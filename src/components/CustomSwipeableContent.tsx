import { TouchableOpacity, View, Text, ScrollView, Image, TouchableHighlight, Dimensions } from "react-native"
import React, { useRef, useState } from 'react'
import RootComponent from "./RootComponent"
import { Icon } from "@ui-kitten/components"
import { useLoadingFonts } from "../../utilities/LoadingFonts"
import { blurhash } from "../../utilities/Hasher"
import { Feather } from "@expo/vector-icons"
import { SwipeButton } from "react-native-expo-swipe-button"
import { RootNftContext } from "../contexts"
const WIDTH = Dimensions.get("screen").width;
const HEIGHT = Dimensions.get("screen").height;

const ViewHiddenOfNFt = ({ callAction }: { callAction: () => void }) => {
    // const Tab = createMaterialTopTabNavigator();
    const { loaded } = useLoadingFonts()
    const nFTContext = React.useContext(RootNftContext)

    return (
        <RootComponent>

            <View style={{ position: "relative", }}>
                <View style={{
                    display: "flex",
                    flexDirection: "row",
                    alignItems: "center",
                    justifyContent: "space-between",
                    paddingHorizontal: 25,
                    position: "absolute",
                    top: 25,
                    zIndex: 2,
                    width: "100%",
                }}>
                    <TouchableOpacity
                        onPress={callAction}
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
                            backgroundColor: "rgba(82, 82, 79,.8)"
                        }}
                    >

                        <Icon name="close-circle-outline"
                            style={{
                                width: 20,
                                height: 20,
                                tintColor: "white",
                                alignSelf: 'center',
                            }} />
                    </TouchableOpacity>

                    <Text
                        style={{ fontFamily: loaded && "Montserrat-Medium", fontSize: 22.5, color: "white", }}>Detail Product NFT</Text>

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
                            backgroundColor: "rgba(82, 82, 79,.8)"
                        }}
                    >

                        <Icon name="more-vertical-outline"
                            style={{
                                width: 20,
                                height: 20,
                                tintColor: "white",
                                alignSelf: 'center',
                            }} />
                    </TouchableOpacity>
                </View>

                <ScrollView contentContainerStyle={{ paddingHorizontal: 20, marginTop: 85 }}>
                    <TouchableHighlight style={{ overflow: "hidden", borderRadius: 10, borderWidth: 1, borderColor: "rgba(100,100,100,.5)", elevation: 10 }}>
                        <Image
                            style={{ height: HEIGHT * .4, width: "100%" }}
                            source={nFTContext.nftData.image ? { uri: nFTContext.nftData.image } : require("../../assets/images/1.png")}
                            placeholder={blurhash}
                            // contentFit="cover"
                            resizeMode='cente'
                            transition={1000}
                        />

                    </TouchableHighlight>
                    <View style={{
                        flexDirection: "row", justifyContent: "space-between", alignItems: "center", marginTop: 20,

                    }}>
                        <View style={{ borderWidth: 1, borderColor: "rgba(100,100,100,.5)", borderRadius: 100, overflow: "hidden", }}>
                            <Image
                                style={{ height: 50, width: 50 }}
                                source={require("../../assets/images/1.png")}
                                placeholder={blurhash}
                                // contentFit="cover"
                                resizeMode='cente'
                                transition={1000}
                            />

                        </View>
                        <TouchableOpacity style={{ backgroundColor: "rgb(50,50,50)", borderRadius: 100, padding: 10 }}
                        >

                            <Icon name="heart"
                                style={{
                                    width: 20,
                                    height: 20,
                                    tintColor: "red",
                                    alignSelf: 'center',
                                }} />
                        </TouchableOpacity>
                    </View>
                    <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "space-between", marginTop: 20, gap: 10 }}>
                        <View style={{ overflow: "hidden", backgroundColor: "rgba(82, 82, 79,.8)", borderRadius: 100 }}>
                            <View style={{
                                padding: 8, paddingHorizontal: 20, elevation: 10, display: "flex",
                                justifyContent: 'space-between', flexDirection: "row", alignItems: "center"
                            }}>
                                <View style={{
                                    display: "flex",
                                    justifyContent: 'space-between', flexDirection: "row", gap: 10, alignItems: "center"
                                }}>
                                    <Feather name="layers" size={24} color="white" />
                                    <View>
                                        <Text style={{ color: "rgba(255,255,255,.5)", fontFamily: loaded && "Montserrat-Medium", }}>Current Bid</Text>
                                        <Text style={{ color: "white", fontFamily: loaded && "Montserrat-SemiBold", fontSize: 20, marginTop: 2.5 }}>{nFTContext.nftData.price} ETH</Text>
                                    </View>
                                </View>
                            </View>
                        </View>
                        <View style={{ overflow: "hidden", backgroundColor: "rgba(82, 82, 79,.8)", borderRadius: 100 }}>
                            <View style={{
                                padding: 8, paddingHorizontal: 20, elevation: 10, display: "flex",
                                justifyContent: 'space-between', flexDirection: "row", alignItems: "center"
                            }}>
                                <View style={{
                                    display: "flex",
                                    justifyContent: 'space-between', flexDirection: "row", gap: 10, alignItems: "center"
                                }}>
                                    <Feather name="clock" size={24} color="white" />
                                    <View>
                                        <Text style={{ color: "rgba(255,255,255,.5)", fontFamily: loaded && "Montserrat-Medium", }}>Ending In</Text>
                                        <Text style={{ color: "white", fontFamily: loaded && "Montserrat-SemiBold", fontSize: 20, marginTop: 2.5 }}>2h 35min</Text>
                                    </View>
                                </View>
                            </View>
                        </View>
                    </View>

                    {/* <Tab.Navigator>
                        <Tab.Screen name="Home" component={HomeScreen} />
                        <Tab.Screen name="Settings" component={SettingsScreen} />
                    </Tab.Navigator> */}
                    <View style={{ marginTop: 35 }}>
                        <TouchableOpacity
                            // onPress={async () => {
                            //     setLoading(true);
                            //     dispatch(cleanStore())
                            //     await signOut()
                            // }}
                            style={{
                                backgroundColor: "white", display: "flex",
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
                                color: "black", fontSize: 16,
                                fontFamily: "Montserrat-Medium",
                            }}>Place a Bid</Text>
                            {/* <Icon name="log-in-outline"
                                style={{ width: 20, height: 20, tintColor: "black", fontWeight: "bold", marginLeft: 10 }} /> */}
                        </TouchableOpacity>
                    </View>

                    <View style={{ marginBottom: HEIGHT * .3 }} />
                </ScrollView>
            </View>
        </RootComponent>
    )
}

export default ViewHiddenOfNFt