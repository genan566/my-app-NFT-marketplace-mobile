import { View, Text, ScrollView, Image, TextInput, TouchableOpacity, FlatList, Dimensions, SafeAreaView, ActivityIndicator, TouchableHighlight } from 'react-native'
import React, { useRef, useState } from 'react'
import RootComponent from '../components/RootComponent'
import { useLoadingFonts } from '../../utilities/LoadingFonts'
import { BlurView } from 'expo-blur'
import { AntDesign, Feather, MaterialCommunityIcons } from '@expo/vector-icons';
// import { SwipeablePanel } from 'rn-swipeable-panel';
import NFTViewer from '../components/NFTViewer'
import useNftHooks from '../hooks/nftHooks'
import SwipeUpDown from 'react-native-swipe-up-down';
import { Icon } from '@ui-kitten/components'
import { blurhash } from '../../utilities/Hasher'
import ViewHiddenOfNFt from '../components/CustomSwipeableContent'
import { RootNftContext } from '../contexts'
import { NftTypesValues } from '../types/NFTTypes'

const WIDTH = Dimensions.get("screen").width;
const HEIGHT = Dimensions.get("screen").height;



const HomeScreen = ({ navigation }) => {
    const { loaded } = useLoadingFonts()
    const swipeUpDownRef = useRef();
    const [isPanelActive, setIsPanelActive] = useState(false);
    const [searchText, setSearchText] = React.useState("")

    const { data, categoriesTrending,
        activeCategoriesTrending,
        setActiveCategoriesTrending, activePage,
        search, changingStateSearch,
        loadingData,
        initial_fetching_nfts,
        prefixedPaginate, callingTheNestedData, castedCount, loadingDataCategories
    } = useNftHooks()
    const nFTContext = React.useContext(RootNftContext)

    const openPanel = () => {
        setIsPanelActive(true);
    };

    React.useEffect(() => {


        searchText.trim().length === 0 ? initial_fetching_nfts() : changingStateSearch(searchText)
    }, [searchText])

    const closePanel = () => {
        setIsPanelActive(false);
    };



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
                        searchText.length > 0 && setSearchText("")
                        // search.length > 0 && changingStateSearch("")
                    }}>
                        {
                            searchText.length > 0 ?
                                <AntDesign name="closecircleo" size={24} color="white" /> :
                                <Feather name="search" size={24} color="white" />
                        }
                    </TouchableOpacity>
                    <TextInput
                        value={searchText}
                        onChangeText={(nextValue: any) => {
                            // changingStateSearch(nextValue)
                            setSearchText(nextValue)
                        }}
                        placeholderTextColor="white"
                        placeholder='Search NFT or artist name'
                        style={{ flex: 1, marginLeft: 10, fontFamily: loaded && "Montserrat-SemiBold", color: "white" }} />
                </View>
            </View>

            <ScrollView
                // showsVerticalScrollIndicator={false}
                contentContainerStyle={{}}
                showsVerticalScrollIndicator={false}
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

                    {loadingDataCategories &&
                        <View style={{ alignItems: "center", gap: 10, width: WIDTH * .8, flexDirection: "row", }}>
                            <Text style={{ fontFamily: loaded && "Montserrat-SemiBold", color: "white", textAlign: "center", }} >Chargement des catégories</Text>
                            <ActivityIndicator size="small" color="rgb(99, 102, 241)" />
                        </View>
                    }

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
                {
                    !(Object.keys(data).length === 0) &&
                    <View style={{ flexDirection: "row", marginVertical: 15, alignItems: "center", justifyContent: "center", gap: 10 }}>
                        {
                            data.previous && <TouchableOpacity style={{ backgroundColor: "rgb(99, 102, 241)", padding: 10, paddingHorizontal: 14.5, borderRadius: 100 }}
                                onPress={() => callingTheNestedData(activePage - 1)}
                            >

                                <Text style={{ fontFamily: loaded && "Montserrat-SemiBold", color: "white" }}>Previous</Text>
                            </TouchableOpacity>
                        }
                        {
                            castedCount.map(it => (<>
                                <TouchableOpacity style={{ backgroundColor: activePage === it ? "white" : "rgb(99, 102, 241)", padding: 10, paddingHorizontal: 14.5, borderRadius: 100 }}
                                    key={it.toString()}
                                    onPress={() => prefixedPaginate(it)}
                                ><Text style={{ fontFamily: loaded && "Montserrat-SemiBold", color: activePage === it ? "black" : "white" }}>{it}</Text></TouchableOpacity>
                            </>))
                        }
                        {
                            data.next && <TouchableOpacity style={{ backgroundColor: "rgb(99, 102, 241)", padding: 10, paddingHorizontal: 14.5, borderRadius: 100 }}
                                onPress={() => callingTheNestedData(activePage + 1)}
                            >
                                <Text style={{ fontFamily: loaded && "Montserrat-SemiBold", color: "white" }}>Next</Text>
                            </TouchableOpacity>
                        }
                    </View>
                }

                <View style={{ marginTop: 15, paddingHorizontal: 20 }}>

                    {loadingData &&
                        <View style={{ alignItems: "center", justifyContent: "center", gap: 10, flex: 1, flexDirection: "row", marginBottom: 20 }}>
                            <Text style={{ fontFamily: loaded && "Montserrat-SemiBold", color: "white" }} >Chargement des données NFTs</Text>
                            <ActivityIndicator size="small" color="rgb(99, 102, 241)" />
                        </View>
                    }

                    {
                        data.results?.map(it => {
                            return (
                                <NFTViewer callActionView={() => {
                                    let sendedData: NftTypesValues = {
                                        id: it.id,
                                        title: it.title,
                                        description: it.description,
                                        owner_id: it.owner,
                                        image: it.image,
                                        price: it.price,
                                        categories_trending: it.categories_trending,
                                        sales_history: it.sales_history,
                                    }
                                    sendedData && nFTContext?.setNftData(sendedData)
                                    swipeUpDownRef.current.showFull()
                                }} data={it} key={it.id} />
                            )
                        })
                    }

                    {Boolean(data.results) && data.results.length === 0 && !loadingData &&
                        <View style={{ alignItems: "center", justifyContent: "center", gap: 10, flex: 1, marginBottom: 20 }}>
                            <Text style={{ fontFamily: loaded && "Montserrat-SemiBold", color: "white", textAlign: "center" }} >Aucune données NFT trouvé avec </Text>
                            <Text style={{ fontFamily: loaded && "Montserrat-SemiBold", color: "white", textAlign: "center" }} >"{search}"</Text>
                        </View>
                    }
                </View>
                <View style={{ marginBottom: 20, }} />
            </ScrollView>
        </RootComponent >
    )
}

export default HomeScreen