const Product = require("../../models/product.model") 
const productHelper = require("../../helpers/product")


// [GET] /
module.exports.index= async (req, res) => {
    // lấy ra danh sách nổi bật
    const productFeatured = await Product.find({
        featured:"1",
        deleted:false,
        status:"active"
    }).limit(6);
    const newProduct = productHelper.priceNewProducts(productFeatured)


    // hiển thị danh sách sản phẩm mới nhất
    const productsNew= await Product.find({
        deleted: false,
        status:"active"
    }).sort({position:"desc"}).limit(6);
    const newProductsNew = productHelper.priceNewProducts(productsNew)


    res.render("client/pages/home/index",{
        pageTitle:"Trang chủ",
        productsFeatured:newProduct,
        productsNew: newProductsNew
    })
}