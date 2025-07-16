const express = require("express");
const router = express.Router();
const Category = require("../modules/category");
const Products = require("../modules/products");

router.get('/', async (req, res) => {
    const category = await Category.find();
    console.log("Kết quả truy vấn:", category);
    
    const parent = req.query.parent;
    const child = req.query.child;
    const cate = await Category.findOne({parent: parent});
    if (cate) {
        const deleteCate = await Category.updateOne({parent: parent}, {$pull: {child: child}});
        const cate_ok = await Category.findOne();
        console.log('Okay: ',cate_ok);
        
        return res.json(cate_ok);
    }
    res.json(category);
})

router.get('/:cate', async (req, res) => {
    const params = req.params.cate;
    const cate = params.split('-').join(' ');
    const product = await Products.find({"category.parent": cate});
    console.log('pro: ', product);
    
    res.json(product);
})

router.post('/update', async (req, res) => {
    const {child, parent} = req.body;
    const {cateParent, cateChild} = req.body;

    if (child && parent) {
        const cate = await Category.findOne({parent: parent});
        cate.child.push(child);
    
        await cate.save();
    
        return res.json('Thêm danh mục con thành công');
    }

    if (cateChild && cateParent) {
        const newCate = await Category.create({parent: cateParent, child: [cateChild]});
        
        return res.json('Thêm danh mục con thành công');
    }
    
})

module.exports = router