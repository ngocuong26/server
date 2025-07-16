const express = require("express");
const router = express.Router();
const View = require("../modules/view");

router.get('/', async (req, res) => {
    try {
        const view = await View.findOne({ id_view: "view_admin" });

        if (!view) {
            return res.status(404).json({ message: "View record not found" });
        }

        res.json({ total_view: view.total_view });
    } catch (error) {
        console.error("Error getting view:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
});


router.post('/', async (req, res) => {
    try {
        const view = await View.findOne({ id_view: "view_admin" });

        if (!view) {
            return res.status(404).json({ message: "View record not found" });
        }

        view.total_view += 1;
        await view.save();

        res.json({ total_view: view.total_view });
    } catch (error) {
        console.error("Error updating view:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
});


module.exports = router;