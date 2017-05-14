/**
 * Created by dashan on 2017/5/1.
 */
var express = require("express");
var expressJwt = require("express-jwt");
var bodyParser = require("body-parser");
var jwt = require("jsonwebtoken");
var shortid = require("shortid");

var app = express();

app.use(bodyParser.json());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use(expressJwt({secret: "secret"}).unless({path: ["/login"]}));

app.use(function (err, req, res, next) {

    console.log(err);

    if (err.name === "UnauthorizedError") {
        res.status(401).send("invalid token");
    }
});


app.post("/login", function(req, res) {
    var username = req.body.username;
    var password = req.body.password;

    console.log(username);
    console.log(password);
    console.log(req.body);

    if (!username) {
        return res.status(400).send("username require");
    }
    if (!password) {
        return res.status(400).send("password require");
    }

    if (username != "admin" && password != "password") {
        return res.status(401).send("invalid password");
    }

    var authToken = jwt.sign({username: username}, "secret2");
    res.status(200).json({token: authToken});

});

app.post("/user", function(req, res) {
    var username = req.body.username;
    var password = req.body.password;
    var country = req.body.country;
    var age = req.body.age;

    if (!username) {
        return res.status(400).send("username require");
    }
    if (!password) {
        return res.status(400).send("password require");
    }
    if (!country) {
        return res.status(400).send("countryrequire");
    }
    if (!age) {
        return res.status(400).send("age require");
    }

    res.status(200).json({
        id: shortid.generate(),
        username: username,
        country: country,
        age: age
    })
})

app.listen(3000);



/* 前端登录代码

 var settings = {
 "async": true,
 "crossDomain": true,
 "url": "http://localhost:3000/login",
 "method": "POST",
 "headers": {
 "content-type": "application/x-www-form-urlencoded",
 "cache-control": "no-cache",
 "postman-token": "0483f8c3-7d9f-2ae6-1e20-5a7f8ca0e2ae"
 },
 "data": {
 "username": "admin",
 "password": "password"
 }
 }

 $.ajax(settings).done(function (response) {
 console.log(response);
 });


// 返回值是：
 {
 "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImFkbWluIiwiaWF0IjoxNDkzNjE1NzA2fQ.LMimNniC2cn3fA-IN9fq6ZSCptHii8dE6Ymrg87cOTA"
 }

* */


/* 前端带token 登录请求代码

 var settings = {
 "async": true,
 "crossDomain": true,
 "url": "http://localhost:3000/user",
 "method": "POST",
 "headers": {
 "content-type": "application/x-www-form-urlencoded",
 "authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImFkbWluIiwiaWF0IjoxNDkzNjEzNzI4fQ.QTc-nJUM5mzZBOG8US7-z81jYr1DTo5C_bTC8rscS4M",
 "cache-control": "no-cache",
 "postman-token": "23432fb6-0b90-319d-a0d7-94d48cfce582"
 },
 "data": {
 "username": "dfsfdf",
 "password": "sdfas",
 "country": "sdfasdf",
 "age": "sdfasdfsa"
 }
 }

 $.ajax(settings).done(function (response) {
 console.log(response);
 });


 // 返回值是：

 {
 "id": "SJRLVrVJZ",
 "username": "dfsfdf",
 "country": "sdfasdf",
 "age": "sdfasdfsa"
 }

* */