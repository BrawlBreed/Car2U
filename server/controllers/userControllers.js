const { hashPassword, comparePassword } = require("../auth/auth")
const crypto = require("crypto")
const nodemailer = require("nodemailer")
const userModel = require("../models/userModel")
const orderModel = require("../models/orderModel")
const JWT = require('jsonwebtoken')

const registerUser = async (req,res) => {
    try{
        const {name,email,password,phone,address} = req.body

        if(!name){
            return res.send({message:'Name is Required'})
        }
        if(!email){
            return res.send({message:'Email is Required'})
        }
        if(!password){
            return res.send({message:'Password is Required'})
        }
        if(!phone){
            return res.send({message:'Phone is Required'})
        }
        if(!address){
            return res.send({message:'Address is Required'})
        }

        const userExist = await userModel.findOne({email})

        if(userExist){
            return res.status(200).send({
                success:false,
                message:'Already a User, Please Login !'
            })
        }

        const hashedPassword = await hashPassword(password)

        const user = await new userModel({name,email,phone,address,password:hashedPassword}).save()

        res.status(201).send({
            success:true,
            message:'Registration Successfull',
            user
        })
    }catch(err){
        console.log('Failed to Register a User',err);
        res.status(500).send({
            success:false,
            message:'Failed to Register a User',
            err
        })
    }
}

const loginUser = async (req,res) => {
    try{
        const {email,password} = req.body

        if(!email){
            return res.send({message:'Email is Required'})
        }
        if(!password){
            return res.send({message:'Password is Required'})
        }

        if(!email || !password){
            return res.status(404).send({
                success:false,
                message:'Inavild email or password'
            })
        }

        
        const user = await userModel.findOne({email});

        if(!user){
            return res.status(200).send({
                success:false,
                message:'Invalid Email or Password!'
            })
        }

        const match = await comparePassword(password,user.password);

        if(!match){
            return res.status(200).send({
                success:false,
                message:'Invalid Password !'
            })
        }

        const token = await JWT.sign({_id:user._id},process.env.JWT_SECRET);

        res.status(200).send({
            success:true,
            message:'Login Successfull',
            user:{
                _id:user._id,
                name:user.name,
                email:user.email,
                phone:user.phone,
                address:user.address,
                role:user.role
            },
            token
        })
    }catch(err){
        res.status(500).send({
            success:false,
            message:'Error during Login',
            err
        })
    }
}

const updateProfile = async (req,res) => {
    try {
        const { name, email, password, address, phone } = req.body;
        const user = await userModel.findById(req.user._id);
        if (!password) {
          return res.send({ message: "Passsword is required" });
        }
        const hashedPassword = password ? await hashPassword(password) : undefined;
        const updatedUser = await userModel.findByIdAndUpdate(
          req.user._id,
          {
            name: name || user.name,
            email:email || user.email,
            password: hashedPassword || user.password,
            phone: phone || user.phone,
            address: address || user.address,
          },
          { new: true }
        );
        res.status(200).send({
          success: true,
          message: "Profile Updated SUccessfully",
          updatedUser,
        });
      } catch (error) {
        console.log(error);
        res.status(400).send({
          success: false,
          message: "Error while Updating profile",
          error,
        });
      }
}

const test = (req,res) => {
    res.status(200).send({
        success:true,
        message:'Protected Routes'
    })
} 

const myOrders = async(req,res) => {
    try {
        const orders = await orderModel
          .find({ buyer: req.user._id }).populate('products')
          .populate("buyer", "name");
        res.json(orders);
      } catch (error) {
        res.status(500).send({
          success: false,
          message: "Error WHile Geting Orders",
          error,
        });
      }
}

const getAllOrdersController = async(req,res) => {
try {
    const orders = await orderModel
      .find({}).populate("products")
      .populate("buyer", "name")
      .sort({ createdAt: "-1" });
    res.json(orders);
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error WHile Geting Orders",
      error,
    });
  }
}

const orderStatusController = async(req,res) => {
    try {
        const { orderId } = req.params;
        const { status } = req.body;
        const orders = await orderModel.findByIdAndUpdate(
          orderId,
          { status },
          { new: true }
        );
        res.json(orders);
      } catch (error) {
        console.log(error);
        res.status(500).send({
          success: false,
          message: "Error While Updateing Order",
          error,
        });
      }
}

const forgotPassword = async (req, res) => {
  try {
    const { email } = req.body
    if (!email) {
      return res.status(400).send({ success: false, message: 'Имейлът е задължителен' })
    }
    const user = await userModel.findOne({ email })
    if (!user) {
      return res.status(200).send({ success: false, message: 'Потребителят не е намерен' })
    }

    // генерираме токен и срок
    const token = crypto.randomBytes(20).toString('hex')
    const expire = Date.now() + 3600000 // 1 час
    user.resetPasswordToken = token
    user.resetPasswordExpire = expire
    await user.save()

    // конфигурираме nodemailer
    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,            // smtp.zoho.com
      port: Number(process.env.SMTP_PORT),    // 587
      secure: false,                          // STARTTLS, not SSL
      requireTLS: true,
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS
      },
      connectionTimeout: 10000,
      greetingTimeout:   10000,
      socketTimeout:     10000
    })
    const resetUrl = `${process.env.FRONTEND_URL}/reset-password/${token}`
    const message = `
      Здравейте ${user.name},
      
      Получихме заявка за нулиране на парола. Натиснете линка:
      ${resetUrl}

      Линкът е валиден 1 час.

      Ако не вие сте поискали това, игнорирайте имейла.
    `

    await transporter.sendMail({
      from: `"Car2U Support" <${process.env.SMTP_USER}>`, // НЕ използвай FROM_EMAIL различен от SMTP_USER
      to: user.email,
      subject: 'Нулиране на парола',
      text: message
    })

    res.status(200).send({ success: true, message: 'Пратен е имейл за нулиране на парола' })
  } catch (err) {
    console.log(err)
    console.error(err)
    res.status(500).send({ success: false, message: 'Грешка на сървъра' })
  }
}

const resetPassword = async (req, res) => {
  try {
    const { token, password } = req.body
    const user = await userModel.findOne({
      resetPasswordToken: token,
      resetPasswordExpire: { $gt: Date.now() }
    })
    if (!user) {
      return res.status(400).send({ success: false, message: 'Невалиден или изтекъл токен' })
    }
    user.password = password // middleware трябва да хешира
    user.resetPasswordToken = undefined
    user.resetPasswordExpire = undefined
    await user.save()
    res.status(200).send({ success: true, message: 'Паролата е нулирана успешно' })
  } catch (err) {
    console.error(err)
    res.status(500).send({ success: false, message: 'Невалиден или изтекъл токен' })
  }
}

module.exports = {registerUser,loginUser,test,myOrders,getAllOrdersController,orderStatusController,updateProfile, resetPassword, forgotPassword}