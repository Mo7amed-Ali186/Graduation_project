import { roles } from "../../middleware/auth.js";

const cartEndPoint = {
  create: [roles.User, roles.Admin],
  update: [roles.User, roles.Admin],
  get: [roles.User, roles.Admin],
};
export default cartEndPoint;
