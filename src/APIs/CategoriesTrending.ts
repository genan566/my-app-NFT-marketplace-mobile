import axios from "axios";
import { api_url } from "./APIRoutes";

export class CategoriesTrendingAPI {

    async get_all_categories() {
        return fetch(
            api_url(`categories_trending/`),
            {
                method: "GET",
                headers: {
                    'Content-Type': "application/json;charset=utf-8"
                },
            }
        )
            .then((js) => js.ok && js.json())

    }

    async get_categorie(idx: number) {
        return fetch(
            api_url(`categories_trending/${idx}`),
            {
                method: "GET",
                headers: {
                    'Content-Type': "application/json;charset=utf-8"
                },
            }
        )
            .then((js) => js.ok && js.json())

    }
    async get_multi_categorie(idx: number[] | undefined) {
        return fetch(
            api_url(`categories_trending/?search=${idx?.toString()}`),
            {
                method: "GET",
                headers: {
                    'Content-Type': "application/json;charset=utf-8"
                },
            }
        )
            .then((js) => js.ok && js.json())

    }
    async add_categorie(data: { name: string }, token: string) {

        return fetch(
            api_url(`categories_trending/`),
            {
                method: "POST",
                headers: {
                    'Content-Type': "application/json;charset=utf-8",
                    'Authorization': "Token " + JSON.parse(token),
                },
                body: JSON.stringify(data)
            }
        )
            .then((js) => js.ok && js.json())

    }
}
