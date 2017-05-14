/**
 * Created by dashan on 2017/5/1.
 */
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


// app.use(expressJwt({secret: "secret"}).unless({path: ["/auth"]}));

app.use(function (err, req, res, next) {

    console.log(err);

    if (err.name === "UnauthorizedError") {
        res.status(401).send("invalid token");
    }
});


app.post('/auth', function(req, res, next) {

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

    // 创建token
    var token = jwt.sign({username: username}, 'secret',{expiresIn: 60*60*60});

    // json格式返回token
    res.json({
        success: true,
        message: 'Enjoy your token!',
        token: token
    });

});



app.post("/user",function(req, res) {

    console.log(req.get('Content-Type'));
    console.log(req.get('Authorization'));

    //console.log(req.headers['x-access-token']); //不可行
    //console.log(req.headers['Authorization']); //不可行

    var token = req.get('Authorization');
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


    try {

        token=token.replace('Bearer ','');
        console.log(token);
        var decoded = jwt.verify(token, 'secret');
        console.log(decoded);
        console.log("decoded.exp:"+decoded.exp);

        if(decoded.exp <= Date.now()){
            console.log( Date.now() );
            console.log("ok!");
        }

    }catch(err) {
        console.log(err);
        console.log("ERROR");
    }

    res.status(200).json({
        id: shortid.generate(),
        username: username,
        country: country,
        age: age
    })

})

app.listen(3333);
