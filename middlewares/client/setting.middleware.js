const SettingGeneral= require("../../models/settings-general.model");

module.exports.settingGenneral = async (req, res , next)=>{
    const settingGenneral = await SettingGeneral.findOne({});
    res.locals.settingGenneral = settingGenneral;
    next();
}