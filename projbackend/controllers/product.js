const Product = require("../models/product");
const product = require("../models/product");
const formidable = require("formidable");
const _ = require("lodash");
const fs = require("fs");
const { sortBy } = require("lodash");


exports.getProductById = (req, res, next, id) => {
    Product.findById(id).populate("category").exec((err, product) =>{
        if(err){
            return res.status(400).json({
                error: "Product not Found"
            });
        }
        req.product = product;
        next();
    });
};

exports.createProduct = (req, res) => {
    let form = new formidable.IncomingForm();
    form.keepExtensions = true;

    form.parse(req, (err, fields, file) =>{
        if(err){
            return res.status(400).json({
                error: "Problem with Image"
            });
        }

        //destructure the fields
        const {name, description, price, category, stock} = fields;

        if(!name || !description || !price || !category || !stock ) {
            return res.status(400).json({
                error:"Please include all Fields"

            });
        }


        let product = new Product(fields)

        //handle files here
        if(file.photo){
            if(file.photo.size > 3000000){
                return res.status(400).json({
                    error:"File size too big!"
                });
            }
            product.photo.data = fs.readFileSync(file.photo.path)
            product.photo.contentType = file.photo.type
        }

        //save to the DB
        product.save((err, product) =>{
            if(err){
                return res.status(400).json({
                    error:"Saving Hospital in DB failed"
                });
            }
            res.json(product)
        });
    });
};

exports.getProduct = (req, res) => {
    req.product.photo = undefined
    return res.json(req.product)
};
//middleware
exports.photo = (req, res, next)=> {
    if(req.product.photo.data){
        res.set("content-Type", req.product.photo.contentType)
        return res.send(req.product.photo.data)
    }
    next();
}

//delete controller
exports.deleteProduct = (req, res) =>{
    let product = res.product;
    product.remove((err, deletedProduct) =>{
        if(err){
            return res.status(400).json({
                error:"Failed to delete the Product"

            });
        };
        res.json({
            message:"Delete was a success",
            deletedProduct
        });
    });
};

//update route
exports.updateProduct = (req, res) =>{
    let form = new formidable.IncomingForm();
    form.keepExtensions = true;

    form.parse(req, (err, fields, file) =>{
        if(err){
            return res.status(400).json({
                error: "Problem with Image"
            });
        }

        
        //updation code
        let product = req.Product;
        product = _.extend(product, fields)

        //handle files here
        if(file.photo){
            if(file.photo.size > 3000000){
                return res.status(400).json({
                    error:"File size too big!"
                });
            }
            product.photo.data = fs.readFileSync(file.photo.path)
            product.photo.contentType = file.photo.type
        }

        //save to the DB
        product.save((err, product) =>{
            if(err){
                return res.status(400).json({
                    error:"Updation of Hospital in DB failed"
                });
            }
            res.json(product);
        });
    });
};

//product listing
exports.getAllProducts = (req, res) =>{
    let limit = req.query.limit ? parseInt(req.query.limit) : 8 ;
    let sortBy = req.query.sortBy ? req.query.sortBy : "_id";
    Product.find()
    .select("-photo")
    .populate("category")
    .sort([[sortBy, "asc"]])
    .limit(limit)
    .exec((err, product) =>{
        if(err){
            return res.status(400).json({
                error: "NO product FOUND"
            });
        };
        res.json(product)
    });
};

exports.getAllUniqueCategiries = (req, res) =>{
    Product.distinct("category", {}, (err, category) =>{
        if(err){
            return res.status(400).json({
                error: "NO category found"
            });
        }
        res.json(category)
    });
};

exports.updateStock = (req, res, next) =>{

    let myOperations = res.body.order.product.map(prod =>{
        return {
            updateOne: {
                filter: {_id: prod._id},
                update: {$inc: {stock: -prod.count, sold: +prod.count}}
            }
        };
    });

    Product.bulkWrite(myOperations, {}, (err, products) =>{
        if(err){
            return res.status(400).json({
                error: "BULK operation Failed"
            });
        }
        next();
    });
};