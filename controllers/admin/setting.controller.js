const SettingGeneral= require("../../models/settings-general.model")

// [GET] /admin/settings/general
module.exports.general = async (req, res) => {
    const settingGenneral = await SettingGeneral.findOne({});
    res.render("admin/pages/settings/general", {
        pageTitle: "Cài đặt chung",
        settingGenneral:settingGenneral
    })
}

// [PATCH] /admin/settings/general
module.exports.generalPatch = async (req, res) => {
    const settingGenneral = await SettingGeneral.findOne({});
    if(settingGenneral){
        await SettingGeneral.updateOne({
            _id:settingGenneral.id
        },req.body);
    }else{
        const record = new SettingGeneral(req.body);
        await record.save();
    }
    res.redirect("back");
}