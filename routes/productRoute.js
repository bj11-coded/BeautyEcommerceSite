const express = require('express');
const { router } = require('../app');

const route = express.Router();

// const auth = require('../middleware/is_auth')
const productController = require('../controllers/product')


route.get('/shop',productController.findShop)
route.get('/cart',productController.findCart)
route.get('/contact',productController.findCantact);
route.get('/about',productController.findAbout);
route.get('/payment', productController.paymentMethod);
route.get('/',productController.findIndex);
route.post('/cart',productController.postCart)
route.get('/cart/:id',productController.deleteCart)





module.exports = route;