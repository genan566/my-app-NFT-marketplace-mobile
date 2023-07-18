import { View, Text, ScrollView, Dimensions, TouchableOpacity, ActivityIndicator, FlatList } from 'react-native'
import React, { useRef, useState } from 'react'
import { LinearGradient } from 'expo-linear-gradient';
import RootComponent from '../components/RootComponent';

import { Divider, Icon, Input } from "@ui-kitten/components";
import { BlurView } from 'expo-blur';
import * as Animatable from 'react-native-animatable';

const WIDTH = Dimensions.get("screen").width;
const HEIGHT = Dimensions.get("screen").height;

import { Image } from 'expo-image'
import { blurhash } from '../../utilities/Hasher';
import { isEmail } from '../../utilities/ISMail';
import { AuthAPI } from '../APIs/AuthApi';
import { useAsyncStorage } from '@react-native-async-storage/async-storage';
import { RootNftContext, RootUserContext, RootUserTokenContext, ValuesTypes } from '../contexts';
import { writeItemToStorage } from '../../utilities/SettingToLocalsStorage';
import userDataHooks from '../hooks/userDataHooks';
import { SaleHistoriesAPI } from '../APIs/SaleHistoriesAPI';
import { UserRetrieveInterface } from '../types/UserRetrieveTypes';
import { NftTypesValues } from '../types/NFTTypes';
import { SaleHistory } from '../types/SaleHistoryType';
import { routeAPIBaseImage } from '../APIs/APIRoutes';
import { NftsAPI } from '../APIs/NftsAPI';
import { PaginatedDataNFT } from '../types/PaginatedData';
import NFTViewer from '../components/NFTViewer';
import SwipeUpDown from 'react-native-swipe-up-down';
import ViewHiddenOfNFt from '../components/CustomSwipeableContent';
import { zoomFromPrincipale, zoomFromSecondary } from '../../utilities/AnimationConstants';


