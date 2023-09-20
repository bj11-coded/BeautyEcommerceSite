const models = require("../models");
const bcrypt = require("bcrypt");
const fs = require("fs");
var display = false;

exports.getRegister = (req, res, next) => {
  res.render("auth/register", {
    path: "/register",
    title: "register",
    show: display,
    errorMessage: req.flash("error"),
  });
};

exports.getLogin = (req, res, next) => {
  res.render("auth/login", {
    path: "/login",
    title: "login",
    show: display,
    errorMessage: req.flash("error"),
  });
};
exports.getResetPassword = (req, res, next) => {
  res.render("auth/resetPassword", {
    path: "/resetPassword",
    title: "resetPassword",
    show: display,
    errorMessage: req.flash("error"),
  });
};
exports.postLogout = (req, res, next) => {
  display = false;
  req.session.destroy((err) => {
    res.redirect("/");
  });
};
exports.postResetPassword = (req, res, next) => {
  const email = req.body.email;
  const password = req.body.password;
  const hash = bcrypt.hashSync(password, 10);
  models.User.findOne({ where: { email: email } })
    .then((result) => {
      if (result === null) {
        req.flash("error", "Email is not exist!!");
        return res.redirect("/resetPassword");
      }
      models.User.update(
        {
          email: email,
          password: hash,
        },
        { where: { email: email } }
      )
        .then((result) => {
          return res.redirect("/login");
        })
        .catch((err) => {
          console.log(err);
        });
    })
    .catch((error) => {
      console.log(error);
    });
};

exports.postRegister = (req, res, next) => {
  const email = req.body.email;
  const password = req.body.password;
  const hash = bcrypt.hashSync(password, 10);
  models.User.findOne({ where: { email: email } })
    .then((result) => {
      if (result) {
        req.flash("error", "Email is already exist!!!");
        // console.log("email is already exist!!");
        return res.redirect("/register");
      }

      const post = {
        name: req.body.name,
        email: email,
        password: hash,
      };
      models.User.create(post)
        .then((result) => {
          console.log("post is created Successfully!!");
          res.redirect("/login");
        })
        .catch((err) => {
          console.log(err);
        });
    })
    .catch((err) => {
      console.log(err);
    });
};
exports.postLogin = (req, res, next) => {
  const email = req.body.email;
  const password = req.body.password;
  models.User.findOne({ where: { email: email } })
    .then((userInf) => {
      req.session.user = userInf;
      if (userInf === null) {
        req.flash("error", "Envalid  email or password!!!");
        //console.log("invalid User!!");
        return res.redirect("/login");
      }
      bcrypt
        .compare(password, userInf.password)
        .then((doMatch) => {
          if (doMatch) {
            if (req.session.user.name == "Admin") {
              res.redirect("/admin");
            }
            res.redirect("/shop");
          }
          req.flash("error", "Envalid  email or password!!!");
          res.redirect("/login");
        })
        .catch((err) => {
          console.log(err);
        });
    })
    .catch((err) => {
      console.log(err);
    });
};
