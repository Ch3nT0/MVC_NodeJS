const express = require('express');
const router =express.Router();
const controller=require('../../controllers/admin/setting.controller')

const multer = require('multer')
const uploadCoud = require("../../middlewares/admin/uploadCloud.middleware")
const upload = multer()


router.get('/general', controller.general);
router.patch(
    '/general',
    upload.single("logo"),
    uploadCoud.upload,
    controller.generalPatch
);

module.exports = router;