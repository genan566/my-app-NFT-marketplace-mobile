import React from "react"
import { ScrollView, Text, TouchableHighlight, View } from "react-native"
import SalesComponents from "./SalesComponents"
import { SaleHistory } from "../types/SaleHistoryType"

const Histories = ({ sales = [] }: { sales: SaleHistory[] }) => {
    return (
        <View style={{ flex: 1 }}>
            <TouchableHighlight>
                <Text style={{
                    color: "white", fontSize: 22,
                    fontFamily: "Montserrat-Medium",
                }}>Sales History</Text>
            </TouchableHighlight>

            <TouchableHighlight style={{ marginBottom: 25, }}>
                <Text style={{
                    marginTop: 5,
                    color: "rgba(255,255,255,.5)", fontSize: 17,
                    fontFamily: "Montserrat-Medium",
                }}>We counts <Text style={{ color: "white" }}>{sales.length}</Text> sales subscription.</Text>
            </TouchableHighlight>

            <View style={{ backgroundColor: "rgba(30, 41, 59,.5)", marginTop: 12, padding: 15, borderRadius: 10, elevation: 10 }}>
                <View style={{
                    flexDirection: "row", justifyContent: "space-between", flexWrap: "wrap", marginBottom: 15, borderBottomWidth: 1,
                    paddingVertical: 10, borderColor: "rgba(100,100,100,.5)",
                }}>
                    <Text style={{ flex: 1.1, color: "white", fontFamily: "Montserrat-Medium", }}>Email</Text>
                    <Text style={{ flex: 1, color: "white", fontFamily: "Montserrat-Medium", }}>Price ETH</Text>
                    <Text style={{ flex: 1, color: "white", fontFamily: "Montserrat-Medium", }}>Creation Date</Text>
                    <Text style={{ flex: 1, color: "white", fontFamily: "Montserrat-Medium", }}>End Date</Text>
                </View>
                {
                    sales?.map((item) => {

                        return (
                            <TouchableHighlight>
                                <SalesComponents
                                    item={item}
                                    key={`${item?.created_at}`} />
                            </TouchableHighlight>
                        )
                    })
                }
                {
                    sales.length === 0 && (

                        <TouchableHighlight>
                            <View>
                                <Text style={{
                                    marginTop: 5,
                                    color: "white", fontSize: 15, textAlign: "center",
                                    fontFamily: "Montserrat-Medium",
                                }}>Historique NFT vide.</Text>

                                <Text style={{
                                    marginTop: 5,
                                    color: "white", fontSize: 13, textAlign: "center",
                                    fontFamily: "Montserrat-Medium",
                                }}>Veuillez bien vous souscrire au NFT pour avoir un suivi</Text>

                            </View>
                        </TouchableHighlight>
                    )
                }
            </View>
        </View>
    )
}

export default Histories