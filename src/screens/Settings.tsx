import { View, Text, ScrollView, TouchableOpacity } from 'react-native'
import React from 'react'
import RootComponent from '../components/RootComponent'
import TopBarCustom from '../components/TopBarCustom'
import { useLoadingFonts } from '../../utilities/LoadingFonts'
import userDataHooks from '../hooks/userDataHooks'
import { Image } from 'expo-image'
import { Icon } from '@ui-kitten/components'

const Settings = ({ navigation }) => {
    const { loaded } = useLoadingFonts()
    const { dataUser } = userDataHooks()
    return (

        <RootComponent>
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
                                resizeMode='center'
                                transition={1000}
                            />
                        </View>
                        <View>
                            <View>
                                <Text style={{ color: "white", fontFamily: loaded && "Montserrat-SemiBold", fontSize: 20, marginTop: 2.5 }}>{dataUser?.name}</Text>
                            </View>
                            <View>
                                <Text style={{ color: "rgba(255,255,255,.5)", fontFamily: loaded && "Montserrat-Medium", }}>{dataUser?.email}</Text>
                            </View>
                        </View>
                    </View>
                    <TouchableOpacity
                        // onPress={() => submitForLogin()}
                        // disabled={loading}
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
                    <TouchableOpacity
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
                    </TouchableOpacity>
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
                    <TouchableOpacity
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
                    </TouchableOpacity>
                </View>
            </ScrollView>
        </RootComponent>
    )
}

export default Settings