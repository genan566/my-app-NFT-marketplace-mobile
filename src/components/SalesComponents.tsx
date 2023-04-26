import { View, Text } from 'react-native'
import React from 'react'
import { RootUserTokenContext } from '../contexts'
import { UserRetrieveInterface } from '../types/UserRetrieveTypes'
import { AuthAPI } from '../APIs/AuthApi'
import { SaleHistory } from '../types/SaleHistoryType'
import { routeAPIBaseImage } from '../APIs/APIRoutes'

const SalesComponents = ({ item }: { item: SaleHistory }) => {

    const userTokenContext = React.useContext(RootUserTokenContext)


    const [userRetrieveData, setuserRetrieveData] = React.useState<UserRetrieveInterface>({} as UserRetrieveInterface)

    React.useEffect(() => {
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

                    setuserRetrieveData
                        (formatedData)

                })
        }
    }, [])

    return (
        <View style={{ flexDirection: "row", justifyContent: "space-between", flexWrap: "wrap",marginBottom:20 }}>
            <Text style={{ flex: 1, color: "white", fontFamily: "Montserrat-Medium", }}>{userRetrieveData?.email || "Anonyme"}</Text>
            <Text style={{ flex: 1, color: "white", fontFamily: "Montserrat-Medium", }}>{item?.price}ETH</Text>
            <Text style={{ flex: 1, color: "white", fontFamily: "Montserrat-Medium", }}>{item.created_at}</Text>
            <Text style={{ flex: 1, color: "white", fontFamily: "Montserrat-Medium", }}>{item.will_end_at}</Text>
        </View>
    )
}

export default SalesComponents