var express = require('express');
var router = express.Router();
const {User,Item} = require('../models/user');
const path = require("path");



exports.getProducts = (req, res, next) => {
    Item.find({ userId: req.user._id })
      .then((products) => {
        res.render("admin/products", {
          prods: products,
          pageTitle: "Admin Products",
          path: "/admin/products",
        });
      })
      .catch((err) => {
        const error = new Error(err);
        error.httpStatusCode = 500;
        return next(error);
      });
  };


  