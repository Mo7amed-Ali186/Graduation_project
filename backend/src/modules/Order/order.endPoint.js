import { roles } from "../../middleware/auth.js";

const orderEndPoint = {
    create: [roles.User],
    get: [roles.User, roles.Admin],
    All: [roles.Admin],
    getById: [roles.Admin, roles.User],
    cancel: [roles.User],
    rejected: [roles.User, roles.Admin],
    delivered: [roles.User], //change to admin
};
export default orderEndPoint;
