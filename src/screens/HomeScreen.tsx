import { View, Text, ScrollView, Image, TextInput, TouchableOpacity, FlatList, Dimensions, SafeAreaView } from 'react-native'
import React, { useState } from 'react'
import RootComponent from '../components/RootComponent'
import { useLoadingFonts } from '../../utilities/LoadingFonts'
import { BlurView } from 'expo-blur'
import { AntDesign, Feather, MaterialCommunityIcons } from '@expo/vector-icons';
// import { SwipeablePanel } from 'rn-swipeable-panel';
import NFTViewer from '../components/NFTViewer'
import { PaginatedDataNFT } from '../types/PaginatedData'
import { NftsAPI } from '../APIs/NftsAPI'
import { CategoriesTrendingAPI } from '../APIs/CategoriesTrending'
import { CategoriesTrending } from '../types/CategorieTrendingType'

const WIDTH = Dimensions.get("screen").width;
const HEIGHT = Dimensions.get("screen").height;



const HomeScreen = ({ navigation }) => {
    const { loaded } = useLoadingFonts()
    const [seachNFT, setseachNFT] = React.useState("");
    const [isPanelActive, setIsPanelActive] = useState(false);
    const [nftsData, setnftsData] = React.useState<PaginatedDataNFT>({} as PaginatedDataNFT)

    const [castedCount, setCastedCount] = React.useState<number[]>([])
    const [categoriesTrending, setCategoriesTrending] = React.useState<CategoriesTrending[]>([])
    const [activeCategoriesTrending, setActiveCategoriesTrending] = React.useState<number>(0)
    const [activePage, setActivePage] = React.useState(1)
    const [search, setSearch] = React.useState("")
    const initial_fetching_nfts = () => {
        let resNFTs = new NftsAPI()
        resNFTs.get_all_nfts().then(data => setnftsData(data))
    }

    React.useEffect(() => {
        initial_fetching_nfts()
        let categories_trendings = new CategoriesTrendingAPI()
        categories_trendings.get_all_categories().then(data => {
            setCategoriesTrending(data.results)
        })
    }, [])

    const activeCategorieFilteringCallbacks = React.useCallback(() => {
        if (activeCategoriesTrending !== 0) {
            let resNFTs = new NftsAPI()
            resNFTs
                .get_filtered_by_trendingIDs_nfts(activeCategoriesTrending)
                .then(data => {
                    setnftsData(data)
                    setActivePage(1)
                })
        } else
            initial_fetching_nfts()
    }, [activeCategoriesTrending])

    React.useEffect(() => {
        activeCategorieFilteringCallbacks()
    }, [activeCategorieFilteringCallbacks])

    const openPanel = () => {
        setIsPanelActive(true);
    };

    const closePanel = () => {
        setIsPanelActive(false);
    };

    return (

        <RootComponent>

            <View style={{ justifyContent: "space-between", flexDirection: "row", alignItems: "center", paddingHorizontal: 20, marginTop: 15 }}>

                <TouchableOpacity
                    onPress={openPanel}
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
                        <Text style={{ color: "white", fontFamily: loaded && "Montserrat-SemiBold", fontSize: 16, }}>47.48</Text>
                    </BlurView>
                </TouchableOpacity>
                <View>
                    <Text style={{ color: "white", fontFamily: loaded && "Montserrat-Medium", fontSize: 17, textAlign: "center" }}>Discover the new </Text>
                    <Text style={{ color: "white", fontFamily: loaded && "Montserrat-Medium", fontSize: 17, textAlign: "center" }}>NFT collection</Text>
                </View>
                <View style={{ flexDirection: "row", alignItems: "center", gap: 5 }}>
                    <TouchableOpacity
                        onPress={() => navigation.navigate("Profile")}
                        style={{ backgroundColor: "white", overflow: "hidden", borderRadius: 50, }}>
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
            <View style={{ paddingHorizontal: 20, paddingBottom: 20 }}>

                <View style={{
                    display: "flex", borderRadius: 100,
                    flexDirection: "row", backgroundColor: "rgba(100,100,100,.2)",
                    marginTop: 20, padding: 10, width: "100%", paddingRight: 15
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
                // showsVerticalScrollIndicator={false}
                contentContainerStyle={{}}
                style={{ height: HEIGHT * .9 }}>


                <ScrollView
                    horizontal
                    style={{}}
                    contentContainerStyle={{ height: 50, width: "100%", alignItems: "center", gap: 10, paddingHorizontal: 20, paddingRight: 200 }}
                // showsHorizontalScrollIndicator={false}
                >
                    <TouchableOpacity
                        onPress={() => {
                            setActiveCategoriesTrending(0);
                        }}
                        style={{ paddingHorizontal: 10, backgroundColor: activeCategoriesTrending === 0 ? "rgb(99, 102, 241)" : null, borderColor: activeCategoriesTrending === 0 ? null : "white", borderWidth: 1, paddingVertical: 10, borderRadius: 50 }}>
                        <Text style={{ fontFamily: loaded && "Montserrat-SemiBold", color: "white" }}>Default</Text>
                    </TouchableOpacity>
                    {
                        categoriesTrending?.map((category) => {
                            return <TouchableOpacity
                                onPress={() => {
                                    setActiveCategoriesTrending(category.id);
                                }}
                                key={category?.id}
                                style={{
                                    paddingHorizontal: 10, backgroundColor: category.id === activeCategoriesTrending ? "rgb(99, 102, 241)" : null,
                                    borderColor: category.id === activeCategoriesTrending ? null : "white", borderWidth: 1, paddingVertical: 10, borderRadius: 50
                                }}>
                                <Text style={{ fontFamily: loaded && "Montserrat-SemiBold", color: "white" }}>{category?.name}</Text>
                            </TouchableOpacity>
                        })
                    }

                </ScrollView>

                <View style={{ marginTop: 15, paddingHorizontal: 20 }}>
                    {
                        nftsData.results?.map(it => {
                            console.log(it)
                            return (
                                <NFTViewer data={it} key={it.id} />
                            )
                        })
                    }
                </View>
                <View style={{ marginBottom: 20, }} />
            </ScrollView>
        </RootComponent>
    )
}

export default HomeScreen