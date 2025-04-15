const ProductCategory = require("../../models/product-category.model");
const systemConfig = require("../../config/system")
const filterStatusHelper = require("../../helpers/filterStatus");
const searchHelper = require("../../helpers/search");
const createTreeHelper = require("../../helpers/createTree")


// [GET] /admin/products-category
module.exports.index = async (req, res) => {
    const filterStatus = filterStatusHelper(req.query);
    let find = {
        deleted: false,
    };

    //status
    if (req.query.status) {
        find.status = req.query.status;
    }

    //search
    const ojectSearch = searchHelper(req.query);
    if (ojectSearch.regex) {
        find.title = ojectSearch.regex;
    }


    //sort
    let sort = {};
    if (req.query.sortKey && req.query.sortValue) {
        sort[req.query.sortKey] = req.query.sortValue;
    } else {
        sort.position = "desc";
    }


    const records = await ProductCategory.find(find).sort(sort);
    const newRecords = createTreeHelper.tree(records);

    res.render("admin/pages/products-category/index", {
        pageTitle: "Danh mục sản phẩm",
        filterStatus: filterStatus,
        records: newRecords,
        keyword: ojectSearch.keyword,
    })
};


// [GET] /admin/products-category/create
module.exports.create = async (req, res) => {
    let find = {
        deleted: false
    }
    const records = await ProductCategory.find(find)

    const newRecords = createTreeHelper.tree(records);
    // console.log(newRecords)
    res.render("admin/pages/products-category/create", {
        pageTitle: "Tạo danh mục sản phẩm",
        records: newRecords
    })
};

// [POST] /admin/products-category/create
module.exports.createPost = async (req, res) => {


    if (req.body.position == "") {
        const countProducts = await ProductCategory.countDocuments();
        req.body.position = countProducts + 1;
    } else {
        req.body.position = parseInt(req.body.position)
    }
    const record = new ProductCategory(req.body);
    await record.save();
    res.redirect(`${systemConfig.prefixAdmin}/products-category`);
}



// [PATCH] /admin/products-category/change-status/:status/:id
module.exports.changeStatus = async (req, res) => {
    const status = req.params.status;
    const id = req.params.id;
    await ProductCategory.updateOne({ _id: id }, { status: status });
    req.flash('success', 'Cập nhật trạng thái thành công');
    res.redirect(`back`);
};


// [GET] /admin/products-category/edit/:id
module.exports.edit = async (req, res) => {
    try {
        let find = {
            _id: req.params.id,
            deleted: false
        }
        const data = await ProductCategory.findOne(find)
        const records = await ProductCategory.find({
            deleted: false
        })
        const newRecords = createTreeHelper.tree(records);

        res.render("admin/pages/products-category/edit", {
            pageTitle: "Chỉnh sửa danh mục sản phẩm",
            data: data,
            records: newRecords
        })
    } catch (error) {
        res.redirect(`${systemConfig.prefixAdmin}/products-category`)
    }

};

// [PATCH] /admin/products-category/edit/:id
module.exports.editPatch = async (req, res) => {
    const id = req.params.id;

    req.body.position = parseInt(req.body.position)

    await ProductCategory.updateOne({ _id: id }, req.body);
    req.flash('success', 'Cập nhật trạng thái thành công');
    res.redirect(`back`);
};