import { TouchableOpacity, View, Text, ScrollView, Image, TouchableHighlight, Dimensions } from "react-native"
import React, { useRef, useState } from 'react'
import RootComponent from "./RootComponent"
import { Icon } from "@ui-kitten/components"
import { useLoadingFonts } from "../../utilities/LoadingFonts"
import { blurhash } from "../../utilities/Hasher"
import { Feather } from "@expo/vector-icons"
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { RootNftContext, RootUserTokenContext } from "../contexts"
import Detail from "./DetailsNFT"
import Owners from "./OwnersNFT"
import Histories from "./HistoriesNFT"
import { SaleHistoriesAPI } from "../APIs/SaleHistoriesAPI"
import { AuthAPI } from "../APIs/AuthApi"
import { routeAPIBaseImage } from "../APIs/APIRoutes"
import { SaleHistory } from "../types/SaleHistoryType"
import { UserRetrieveInterface } from "../types/UserRetrieveTypes"
import { CategoriesTrendingAPI } from "../APIs/CategoriesTrending"
import { CategoriesTrending } from "../types/CategorieTrendingType"
const WIDTH = Dimensions.get("screen").width;
const HEIGHT = Dimensions.get("screen").height;

const Tab = createMaterialTopTabNavigator();
const ViewHiddenOfNFt = ({ callAction }: { callAction: () => void }) => {
    // const Tab = createMaterialTopTabNavigator();
    const { loaded } = useLoadingFonts()
    const userTokenContext = React.useContext(RootUserTokenContext)
    const nftContext = React.useContext(RootNftContext)
    const [saleHistories, setSaleHistories] = React.useState<SaleHistory[]>([])
    const [activePage, setactivePage] = React.useState<number>(0)
    const [categories, setCategories] = React.useState<CategoriesTrending[]>([])
    const [userRetrieveDataListForSales, setuserRetrieveDataListForSales] = React.useState<UserRetrieveInterface[]>([])

    const load_sale_histories = async () => {
        let sales_getted = nftContext?.nftData?.id
        if (Boolean(sales_getted)) {
            let salesHistories_trendings = new SaleHistoriesAPI()
            salesHistories_trendings
                .get_multi_sales_by_nftID(sales_getted)
                .then(data => {
                    if (data.length > 0) {
                        setSaleHistories([...data])
                        data.map((item: any) => {
                            let respAuth = new AuthAPI()
                            if (userTokenContext.token !== "") {
                                let token = userTokenContext.token
                                respAuth
                                    .retrive_account(token, item.user_suscribed)
                                    .then(res => {
                                        let formatedData = {
                                            email: res?.email,
                                            id: res?.id,
                                            name: res?.name,
                                            pseudo: res?.pseudo,
                                            is_superuser: res?.is_superuser,
                                            is_staff: res?.is_staff,
                                            image: routeAPIBaseImage + res?.image.toString(),
                                        }

                                        setuserRetrieveDataListForSales
                                            ([...userRetrieveDataListForSales, formatedData])

                                    })
                            }
                        })
                    }
                })
        }
    }


    const load_categories = async () => {
        if (Boolean(nftContext?.nftData?.categories_trending?.length)) {
            {

                // categories_trending.map(it => {
                //     let idX = it
                //     let categories_trendings = new CategoriesTrendingAPI()
                //     categories_trendings
                //         .get_categorie(idX)
                //         .then(data => {
                //             let checker = { id: data.id, name: data.name }
                //             if ((categorie?.id !== checker.id) && categorie?.name !== checker.name) {
                //                 setCategorie(data)
                //             }
                //         })
                // })

                let categories_trendings = new CategoriesTrendingAPI()
                categories_trendings
                    .get_multi_categorie(nftContext?.nftData?.categories_trending)
                    .then(data => {
                        if (data.results.length > 0) {
                            setCategories([...data.results])
                        }
                    })
            }
        }
    }

    React.useEffect(() => {
        load_categories()
    }, [nftContext?.nftData?.categories_trending])


    React.useEffect(() => {
        load_sale_histories()
    }, [nftContext?.nftData?.sales_history])

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

                        <Icon name="close-circle"
                            style={{
                                width: 27,
                                height: 27,
                                tintColor: "white",
                                alignSelf: 'center',
                            }} />
                    </TouchableOpacity>

                    <Text
                        style={{ fontFamily: loaded && "Montserrat-Medium", fontSize: 22.5, color: "white", }}>Detail Product NFT</Text>
                    <View style={{ width: 50 }} />
                    {/* <TouchableOpacity
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
                    </TouchableOpacity> */}
                </View>

                <ScrollView contentContainerStyle={{ paddingHorizontal: 20, marginTop: 85 }}>
                    <TouchableHighlight style={{ overflow: "hidden", borderRadius: 10, borderWidth: 1, borderColor: "rgba(100,100,100,.2)", elevation: 10 }}>
                        <Image
                            style={{ height: HEIGHT * .4, width: "100%" }}
                            source={nftContext.nftData.image ? { uri: nftContext.nftData.image } : require("../../assets/images/1.png")}
                            placeholder={blurhash}
                            // contentFit="cover"
                            resizeMode='cover'
                            transition={1000}
                        />

                    </TouchableHighlight>


                    <TouchableHighlight style={{ marginTop: 15 }}>
                        {/* <Text style={{ color: "white", fontFamily: loaded && "Montserrat-SemiBold", fontSize: 20, marginTop: 2.5 }}>D'EVELs</Text> */}
                        <Text style={{ color: "rgba(255,255,255,.5)", fontFamily: loaded && "Montserrat-Medium", }}>{nftContext?.nftData?.description}</Text>
                    </TouchableHighlight>



                    <View style={{ alignItems: "flex-start", marginVertical: 15, flexDirection: "row", flexWrap: "wrap" }}>
                        {
                            categories?.map(it => {
                                return (
                                    <TouchableOpacity
                                        style={{
                                            paddingHorizontal: 20, backgroundColor: "transparent",
                                            borderColor: "rgb(99, 102, 241)", borderWidth: 1, paddingVertical: 10, borderRadius: 50, marginRight: 10, marginTop: 10
                                        }}>
                                        <Text style={{ fontFamily: loaded && "Montserrat-SemiBold", color: "white" }}>{it.name}</Text>
                                    </TouchableOpacity>
                                )
                            })
                        }
                    </View>




                    <View style={{
                        flexDirection: "row", justifyContent: "space-between", alignItems: "center", marginTop: 20,

                    }}>
                        <View style={{ flexDirection: "row", alignItems: "center", gap: 10 }}>
                            <TouchableHighlight style={{ borderWidth: 1, borderColor: "rgba(100,100,100,.5)", borderRadius: 100, overflow: "hidden", }}>
                                <Image
                                    style={{ height: 50, width: 50 }}
                                    source={require("../../assets/images/1.png")}
                                    placeholder={blurhash}
                                    // contentFit="cover"
                                    resizeMode='center'
                                    transition={1000}
                                />
                            </TouchableHighlight>
                            <View>
                                <TouchableHighlight>
                                    <Text style={{ color: "white", fontFamily: loaded && "Montserrat-SemiBold", fontSize: 20, marginTop: 2.5 }}>D'EVELs</Text>
                                </TouchableHighlight>
                                <TouchableHighlight>
                                    <Text style={{ color: "rgba(255,255,255,.5)", fontFamily: loaded && "Montserrat-Medium", }}>Owner By Zizzler</Text>
                                </TouchableHighlight>
                            </View>
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
                        <TouchableHighlight style={{ overflow: "hidden", backgroundColor: "rgba(82, 82, 79,.8)", borderRadius: 100 }}>
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
                                        <Text style={{ color: "white", fontFamily: loaded && "Montserrat-SemiBold", fontSize: 20, marginTop: 2.5 }}>{nftContext.nftData.price} ETH</Text>
                                    </View>
                                </View>
                            </View>
                        </TouchableHighlight>
                        {/* <TouchableHighlight style={{ overflow: "hidden", backgroundColor: "rgba(82, 82, 79,.8)", borderRadius: 100 }}>
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
                        </TouchableHighlight> */}
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
                                justifyContent: "center", alignItems: "center", padding: 12.5, borderRadius: 5, flexDirection: "row",
                            }}>

                            {/* {
                            loading ? <ActivityIndicator size="large" color="white" />
                                : <Text style={{
                                    color: "white", fontSize: 16,
                                    fontFamily: "Montserrat-Medium",
                                }}>Déconnexion</Text>
                        } */}

                            <Text style={{
                                color: "black", fontSize: 18,
                                fontFamily: "Montserrat-Medium",
                            }}>Place a Bid</Text>
                            {/* <Icon name="log-in-outline"
                                style={{ width: 20, height: 20, tintColor: "black", fontWeight: "bold", marginLeft: 10 }} /> */}
                        </TouchableOpacity>
                    </View>

                    <View style={{
                        marginTop: 15, flexDirection: "row", alignItems: "center",
                        justifyContent: "center", borderBottomColor: "rgba(100,100,100,.5)", borderBottomWidth: 1,
                    }}>
                        {/* <TouchableOpacity
                            onPress={() => setactivePage(0)}
                            style={{
                                flex: 1, paddingVertical: 20, borderBottomColor: activePage === 0 ? "white" : "transparent",
                                borderBottomWidth: activePage === 0 ? 1 : 0,
                            }}>
                            <Text style={{
                                color: activePage === 0 ? "white" : "rgb(150,150,150)", textAlign: "center",
                                fontFamily: loaded && "Montserrat-SemiBold",
                            }}>Details</Text>
                        </TouchableOpacity> */}

                        {/* <TouchableOpacity
                            onPress={() => setactivePage(1)}
                            style={{
                                flex: 1, paddingVertical: 20, borderBottomColor: activePage === 1 ? "white" : "transparent",
                                borderBottomWidth: activePage === 1 ? 1 : 0,
                            }}>
                            <Text style={{
                                color: activePage === 1 ? "white" : "rgb(150,150,150)", textAlign: "center",
                                fontFamily: loaded && "Montserrat-SemiBold",
                            }}>Owners</Text>
                        </TouchableOpacity> */}

                        <TouchableOpacity
                            onPress={() => setactivePage(0)}
                            style={{
                                flex: 1, paddingVertical: 20, borderBottomColor: activePage === 0 ? "white" : "transparent",
                                borderBottomWidth: activePage === 0 ? 1 : 0,
                            }}>
                            <Text style={{
                                color: activePage === 0 ? "white" : "rgb(150,150,150)", textAlign: "center",
                                fontFamily: loaded && "Montserrat-SemiBold",
                            }}>History</Text>
                        </TouchableOpacity>
                    </View>

                    <View style={{ marginTop: 20 }}>
                        {
                            activePage === 0 && <Histories sales={saleHistories} />
                            // :
                            //     activePage === 1 ? <Owners /> :
                            //         <Histories />
                        }
                    </View>

                    <View style={{ marginBottom: HEIGHT * .3 }} />
                </ScrollView>
            </View>
        </RootComponent>
    )
}

export default ViewHiddenOfNFt