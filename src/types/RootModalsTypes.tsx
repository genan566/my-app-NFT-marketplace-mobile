export interface RootModalsTypes {
    isShownModalsSignIn: boolean, isOpenResearch: boolean, isShownModalsLogOut: boolean, isShownModalsFirstSignIn: boolean,
    toggleShowSigninModal: () => void,toggleShowSignUpModal:() => void, toggleOnResearch: () => void, toggleModalsOnLogout: () => void,
    errorFuncOnLogIn: () => void, responseGoogle: (response: any) => void, handlerLogoutFunc: () => void,
    navLogin: () => void, navSignin: () => void
}