const multer = require ('multer') ;
const path  = require('path');

const fileUpload = {};

const imageFilter = (req,file,cb)=>{
    if(file.originalname.toLowerCase().match(/\.(jpg|jpeg|png|gif|svg)$/)){
        cb(null,true);
    }else{
        cb(new Error("You can upload image file only!!"),false)
    }
    //console.log(file)
}
const docFilter = (req,file,cb)=>{
    if(file.originalname.toLowerCase().match(/\.(pdf|doc|docx)$/)){
        cb(null,true);
    }else{
        cb(new Error("You can upload doc file only!!"),false)
    }
}


const storage = multer.diskStorage({
    destination:(req,file,cb)=>{
        cb(null,'public/assets')
    },
    filename:(req,file,cb)=>{
        cb(null,Date.now() + file.originalname)
    }
});
 fileUpload.imageUpload = multer({
    storage:storage,
    limits:{
        fieldSize:1024*1024*100,
    },
    fileFilter:imageFilter
 })
//  fileUpload.docUpload = multer({
//     storage:storage,
//     limits:{
//         fieldSize:1024*1024*100,
//     },
//     fileFilter:docFilter
//  })
 
 module.exports = fileUpload;