import userRouter from "./user.routes";
import authRouter from "./auth.routes";
import imageRouter from "./images.routes";
import memberRouter from "./member.routes";
import organizationRouter from "./organization.routes";
import areaRouter from "./area.routes";
import ticketRouter from "./ticket.routes";
import commentsRouter from "./comments.routes";
import notificationsRouter from "./notifications.routes";

const routes = [
    userRouter,
    authRouter,
    imageRouter,
    memberRouter,
    organizationRouter,
    areaRouter,
    ticketRouter,
    commentsRouter,
    imageRouter,
    notificationsRouter
];

export default routes;
