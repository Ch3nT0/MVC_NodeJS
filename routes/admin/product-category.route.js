const express = require('express');
const multer = require('multer')
const router = express.Router();
const controller = require('../../controllers/admin/product-category.controller')
const uploadCoud = require("../../middlewares/admin/uploadCloud.middleware")
const upload = multer()
const validate = require('../../validates/admin/product-category.validate')


router.get('/', controller.index)
router.get('/create', controller.create)
router.post(
    '/create',
    upload.single('thumbnail'),
    uploadCoud.upload,
    validate.createPost,
    controller.createPost
)
router.patch('/change-status/:status/:id', controller.changeStatus)

router.get('/edit/:id', controller.edit)
router.patch('/edit/:id', 
    upload.single('thumbnail'),
    uploadCoud.upload,
    validate.createPost,
    controller.editPatch
)


module.exports = router;