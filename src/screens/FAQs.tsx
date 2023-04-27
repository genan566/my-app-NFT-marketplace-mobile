import { View, Text } from 'react-native'
import React from 'react'
import RootComponent from '../components/RootComponent'
import TopBarCustom from '../components/TopBarCustom'
import { useLoadingFonts } from '../../utilities/LoadingFonts'
import userDataHooks from '../hooks/userDataHooks'
import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler'

const FAQs = ({ navigation }) => {
    const { loaded } = useLoadingFonts()
    const { dataUser } = userDataHooks()
    return (
        <RootComponent>
            <TopBarCustom navigation={navigation} />
            <View style={{ paddingHorizontal: 20, marginTop: 25 }}>
                <Text style={{ color: "white", fontFamily: loaded && "Montserrat-Medium", fontSize: 25, }}>FAQs</Text>
                <Text style={{ color: "rgba(255,255,255,.5)", fontFamily: loaded && "Montserrat-Medium", fontSize: 13, marginTop: 15, width: "90%" }}>This page relate to the frequents questions asked on NFT Project. And we often trying to answer on it.</Text>
            </View>

            <ScrollView contentContainerStyle={{ paddingHorizontal: 20, paddingTop: 20 }} style={{ marginTop: 20 }}>

                <Text style={{ color: "rgba(255,255,255,.5)", fontSize: 15, textAlign: "center", marginTop: 15, fontFamily: "Montserrat-Medium", marginBottom: 20 }}>Nothing to show now</Text>
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
                    }}>Ajouter une note à la FAQ</Text>
                </TouchableOpacity>
            </ScrollView>
        </RootComponent>
    )
}

export default FAQs