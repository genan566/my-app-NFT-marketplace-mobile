import { View, Text, TouchableOpacity } from 'react-native'
import React from 'react'
import { blurhash } from '../../utilities/Hasher'
import { useDimensionSizes } from '../../utilities/DimensionHooks'
import { Image } from 'expo-image'
import { BlurView } from 'expo-blur'
import { useLoadingFonts } from '../../utilities/LoadingFonts'
import DropShadow from "react-native-drop-shadow";
import { SaleHistoriesAPI } from '../APIs/SaleHistoriesAPI'
import { SaleHistory } from '../types/SaleHistoryType'
import { LinearGradient } from 'expo-linear-gradient'
import { Feather, Ionicons } from '@expo/vector-icons'
import { RootNftContext, RootUserTokenContext } from '../contexts'
import { UserRetrieveInterface } from '../types/UserRetrieveTypes'
import { AuthAPI } from '../APIs/AuthApi'
import { routeAPIBaseImage } from '../APIs/APIRoutes'
import { CategoriesTrendingAPI } from '../APIs/CategoriesTrending'
import { CategoriesTrending } from '../types/CategorieTrendingType'
const NFTViewer = ({ data, callActionView }: { data: any, callActionView: () => void }) => {
    const { height } = useDimensionSizes()
    const { loaded } = useLoadingFonts()
    const [saleHistories, setSaleHistories] = React.useState<SaleHistory[]>([])
    const nftContext = React.useContext(RootNftContext)
    const [categories, setCategories] = React.useState<CategoriesTrending[]>([])

    React.useEffect(() => {
        load_sale_histories()
    }, [data?.id])

    const load_sale_histories = async () => {
        let sales_getted = data?.id
        if (Boolean(sales_getted)) {
            let salesHistories_trendings = new SaleHistoriesAPI()
            salesHistories_trendings
                .get_multi_sales_by_nftID(sales_getted)
                .then(datas => {
                    if (datas.length > 0) {
                        setSaleHistories([...datas])
                    }
                })
        }
    }




    const load_categories = async () => {
        if (Boolean(data.categories_trending?.length)) {
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
                    .get_multi_categorie(data.categories_trending)
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
    }, [data.categories_trending])



    const userTokenContext = React.useContext(RootUserTokenContext)


    const [userRetrieveData, setuserRetrieveData] = React.useState<UserRetrieveInterface>({} as UserRetrieveInterface)

    React.useEffect(() => {
        let respAuth = new AuthAPI()
        if (userTokenContext.token !== "") {
            let token = userTokenContext.token
            respAuth
                .retrive_account(token, data.user_suscribed)
                .then(res => {
                    let formatedData = {
                        email: res.email,
                        id: res.id,
                        name: res.name,
                        pseudo: res.pseudo,
                        is_superuser: res.is_superuser,
                        is_staff: res.is_staff,
                        image: routeAPIBaseImage + res.image?.toString(),
                    }

                    setuserRetrieveData
                        (formatedData)

                })
        }
    }, [])
    const calculatedSalesAdded = React.useMemo(() => {
        if (saleHistories.length > 0) {
            return saleHistories.length > 1000 ? `${saleHistories.length / 1000}K`
                : saleHistories.length > 1000000 ? `${saleHistories.length / 1000000}M` : saleHistories.length
        } else {
            return 0
        }
    }, [saleHistories])

    return (
        <View style={{
            width: "100%",
            minHeight: 315, maxHeight: 370, overflow: "hidden",
            position: "relative",
            borderRadius: 10, marginBottom: 15
        }}>

            <Image
                style={{ position: "absolute", top: 0, left: 0, right: 0, bottom: 0, zIndex: 1 }}
                source={data.image || "https://picsum.photos/seed/696/3000/2000"}
                placeholder={blurhash}
                contentFit="cover"
                transition={1000}
            />
            <LinearGradient
                start={{ x: 1, y: 0.45 }}
                end={{ x: 1, y: 1 }}
                // Button Linear Gradient
                colors={['transparent', '#1c0b04']}
                style={{
                    flex: 1,
                    position: "absolute", top: 0, left: 0,
                    bottom: 0, right: 0, width: "100%", height: "100%", zIndex: 10
                }}>
                <View style={{
                    position: "absolute", top: 0, left: 0, right: 0, bottom: 0,
                    zIndex: 2, alignItems: "center", justifyContent: "flex-end", padding: 10
                }}>
                    <View style={{ position: "absolute", top: 10, left: 10, overflow: "hidden", borderRadius: 100 }}>
                        <BlurView intensity={30} tint="light" style={{
                            padding: 4.5, paddingHorizontal: 15, elevation: 10, display: "flex",
                            justifyContent: 'space-between', flexDirection: "row", alignItems: "center"
                        }}>
                            <View style={{
                                display: "flex",
                                justifyContent: 'space-between', flexDirection: "row", gap: 10, alignItems: "center"
                            }}>
                                <Ionicons name="people-circle" size={24} color="white" />
                                <View>
                                    {/* <Text style={{ color: "rgba(255,255,255,.5)", fontFamily: loaded && "Montserrat-Medium", }}>Followers</Text> */}
                                    <Text style={{ color: "white", fontFamily: loaded && "Montserrat-SemiBold", fontSize: 20, marginTop: 2.5 }}>{calculatedSalesAdded || 0}</Text>
                                </View>
                            </View>
                        </BlurView>
                    </View>

                    <View style={{ position: "absolute", top: 10, right: 10, overflow: "hidden", borderRadius: 100 }}>

                        <View style={{ borderWidth: 1, borderColor: "rgba(255,255,255,.2)", borderRadius: 100, overflow: "hidden" }}>
                            <Image
                                style={{ width: 45, height: 45, borderRadius: 100 }}
                                contentFit="cover"
                                source={require("../../assets/images/1.png")} />
                        </View>
                    </View>
                    <View style={{ paddingHorizontal: 10 ,width: "100%",}}>
                        <View style={{ width: "100%", }}>
                            <Text style={{ fontFamily: loaded && "Montserrat-Medium", fontSize: 28, color: "white", width: "90%" }} numberOfLines={1} >{data.title}</Text>
                            <Text style={{ fontFamily: loaded && "Montserrat-Medium", fontSize: 22, color: "white", width: "90%" }} numberOfLines={1} >{data.description}</Text>
                        </View>
                        <View style={{ alignItems: "flex-start", marginBottom: 10, flexDirection: "row", width: "100%", flexWrap: "wrap", justifyContent: "flex-start" }}>
                            {
                                categories?.map(it => {
                                    return (
                                        <TouchableOpacity
                                            style={{
                                                paddingHorizontal: 20, backgroundColor: "transparent",
                                                borderColor: "rgb(99, 102, 241)", borderWidth: 1, paddingVertical: 8, borderRadius: 50, marginRight: 10, marginTop: 10
                                            }}>
                                            <Text style={{ fontFamily: loaded && "Montserrat-SemiBold", color: "white", fontSize: 14 }}>{it.name}</Text>
                                        </TouchableOpacity>
                                    )
                                })
                            }
                        </View>
                    </View>
                    <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center", width: "100%" }}>

                        <View style={{ overflow: "hidden",  borderRadius: 100 }}>
                            <BlurView intensity={30} tint="light" style={{
                                padding: 4, paddingHorizontal: 20, elevation: 10, display: "flex",
                                justifyContent: 'space-between', flexDirection: "row", alignItems: "center"
                            }}>
                                <View style={{
                                    display: "flex",
                                    justifyContent: 'space-between', flexDirection: "row", gap: 10, alignItems: "center"
                                }}>
                                    <Feather name="layers" size={20} color="white" />
                                    <View>
                                        <Text style={{ color: "rgba(255,255,255,.5)", fontFamily: loaded && "Montserrat-Medium", fontSize: 12 }}>Current Bid</Text>
                                        <Text style={{ color: "white", fontFamily: loaded && "Montserrat-SemiBold", fontSize: 17, marginTop: 2.5 }}>{data.price}ETH</Text>
                                    </View>
                                </View>
                            </BlurView>
                        </View>
                        <TouchableOpacity
                            onPress={callActionView}
                            style={{ backgroundColor: "white", padding: 10, borderRadius: 100, flexDirection: "row", justifyContent: "center", alignItems: "center" }}>

                            <Text style={{ color: "black", fontFamily: loaded && "Montserrat-Medium", }}>Détails</Text>
                            <Feather name="chevron-right" size={15} color="black" />
                        </TouchableOpacity>
                    </View>
                </View>

            </LinearGradient>



        </View>
    )
}

export default NFTViewer