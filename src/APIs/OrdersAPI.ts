import axios from "axios";
import { api_url } from "./APIRoutes";

export class OrdersAPI {

    async get_all_orders(token: string) {
        return fetch(
            api_url(`orders/`),
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

    }
}