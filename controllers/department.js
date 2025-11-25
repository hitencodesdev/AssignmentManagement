const department = require("../models/Department");

exports.getDepartments = async (req, res) => {
    try {
        let page = parseInt(req.query.page) || 1;
        let skip = 10 * (page - 1);

        let data = await department.find().skip(skip).limit(10);
        res.render("createDepartment", { data, currPage: page });
    } catch (error) {
        res.send("error");
    }
};

exports.addDepartment = async (req, res) => {
    try {
        let { name, type, address } = req.body;
        await department.create({ name, type, address });
        res.redirect("/department/list");
    } catch (error) {
        res.send("error");
    }
};

exports.deleteDepartment = async (req, res) => {
    try {
        await department.findByIdAndDelete(req.params.id);
        res.redirect("/department/list");
    } catch (error) {
        res.send("error");
    }
};

exports.editDepartment = async (req, res) => {
    try {
        let dept = await department.findById({_id:req.params.id});
        res.render("editDepartment", { data: dept });
    } catch (error) {
        res.send("hello");
    }
};

exports.updateDepartment = async (req, res) => {
    try {
        let { name, type, address } = req.body;
        await department.findByIdAndUpdate(req.params.id, { name, type, address });
        res.redirect("/department/list");
    } catch (error) {
        res.send("welcome");
    }
};
