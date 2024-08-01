import { roles } from "../../middleware/auth.js";

const userEndPoint = {
  create: [roles.Admin],
  update: [roles.Admin],
  delete: [roles.Admin],
  getWishList: [roles.Admin, roles.User],
  createtWishList: [roles.Admin, roles.User],
  updateWishList: [roles.Admin, roles.User],
};
export default userEndPoint;
