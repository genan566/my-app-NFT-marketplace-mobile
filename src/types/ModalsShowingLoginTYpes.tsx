export interface ModalsShowingLoginTypes {
    errorFuncOnLogIn: () => void, isShownModalsSignIn: boolean,
    toggleShowSigninModal: () => void, responseGoogle: (response: any) => void, navSignin: () => void
}