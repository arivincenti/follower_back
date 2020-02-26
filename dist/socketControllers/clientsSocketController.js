"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class ClientsSocketController {
    constructor() {
        this.list = [];
    }
    // ==================================================
    // Add new Client
    // ==================================================
    addClient(client) {
        this.list.push(client);
        return client;
    }
    // ==================================================
    // Update Client
    // ==================================================
    updateClient(id, user) {
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
    getList() {
        return this.list.filter(client => client.user !== null);
    }
    // ==================================================
    // Get a Client
    // ==================================================
    getClient(id) {
        return this.list.find(client => client.id === id);
    }
    // ==================================================
    // Delete Client
    // ==================================================
    deleteClient(id) {
        const tempClient = this.getClient(id);
        this.list = this.list.filter(client => client.id !== id);
        return tempClient;
    }
}
exports.ClientsSocketController = ClientsSocketController;
