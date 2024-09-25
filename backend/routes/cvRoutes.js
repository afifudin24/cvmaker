const express = require('express');
const router = express.Router();
const CVController = require('../controllers/cvController');

router.get('/getCVById/:id', CVController.getCVByUserId);
router.post('/createCV', CVController.createCV);
router.put('/updateCV/:id', CVController.updateCV);
router.delete('/deleteCV/:id', CVController.deleteCV);
module.exports = router;
