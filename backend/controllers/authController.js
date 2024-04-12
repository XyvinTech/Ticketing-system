const User = require("../models/user");
const jwt = require("jsonwebtoken");
const bcryptUtils = require("../utils/bcrypt");

exports.signup = async function(req, res, next)  {
    const { userName, phoneNumber, email, password } = req.body;

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "Email already exists" });
    }

    const hashedPassword = await bcryptUtils.hashPassword(password);

    const newUser = new User({
      userName,
      phoneNumber,
      email,
      password: hashedPassword,
    });

    await newUser.save();
    res.json("Successfully signed up");
   
};

exports.signin = async function(req, res, next)  {
  const { email, password } = req.body;

    const validUser = await User.findOne({ email });
    if (!validUser) {
      return next(
        errorHandler(
          404,
          "User not found. Please check your email and password."
        )
      );
    }
    const validPassword = await bcryptUtils.comparePasswords(
      password,
      validUser.password
    );
    if (!validPassword) {
      return next(
        errorHandler(
          401,
          "Incorrect password. Please check your email and password."
        )
      );
    }
    const token = jwt.sign({ id: validUser._id }, process.env.JWT_SECRET);
    const { password: hashedPassword, ...rest } = validUser._doc;
    const expiryDate = new Date(Date.now() + 3600000);
    console.log("Token:", token);
    res
      .cookie("access_token", token, { httpOnly: true, expires: expiryDate })
      .status(200)
      .json({ token, ...rest });

};
exports.google = async function(req, res, next) {

    const user = await User.findOne({ email: req.body.email });
    if (user) {
      const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
      const { password: hashedPassword, ...rest } = user._doc;
      const expiryDate = new Date(Date.now() + 3600000); // 1 hour
      res
        .cookie("access_token", token, {
          httpOnly: true,
          expires: expiryDate,
        })
        .status(200)
        .json({ token, ...rest });
    } else {
      const generatedPassword =
        Math.random().toString(36).slice(-8) +
        Math.random().toString(36).slice(-8);
      const hashedPassword = await bcryptUtils.hashPassword(generatedPassword);
      const newUser = new User({
        userName:
          req.body.displayName.split(" ").join("").toLowerCase() +
          Math.random().toString(36).slice(-8),
        email: req.body.email,
        password: hashedPassword,
        profilePicture: req.body.photoURL,
      });
      await newUser.save();
      const token = jwt.sign({ id: newUser._id }, process.env.JWT_SECRET);
      const { password: hashedPassword2, ...rest } = newUser._doc;
      const expiryDate = new Date(Date.now() + 3600000); // 1 hour
      res
        .cookie("access_token", token, {
          httpOnly: true,
          expires: expiryDate,
        })
        .status(200)
        .json(rest);
    }
 
};