const Profile = ({ navigation }) => {
    const [showModalsLogin, setshowModalsLogin] = React.useState<boolean>(false)
    const [loading, setloading] = React.useState<boolean>(false)
    const [mail, setMail] = useState<string>("")
    const userContext = React.useContext(RootUserContext)
    const [errorOnLogin, setErrorOnLogin] = useState<string>("")
    const [password, setPassword] = useState<string>("")
    const userTokenContext = React.useContext(RootUserTokenContext)
    const { dataUser } = userDataHooks()
    const [nftsData, setnftsData] = React.useState<PaginatedDataNFT>({} as PaginatedDataNFT)
    const { removeItem } = useAsyncStorage('@storage_APIKEY');
    const nFTContext = React.useContext(RootNftContext)
    const swipeUpDownRef = useRef();

    const [userRetrieveDataListForSales, setuserRetrieveDataListForSales] = React.useState<UserRetrieveInterface[]>([])
    const [saleHistories, setSaleHistories] = React.useState<SaleHistory[]>([])
    const [sale_Set_NFT, setSale_Set_NFT] = React.useState<NftTypesValues[]>([])

    const check_user_can_create = React.useCallback(() => {
        let resNFTs = new NftsAPI()
        let parsedToken = userTokenContext.token
        resNFTs.get_all_nfts_by_user(parsedToken).then(data => { setnftsData(data) })
    }, [userContext?.user])

    React.useEffect(() => {
        check_user_can_create()
    }, [check_user_can_create])

    React.useEffect(() => {
        console.log("nfts", nftsData)
    }, [])


    const loGout = async () => {
        userTokenContext.setToken("")
        setSaleHistories([])
        await removeItem();
    }

    const submitForLogin = () => {
        setloading(true)
        if (isEmail(mail)) {
            let respAuth = new AuthAPI()
            let data = { email: mail, password: password }
            respAuth
                .login_account(data)
                .then((res) => {
                    if (!res.token) {
                        setErrorOnLogin(res.error[0])
                        setloading(false)
                    }
                    else {
                        setloading(false)
                        console.log("res", res.token)
                        let dataToSend = JSON.stringify(res.token)
                        userTokenContext?.setToken(dataToSend)
                        writeItemToStorage(dataToSend)

                        setMail("")
                        setPassword("")
                        setshowModalsLogin(false)

                    }
                })
        }

    }


    React.useEffect(() => {

        let order_mee = new SaleHistoriesAPI()
        let token = userTokenContext.token
        Boolean(token) && order_mee
            .get_all_sales_by_mee(token)
            .then(data => {
                if (Boolean(data)) {
                    setSaleHistories([...data])
                    data.map((item: any) => {
                        let respAuth = new AuthAPI()
                        if (userTokenContext.token !== "") {
                            let token = userTokenContext.token
                            respAuth
                                .retrive_account(token, item.user_suscribed)
                                .then(res => {
                                    let formatedData = {
                                        email: res.email,
                                        id: res.id,
                                        name: res.name,
                                        pseudo: res.pseudo,
                                        is_superuser: res.is_superuser,
                                        is_staff: res.is_staff,
                                        image: routeAPIBaseImage + res.image.toString(),
                                    }

                                    setuserRetrieveDataListForSales([...userRetrieveDataListForSales, formatedData])

                                })
                        }
                    })
                }
            })

    }, [userTokenContext.token])

    React.useEffect(() => {
        if (Boolean(saleHistories.length)) {
            const list_id_nfts = Array.from(new Set(saleHistories.map(it => it.nfts_id)))
            console.log(list_id_nfts)
            let nftApi = new NftsAPI()
            nftApi.get_multi_NFT_by_ID(list_id_nfts).then((data) => {
                setSale_Set_NFT(data.results)
            })
        }
    }, [saleHistories])



    return (

        <RootComponent>


            <SwipeUpDown
                itemFull={(hide: any) => <ViewHiddenOfNFt
                    callAction={() => swipeUpDownRef.current.showMini()}
                    hide={hide} />}
                ref={swipeUpDownRef}
                onShowMini={() => console.log('mini')}
                onShowFull={() => console.log('full')}
                animation="spring"
                // disableSwipeIcon
                // extraMarginTop={100}
                swipeHeight={HEIGHT * .92}
                iconColor='gray'
                iconSize={30}
                style={{ backgroundColor: 'rgba(82, 82, 79,.8)', zIndex: 100 }} // style for swipe
            />
            {
                !(userTokenContext.token) && showModalsLogin && <Animatable.View

                    // delay={stateDelay}
                    duration={500}
                    easing={"ease-in-back"}
                    animation={zoomFromPrincipale}

                    style={{
                        position: "absolute", backgroundColor: "rgba(10,10,10,.5)", top: 0, left: 0, bottom: 0,
                        right: 0, zIndex: 10, width: "100%", height: "100%"
                    }}>
                    <BlurView intensity={20} tint="dark" style={{
                        flex: 1,
                        elevation: 10, display: "flex",
                        justifyContent: 'center', flexDirection: "row", alignItems: "center"
                    }}>
                        <ScrollView style={{ flex: 1, height: HEIGHT * .9, }}
                            contentContainerStyle={{ alignItems: "center" }}
                        >

                            <Animatable.View
                                easing={"ease-in-back"}
                                // delay={300}
                                duration={500}
                                animation={zoomFromSecondary}
                                style={{
                                    width: "90%", backgroundColor: "#0f071d", marginTop: HEIGHT * .18,
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
                                        textStyle={{ color: "white" }}
                                        value={mail}
                                        onChangeText={(ne) => setMail(ne)}
                                        placeholder='Ex: xxx@gmail.com'
                                        style={{ marginTop: 10, backgroundColor: "transparent", color: "red" }}
                                    />
                                </View>


                                <View style={{ marginTop: 15 }}>
                                    <Text style={{
                                        color: "rgba(255,255,255,.8)", fontFamily: "Montserrat-SemiBold",
                                        fontSize: 12, marginTop: 5.5, alignSelf: "center", marginBottom: 5
                                    }}>Your Password</Text>

                                    <Input
                                        textStyle={{ color: "white" }}
                                        // placeholderTextColor={"white"}
                                        secureTextEntry={true}
                                        value={password}
                                        onChangeText={(ne) => setPassword(ne)}
                                        placeholder='Ex: xxxxx.xxx'
                                        style={{ marginTop: 10, backgroundColor: "transparent" }}
                                    />
                                </View>

                                <View style={{ marginTop: 15 }}>
                                    <TouchableOpacity
                                        onPress={() => submitForLogin()}
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

                            <View style={{ height: HEIGHT * .3 }} />
                        </ScrollView>
                    </BlurView>
                </Animatable.View>
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

                    <Icon name="arrow-circle-left"
                        style={{
                            width: 25,
                            height: 25,
                            tintColor: "rgb(99, 102, 241)",
                            alignSelf: 'center',
                        }} />
                </TouchableOpacity>
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
                        backgroundColor: "#1a202c"
                    }}
                >

                    <Icon name="edit"
                        style={{
                            width: 20,
                            height: 20,
                            tintColor: "rgb(99, 102, 241)",
                            alignSelf: 'center',
                        }} />
                </TouchableOpacity> */}
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

                    <Image source={dataUser.image ? { uri: dataUser.image } : require("../../assets/images/1.png")} style={{
                        width: "100%", height: "100%"
                    }} />
                    <View style={{
                        alignSelf: "center", position: "absolute", bottom: -35, width: 100,
                        height: 100, borderWidth: 5, borderColor: "#fff", borderRadius: 50, zIndex: 6
                    }}>
                        <Image
                            source={dataUser.image ? { uri: dataUser.image } : require("../../assets/images/1.png")}
                            style={{
                                width: "100%", height: "100%", borderRadius: 50,
                            }} />
                    </View>
                </View>

                <View style={{ display: "flex", alignItems: "center", justifyContent: "center", marginTop: 55 }}>
                    <Text style={{ color: "white", fontSize: 24, marginBottom: 5, fontFamily: "Montserrat-Medium", }}>{dataUser.name || "Non défini"}</Text>
                    <Text style={{ color: "rgba(255,255,255,.5)", fontFamily: "Montserrat-Medium", marginBottom: 5 }}>{dataUser.email || "Non défini"}</Text>

                    <View>
                        <Text style={{ color: "rgba(255,255,255,.5)", fontFamily: "Montserrat-Medium", fontSize: 12 }}>{dataUser?.pseudo}</Text>
                    </View>
                </View>

                <View style={{ paddingHorizontal: 25, marginTop: 15 }}>
                    {
                        userTokenContext.token ? <TouchableOpacity
                            onPress={() => loGout()}
                            style={{
                                backgroundColor: "rgb(255, 10, 100)", display: "flex",
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
                            }}>Log Out</Text>
                            <Icon name="log-in-outline"
                                style={{ width: 20, height: 20, tintColor: "white", fontWeight: "bold", marginLeft: 10 }} />
                        </TouchableOpacity> :
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
                    }
                </View>

                <View style={{ paddingHorizontal: 20 }}>
                    <View style={{ display: "flex", marginTop: 65, marginBottom: 30 }}>
                        <Text style={{ color: "white", fontSize: 24, marginBottom: 5, fontFamily: "Montserrat-Medium", }}>My Personnal Products</Text>
                        <Text style={{ color: "rgba(255,255,255,.5)", fontFamily: "Montserrat-Medium", }}>Your Products</Text>
                    </View>



                    {/* <TouchableOpacity
                        // onPress={() => submitForLogin()}
                        // disabled={loading}
                        style={{
                            backgroundColor: "rgb(99, 102, 241)", display: "flex", alignSelf: "flex-start",
                            justifyContent: "center", alignItems: "center", padding: 12.5, paddingVertical: 8, borderRadius: 5, flexDirection: "row",
                        }}>

                        <Text style={{
                            color: "white", fontSize: 18,
                            fontFamily: "Montserrat-Medium",
                        }}>Create One</Text>
                    </TouchableOpacity> */}
                </View>


                <View style={{ marginTop: 15, paddingHorizontal: 20 }}>
                    {
                        Boolean(nftsData.results) && <FlatList
                            // horizontal
                            data={nftsData.results}
                            style={{ height: 400, width: "100%" }}
                            // style={{ backgroundColor: "red" }}
                            renderItem={({ item }) => {
                                return (
                                    <NFTViewer callActionView={() => {
                                        let sendedData: NftTypesValues = {
                                            id: item.id,
                                            title: item.title,
                                            description: item.description,
                                            owner_id: item.owner,
                                            image: item.image,
                                            price: item.price,
                                            categories_trending: item.categories_trending,
                                            sales_history: item.sales_history,
                                        }
                                        sendedData && nFTContext?.setNftData(sendedData)
                                        swipeUpDownRef.current.showFull()
                                    }} data={item} key={item.id} />
                                )
                            }}
                        />
                    }
                </View>



                <View style={{ paddingHorizontal: 20 }}>
                    <View style={{ display: "flex", marginTop: 65, marginBottom: 30 }}>
                        <Text style={{ color: "white", fontSize: 24, marginBottom: 5, fontFamily: "Montserrat-Medium", }}>Recents Orders</Text>
                        {/* <Text style={{ color: "rgba(255,255,255,.5)", fontFamily: "Montserrat-Medium", }}>{dataUser.email || "Non défini"}</Text> */}
                    </View>


                    {
                        saleHistories.map((item) => {
                            let retrieveNFT = sale_Set_NFT.find((it) => item.nfts_id === it.id);
                            return (
                                <>
                                    <View style={{
                                        flexDirection: "row", justifyContent: "space-between", width: "100%",
                                        marginBottom: 10, elevation: 25, padding: 10, paddingHorizontal: 15, borderRadius: 10, backgroundColor: "rgba(10,10,10,.5)"
                                    }}>
                                        <Image
                                            source={retrieveNFT?.image ? { uri: retrieveNFT?.image } : require("../../assets/images/1.png")} style={{
                                                width: 60, height: 60, borderRadius: 100,
                                            }}
                                        // source={retrieveNFT?.image ? { uri: retrieveNFT?.image } : require("../../assets/images/1.png")}
                                        />
                                        <View style={{ flex: 1, marginLeft: 20, justifyContent: "center" }}>
                                            <Text style={{ color: "white", fontSize: 16, fontFamily: "Montserrat-Medium", }}>{retrieveNFT?.title}</Text>
                                            <Text style={{ color: "rgba(255,255,255,.7)", fontSize: 12, marginTop: 5, fontFamily: "Montserrat-Medium", }}>{item.price}ETH</Text>
                                        </View>

                                    </View>
                                </>)
                        })
                    }

                    {
                        saleHistories.length < 1 && <>
                            {/* <Text style={{ color: "white", fontSize: 18, marginBottom: 5, fontFamily: "Montserrat-Medium", }}>Recent Activity</Text> */}
                            <Text style={{ color: "rgba(255,255,255,.5)", fontSize: 15, textAlign: "center", marginTop: 15, fontFamily: "Montserrat-Medium", }}>Nothing to show now</Text>
                        </>
                    }
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