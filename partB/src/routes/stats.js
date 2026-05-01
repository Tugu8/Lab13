const express = require('express');
const router = express.Router();

// Statistics endpoint — Feature 5 (дараагийн commit-д)
router.get('/', (req, res) => res.json({ data: { total: 0, done: 0, overdue: 0 } }));

module.exports = router;
