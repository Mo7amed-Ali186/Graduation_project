import { Router } from "express";
import { fileValidation, uploadFile } from "../../utils/multer.js";
import * as brandController from "./controller/brand.controller.js";
import * as brandValidation from "./brand.validation.js";
import validation from "../../middleware/validation.js";
import auth from "../../middleware/auth.js";
import brandEndPoint from "./brand.endPoint.js";

const router = Router();

router
  .post(
    "/",
    validation(brandValidation.tokenSchema, true),
    auth(brandEndPoint.create),
    uploadFile(fileValidation.image).single("file"),
    validation(brandValidation.createBrandSchema),
    brandController.createBrand
  )
  .get("/", brandController.allBrand)
  .get(
    "/:brandId",
    validation(brandValidation.getBrandSchema),
    brandController.getBrand
  )
  .put(
    "/:brandId",
    validation(brandValidation.tokenSchema, true),
    auth(brandEndPoint.update),
    uploadFile(fileValidation.image).single("file"),
    validation(brandValidation.updateBrandSchema),
    brandController.updateBrand
  )
  .delete(
    "/:brandId",
    validation(brandValidation.tokenSchema, true),
    auth(brandEndPoint.update),
    brandController.deleteBrand
  );

export default router;
