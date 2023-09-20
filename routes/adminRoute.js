const express = require("express");

const route = express.Router();

const adminControllers = require("../controllers/adminController");
const fileuploder = require("../middleware/imageUploader");

const uploadSingleImage = fileuploder.imageUpload.single("image");

route.get("/", adminControllers.getAdminDash);
route.get("/productForm", adminControllers.getProductForm);
route.post(
  "/createProductData",
  uploadSingleImage,
  adminControllers.createProductdata
);
route.get("/deleteProductData", adminControllers.deleteProductData);
route.get("/editProductData/:id", adminControllers.editProductData);
route.post(
  "/updateProductData/:id",
  uploadSingleImage,
  adminControllers.updateProductData
);
module.exports = route;
