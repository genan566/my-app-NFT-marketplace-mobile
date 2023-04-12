export interface ModalsShowingSigninTypes {
    errorFuncOnLogIn: () => void, isShownModalsFirstSignIn: boolean,
    toggleShowSignUpModal: () => void, navLogin: () => void, responseGoogle: (response: any) => void
}