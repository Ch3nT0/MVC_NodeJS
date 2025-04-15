const dashboardRoutes= require("./dashboard.route");
const productRoutes= require("./product.route");
const productCategory = require("./product-category.route")
const roleRoute = require("./role.route")
const systemConfig = require("../../config/system")
module.exports = (app)=>{
    const PATH_ADMIN= systemConfig.prefixAdmin;
    app.use(PATH_ADMIN+"/dashboard",dashboardRoutes);
    app.use(PATH_ADMIN+"/products",productRoutes);
    app.use(PATH_ADMIN+"/products-category",productCategory);
    app.use(PATH_ADMIN+"/roles",roleRoute);
}