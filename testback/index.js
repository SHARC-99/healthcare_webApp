const express = require("express");

const app = express();

const port = 8000;

app.get("/", (req, res) => {
    return res.send("Welcome to the Home Page");
});

const admin = (req, res) =>{
    return res.send("This is Admin Dashboard");
};

const isAdmin = (req, res, next)=>{
    console.log("isAdmin is running");
    next();
};

const loggedin =(req, res)=>{
    return res.log("this is loggin dashboard");
};

const isloggedin = (req, res, next) =>{
    console.log("isloggedin is running");
    next();
}

app.get("/admin", isloggedin,loggedin, isAdmin, admin);

app.get("/login", (req, res) => {
    return res.send("YOU are visiting a login route");
});

app.get("/signup", (req, res) => {
    return res.send("Hey! you are signed up");
});

app.get("/shwet", (req, res) => {
    return res.send("Shwetabh uses instagram");
});


app.listen(port, () => {
    console.log("Server is up and running...");
});

// const port = 3000

// app.get('/', (req, res) => res.send('Hello World!'))

// app.listen(port, () => console.log(`Example app listening at http://localhost:${port}`))