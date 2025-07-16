const Products = require("../modules/products");

class ProductsController {
    async showProduct(req, res) {
        let products;
        const filter = req.query.filter;

        if (filter === 'asc') {
            products = await Products.find().sort({price: 1});
        }else if (filter === 'desc') {
            products = await Products.find().sort({price: -1});
        }else if (filter === 'newest') {
            products = (await Products.find()).slice().reverse();
        }else {
            products = await Products.find();
        }

        res.json(products);
    }

    async showProductFilter(req, res) {
        const cate = req.query.Cate;
        
        if (cate === '') {
            const products = await Products.find();
            return res.json(products);
        }

        if (cate !== '') {
            const productsFilter = await Products.find({"category.parent": cate});
            return res.json(productsFilter);
        }
    }

    async showProductDetail(req, res) {
        const id_product = req.params.id;
        const products = await Products.findOne({id_product : id_product});
        const simailarId = req.query.simailarId;
        const productSiilar = (await Products.find({"category.parent": products.category.parent})).filter(item => item.id_product !== id_product)

        res.json({products, productSiilar});
    }

    async createProduct(req, res) {
        const {idPro, namePro, price, quantity, img, category, description} = req.body;

        const newProducts = await Products.create({id_product: idPro, name: namePro, price, img, category: {parent: category.parent, child: category.child}, description, quantity})
        res.json('success')
    }

    async editProduct(req, res) {
        const id_product = req.query.Id;
        const {name, price, quantity, parent, child, description} = req.body;
        const update = await Products.findOneAndUpdate(
            {id_product: id_product},
            {
                $set: {
                    name, price, quantity, category: {parent, child}, description
                }
            }, {
                new: true
            })
    }

    async deleteProduct(req, res) {
        const id_product = req.query.Id;
        const pro = await Products.deleteOne({id_product: id_product});
        const newPro = await Products.find();

        res.json(newPro);
    }

    async searchProduct(req, res) {
        const key = req.query.key?.toLowerCase().trim();

        if (!key) {
            return res.json([]);
        }

        const words = key.split(/\s+/); // ví dụ: "bút bi" -> ["bút", "bi"]
        const allProducts = await Products.find();

        const filtered = allProducts.filter(product => {
            const name = product.name?.toLowerCase();
            return words.some(word => name.includes(word));
        });

        res.json(filtered);
    }

}

module.exports = new ProductsController();