const User = require("../models/user");
const transporter = require("../config/nodemailer");

const getAll = async function (req, res) {
  try {
    const { email } = req.query;
    const users = await User.find(
      { email: { $regex: email || "", $options: "i" } },
      "-password"
    );

    if (users.length === 0) {
      return res.status(404).json({
        message: "No users found",
        status: "fail",
      });
    }

    res.status(200).json({
      data: users,
      message: "All users fetched successfully",
      status: "success",
    });
  } catch (error) {
    res.status(500).json({
      message: error?.message || "Internal server error",
      status: "fail",
    });
  }
};

const getOne = function (req, res) {
  const { id } = req.params;

  User.findById(id, "-password")
    .then((user) => {
      if (!user) {
        return res.status(404).json({
          message: "User not found",
          status: "fail",
        });
      }

      res.status(200).json({
        data: user,
        message: "User fetched successfully",
        status: "success",
      });
    })
    .catch((error) => {
      res.status(500).json({
        message: error?.message || "Internal server error",
        status: "fail",
      });
    });
};

//user register (seller===admin)
const register = async function (req, res) {
  try {
    const { username, password, email, fullName } = req.body;

    if (!username || !password || !email || !fullName) {
      return res.status(400).json({
        message:
          "All fields (username, password, email, fullName) are required.",
        status: "fail",
      });
    }

    const duplicate = await User.findOne({
      $or: [{ email }, { username }],
    });

    if (duplicate) {
      return res.status(400).json({
        message: "Username or email already exists!",
        status: "fail",
      });
    }

    // Create new user
    const newUser = new User({
      username,
      password,
      email,
      fullName,
      role: "user",
    });

    await newUser.save();

    const token = newUser.generateToken();
    //send mail with nodemailer
    await transporter
      .sendMail({
        from: process.env.MAIL_USER,
        to: email,
        subject: "Account Verification | Code Academy",
        html: `<h1>Click <a href="${process.env.APP_BASE_URL}/api/users/verify/${newUser._id}">here</a> to verify your account</h1>`,
      })
      .catch((error) => {
        console.log("error: ", error);
      });

    res.status(201).json({
      data: {
        id: newUser._id,
        username: newUser.username,
        email: newUser.email,
        fullName: newUser.fullName,
        role: newUser.role,
        token: token,
      },
      message: "User registered successfully. Please verify your email!",
      status: "success",
    });
  } catch (error) {
    res.status(500).json({
      message: error?.message || "Internal server error",
      status: "fail",
    });
  }
};

const login = async function (req, res) {
  try {
    const { username, password } = req.body;

    const user = await User.login(username, password);

    if (!user) {
      return res.status(401).json({
        message: "Invalid username or password",
        status: "fail",
      });
    }
    if (user.isVerified === false) {
      return res.status(401).json({
        message: "Please verify your account",
        status: "fail",
      });
    }

    res.status(200).json({
      data: {
        id: user._id,
        username: user.username,
        email: user.email,
        fullName: user.fullName,
        role: user.role,
      },
      token: user.generateToken(), // generate token
      message: "User logged in successfully",
      status: "success",
    });
  } catch (error) {
    res.status(500).json({
      message: error?.message || "Internal server error",
      status: "fail",
    });
  }
};

const verifyAccount = async function (req, res) {
  try {
    const { id } = req.params;

    const updatedUser = await User.findByIdAndUpdate(id, { isVerified: true });

    res.status(200).json({
      data: {
        id: updatedUser._id,
        username: updatedUser.username,
        email: updatedUser.email,
        fullName: updatedUser.fullName,
        role: updatedUser.role,
      },
      message: "Account verified successfully",
      status: "success",
    });
  } catch (error) {
    res.status(500).json({
      message: error?.message || "Internal server error",
      status: "fail",
    });
  }
};

//send email
const forgotPassword = function (req, res) {};

//reset password
const resetPassword = function (req, res) {};

const update = function (req, res) {};

const deleteAccount = function (req, res) {};

module.exports = {
  getAll,
  getOne,
  register,
  login,
  resetPassword,
  verifyAccount,
  forgotPassword,
  update,
  deleteAccount,
};
