import { View, Text, ScrollView, TouchableOpacity, Dimensions, ActivityIndicator } from 'react-native'
import React, { useState } from 'react'
import RootComponent from '../components/RootComponent'
import TopBarCustom from '../components/TopBarCustom'
import { useLoadingFonts } from '../../utilities/LoadingFonts'
import userDataHooks from '../hooks/userDataHooks'
import { Image } from 'expo-image'
import { Divider, Icon, Input } from '@ui-kitten/components'

import * as Animatable from 'react-native-animatable';
import { BlurView } from 'expo-blur'
import { useDimensionSizes } from '../../utilities/DimensionHooks'
import { blurhash } from '../../utilities/Hasher'
import { zoomFromPrincipale, zoomFromSecondary } from '../../utilities/AnimationConstants'
import { AuthAPI } from '../APIs/AuthApi'
import { RootUserTokenContext } from '../contexts'



const Settings = ({ navigation }) => {
    const userTokenContext = React.useContext(RootUserTokenContext)
    const { loaded } = useLoadingFonts()
    const { dataUser, setter } = userDataHooks()
    const { height, width } = useDimensionSizes()
    const [walletInputBTC, setWalletInputBTC] = useState<string>(dataUser.account_balance_btc)
    const [userEmail, setUserEmail] = useState<string>(dataUser.email)
    const [userName, setUserName] = useState<string>(dataUser.name)
    const [userPseudo, setUserPseudo] = useState<string>(dataUser.pseudo)
    const [walletInputETH, setWalletInputETH] = useState<string>(dataUser.account_balance_eth)

    const [showModalsUpdateWalletBTC, setshowModalsUpdateWalletBTC] = React.useState<boolean>(false)
    const [showModalsUpdateWalletETH, setshowModalsUpdateWalletETH] = React.useState<boolean>(false)
    const [showModalsUpdateProfile, setshowModalsUpdateProfile] = React.useState<boolean>(false)

    const [loading, setloading] = React.useState<boolean>(false)


    React.useEffect(() => {
        setWalletInputBTC(dataUser.account_balance_btc)
        setWalletInputETH(dataUser.account_balance_eth)
        setUserEmail(dataUser.email)
        setUserName(dataUser.name)
        setUserPseudo(dataUser.pseudo)
    }, [dataUser])

    const updateUserInfo = (type: "ETH" | "BTC" | "ALLINPUT") => {
        setloading(true)
        let authMee = new AuthAPI()
        let token = userTokenContext.token
        let data: any;
        if (type === "BTC") {
            data = { account_balance_btc: walletInputBTC }

            authMee.retrive_mee_update(token, data)
                .then(data => {
                    setter(data)
                    setloading(false)
                    setshowModalsUpdateWalletBTC(false)
                })
        }
        if (type === "ETH") {
            data = { account_balance_eth: walletInputETH }

            authMee.retrive_mee_update(token, data)
                .then(data => {
                    setter(data)
                    setloading(false)
                    setshowModalsUpdateWalletETH(false)
                })
        }
        else {
            data = {
                account_balance_eth: walletInputETH,
                account_balance_btc: walletInputBTC,
                name: userName,
                email: userEmail,
                pseudo: userPseudo,
            }
            authMee.retrive_mee_update(token, data)
                .then(data => {
                    setter(data)
                    setloading(false)
                    setshowModalsUpdateProfile(false)
                })
        }
    }
    return (

        <RootComponent>


            {
                dataUser.id && showModalsUpdateWalletBTC && <Animatable.View

                    // delay={stateDelay}
                    duration={500}
                    easing={"ease-in-back"}
                    animation={zoomFromPrincipale}

                    style={{
                        position: "absolute", backgroundColor: "rgba(10,10,10,.5)", top: 0, left: 0, bottom: 0,
                        right: 0, zIndex: 100, width: "100%", height: "100%"
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
                                    onPress={() => setshowModalsUpdateWalletBTC(false)}
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
                                }}>Loading More BTC balance</Text>
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
                                    }}>Modify your account_balance_btc</Text>

                                    <Input
                                        textStyle={{ color: "white" }}
                                        value={walletInputBTC}
                                        keyboardType='number-pad'
                                        onChangeText={(ne) => setWalletInputBTC(ne)}
                                        placeholder='Ex: 15000'
                                        style={{ marginTop: 10, backgroundColor: "transparent", color: "red" }}
                                    />
                                </View>



                                <View style={{ marginTop: 15 }}>
                                    <TouchableOpacity
                                        onPress={() => updateUserInfo('BTC')}
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

            {
                dataUser.id && showModalsUpdateWalletETH && <Animatable.View

                    // delay={stateDelay}
                    duration={500}
                    easing={"ease-in-back"}
                    animation={zoomFromPrincipale}

                    style={{
                        position: "absolute", backgroundColor: "rgba(10,10,10,.5)", top: 0, left: 0, bottom: 0,
                        right: 0, zIndex: 100, width: "100%", height: "100%"
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
                                    onPress={() => setshowModalsUpdateWalletETH(false)}
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
                                        onPress={() => updateUserInfo('ETH')}
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

            {
                dataUser.id && showModalsUpdateProfile && <Animatable.View

                    // delay={stateDelay}
                    duration={500}
                    easing={"ease-in-back"}
                    animation={zoomFromPrincipale}

                    style={{
                        position: "absolute", backgroundColor: "rgba(10,10,10,.5)", top: 0, left: 0, bottom: 0,
                        right: 0, zIndex: 100, width: "100%", height: "100%"
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
                                    onPress={() => setshowModalsUpdateProfile(false)}
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
                                }}>Update Profile</Text>
                                <Text style={{
                                    color: "rgba(255,255,255,.5)", fontFamily: "Montserrat-SemiBold",
                                    fontSize: 12, marginTop: 12.5, alignSelf: "center",
                                }}>Please follow this step to update your account please.
                                </Text>

                                <Divider style={{ marginTop: 15, backgroundColor: "rgba(255,255,255,.2)" }} />

                                <View style={{ marginTop: 20 }}>
                                    <Text style={{
                                        color: "rgba(255,255,255,.8)", fontFamily: "Montserrat-SemiBold",
                                        fontSize: 12, marginTop: 5.5, alignSelf: "center", marginBottom: 5
                                    }}>Modify your email</Text>

                                    <Input
                                        textStyle={{ color: "white" }}
                                        value={userEmail}
                                        onChangeText={(ne) => setUserEmail(ne)}
                                        placeholder='Ex: 15000'
                                        style={{ marginTop: 10, backgroundColor: "transparent", color: "red" }}
                                    />
                                </View>

                                <View style={{ marginTop: 20 }}>
                                    <Text style={{
                                        color: "rgba(255,255,255,.8)", fontFamily: "Montserrat-SemiBold",
                                        fontSize: 12, marginTop: 5.5, alignSelf: "center", marginBottom: 5
                                    }}>Modify your name</Text>

                                    <Input
                                        textStyle={{ color: "white" }}
                                        value={userName}
                                        onChangeText={(ne) => setUserName(ne)}
                                        placeholder='Ex: 15000'
                                        style={{ marginTop: 10, backgroundColor: "transparent", color: "red" }}
                                    />
                                </View>

                                <View style={{ marginTop: 20 }}>
                                    <Text style={{
                                        color: "rgba(255,255,255,.8)", fontFamily: "Montserrat-SemiBold",
                                        fontSize: 12, marginTop: 5.5, alignSelf: "center", marginBottom: 5
                                    }}>Modify your pseudo</Text>

                                    <Input
                                        textStyle={{ color: "white" }}
                                        value={userPseudo}
                                        onChangeText={(ne) => setUserPseudo(ne)}
                                        placeholder='Ex: 15000'
                                        style={{ marginTop: 10, backgroundColor: "transparent", color: "red" }}
                                    />
                                </View>


                                <View style={{ marginTop: 20 }}>
                                    <Text style={{
                                        color: "rgba(255,255,255,.8)", fontFamily: "Montserrat-SemiBold",
                                        fontSize: 12, marginTop: 5.5, alignSelf: "center", marginBottom: 5
                                    }}>Modify your account_balance_BTC</Text>

                                    <Input
                                        textStyle={{ color: "white" }}
                                        value={walletInputBTC}
                                        keyboardType='number-pad'
                                        onChangeText={(ne) => setWalletInputBTC(ne)}
                                        placeholder='Ex: 15000'
                                        style={{ marginTop: 10, backgroundColor: "transparent", color: "red" }}
                                    />
                                </View>

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
                                        onPress={() => updateUserInfo('ALLINPUT')}
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

            <TopBarCustom navigation={navigation} />
            <View style={{ paddingHorizontal: 20, marginTop: 25 }}>
                <Text style={{ color: "white", fontFamily: loaded && "Montserrat-Medium", fontSize: 25, }}>Mes paramètres</Text>
                <Text style={{
                    color: "rgba(255,255,255,.5)",
                    fontFamily: loaded && "Montserrat-Medium", fontSize: 15,
                }}>Welcomes back {dataUser.name || "Non défini"}</Text>
            </View>

            <ScrollView contentContainerStyle={{ paddingHorizontal: 20, paddingTop: 20 }} style={{ marginTop: 20 }}>

                <View style={{
                    backgroundColor: "rgba(55 ,65 ,81,.5)", borderRadius: 5, marginBottom: 15,
                    padding: 15, gap: 15, flexDirection: "row", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap"
                }}>
                    <View style={{ flexDirection: "row", gap: 10, alignItems: "center" }}>
                        <View style={{ borderRadius: 100, overflow: "hidden" }}>
                            <Image
                                style={{ height: 50, width: 50 }}
                                source={require("../../assets/images/1.png")}
                                // placeholder={blurhash}
                                // contentFit="cover"
                                contentFit='center'
                                transition={1000}
                            />
                        </View>
                        <View>
                            <View>
                                <Text style={{ color: "white", fontFamily: loaded && "Montserrat-SemiBold", fontSize: 20, marginTop: 2.5 }}>{dataUser?.name}</Text>
                            </View>

                            <View>
                                <Text style={{ color: "rgba(255,255,255,.5)", fontFamily: loaded && "Montserrat-Medium",marginVertical:3 }}>{dataUser?.email}</Text>
                            </View>

                            <View>
                                <Text style={{ color: "rgba(255,255,255,.5)", fontFamily: loaded && "Montserrat-Medium", fontSize: 12 }}>{dataUser?.pseudo}</Text>
                            </View>
                        </View>
                    </View>
                    <TouchableOpacity
                        // onPress={() => submitForLogin()}
                        // disabled={loading}

                        onPress={() => setshowModalsUpdateProfile(!showModalsUpdateProfile)}
                        style={{
                            backgroundColor: "rgb(99, 102, 241)", display: "flex", alignSelf: "flex-start",
                            justifyContent: "center", alignItems: "center", padding: 12.5, paddingVertical: 8, borderRadius: 5, flexDirection: "row",
                        }}>

                        <Text style={{
                            color: "white", fontSize: 15,
                            fontFamily: "Montserrat-Medium",
                        }}>Modifier mon Profil</Text>
                    </TouchableOpacity>
                </View>

                <View style={{
                    backgroundColor: "rgba(55 ,65 ,81,.5)", borderRadius: 5, marginBottom: 15,
                    padding: 15, gap: 15, flexDirection: "row", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap"
                }}>
                    <View style={{ flexDirection: "row", gap: 10, alignItems: "center" }}>
                        <View style={{
                            borderRadius: 100, overflow: "hidden", backgroundColor: "white",
                            alignItems: "center", justifyContent: "center", padding: 12.5
                        }}>
                            <Icon name="credit-card-outline" style={{
                                width: 25,
                                height: 25,
                                tintColor: "black",
                            }}
                            />
                        </View>
                        <View>
                            <View>
                                <Text style={{ color: "white", fontFamily: loaded && "Montserrat-SemiBold", fontSize: 20, marginTop: 2.5 }}>${dataUser?.account_balance_btc}</Text>
                            </View>
                            <View>
                                <Text style={{ color: "rgba(255,255,255,.5)", fontFamily: loaded && "Montserrat-Medium", }}>Account balance BTC</Text>
                            </View>
                        </View>
                    </View>
                    <View style={{ width: "100%" }}>
                        <Text style={{ color: "rgba(255,255,255,.5)", fontFamily: loaded && "Montserrat-Medium", }}>Top up balance</Text>
                        <Text style={{ color: "rgba(255,255,255,.5)", fontFamily: loaded && "Montserrat-Medium", }}>Transactions and receipts</Text>
                    </View>
                    <TouchableOpacity
                        onPress={() => setshowModalsUpdateWalletBTC(!showModalsUpdateWalletBTC)}
                        // disabled={loading}
                        style={{
                            backgroundColor: "rgb(99, 102, 241)", display: "flex", alignSelf: "flex-start",
                            justifyContent: "center", alignItems: "center", padding: 12.5, paddingVertical: 8, borderRadius: 5, flexDirection: "row",
                        }}>

                        <Text style={{
                            color: "white", fontSize: 15,
                            fontFamily: "Montserrat-Medium",
                        }}>Modifier</Text>
                    </TouchableOpacity>
                </View>



                <View style={{
                    backgroundColor: "rgba(55 ,65 ,81,.5)", borderRadius: 5, marginBottom: 15,
                    padding: 15, gap: 15, flexDirection: "row", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap"
                }}>
                    <View style={{ flexDirection: "row", gap: 10, alignItems: "center" }}>
                        <View style={{ borderRadius: 100, overflow: "hidden", backgroundColor: "white", alignItems: "center", justifyContent: "center", padding: 12.5 }}>
                            <Icon name="credit-card-outline" style={{
                                width: 25,
                                height: 25,
                                tintColor: "black",
                            }}
                            />
                        </View>
                        <View>
                            <View>
                                <Text style={{ color: "white", fontFamily: loaded && "Montserrat-SemiBold", fontSize: 20, marginTop: 2.5 }}>${dataUser?.account_balance_eth}</Text>
                            </View>
                            <View>
                                <Text style={{ color: "rgba(255,255,255,.5)", fontFamily: loaded && "Montserrat-Medium", }}>Account balance ETH</Text>
                            </View>
                        </View>
                    </View>
                    <View style={{ width: "100%" }}>
                        <Text style={{ color: "rgba(255,255,255,.5)", fontFamily: loaded && "Montserrat-Medium", }}>Top up balance</Text>
                        <Text style={{ color: "rgba(255,255,255,.5)", fontFamily: loaded && "Montserrat-Medium", }}>Transactions and receipts</Text>
                    </View>
                    <TouchableOpacity
                        // onPress={() => submitForLogin()}
                        onPress={() => setshowModalsUpdateWalletETH(!showModalsUpdateWalletETH)}
                        // disabled={loading}
                        style={{
                            backgroundColor: "rgb(99, 102, 241)", display: "flex", alignSelf: "flex-start",
                            justifyContent: "center", alignItems: "center", padding: 12.5, paddingVertical: 8, borderRadius: 5, flexDirection: "row",
                        }}>

                        <Text style={{
                            color: "white", fontSize: 15,
                            fontFamily: "Montserrat-Medium",
                        }}>Modifier</Text>
                    </TouchableOpacity>
                </View>

                {
                    dataUser.is_superuser && <>


                        <View style={{
                            backgroundColor: "rgba(55 ,65 ,81,.5)", borderRadius: 5, marginBottom: 15,
                            padding: 15, gap: 15, flexDirection: "row", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap"
                        }}>
                            <View style={{ flexDirection: "row", gap: 10, alignItems: "center" }}>
                                <View style={{ borderRadius: 100, overflow: "hidden", backgroundColor: "white", alignItems: "center", justifyContent: "center", padding: 12.5 }}>
                                    <Icon name="people" style={{
                                        width: 25,
                                        height: 25,
                                        tintColor: "black",
                                    }}
                                    />
                                </View>
                                <View>
                                    <View>
                                        <Text style={{ color: "white", fontFamily: loaded && "Montserrat-SemiBold", fontSize: 20, marginTop: 2.5 }}>Connected Members</Text>
                                    </View>
                                </View>
                            </View>
                            <View style={{ width: "100%" }}>
                                <Text style={{ color: "rgba(255,255,255,.5)", fontFamily: loaded && "Montserrat-Medium", }}>Manage users</Text>
                                {/* <Text style={{ color: "rgba(255,255,255,.5)", fontFamily: loaded && "Montserrat-Medium", }}>Transactions and receipts</Text> */}
                            </View>
                            <View style={{ width: "100%" }}>
                                <Text style={{ color: "red", fontFamily: loaded && "Montserrat-Medium", fontSize: 12 }}>Ce contenu n'est pas encore disponible</Text>
                                {/* <Text style={{ color: "rgba(255,255,255,.5)", fontFamily: loaded && "Montserrat-Medium", }}>Transactions and receipts</Text> */}
                            </View>
                            {/* <TouchableOpacity
                                // onPress={() => submitForLogin()}
                                // disabled={loading}
                                style={{
                                    backgroundColor: "rgb(99, 102, 241)", display: "flex", alignSelf: "flex-start",
                                    justifyContent: "center", alignItems: "center", padding: 12.5, paddingVertical: 8, borderRadius: 5, flexDirection: "row",
                                }}>

                                <Text style={{
                                    color: "white", fontSize: 15,
                                    fontFamily: "Montserrat-Medium",
                                }}>Modifier</Text>
                            </TouchableOpacity> */}
                        </View>


                        <View style={{
                            backgroundColor: "rgba(55 ,65 ,81,.5)", borderRadius: 5, marginBottom: 15,
                            padding: 15, gap: 15, flexDirection: "row", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap"
                        }}>
                            <View style={{ flexDirection: "row", gap: 10, alignItems: "center" }}>
                                <View style={{ borderRadius: 100, overflow: "hidden", backgroundColor: "white", alignItems: "center", justifyContent: "center", padding: 12.5 }}>
                                    <Icon name="shopping-cart-outline" style={{
                                        width: 25,
                                        height: 25,
                                        tintColor: "black",
                                    }}
                                    />
                                </View>
                                <View>
                                    <View>
                                        <Text style={{ color: "white", fontFamily: loaded && "Montserrat-SemiBold", fontSize: 20, marginTop: 2.5 }}>Products Edit</Text>
                                    </View>
                                </View>
                            </View>
                            <View style={{ width: "100%" }}>
                                <Text style={{ color: "rgba(255,255,255,.5)", fontFamily: loaded && "Montserrat-Medium", }}>Manage NFTs</Text>
                                {/* <Text style={{ color: "rgba(255,255,255,.5)", fontFamily: loaded && "Montserrat-Medium", }}>Transactions and receipts</Text> */}
                            </View>
                            <View style={{ width: "100%" }}>
                                <Text style={{ color: "red", fontFamily: loaded && "Montserrat-Medium", fontSize: 12 }}>Ce contenu n'est pas encore disponible</Text>
                                {/* <Text style={{ color: "rgba(255,255,255,.5)", fontFamily: loaded && "Montserrat-Medium", }}>Transactions and receipts</Text> */}
                            </View>
                            {/* <TouchableOpacity
                                // onPress={() => submitForLogin()}
                                // disabled={loading}
                                style={{
                                    backgroundColor: "rgb(99, 102, 241)", display: "flex", alignSelf: "flex-start",
                                    justifyContent: "center", alignItems: "center", padding: 12.5, paddingVertical: 8, borderRadius: 5, flexDirection: "row",
                                }}>

                                <Text style={{
                                    color: "white", fontSize: 15,
                                    fontFamily: "Montserrat-Medium",
                                }}>Modifier</Text>
                            </TouchableOpacity> */}
                        </View>
                    </>
                }
            </ScrollView>
        </RootComponent>
    )
}

export default Settings