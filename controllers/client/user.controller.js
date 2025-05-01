const User = require("../../models/user.model");
const ForgotPassword = require("../../models/forgot-password.model");
const md5 = require("md5");
const generateHelper=  require("../../helpers/generate")

// [GET] /user/register
module.exports.register = (req, res) => {
    res.render("client/pages/user/register", {
        pageTitle: "Đăng ký tài khoản"
    })
}

// [POST] /user/register
module.exports.registerPost = async (req, res) => {
    const existEmail = await User.findOne({
        email : req.body.email
    });
    if(existEmail){
        req.flash("error","Email đã tồn tại");
        res.redirect("back");
        return;
    }
    req.body.password = md5(req.body.password);
    const user = new User(req.body)
    user.save();
    res.cookie("tokenUser",user.tokenUser);
    res.redirect("/");
}

// [GET] /user/login
module.exports.login = (req, res) => {
    res.render("client/pages/user/login", {
        pageTitle: "Đăng nhập tài khoản"
    })
}

// [POST] /user/login
module.exports.loginPost = async (req, res) => {
    const email=req.body.email;
    const password = req.body.password;
    const user = await User.findOne({
        email : email,
        deleted:false
    });
    if(!user){
        req.flash("error","Email không tồn tại");
        res.redirect("back");
        return;
    }
    if(md5(password) !== user.password){
        req.flash("error","Sai mật khẩu");
        res.redirect("back");
        return;
    }
    if("inactive" == user.status){
        req.flash("error","Tài khoản đang bị khóa!");
        res.redirect("back");
        returnl
    }
    res.cookie("tokenUser",user.tokenUser);
    res.redirect("/")
}

// [GET] /user/logout
module.exports.logout = (req, res) => {
    res.clearCookie("tokenUser");
    res.redirect("/")
}
// [GET] /user/password/forgot
module.exports.forgotPassword = (req, res) => {
    res.render("client/pages/user/forgot-password", {
        pageTitle: "Lấy lại mật khẩu"
    })
}
// [POST] /user/password/forgot
module.exports.forgotPasswordPost = async (req, res) => {
    const email=req.body.email;
    const user = await User.findOne({
        email:email,
        deleted:false
    })
    if(!user){
        req.flash("error","Email không tồn tại");
        res.redirect("back");
        return;
    }
    const otp = generateHelper.generateRandomNumber(8);
    //lưu thông tin vào db
    const objectForgotPassword={
        email:email,
        otp:otp,
        expireAt: Date.now()
    }
    const forgotPassword= new ForgotPassword(objectForgotPassword);
    await forgotPassword.save();
    // Gửi mã OTP qua email
    
    res.send("OK")
}
