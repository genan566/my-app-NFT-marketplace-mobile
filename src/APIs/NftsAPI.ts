import { api_url } from "./APIRoutes";

export class NftsAPI {

    async get_all_nfts(page = 1) {
        return fetch(
            api_url(`core_nfts/?page=${page}`),
            {
                method: "GET",
                headers: {
                    'Content-Type': "application/json;charset=utf-8"
                },
            }
        )
            .then((js) => js.ok && js.json())

    }

    async get_unique(id: number | undefined | null) {
        if (id) {
            return fetch(
                api_url(`core_nfts/${id}/`),
                {
                    method: "GET",
                    headers: {
                        'Content-Type': "application/json;charset=utf-8"
                    },
                }
            )
                .then((js) => js.ok && js.json())
        }

    }

    async get_multi_NFT_by_ID(idx: number[] | undefined) {
        return fetch(
            api_url(`core_nfts/?search_multi=${idx?.toString()}`),
            {
                method: "GET",
                headers: {
                    'Content-Type': "application/json;charset=utf-8"
                },
            }
        )
            .then((js) => js.ok && js.json())

    }

    async get_all_by_featured_cat() {
        return fetch(
            api_url(`core_nfts/?categories=13`),
            {
                method: "GET",
                headers: {
                    'Content-Type': "application/json;charset=utf-8"
                },
            }
        )
            .then((js) => js.ok && js.json())

    }

    async delete_nft(token: string, id_nft: number | undefined,) {
        if (token && id_nft) {
            return fetch(
                api_url(`core_nfts/${id_nft}/`),
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

    async get_all_nfts_paginate_by_categories(id_category: number, page = 1) {
        return fetch(
            api_url(`core_nfts/?categories=${id_category}&page=${page}`),
            {
                method: "GET",
                headers: {
                    'Content-Type': "application/json;charset=utf-8"
                },
            }
        )
            .then((js) => js.ok && js.json())

    }

    async get_all_nfts_by_user(token: string) {
        return fetch(
            api_url(`core_nfts/?user=true`),
            {
                method: "GET",
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                    'Authorization': "Token " + JSON.parse(token),
                },
            }
        )
            .then((js) => js.ok && js.json())

    }

    async get_all_nfts_by_user__next(token: string, url: string) {
        return fetch(
            url,
            {
                method: "GET",
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                    'Authorization': "Token " + JSON.parse(token),
                },
            }
        )
            .then((js) => js.ok && js.json())

    }

    async get_filtered_by_trendingIDs_nfts(id_category: number) {
        return fetch(
            api_url(`core_nfts/?categories=${id_category}`),
            {
                method: "GET",
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                },
            }
        )
            .then((js) => js.ok && js.json())

    }

    async get_filtered_by_search_nfts(title: string) {
        return fetch(
            api_url(`core_nfts/?search=${title}`),
            {
                method: "GET",
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                },
            }
        )
            .then((js) => js.ok && js.json())

    }

    async get_all_nfts_paginate_by_search(search: string, page = 1) {
        return fetch(
            api_url(`core_nfts/?page=${page}&search=${search}`),
            {
                method: "GET",
                headers: {
                    'Content-Type': "application/json;charset=utf-8"
                },
            }
        )
            .then((js) => js.ok && js.json())

    }

    async create_nfts(data: any, token: string) {


        let newDataForm = new FormData()

        newDataForm.append("image", data.image)


        return fetch(
            api_url(`core_nfts/`),
            {
                method: "POST",
                headers: {
                    "Content-type": "application/json; charset=UTF-8",
                    'Authorization': "Token " + JSON.parse(token),
                },
                body: JSON.stringify({
                    title: data.title,
                    owner: data.owner,
                    sales_history: data.sales_history,
                    categories_trending: data.categories_trending,
                    price: data.price,
                    description: data.description,
                })
            }
        )
            .then((js) => js.ok && js.json())

    }

    async upload_image_to_nft(id: number | undefined | null, data: any, token: string) {

        let dataSent = new FormData()
        dataSent.append("image", data.image)

        if (id) {
            return fetch(
                api_url(`core_nfts/${id}/upload-image/`),
                {
                    method: "POST",
                    headers: {
                        'Authorization': "Token " + JSON.parse(token),
                    },
                    body: dataSent
                }
            )
                .then((js) => js.ok && js.json())
        }

    }

    async retrive_nft_update(token: string, id: number | undefined, data: any) {
        if (token && id) {
            return fetch(
                api_url(`core_nfts/${id}/`),
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
                .catch(er => console.log("er on retrieve", er))

        }

    }
}