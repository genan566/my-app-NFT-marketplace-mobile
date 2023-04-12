import axios from "axios";
import { api_url } from "./APIRoutes";

interface SendMail {
    name: string,
    firstname: string,
    email: string,
}

export class CoreContactsAPI {

    async create_subscription(data: SendMail) {
        return fetch(
            api_url(`core_contacts/`),
            {
                method: "POST",
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                    // 'Authorization': "Token " + JSON.parse(token),
                },
                body: JSON.stringify(data)

            }
        )
            .then((js) => js.ok && js.json())

    }
}