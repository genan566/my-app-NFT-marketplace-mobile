import { View, Text, TouchableOpacity } from 'react-native'
import React from 'react'
import { BlurView } from 'expo-blur'
import { Image } from 'expo-image'
import { MaterialCommunityIcons } from '@expo/vector-icons'
import userDataHooks from '../hooks/userDataHooks'
import { useLoadingFonts } from '../../utilities/LoadingFonts'

const TopBarCustom = ({ navigation }: { navigation: () => void }) => {
    const { dataUser } = userDataHooks()
    const { loaded } = useLoadingFonts()
    return (
        <View style={{ justifyContent: "space-between", flexDirection: "row", alignItems: "center", paddingHorizontal: 20, marginTop: 15 }}>

            <TouchableOpacity
                // onPress={openPanel}
                onPress={() => {
                }}
                style={{ overflow: "hidden", backgroundColor: "rgba(82, 82, 79,.8)", borderRadius: 100 }}>
                <BlurView intensity={30} tint="dark" style={{
                    paddingRight: 15, elevation: 10, display: "flex",
                    justifyContent: 'space-between', flexDirection: "row", alignItems: "center", gap: 10
                }}>
                    <View style={{ backgroundColor: "white", borderRadius: 50, padding: 10 }}>
                        <Image
                            style={{ width: 20, height: 20 }}
                            source={require("../../assets/images/ethereum.png")} />
                    </View>
                    <Text style={{ color: "white", fontFamily: loaded && "Montserrat-SemiBold", fontSize: 16, maxWidth: 150 }}
                        numberOfLines={1}>{`${dataUser.account_balance_eth || 0}ETH` || "0.00ETH"}</Text>
                </BlurView>
            </TouchableOpacity>
            <View style={{ flexDirection: "row", alignItems: "center", gap: 5 }}>
                <TouchableOpacity
                    onPress={() => navigation.navigate("Profile")}
                    style={{ backgroundColor: "white", overflow: "hidden", borderRadius: 50, elevation: 20 }}>
                    <Image
                        style={{ width: 45, height: 45, borderWidth: 1, borderColor: "rgba(100,100,100,.1)", borderRadius: 100 }}
                        resizeMode="cover"
                        source={dataUser.image ? { uri: dataUser.image } : require("../../assets/images/1.png")} />
                </TouchableOpacity>
                <TouchableOpacity
                    onPress={() => navigation.openDrawer()}
                    style={{ backgroundColor: "transparent", padding: 5, borderWidth: 1, borderColor: "white", overflow: "hidden", borderRadius: 50, }}>
                    <MaterialCommunityIcons name="menu-swap-outline" size={24} color="white" />
                </TouchableOpacity>
            </View>
        </View>
    )
}

export default TopBarCustom