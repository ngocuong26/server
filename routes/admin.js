const express = require("express");
const router = express.Router();
const Admin = require("../modules/admin");
const user = require("../modules/user");

router.post('/login', async (req, res) => {
    const {username, password} = req.body;

    const admin = await Admin.findOne({email: username});

    console.log(username, password);
    
    if (!admin) {
        return res.status(404).json("No found");
    }

    if (admin.password !== password) {
        return res.status(404).json('sai password');
    }

    req.session.admin = {
        email: username
    }

    return res.json({
        admin: req.session.admin
    })
})

module.exports = router;