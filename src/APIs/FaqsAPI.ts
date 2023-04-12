import axios from "axios";
import { api_url } from "./APIRoutes";

export class FaqsAPI {

    async get_all_faqs() {
        return fetch(
            api_url(`faqs/`),
            {
                method: "GET",
                headers: {
                    'Content-Type': "application/json;charset=utf-8"
                },
            }
        )
            .then((js) => js.ok && js.json())

    }

    async post_FAQ(data: { title: string, description: string }, token: string) {
        if (token) {
            return fetch(
                api_url('faqs/'),
                {
                    method: "POST",
                    headers: {
                        Accept: 'application/json',
                        'Content-Type': 'application/json',
                        'Authorization': "Token " + JSON.parse(token),
                    },
                    body: JSON.stringify(data)

                }
            )
                .then((js) => js.ok && js.json())
                .catch(er => console.log("er on retrieve", er))

        }

    }
    async delete_faq(token: string, id_nft: number | undefined,) {
        if (token && id_nft) {
            return fetch(
                api_url(`faqs/${id_nft}/`),
                {
                    method: "DELETE",
                    headers: {
                        'Content-Type': "application/json;charset=utf-8",
                        'Authorization': "Token " + JSON.parse(token),
                    },
                }
            )
                .then((js) => js.ok && { title: "OK" })
            // .then()
        }

    }
}