const Cart = require("../modules/cart");

class CartController{
    async showCart(req, res){
        if (!req.session.user) {
            return;
        }
        const id_user = req.session.user.id;
        console.log(id_user);
                    
        const cart = await Cart.findOne({id_user : id_user});
        console.log(cart.items);
        const cartFilter = cart.items.filter(item => item.status === 'active');
        console.log(cartFilter);
        

        res.json(cartFilter);
        
    }

    async addCart(req, res){
        console.log(req.body);
        if (!req.session.user) {
            return;
        }
        const id_user = req.session.user.id;
        const { itemCart, quantity } = req.body;
        const cart = await Cart.findOne({id_user: id_user})
        console.log(itemCart.img);

        if (!cart) {
            const newCart = await Cart.create(
                {
                    id_user: id_user, 
                    items: [
                        {
                            id_product: itemCart.id_product,
                            name_product: itemCart.name,
                            price: itemCart.price,
                            quantity: quantity,
                            img: itemCart.img,
                            status: 'active'
                        }
                    ]
                }
            )
        }
        
        const existCart = cart.items.find(product => product.id_product === itemCart.id_product)
        console.log(itemCart);
        
        if (existCart) {
            if (existCart.status === 'deleted' || existCart.status === 'ordered') {
                existCart.status = 'active';
                existCart.quantity = 0;
            }
            existCart.quantity += quantity;
        }else {
            cart.items.push({
                id_product: itemCart.id_product,
                name_product: itemCart.name,
                price: itemCart.price,
                quantity: quantity,
                img: itemCart.img,
                status: 'active'
            })
        }

        await cart.save();
    }

    async cartDelete(req, res){
        console.log(req.params);
        if (!req.session.user) {
            return;
        }
        const id_user = req.session.user.id;
        const cart = await Cart.findOne({id_user: id_user});
        const existCart = cart.items.find(product => product.id_product === req.params.id);
        console.log(existCart);
        
        existCart.status = 'deleted';

        await cart.save();

        const cartActive = cart.items.filter(item => item.status === 'active')

        res.json(cartActive);
    }
}

module.exports = new CartController();