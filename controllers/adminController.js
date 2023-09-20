// const { where } = require('sequelize/types')
const { Product } = require("../models");
const fs = require("fs");
exports.getAdminDash = (req, res, next) => {
  if (!req.session.user) {
    res.redirect("/login");
  }
  Product.findAll()
    .then((productData) => {
      res.render("admin/AdminIndex", {
        prods: productData,
      });
    })
    .catch((err) => {
      console.log(err);
    });
};
exports.getProductForm = (req, res, next) => {
  if (!req.session.user) {
    res.redirect("/login");
  }
  return res.render("admin/productForm", {
    path: "/productForm",
  });
};
exports.createProductdata = (req, res, next) => {
  Product.create({
    name: req.body.name,
    cat_name: req.body.cat_name,
    price: req.body.price,
    image: req.file.path,
  })
    .then((productDetails) => {
      res.status(201).redirect("/admin");
    })
    .catch((err) => {
      console.log(err);
    });
};
exports.deleteProductData = (req, res, next) => {
  // const id = req.params.id;
  const id = req.query.id;
  const path = req.query.path;
  Product.destroy({ where: { id: id } })
    .then((data) => {
      fs.unlinkSync(path);
      res.redirect("/admin");
    })
    .catch((e) => {
      console.log(e);
    });
};
exports.editProductData = async (req, res) => {
  const { id } = await req.params;
  const productData = await Product.findOne({
    where: {
      id: id,
    },
    raw: true,
  }).catch((err) => console.log(err));
  res.render("admin/editProductForm", { productData });
};
exports.updateProductData = (req, res, next) => {
  const id = req.params.id;
  Product.update(
    {
      name: req.body.name,
      cat_name: req.body.cat_name,
      price: req.body.price,
      image: req.file.path,
    },
    { where: { id: id } }
  )
    .then((data) => {
      return res.redirect("/admin");
    })
    .catch((err) => {
      console.log(err);
    });
};
