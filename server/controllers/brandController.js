const { default: slugify } = require('slugify');
const brandModel = require('../models/carBrand');
const fs = require('fs');
const path = require('path');
const multer = require('multer');
const cloudinary = require('cloudinary').v2;
require("dotenv").config();

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/');
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + '-' + file.originalname);
    }
});
const upload = multer({ storage });

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
});

const uploadFileToCloudinary = async (filePath) => {
    const result = await cloudinary.uploader.upload(filePath, {
        folder: 'brands'
    });
    console.log(result.secure_url)
    return result.secure_url;
};

const createBrand = async (req, res) => {
    try {
        const { name } = req.body;
        const brandPictures = req.file.path;

        if (!name || !brandPictures) {
            return res.send({ message: 'Please fill all the fields' });
        }

        const existCategory = await brandModel.findOne({ name });
        if (existCategory) {
            return res.status(200).send({
                success: true,
                message: 'Name is Already Exist'
            });
        }

        const cloudinaryUrl = await uploadFileToCloudinary(brandPictures);
        fs.unlinkSync(brandPictures);

        const brand = new brandModel({ name, brandPictures: cloudinaryUrl, slug: slugify(name) });
        await brand.save();

        res.status(201).send({
            success: true,
            message: 'Brand Created Successfully',
            brand
        });
    } catch (err) {
        console.log(err)
        res.status(500).send({
            success: false,
            message: 'Error in creating Brand',
            err
        });
    }
};

const getBrand = async (req, res) => {
    try {
        const brands = await brandModel.find({}).populate('carInvoleInThisBrand');
        res.status(200).send({
            success: true,
            totalBrand: brands.length,
            message: "All Brands",
            brands
        });
    } catch (err) {
        res.status(500).send({
            success: false,
            message: "Error in Getting Brand",
            err
        });
    }
};

const getBrandById = async (req, res) => {
    try {
        const brand = await brandModel.findOne({ slug: req.params.slug }).populate('carInvoleInThisBrand');

        if (!brand) {
            return res.status(404).send({
                success: false,
                message: "Brand not found"
            });
        }

        res.status(200).send({
            success: true,
            message: "Brand By this Id",
            brand
        });
    } catch (err) {
        res.status(500).send({
            success: false,
            message: "Error in Finding Brand Id",
            err
        });
    }
};

const updateBrand = async (req, res) => {
    try {
        const { name } = req.body;
        const { id } = req.params;

        const brand = await brandModel.findByIdAndUpdate(id, { name, slug: slugify(name) }, { new: true });
        res.status(200).send({
            success: true,
            message: "Brand Updated Successfully",
            brand
        });
    } catch (err) {
        res.status(500).send({
            success: false,
            message: "Error in Updating Brand",
            err
        });
    }
};

const deleteBrand = async (req, res) => {
    try {
        const { id } = req.params;
        await brandModel.findByIdAndDelete(id);
        res.status(200).send({
            success: true,
            message: "Brand Deleted Successfully"
        });
    } catch (err) {
        res.status(500).send({
            success: false,
            message: "Error in Deleting Brand",
            err
        });
    }
};

module.exports = { getBrand, getBrandById, createBrand, upload, updateBrand, deleteBrand };
