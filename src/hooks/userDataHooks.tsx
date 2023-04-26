import React from 'react'
import { AuthAPI } from '../APIs/AuthApi'
import { RootUserContext, RootUserTokenContext } from '../contexts'
import { writeItemToStorage } from '../../utilities/SettingToLocalsStorage'

const userDataHooks = () => {
    const userTokenContext = React.useContext(RootUserTokenContext)
    const userContext = React.useContext(RootUserContext)
    const loadOrNotToken = () => {
        let respAuth = new AuthAPI()
        if (userTokenContext.token !== "") {
            let token = userTokenContext.token
            respAuth
                .retrive_me__account(token)
                .then(res => {
                    if (Boolean(res?.id)) {
                        userContext?.setUser(res)
                        writeItemToStorage(token)
                    }
                })
        }

        else {
            userContext?.setUser({} as any)
        }


    }

    React.useEffect(() => {
        loadOrNotToken()
    }, [userTokenContext.token])
    return {
        dataUser: userContext.user,
    }
}

export default userDataHooks