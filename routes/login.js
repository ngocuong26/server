const express = require("express");
const router = express.Router();
const User = require("../modules/user");

router.get('/', (req, res) => {
    res.send("Login endpoint is working!");
});

router.post('/', async (req, res) => {
    console.log("Login route được gọi"); 
    console.log("Body nhận được:", req.body);
    const { username, password } = req.body;
    console.log(username)
    try {
        const user = await User.findOne({ email: username });

        if (!user) {
            return res.status(404).send("User not found");
        }

        if (user.password !== password) {
            return res.status(401).send("Invalid password");
        }
        console.log('user login: ', user);
        
        // Lưu user vào session
        req.session.user = {
            id: user._id,
            email: user.email,
            name: user.name
        };

        return res.json({
            message: "success",
            user: req.session.user
        });
        
    } catch (error) {
        console.error(error);
        return res.status(500).send("Server error");
    }
});

module.exports = router;
