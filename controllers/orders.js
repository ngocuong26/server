const Orders = require("../modules/orders");
const Cart = require("../modules/cart");
const Products = require("../modules/products");

class OrdersController{
    async orderCreate(req, res) {
        const id_user = req.session.user.id;
        let {products, quantity, total, address, name, phone, date} = req.body;
        const cart = await Cart.findOne({id_user : id_user});
        const cartItem = cart.items.filter(item => item.status === 'active');
        console.log('products', products);
        console.log('quantity', quantity);
        console.log('address', address);
        console.log('total', total);
        

        cart.items.forEach(item => {
            if (item.status === 'active') {
                item.status = 'ordered';
            }
        });
        await cart.save();

        console.log(quantity);

        let filterProduct;
        
        if (!Array.isArray(products)) {
            filterProduct = [{
                id_products: products.id_product,
                quantity: quantity,
                name_product: products.name,
                img: products.img
            }]
        }else {
            filterProduct = products.map(p => (
                {
                    id_products: p.id_product,
                    quantity: p.quantity,
                    name_product: p.name_product,
                    img: p.img
                }
            ))
        }


        const newOrder = await Orders.create({products : filterProduct, quantity, id_user, total, address, name, phone, date, status: 'confirm'});
        
        if (!Array.isArray(products)) {
            const product = await Products.findOne({id_product: products.id_product});
            if (product) {
                product.quantity -= quantity;
                await product.save();
            }
        }else {
            for (const p of products) {
                const product = await Products.findOne({ id_product: p.id_product });
                if (product) {
                    product.quantity -= p.quantity;
                    await product.save();
                }
            }
        }

        res.json("đã đặt hàng");
    }

    async orderShow(req, res) {
        const type = req.query.type;
        const seeId = req.query.seeId;
        console.log('seeId: ', seeId);
        let orders = [];
        if (type) {
            const id_user = req.session.user.id;
            if (type === 'confirm') {
                orders = await Orders.find({id_user : id_user, status: 'confirm'});            
            }else if (type === 'waittransform') {
                orders = await Orders.find({id_user : id_user, status: 'waittransform'});            
            }else if (type === 'transform') {
                orders = await Orders.find({id_user : id_user, status: 'transform'});            
            }else if (type === 'transformed') {
                orders = await Orders.find({id_user : id_user, status: 'transformed'});            
            }else {
                orders = await Orders.find({id_user: id_user, status: 'deleted'});
            }
            res.json(orders);
        }else {
            console.log('seeId',seeId);
            
            const orderSeeId = await Orders.findOne({_id: seeId});
            console.log('orderSeeid: ', orderSeeId);
            res.json(orderSeeId)
            
        }
        console.log(orders);
    }

    async orderShowAll(req, res) {
        const orders = await Orders.find();
        res.json(orders);
    }

    async orderDelete(req, res) {
        const id_order = req.query.id;
        const order = await Orders.findOne({_id: id_order});
        console.log(order)
        console.log('id_order', id_order);
        
        order.status = 'deleted';
        await order.save();
        res.json('Đã xóa đơn hàng!!!')
    }

    async orderUpdate(req, res) {
        const id_order = req.query.id;

        const order = await Orders.findOne({_id: id_order});
        order.status = 'confirm';
        await order.save();
        res.json('Da cap nhat thanh cong')
    }

    async editOrders(req, res) {
        const id_order = req.query.editId;
        const status = req.body;

        const order = await Orders.findOne({_id: id_order});
        order.status = status.status;

        await order.save();
    }

    async orderSuccess(req, res) {
        const by = req.query.by;
        const month = parseInt(req.query.month);
        const orderSuccess = await Orders.find({status: 'transformed'});
        let totalMonthlast = 0;
        let totalMonthCur = 0;
        console.log('month', month);
        let totalOrderLast = 0;
        let totalOrderCur = 0;
        

        if (by && month) {
            for (const order of orderSuccess) {
                const orderMonth = new Date(order.date).getMonth() + 1;
                console.log('order', orderMonth);
                if (orderMonth === month - 1) {
                    totalMonthlast += order.total;
                    totalOrderLast += 1;
                }
                if (orderMonth === month) {
                    totalMonthCur += order.total;
                    totalOrderCur += 1;
                }
                
            }            
        }

        res.json(
            {
                revenue: totalMonthCur,
                sale: totalOrderCur,
                total: totalMonthCur - totalMonthlast, 
                totaDifferent: ((totalMonthCur - totalMonthlast) / totalMonthlast) * 100, 
                totalOrder: totalOrderCur - totalOrderLast,
                orderDifferent: ((totalOrderCur - totalOrderLast) / totalOrderLast) * 100
            });
    }

};

module.exports = new OrdersController();