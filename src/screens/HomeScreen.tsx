import { View, Text, ScrollView, Image, TextInput, TouchableOpacity } from 'react-native'
import React from 'react'
import RootComponent from '../components/RootComponent'
import { useLoadingFonts } from '../../utilities/LoadingFonts'
import { BlurView } from 'expo-blur'
import { AntDesign, Feather, MaterialCommunityIcons } from '@expo/vector-icons';
import NFTViewer from '../components/NFTViewer'
const HomeScreen = () => {
    const { loaded } = useLoadingFonts()
    const [seachNFT, setseachNFT] = React.useState("");

    return (

        <RootComponent>
            <ScrollView showsVerticalScrollIndicator={false} style={{ marginTop: 15 }}>
                <View style={{ flex: 1, justifyContent: "space-between", flexDirection: "row", alignItems: "center", paddingHorizontal: 20 }}>

                    <TouchableOpacity style={{ overflow: "hidden", backgroundColor: "rgba(82, 82, 79,.8)", borderRadius: 100 }}>
                        <BlurView intensity={30} tint="dark" style={{
                            paddingRight: 15, elevation: 10, display: "flex",
                            justifyContent: 'space-between', flexDirection: "row", alignItems: "center", gap: 10
                        }}>
                            <View style={{ backgroundColor: "white", borderRadius: 50, padding: 10 }}>
                                <Image
                                    style={{ width: 20, height: 20 }}
                                    source={require("../../assets/images/ethereum.png")} />
                            </View>
                            <Text style={{ color: "white", fontFamily: loaded && "Montserrat-SemiBold", fontSize: 16, }}>47.48</Text>
                        </BlurView>
                    </TouchableOpacity>
                    <View>
                        <Text style={{ color: "white", fontFamily: loaded && "Montserrat-Medium", fontSize: 17, textAlign: "center" }}>Discover the new </Text>
                        <Text style={{ color: "white", fontFamily: loaded && "Montserrat-Medium", fontSize: 17, textAlign: "center" }}>NFT collection</Text>
                    </View>
                    <View style={{ flexDirection: "row", alignItems: "center", gap: 5 }}>
                        <TouchableOpacity style={{ backgroundColor: "white", overflow: "hidden", borderRadius: 50, }}>
                            <Image
                                style={{ width: 45, height: 45 }}
                                resizeMode="cover"
                                source={require("../../assets/images/1.png")} />
                        </TouchableOpacity>
                        <TouchableOpacity style={{ backgroundColor: "transparent", padding: 5, borderWidth: 1, borderColor: "white", overflow: "hidden", borderRadius: 50, }}>
                            <MaterialCommunityIcons name="menu-swap-outline" size={24} color="white" />
                        </TouchableOpacity>
                    </View>
                </View>
                <View style={{ paddingHorizontal: 20 }}>

                    <View style={{
                        display: "flex", borderRadius: 100,
                        flexDirection: "row", backgroundColor: "rgba(100,100,100,.2)",
                        marginTop: 20, padding: 10, flex: 1, paddingRight: 15
                    }}>
                        <TouchableOpacity onPress={() => {
                            seachNFT.length > 0 && setseachNFT("")
                            // seachNFT.length > 0 && setseachNFT("")
                        }}>
                            {
                                seachNFT.length > 0 ?
                                    <AntDesign name="closecircleo" size={24} color="white" /> :
                                    <Feather name="search" size={24} color="white" />
                            }
                        </TouchableOpacity>
                        <TextInput
                            value={seachNFT}
                            onChangeText={(nextValue: any) => {
                                setseachNFT(nextValue)
                            }}
                            placeholderTextColor="white"
                            placeholder='Search NFT or artist name'
                            style={{ flex: 1, marginLeft: 10, fontFamily: loaded && "Montserrat-SemiBold", color: "white" }} />
                    </View>
                </View>
                <ScrollView
                    horizontal
                    // style={{ marginTop: 15 }}
                    contentContainerStyle={{ paddingVertical: 15, paddingHorizontal: 20 }}
                    showsHorizontalScrollIndicator={false}
                >
                    {
                        [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13].map(it => {
                            return (
                                <View
                                    key={it}
                                    style={{ marginRight: 10, alignItems: "center", }}>
                                    <View style={{ borderRadius: 100, backgroundColor: "white", padding: 10 }}>
                                        <Text>Bien joué</Text>
                                    </View>
                                </View>
                            )
                        })
                    }

                </ScrollView>

                <View style={{ marginTop: 15, paddingHorizontal: 20 }}>
                    {
                        [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13].map(it => {
                            return (
                                <NFTViewer key={it} image={require('../../assets/images/teso.jpg')} />
                            )
                        })
                    }
                </View>
                <View style={{ height: 50, }} />
            </ScrollView>
        </RootComponent>
    )
}

export default HomeScreen