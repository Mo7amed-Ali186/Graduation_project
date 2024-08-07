import { roles } from "../../middleware/auth.js";

const categoryEndPoint = {
  create: [roles.Admin],
  update: [roles.Admin],
  delete: [roles.Admin],
  show: [roles.Admin, roles.User],
};
export default categoryEndPoint;
