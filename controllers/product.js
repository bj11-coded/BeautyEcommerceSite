const models = require("../models");

var display = "";

exports.findCart = (req, res, next) => {
  if (!req.session.user) {
    return res.redirect("/login");
  } else {
    display = true;
  }

  const id = req.session.user.id;
  models.Cart_item.findAll({ where: { userId: id } })
    .then((cartInf) => {
      res.render("cart", {
        path: "/cart",
        title: "cart",
        prod: cartInf,
        show: display,
      });
    })
    .catch((err) => {
      console.log("err");
    });
};

exports.deleteCart = (req, res, next) => {
  const id = req.params.id;
  models.Cart_item.destroy({ where: { id: id } })
    .then((result) => {
      return res.redirect("/cart");
    })
    .catch((err) => {
      console.log("err");
    });
};
exports.postCart = (req, res, next) => {
  if (!req.session.user) {
    return res.redirect("/login");
  }

  const productName = req.body.name;
  const id = req.session.user.id;
  models.Cart_item.findOne({ where: { productName: productName, userId: id } })
    .then((result) => {
      if (result) {
        req.flash("error", "Product is already exist in cart!!!");
        // console.log("Item is already exist!!")
        return res.redirect("/shop");
      }
      const post = {
        userId: req.session.user.id,
        productName: req.body.name,
        productPrice: req.body.price,
        productImage: req.body.image,
      };
      models.Cart_item.create(post)
        .then((result) => {
          return res.redirect("/cart");
        })
        .catch((err) => {
          console.log(err);
        });
    })
    .catch((err) => {
      console.log("err");
    });
};

exports.findShop = (req, res, next) => {
  if (req.session.user) {
    display = true;
  }
  models.Product.findAll()
    .then((product) => {
      res.render("shop", {
        path: "/shop",
        title: "shop",
        prod: product,
        errorMessage: req.flash("error"),
        show: display,
      });
    })
    .catch((err) => {
      console.log(err);
    });
};

exports.findCantact = (req, res, next) => {
  res.render("contact", {
    path: "/contact",
    title: "contact",
    show: display,
  });
};

exports.paymentMethod = (req, res, next) => {
  res.render("payment", {
    path: "/payment",
    title: "payment",
    show: display,
  });
};


exports.findAbout = (req, res, next) => {
  res.render("about", {
    path: "/about",
    title: "about",
    show: display,
  });
};

exports.findIndex = (req, res, next) => {
  if (req.session.user) {
    display = true;
  } else {
    display = false;
  }


    models.Product.findAll()
      .then((product) => {
        res.render("index", {
          path: "",
          title: "index",
          prod: product,
          errorMessage: req.flash("error"),
          show: display,
        });
      })
      .catch((err) => {
        console.log(err);
      });
}
