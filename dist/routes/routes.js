"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const user_routes_1 = __importDefault(require("./user.routes"));
const auth_routes_1 = __importDefault(require("./auth.routes"));
const images_routes_1 = __importDefault(require("./images.routes"));
const member_routes_1 = __importDefault(require("./member.routes"));
const organization_routes_1 = __importDefault(require("./organization.routes"));
const area_routes_1 = __importDefault(require("./area.routes"));
const ticket_routes_1 = __importDefault(require("./ticket.routes"));
const comments_routes_1 = __importDefault(require("./comments.routes"));
const routes = [
    user_routes_1.default,
    auth_routes_1.default,
    images_routes_1.default,
    member_routes_1.default,
    organization_routes_1.default,
    area_routes_1.default,
    ticket_routes_1.default,
    comments_routes_1.default,
    images_routes_1.default
];
exports.default = routes;
