import axios from "axios";
import { api_url } from "./APIRoutes";

export class SaleHistoriesAPI {

    async get_all_sales_by_mee(token: string) {
        return fetch(
            api_url(`sale_histories/list_me/`),
            {
                method: "GET",
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': "Token " + JSON.parse(token),
                }

            }
        )
            .then((js) => js.ok && js.json())
    }

    async get_all_sales() {
        return fetch(
            api_url(`sale_histories/`),
            {
                method: "GET",
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                }

            }
        )
            .then((js) => js.ok && js.json())
    }

    async get_sales_by_ID(id: number) {
        return fetch(
            api_url(`sale_histories/${id}`),
            {
                method: "GET",
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                }

            }
        )
            .then((js) => js.ok && js.json())
    }


    async get_multi_sales(idx: number[] | undefined) {
        return fetch(
            api_url(`sale_histories/?search=${idx?.toString()}`),
            {
                method: "GET",
                headers: {
                    'Content-Type': "application/json;charset=utf-8"
                },
            }
        )
            .then((js) => js.ok && js.json())
    }

    async get_multi_sales_by_nftID(idx: number | undefined) {
        return fetch(
            api_url(`sale_histories/?search_by_nftID=${idx}`),
            {
                method: "GET",
                headers: {
                    'Content-Type': "application/json;charset=utf-8"
                },
            }
        )
            .then((js) => js.ok && js.json())
    }

    async post__create_sale(token: string, data: { title: string, nfts_id: number | undefined }) {
        if (token) {
            return fetch(
                api_url('sale_histories/'),
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
                .catch(er => console.log("er on create sale", er))

        }

    }
}