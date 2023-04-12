import axios from "axios";
import { notify } from "../utilities/Toaster";
import { api_url } from "./APIRoutes";

interface DataForm {
    email: string,
    password: string,
}

export class AuthAPI {

    async login_account(data: DataForm) {
        return fetch(
            api_url(`user/token/`),
            {
                method: "POST",
                headers: {
                    'Content-Type': "application/json;charset=utf-8"
                },
                body: JSON.stringify(data)
            }
        )
            .then((js) => js.json())
            .then((res) => {
                if (res.non_field_errors) {
                    return { error: res.non_field_errors }
                }
                return res;
            })

    }

    async retrive_me__account(token: string) {
        if (token) {
            return fetch(
                api_url('user/mee/'),
                {
                    method: "GET",
                    headers: {
                        Accept: 'application/json',
                        'Content-Type': 'application/json',
                        'Authorization': "Token " + JSON.parse(token),
                    }

                }
            )
                .then((js) => js.ok && js.json())
                // .catch(er => console.log("er on retrieve", er))

        }

    }

    async retrive_account(token: string, id: number) {
        if (token) {
            return fetch(
                api_url('user/retrieve/' + id.toString()),
                {
                    method: "GET",
                    headers: {
                        Accept: 'application/json',
                        'Content-Type': 'application/json',
                        'Authorization': "Token " + JSON.parse(token),
                    }

                }
            )
                .then((js) => js.ok && js.json())
                // .catch(er => console.log("er on retrieve", er))

        }

    }

    async retrive_account_update(token: string, id: number | undefined, data: any) {
        if (token && id) {
            return fetch(
                api_url('user/retrieve/' + id.toString()),
                {
                    method: "PATCH",
                    headers: {
                        Accept: 'application/json',
                        'Content-Type': 'application/json',
                        'Authorization': "Token " + JSON.parse(token),
                    },
                    body: JSON.stringify(data)

                }
            )
                .then((js) => js.ok && js.json())
                // .catch(er => console.log("er on retrieve", er))

        }

    }

    async delete_account(token: string, id_nft: number | undefined,) {
        if (token && id_nft) {
            return fetch(
                api_url(`user/retrieve/${id_nft}`),
                {
                    method: "DELETE",
                    headers: {
                        'Content-Type': "application/json;charset=utf-8",
                        'Authorization': "Token " + JSON.parse(token),
                    },
                }
            )
                .then((js) => js.ok && { title: "OK" })
        }

    }

    async retrive_mee_update(token: string, data: any, formed?: boolean) {
        if (token && data) {
            try {
                return fetch(
                    api_url('user/mee/'),
                    {
                        method: "PATCH",
                        headers: {
                            Accept: 'application/json',
                            'Content-Type': 'application/json',
                            'Authorization': "Token " + JSON.parse(token),
                        },
                        body: JSON.stringify(data)

                    }
                )
                    .then((js) => js.ok && js.json())
                // .catch(er => console.log("er on retrieve", er))
            } catch (error) {
                console.log("er on retrieve", error)
            }


        }

    }

    async upload_image_to_user(data: any, token: string) {

        let dataSent = new FormData()
        dataSent.append("image", data.image)
        console.log(dataSent.get("image"))

        try {
            return fetch(
                api_url(`user/retrieve/upload-image/`),
                {
                    method: "PUT",
                    headers: {
                        // "content-type": "application/x-www-form-urlencoded",
                        'Authorization': "Token " + JSON.parse(token),
                    },
                    body: dataSent
                }
            )
                .then((js) => js.ok && js.json())
        } catch (error) {
            console.log("er on retrieve", error)
        }

    }
}