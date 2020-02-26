import { Client } from "../classes/client";

export class ClientsSocketController {
    private list: Client[] = [];

    constructor() {}

    // ==================================================
    // Add new Client
    // ==================================================
    public addClient(client: Client) {
        this.list.push(client);
        return client;
    }

    // ==================================================
    // Update Client
    // ==================================================
    public updateClient(id: string, user: any) {
        for (let client of this.list) {
            if (client.id === id) {
                client.user = user;
                break;
            }
        }
    }

    // ==================================================
    // Get List
    // ==================================================
    public getList() {
        return this.list.filter(client => client.user !== null);
    }

    // ==================================================
    // Get a Client
    // ==================================================
    public getClient(id: string) {
        return this.list.find(client => client.id === id);
    }

    // ==================================================
    // Delete Client
    // ==================================================
    public deleteClient(id: string) {
        const tempClient = this.getClient(id);

        this.list = this.list.filter(client => client.id !== id);

        return tempClient;
    }
}
