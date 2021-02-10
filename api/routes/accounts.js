const express = require('express');

const router = express.Router();

router.get('/', (req, res) => {
    res.json({ baybe: "BAYBEYODA" });
});

module.exports = router;