import joi from "joi";
import { generalFields } from "../../utils/generalFields.js";

export const oneProductSchema = joi
  .object({
    productId: generalFields.id,
  })
  .required();

export const createProductSchema = joi
  .object({
    name: joi.string().max(100).min(2).trim().required(),
    description: joi.string().max(1000).min(2).trim(),
    price: joi.number().positive().required(), // Ch // Change this line
    discount: joi.number().positive(),
    stock: joi.number().positive().min(2).required(), // Assuming stock is numeric
    colors: joi.string(),
    size: joi.string(),
    files: joi
      .object({
        mainImage: joi
          .array()
          .items(generalFields.file.required())
          .length(1)
          .required(),
        subImage: joi.array().items(generalFields.file).min(0).max(5),
      })
      .required(),

    categoryId: generalFields.id,
    subCategoryId: generalFields.id,
    brandId: generalFields.id,
  })
  .required();

export const updateProductSchema = joi
  .object({
    name: joi.string().max(100).min(2).trim(),
    description: joi.string().max(1000).min(2).trim(),
    price: joi.number().positive(), // Change this line
    discount: joi.number().positive(),
    stock: joi.number().positive().min(2), // Assuming stock is numeric
    colors: joi.string(),
    size: joi.string(),
    files: joi.object({
      mainImage: joi.array().items(generalFields.file.required()).length(1),
      subImage: joi.array().items(generalFields.file).min(0).max(5),
    }),

    productId: generalFields.id,
    subCategoryId: generalFields._id,
    brandId: generalFields._id,
  })
  .required();
export const tokenSchema = joi
  .object({
    authorization: joi.string().required(),
  })
  .required();
export const deleteProductSchema = joi
  .object({
    productId: generalFields.id,
  })
  .required();
