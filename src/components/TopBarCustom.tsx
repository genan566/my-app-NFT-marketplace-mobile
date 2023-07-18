import { View, Text, TouchableOpacity, ActivityIndicator } from 'react-native'
import React, { useState } from 'react'
import { BlurView } from 'expo-blur'
import { Image } from 'expo-image'
import { MaterialCommunityIcons } from '@expo/vector-icons'
import userDataHooks from '../hooks/userDataHooks'
import { useLoadingFonts } from '../../utilities/LoadingFonts'
import { useDimensionSizes } from '../../utilities/DimensionHooks'
import { zoomFromPrincipale, zoomFromSecondary } from '../../utilities/AnimationConstants'

import * as Animatable from 'react-native-animatable';
import { AuthAPI } from '../APIs/AuthApi'
import { RootUserTokenContext } from '../contexts'
import { ScrollView } from 'react-native'
import { Divider, Icon, Input } from '@ui-kitten/components'
import { blurhash } from '../../utilities/Hasher'


const TopBarCustom = ({ navigation }: { navigation: () => void }) => {
    const { dataUser, setter } = userDataHooks()
    const { loaded } = useLoadingFonts()
    const [loading, setloading] = React.useState<boolean>(false)
    const userTokenContext = React.useContext(RootUserTokenContext)
    const [walletInputETH, setWalletInputETH] = useState<string>(dataUser.account_balance_eth)
    const [showModalsUpdataWalletETH, setshowModalsUpdataWalletETH] = React.useState<boolean>(false)

    React.useEffect(() => setWalletInputETH(dataUser.account_balance_eth),[dataUser])

    const updateUserInfo = () => {
        setloading(true)
        let authMee = new AuthAPI()
        let token = userTokenContext.token
        let data: any;

        data = { account_balance_eth: walletInputETH }
        authMee.retrive_mee_update(token, data)
            .then(data => {
                setter(data)
                setloading(false)
                setshowModalsUpdataWalletETH(false)
            })
    }

    const { height, width } = useDimensionSizes()
    return (
        <View style={{ justifyContent: "space-between", flexDirection: "row", position: "relative", alignItems: "center", paddingHorizontal: 20, marginTop: 15, zIndex: 10 }}>

            {
                dataUser.id && showModalsUpdataWalletETH && <Animatable.View

                    // delay={stateDelay}
                    duration={500}
                    easing={"ease-in-back"}
                    animation={zoomFromPrincipale}

                    style={{
                        position: "absolute", backgroundColor: "rgba(10,10,10,.5)", top: 0, left: 0, bottom: 0,
                        right: 0, zIndex: 100, width: width, height: height
                    }}>
                    <BlurView intensity={20} tint="dark" style={{
                        flex: 1,
                        elevation: 10, display: "flex",
                        justifyContent: 'center', flexDirection: "row", alignItems: "center"
                    }}>
                        <ScrollView style={{ flex: 1, height: height * .9, }}
                            contentContainerStyle={{ alignItems: "center" }}
                        >

                            <Animatable.View
                                easing={"ease-in-back"}
                                // delay={300}
                                duration={500}
                                animation={zoomFromSecondary}
                                style={{
                                    width: "90%", backgroundColor: "#0f071d", marginTop: height * .18,
                                    padding: 25, borderRadius: 10, elevation: 10, position: "relative"
                                }}>
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
                                    onPress={() => setshowModalsUpdataWalletETH(false)}
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
                                    style={{ height: width * .15, width: width * .15, alignSelf: "center" }}
                                    source={require("../../assets/images/nft.png")}
                                    placeholder={blurhash}
                                    contentFit="cover"
                                    transition={1000}
                                />
                                <Text style={{
                                    color: "white", fontFamily: "Montserrat-SemiBold",
                                    fontSize: 20, marginTop: 12.5, alignSelf: "center",
                                }}>Loading More ETH balance</Text>
                                <Text style={{
                                    color: "rgba(255,255,255,.5)", fontFamily: "Montserrat-SemiBold",
                                    fontSize: 12, marginTop: 12.5, alignSelf: "center",
                                }}>Please follow this step to load more your wallet.
                                </Text>

                                <Divider style={{ marginTop: 15, backgroundColor: "rgba(255,255,255,.2)" }} />

                                <View style={{ marginTop: 20 }}>
                                    <Text style={{
                                        color: "rgba(255,255,255,.8)", fontFamily: "Montserrat-SemiBold",
                                        fontSize: 12, marginTop: 5.5, alignSelf: "center", marginBottom: 5
                                    }}>Modify your account_balance_eth</Text>

                                    <Input
                                        textStyle={{ color: "white" }}
                                        value={walletInputETH}
                                        keyboardType='number-pad'
                                        onChangeText={(ne) => setWalletInputETH(ne)}
                                        placeholder='Ex: 15000'
                                        style={{ marginTop: 10, backgroundColor: "transparent", color: "red" }}
                                    />
                                </View>



                                <View style={{ marginTop: 15 }}>
                                    <TouchableOpacity
                                        onPress={() => updateUserInfo()}
                                        disabled={loading}
                                        style={{
                                            backgroundColor: "rgb(99, 102, 241)", display: "flex",
                                            justifyContent: "center", alignItems: "center", padding: 12.5, borderRadius: 5, flexDirection: "row",
                                        }}>

                                        <Text style={{
                                            color: "white", fontSize: 18,
                                            fontFamily: "Montserrat-Medium",
                                        }}>Submit</Text>
                                        {
                                            loading && <ActivityIndicator size="small" style={{ marginLeft: 10 }} color="white" />
                                        }
                                    </TouchableOpacity>
                                </View>
                            </Animatable.View>

                            <View style={{ height: height * .3 }} />
                        </ScrollView>
                    </BlurView>
                </Animatable.View>
            }

            <TouchableOpacity
                // onPress={openPanel}

                onPress={() => setshowModalsUpdataWalletETH(!showModalsUpdataWalletETH)}
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
                        contentFit="cover"
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