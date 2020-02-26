"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class ClientsList {
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
        console.log(this.list);
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
    // Get Clients in a ticket
    // ==================================================
    getClientsInTicket(ticket) {
        this.list.filter(client => client.ticket === ticket);
    }
    // ==================================================
    // Update Client Ticket
    // ==================================================
    configClientTicket(id, ticket) {
        for (let client of this.list) {
            if (client.id === id) {
                client.ticket = ticket;
                break;
            }
        }
        console.log(this.list);
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
exports.ClientsList = ClientsList;
