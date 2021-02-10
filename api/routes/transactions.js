const express = require('express');

const router = express.Router();

router.get('/', (req, res) => {
    res.json({ baybe: "BAYBEYODATRANSACTIONS" });
});

module.exports = router;