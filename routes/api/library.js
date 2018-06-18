const express = require('express');
const router = express.Router();


// @route     GET api/library/test
// @desc      Library test route
// @ access   Public
router.get('/test', (req, res) => res.json({ msg: "library works!" }));


module.exports = router;
