const productHelper = require("../../helpers/product")
const productCategoryHelper = require("../../helpers/product-category")
const Product = require("../../models/product.model")
const ProductCategory = require("../../models/product-category.model")
// [GET] /products
module.exports.index = async (req, res) => {
    const products = await Product.find({
        status: 'active',
        deleted: false
    }).sort({ position: "desc" });

    const newProduct = productHelper.priceNewProducts(products);

    res.render("client/pages/products/index", {
        pageTitle: "Danh sách sản phẩm",
        products: newProduct
    })
}

// [GET] /products/detail/:slugProduct
module.exports.detail = async (req, res) => {

    try {
        const find = {
            deleted: false,
            status : "active",
            slug: req.params.slugProduct
        }
        
        const product = await Product.findOne(find);
        if(product.product_category_id !=null){
            const category = await ProductCategory.findOne({
                _id: product.product_category_id,
                deleted:false,
                status:"active"
            });

            product.category= category;
        }
        productHelper.priceNewProduct(product)
        res.render("client/pages/products/detail", {
            pageTitle: product.title,
            product: product
        })
    } catch (error) {
        res.redirect(`products`);
    }
}

// [GET] /products/:slugCategory
module.exports.category = async (req, res) => {
    try{
        const category = await ProductCategory.findOne({
            slug: req.params.slugCategory,
            status : "active",
            deleted: false
        })
        
        const listSubCategory = await productCategoryHelper.getSubCategory(category.id)
        const listSubCategoryId=listSubCategory.map(item=>item.id)
        const find = {
            deleted: false,
            status : "active",
            product_category_id: {$in:[category.id,...listSubCategoryId]}
        }
        const products = await Product.find(find).sort({position:"desc"});
        const newProduct = productHelper.priceNewProducts(products);
        res.render("client/pages/products/index", {
            pageTitle: "Danh sách sản phẩm",
            products: newProduct
        })
    } catch (error) {
        res.redirect(`products`);
    }
}