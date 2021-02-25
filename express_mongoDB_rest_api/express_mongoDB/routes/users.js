const express = require('express');
const router = express.Router();

router.get('/', (resquest, response) => {
    response.send("Users page")
});

module.exports = router;