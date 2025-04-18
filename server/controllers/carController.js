const { default: slugify } = require("slugify");
const carModel = require("../models/carModel");
const orderModel = require("../models/orderModel");
const brandModel = require("../models/carBrand");
const multer = require("multer");
const path = require("path");
const dotenv = require("dotenv");
const cloudinary = require("cloudinary").v2;
const fs = require("fs");

dotenv.config();

// Cloudinary config
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// Multer storage
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, "uploads/"),
  filename: (req, file, cb) => cb(null, Date.now() + "-" + file.originalname),
});
const upload = multer({ storage });

const uploadFileToCloudinary = async (filePath) => {
  const result = await cloudinary.uploader.upload(filePath, {
    folder: "cars",
  });
  fs.unlinkSync(filePath);
  return result.secure_url;
};

const createCar = async (req, res) => {
  try {
    const {
      name,
      description,
      brand,
      price,
      fuelType,
      transmission,
      engineSize,
      mileage,
      safetyrating,
      warranty,
      seater,
      size,
      fuelTank,
    } = req.body;

    const requiredFields = [
      "name",
      "description",
      "brand",
      "price",
      "fuelType",
      "transmission",
      "engineSize",
      "mileage",
      "safetyrating",
      "warranty",
      "seater",
      "size",
      "fuelTank",
    ];
    for (let field of requiredFields) {
      if (!req.body[field]) {
        return res
          .status(400)
          .send({ success: false, message: `${field} is Required` });
      }
    }

    const uploadedFiles = await Promise.all(
      req.files.map(async (file) => {
        const url = await uploadFileToCloudinary(file.path);
        return url;
      })
    );

    const slug = slugify(name);

    const car = new carModel({
      name,
      slug,
      description,
      brand,
      productPictures: uploadedFiles,
      price,
      fuelType,
      transmission,
      engineSize,
      mileage,
      safetyrating,
      warranty,
      seater,
      size,
      fuelTank,
    });

    await car.save();

    const category = await brandModel.findById(brand);
    category.carInvoleInThisBrand.push(car);
    await category.save();

    res.status(201).send({
      success: true,
      message: "Car Created Successfully",
      car,
    });
  } catch (err) {
    console.error(err);
    res.status(500).send({
      success: false,
      message: "Error in creating Car",
      error: err.message,
    });
  }
};

const getAllCar = async (req, res) => {
  try {
    const cars = await carModel.find({}).populate("brand");

    res.status(200).send({
      success: true,
      totalCar: cars.length,
      message: "All cars",
      cars,
    });
  } catch (err) {
    res.status(500).send({
      success: false,
      message: "Error in Getting Car",
      error: err.message,
    });
  }
};

const getCarById = async (req, res) => {
  try {
    const car = await carModel
      .findOne({ slug: req.params.slug })
      .populate("brand");

    res.status(200).send({
      success: true,
      message: "Car By this Id",
      car,
    });
  } catch (err) {
    res.status(500).send({
      success: false,
      message: "Error in Finding Car Id",
      err,
    });
  }
};

const deleteCar = async (req, res) => {
  try {
    const carModel_ = await carModel.findById(req.params.pid);
    await carModel.findByIdAndDelete(req.params.pid);
    res.status(200).send({
      success: true,
      message: "Car Deleted Successfully",
    });
  } catch (err) {
    res.status(500).send({
      success: false,
      message: "Error in Deleting Car",
      err,
    });
  }
};

const updatecar = async (req, res) => {
  try {
    const {
      name,
      description,
      fuelType,
      transmission,
      engineSize,
      mileage,
      safetyrating,
      warranty,
      seater,
      size,
      fuelTank,
      price,
    } = req.fields;

    const car = await carModel.findByIdAndUpdate(
      req.params.pid,
      { ...req.fields, slug: slugify(name) },
      { new: true }
    );

    await car.save();
    res.status(201).send({
      success: true,
      message: "Car Updated Successfully",
      car,
    });
  } catch (err) {
    console.log(err);
    res.status(500).send({
      success: false,
      message: "Error in Updating Car",
      err,
    });
  }
};

const relatedCar = async (req, res) => {
  try {
    const { cid, bid } = req.params;
    const cars = await carModel
      .find({
        brand: bid,
        _id: { $ne: cid },
      })
      .populate("brand");

    res.status(200).send({
      success: true,
      message: "Related Cars for this Brand",
      cars,
    });
  } catch (err) {
    res.status(400).send({
      success: false,
      message: "Error While Fetching Related Cars",
      err,
    });
  }
};

module.exports = {
  upload,
  createCar,
  getAllCar,
  getCarById,
  deleteCar,
  updatecar,
  relatedCar,
};
