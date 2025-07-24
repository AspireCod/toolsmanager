// backend/routes/productRoutes.js
const router = require('express').Router();
const db = require('../db'); // acceso a sqlite

router.get('/', (req, res) => { /* SELECT * FROM products */ });
router.post('/', (req, res) => { /* INSERT new product */ });
router.put('/:id', (req, res) => { /* UPDATE product */ });
router.delete('/:id', (req, res) => { /* DELETE product */ });
module.exports = router;
