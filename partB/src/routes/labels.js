const express = require('express');
const router = express.Router();

// Label CRUD endpoints — Feature 3 (дараагийн commit-д)
router.get('/', (req, res) => res.json({ data: [] }));

module.exports = router;
