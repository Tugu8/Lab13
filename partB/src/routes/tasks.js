const express = require('express');
const router = express.Router();

// Task CRUD endpoints — Feature 1 (дараагийн commit-д)
router.get('/', (req, res) => res.json({ data: [], meta: { total: 0 } }));

module.exports = router;
