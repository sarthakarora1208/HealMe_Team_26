var { DateTime } = require("luxon");
const express = require("express");
const router = express.Router();

router.use(function (req, res, next) {
    console.log('Time:', DateTime.local().toLocaleString(DateTime.DATETIME_SHORT));
    next()
    console.log(req.connection.remoteAddress)
})


module.exports = router;
