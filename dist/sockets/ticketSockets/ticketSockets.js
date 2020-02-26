"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ticketsSocketController_1 = require("../../socketControllers/tickets/ticketsSocketController");
exports.ticketsSocketController = new ticketsSocketController_1.TicketsSocketController();
// export const connectClient = (cliente: Socket) => {
//     const client = new Client(cliente.id);
//     clientsSocketController.addClient(client);
// };
// export const desconectar = (cliente: Socket) => {
//     cliente.on("disconnect", () => {
//         console.log(`Cliente ${cliente.id} desconectado`);
//         clientsSocketController.deleteClient(cliente.id);
//     });
// };
// export const config_client = (cliente: Socket) => {
//     cliente.on("config-client", (payload, callback: Function) => {
//         clientsSocketController.updateClient(cliente.id, payload);
//     });
// };
// export const config_client_ticket = (cliente: Socket) => {
//     cliente.on("config-client-ticket", (payload, callback: Function) => {
//         console.log(payload);
//         clientsSocketController.configClientTicket(cliente.id, payload);
//     });
// };
