// const models = require('../models');

// exports.findCart = (req,res,next)=>{
//     if(!req.session.user){
//         res.redirect('/login')
//      }

//     models.Cart_item.findAll().then(cartInf=>{
//         res.render('cart',{
//             path:'/cart',
//             title: 'cart',
//             prod :cartInf
//         })

//     }).catch(err=>{
//         console.log('err');
//     })

// }
