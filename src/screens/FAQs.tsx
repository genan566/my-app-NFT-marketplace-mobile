import { View, Text } from 'react-native'
import React from 'react'
import RootComponent from '../components/RootComponent'
import TopBarCustom from '../components/TopBarCustom'
import { useLoadingFonts } from '../../utilities/LoadingFonts'
import userDataHooks from '../hooks/userDataHooks'
import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler'

import Accordion from 'react-native-collapsible/Accordion';
import { Icon } from '@ui-kitten/components'
import { FaqsAPI } from '../APIs/FaqsAPI'
const SECTIONS = [
    {
        title: 'First',
        content: 'Lorem ipsum...',
    },
    {
        title: 'Second',
        content: 'Lorem ipsum...',
    },
];
interface FAQs {
    id: number
    title: string,
    description: string
}
const FAQs = ({ navigation }) => {
    const { loaded } = useLoadingFonts()
    const { dataUser } = userDataHooks()
    const [dataFAQS, setDataFAQS] = React.useState<FAQs[]>([])
    const [activeSections, setActiveSections] = React.useState([])

    const loadInitial = () => {

        let respFaqs = new FaqsAPI()
        respFaqs.get_all_faqs().then(data => {
            setDataFAQS(data.results)
            // dispatch({ type: SET_FAQS, payload: data.results })
        })
    }

    // const delete_FAQs = (id: number) => {
    //     let respFaqs = new FaqsAPI()
    //     respFaqs.delete_faq(userToken.token, id,).then(data => {
    //         loadInitial()
    //         notify("Suppression réussie")
    //     })
    // }

    React.useEffect(() => {
        loadInitial()
    }, [])

    const _renderHeader = (section: FAQs) => {
        return (
            <View style={{ flexDirection: "row", justifyContent: "space-between", marginBottom: 20, paddingVertical:0}}>
                <Text style={{ color: "white", fontFamily: loaded && "Montserrat-SemiBold", fontSize: 16, width: "95%" }}>{section.title}</Text>
                <Icon name="arrow-ios-downward" style={{
                    width: 15,
                    height: 15,
                    tintColor: "white",
                }}
                />
            </View>
        )
    }

    const _renderContent = (section: FAQs) => {
        return (
            <View style={{ marginTop: 0, borderTopColor: "rgba(255,255,255,.8)", borderTopWidth: .2, paddingVertical: 15,paddingHorizontal:5 }}>
                <Text style={{ color: "rgba(255,255,255,.8)", fontFamily: loaded && "Montserrat-Medium", fontSize: 13, lineHeight: 25 }}>{section.description}</Text>
            </View>
        )
    }

    const _updateSections = (activeSections) => {
        setActiveSections(activeSections)
    }
    return (
        <RootComponent>
            <TopBarCustom navigation={navigation} />
            <View style={{ paddingHorizontal: 20, marginTop: 25 }}>
                <Text style={{ color: "white", fontFamily: loaded && "Montserrat-Medium", fontSize: 25, }}>FAQs</Text>
                <Text style={{ color: "rgba(255,255,255,.7)", fontFamily: loaded && "Montserrat-Medium", fontSize: 13, marginTop: 15, width: "90%" }}>This page relate to the frequents questions asked on NFT Project. And we often trying to answer on it.</Text>
            </View>

            <ScrollView contentContainerStyle={{ paddingHorizontal: 20, paddingTop: 20 }} style={{ marginTop: 20 }}>

                <Accordion
                    sections={dataFAQS}
                    activeSections={activeSections}
                    // renderSectionTitle={this._renderSectionTitle}
                    // renderSectionTitle={_renderSectionTitle}
                    renderHeader={_renderHeader}
                    renderContent={_renderContent}
                    underlayColor="transparent"
                    onChange={_updateSections}
                />
                {
                    dataFAQS.length === 0 &&
                    <Text style={{ color: "rgba(255,255,255,.5)", fontSize: 15, textAlign: "center", marginTop: 15, fontFamily: "Montserrat-Medium", marginBottom: 20 }}>Nothing to show now</Text>
                }

                <TouchableOpacity
                    // onPress={() => submitForLogin()}
                    // disabled={loading}
                    style={{
                        backgroundColor: "rgb(99, 102, 241)", display: "flex", alignSelf: "flex-start",marginTop:15,
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