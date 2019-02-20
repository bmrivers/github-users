var request = require('request');
var rootURL = 'https://api.github.com/';

module.exports = {
    userDetails,
    search
}

function userDetails(req, res) {
    var username = req.body.username || req.query.username;
    if (!username) return res.render('index', {userData: null, title: 'GitHub Users'});
    let options = {
        url: `${rootURL}users/${req.body.username}`,
        headers: {
        'User-Agent': 'bmrivers',
        'Authorization': 'token '+ process.env.GITHUB_TOKEN
        }
    }
    request(options, function(err, response, body) {
        var userData = JSON.parse(body);
        options.url = userData.repos_url;
        request(options, function(err, response, body) {
            userData.repos = JSON.parse(body);
            res.render('index', {
                title: 'GitHub Users',
                userData: userData
            });
        });
    });
}

function search(req, res) {
    console.log(req.body.usernamePart)
    var usernamePart = req.body.usernamePart; //partial username inputted
    let options = {
        url: `${rootURL}search/users?q=${usernamePart}`,
        headers: {
            'User-Agent': 'bmrivers',
            'Authorization': 'token '+ process.env.GITHUB_TOKEN
        }
    }
    console.log(options.url);
    request(options, usernamePart, function(err, response, body) {
        if (err) {
            res.render('back');
        }
        var users = JSON.parse(body)
        console.log(users.items);
        res.render('search-results', {
            title: 'GitHub Users',
            users,
            userData: null,
            usernamePart
        });
    });
}
