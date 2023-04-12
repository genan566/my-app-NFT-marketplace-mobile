import { ValuesTypes } from "../contexts";

export interface RightNavBoxTypes {
    userContext: ValuesTypes | null, isOpenUser: boolean, toggleIsOpenUser: () => void,
    handleLogOut: () => void, handleLog: () => void, handleShow: () => void
}