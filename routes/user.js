const express = require("express");
const router = express.Router();
const User = require("../modules/user");
const userController = require("../controllers/userController");

router.get('/me', async (req, res) => {
    if (!req.session.user) {
        return res.status(401).send("Not logged in");
    }

    try {
        const findUser = await User.findById(req.session.user.id);
        if (!findUser) {
            return res.status(404).send("Not find user");
        }
        
        return res.json(findUser);

    } catch (error) {
        console.error(error);
    }
    return res.json(req.session.user);
});

router.post('/update', async (req, res) => {
    const {id_user, name, phone, address, email} = req.body;

    if (id_user) {
        const usersNew = await User.findByIdAndUpdate(id_user, {name, phone, address, email}, {new: true});

        return res.json({message: "Success"});
    }

    if (!id_user) {

        const usersNew = await User.findByIdAndUpdate(req.session.user.id, {name, phone, address, email}, {new: true})
    
        console.log({name, phone, address, email});
        
        session.user.name = usersNew.name;
        return res.json({message: "Success"});
    }

})

router.get('/', async (req, res) => {
    const user = await User.find();
    console.log(user);
    res.json(user);

})

router.post('/register', async (req, res) => {
    const {email, username, phone, password, date} = req.body;
    console.log({email, username, phone, password});

    const user = await User.findOne({email: email});
    if (user) {
        return res.status(401).json({ message: 'Email bị trùng!' });
    }
    
    const newUser = await User.create({
        name: username,
        phone: phone,
        address: "",
        email: email,
        password: password,
        img: "",
        date: date
    })

    res.json('Tạo tài khoản thành công!!!')
})

router.get('/delete', userController.deleteUser);


module.exports = router;