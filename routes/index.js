var express = require('express');
var router = express.Router();
var request = require('request');
var gitHubCtrl = require('../controllers/github')

const rootURL = 'https://api.github.com/';

/* GET home page. */
router.get('/', gitHubCtrl.userDetails);
router.post('/', gitHubCtrl.userDetails);

// new route for searching for a user
router.get('/search-results', gitHubCtrl.search);
router.post('/search-results', gitHubCtrl.search);

module.exports = router;
