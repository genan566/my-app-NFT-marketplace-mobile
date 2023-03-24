import { View, Text, Alert,  } from 'react-native'
import React from 'react'
import { SwipeButton } from 'react-native-expo-swipe-button';
import { Feather, } from '@expo/vector-icons';
import RootComponent from '../components/RootComponent';
import NFTViewer from '../components/NFTViewer';
import { useLoadingFonts } from '../../utilities/LoadingFonts';


const StartScreen = () => {
    const { loaded } = useLoadingFonts()
    return (
        <RootComponent>
            <View style={{ display: "flex", flex: 1 }}>
                <View style={{ flex: 1, justifyContent: "flex-end", marginBottom: 10 }}>

                    <NFTViewer image={require('../../assets/images/teso.jpg')} />

                    <View>
                        <Text style={{ color: "white", fontFamily: loaded && "Montserrat-Medium", fontSize: 45, }}>Exclusive</Text>
                        <Text style={{ color: "white", fontFamily: loaded && "Montserrat-Medium", fontSize: 45, }}>Digital</Text>
                        <Text style={{ color: "white", fontFamily: loaded && "Montserrat-Medium", fontSize: 45, }}>Collectibles</Text>
                    </View>
                </View>
                <View>
                    <Text style={{ color: "rgba(255,255,255,.8)", fontFamily: loaded && "Montserrat-Light", fontSize: 20, }}>NFT has a value that can be called an asset that has a unique code.</Text>
                </View>
                <View style={{ marginTop: 15, marginBottom: 10 }}>
                    <SwipeButton
                        Icon={
                            // <FontAwesome5 name="angle-double-right" size={30} color="black" />
                            <Feather name="chevrons-right" size={35} color="black" />
                            // <MaterialIcons name="keyboard-arrow-right" size={50} color="black" />
                        }
                        iconContainerStyle={{ backgroundColor: "white" }}
                        onComplete={() => Alert.alert('Completed')}
                        title="Get Started by swiping"
                        borderRadius={180}
                        goBackToStart
                        titleStyle={{ color: "white", fontFamily: loaded && "Montserrat-Medium", fontSize: 14.5 }}
                        containerStyle={{ backgroundColor: '#30302f' }}
                        underlayStyle={{ backgroundColor: 'black' }}
                        underlayTitle="Release to complete"
                        underlayTitleStyle={{ color: 'white', fontFamily: loaded && "Montserrat-Medium", fontSize: 15 }}
                    />
                </View>
            </View>
        </RootComponent>
    )
}

export default StartScreen