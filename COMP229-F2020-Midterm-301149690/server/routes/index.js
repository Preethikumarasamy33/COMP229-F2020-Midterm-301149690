let express = require('express');
let router = express.Router();

router.get('/home', function(req, res, next) {
    res.render('index', { title: 'Home' });
  });


module.exports = router;
