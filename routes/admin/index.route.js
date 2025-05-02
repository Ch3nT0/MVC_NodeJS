const dashboardRoutes= require("./dashboard.route");
const productRoutes= require("./product.route");
const productCategory = require("./product-category.route")
const roleRoute = require("./role.route")
const accountRoute = require("./account.route")
const authRoute = require("./auth.route")
const myAccountRoute = require("./my-account.route")
const settingRoute = require("./setting.route")


const systemConfig = require("../../config/system")

const authMiddleware = require("../../middlewares/admin/auth.middleware")

module.exports = (app)=>{
    const PATH_ADMIN= systemConfig.prefixAdmin;
    app.use(
        PATH_ADMIN+"/dashboard",
        authMiddleware.requireAuth,
        dashboardRoutes
    );
    app.use(PATH_ADMIN+"/products",authMiddleware.requireAuth,productRoutes);
    app.use(PATH_ADMIN+"/products-category",authMiddleware.requireAuth,productCategory);
    app.use(PATH_ADMIN+"/roles",authMiddleware.requireAuth,roleRoute);
    app.use(PATH_ADMIN+"/accounts",authMiddleware.requireAuth,accountRoute);
    app.use(PATH_ADMIN+"/my-account",authMiddleware.requireAuth,myAccountRoute);
    app.use(PATH_ADMIN+"/auth",authRoute);
    app.use(PATH_ADMIN+"/settings",authMiddleware.requireAuth,settingRoute);
}