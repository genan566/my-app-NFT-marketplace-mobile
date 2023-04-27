import { View, Text, ScrollView } from 'react-native'
import React from 'react'
import RootComponent from '../components/RootComponent'
import TopBarCustom from '../components/TopBarCustom'
import { useLoadingFonts } from '../../utilities/LoadingFonts'
import userDataHooks from '../hooks/userDataHooks'

const Settings = ({ navigation }) => {
    const { loaded } = useLoadingFonts()
    const { dataUser } = userDataHooks()
    return (

        <RootComponent>
            <TopBarCustom navigation={navigation} />
            <View style={{ paddingHorizontal: 20, marginTop: 25 }}>
                <Text style={{ color: "white", fontFamily: loaded && "Montserrat-Medium", fontSize: 25, }}>Mes paramètres</Text>
                <Text style={{ color: "rgba(255,255,255,.5)", fontFamily: loaded && "Montserrat-Medium", fontSize: 15, }}>Welcomes back {dataUser.name || "Non défini"}</Text>
            </View>

            <ScrollView contentContainerStyle={{ paddingHorizontal: 20, paddingTop: 20 }} style={{ marginTop: 20 }}>
                            <Text style={{ color: "rgba(255,255,255,.5)", fontSize: 15, textAlign: "center", marginTop: 15, fontFamily: "Montserrat-Medium", }}>Nothing to show now</Text>
            </ScrollView>
        </RootComponent>
    )
}

export default Settings