const express = require("express");
const router = express.Router();

router.post('/', (req, res) => {
    req.session.destroy(err => {
        if (err) {
            return res.status(500).send("Logout failed");
        }
        res.clearCookie('connect.sid'); // xóa cookie phiên nếu có
        return res.send("Logged out");
    });
});

module.exports = router;