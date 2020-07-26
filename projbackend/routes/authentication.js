const { Router } = require("express");
var express = require('express');
var router = express.Router();
const { check, validationResult } = require('express-validator');
const {signout, signup, signin, isSignedIn} = require("../controllers/authentication");

router.post("/signup",
[
    check("name","name should atleast 3 char").isLength({min: 3}),
    check("email","Email required").isEmail(),
    check("password","password should be at least 3 char").isLength({min:3})
], 
signup
);
router.post("/signin",
[
    check("email","Email required").isEmail(),
    check("password","password field is required").isLength({min:3})
], 
signin
);


router.get("/signout", signout);

router.get("/testroute",isSignedIn ,  (req, res) => {
res.json(req.authentication);
})

module.exports = router;
