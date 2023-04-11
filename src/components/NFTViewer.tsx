import { View, Text, TouchableOpacity } from 'react-native'
import React from 'react'
import { blurhash } from '../../utilities/Hasher'
import { useDimensionSizes } from '../../utilities/DimensionHooks'
import { Image } from 'expo-image'
import { BlurView } from 'expo-blur'
import { useLoadingFonts } from '../../utilities/LoadingFonts'
import { Feather, Ionicons } from '@expo/vector-icons';
const NFTViewer = ({ image }: { image?: string }) => {
    const { height } = useDimensionSizes()
    const { loaded } = useLoadingFonts()
    return (
        <View style={{
            width: "100%",
            minHeight: 315, maxHeight: 370, overflow: "hidden",
            position: "relative",
            borderRadius: 10, padding: 15, marginBottom: 15
        }}>
            <Image
                style={{ position: "absolute", top: 0, left: 0, right: 0, bottom: 0, zIndex: 1 }}
                source={image || "https://picsum.photos/seed/696/3000/2000"}
                placeholder={blurhash}
                contentFit="cover"
                transition={1000}
            />
            <View style={{
                position: "absolute", top: 0, left: 0, right: 0, bottom: 0,
                zIndex: 2, alignItems: "center", justifyContent: "flex-end", padding: 10
            }}>
                <View style={{ position: "absolute", top: 10, left: 10, overflow: "hidden", borderRadius: 100 }}>
                    <BlurView intensity={20} tint="dark" style={{
                        padding: 10, paddingHorizontal: 20, elevation: 10, display: "flex",
                        justifyContent: 'space-between', flexDirection: "row", alignItems: "center"
                    }}>
                        <View style={{
                            display: "flex",
                            justifyContent: 'space-between', flexDirection: "row", gap: 10, alignItems: "center"
                        }}>
                            <Ionicons name="people-circle" size={24} color="white" />
                            <View>
                                <Text style={{ color: "rgba(255,255,255,.5)", fontFamily: loaded && "Montserrat-Medium", }}>Followers</Text>
                                <Text style={{ color: "white", fontFamily: loaded && "Montserrat-SemiBold", fontSize: 20, marginTop: 2.5 }}>100K</Text>
                            </View>
                        </View>
                    </BlurView>
                </View>
                <View style={{ width: "100%", marginBottom: 15 }}>
                    <Text style={{ fontFamily: loaded && "Montserrat-Medium", fontSize: 30, color: "white" }}>Wapes</Text>
                    <Text style={{ fontFamily: loaded && "Montserrat-Medium", fontSize: 30, color: "white" }}>Genesis</Text>
                </View>
                <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center", width: "100%" }}>

                    <View style={{ overflow: "hidden", backgroundColor: "rgba(82, 82, 79,.8)", borderRadius: 100 }}>
                        <BlurView intensity={20} tint="dark" style={{
                            padding: 10, paddingHorizontal: 20, elevation: 10, display: "flex",
                            justifyContent: 'space-between', flexDirection: "row", alignItems: "center"
                        }}>
                            <View style={{
                                display: "flex",
                                justifyContent: 'space-between', flexDirection: "row", gap: 10, alignItems: "center"
                            }}>
                                <Feather name="layers" size={24} color="white" />
                                <View>
                                    <Text style={{ color: "rgba(255,255,255,.5)", fontFamily: loaded && "Montserrat-Medium", }}>Current Bid</Text>
                                    <Text style={{ color: "white", fontFamily: loaded && "Montserrat-SemiBold", fontSize: 20, marginTop: 2.5 }}>45ETH</Text>
                                </View>
                            </View>
                        </BlurView>
                    </View>
                    <TouchableOpacity style={{ backgroundColor: "white", padding: 15, borderRadius: 100 }}>
                        <Feather name="chevron-right" size={24} color="black" />
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    )
}

export default NFTViewer