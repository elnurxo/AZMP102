const User = require("../models/user");
const transporter = require("../config/nodemailer");
const bcrypt = require("bcrypt");

const getAll = async function (req, res) {
  try {
    const { email } = req.query;
    const users = await User.find(
      {
        email: { $regex: email || "", $options: "i" },
        isDeleted: false,
      },
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

  User.findById(id, { isDeleted: false }, "-password")
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
      isBanned: false,
      isFrozen: false,
      banExpiresAt: null,
      isDeleted: false,
    });

    await newUser.save();

    const token = newUser.generateToken();
    //send mail with nodemailer
    await transporter
      .sendMail({
        from: process.env.MAIL_USER,
        to: email,
        subject: "Account Verification | Code Academy",
        html: `<h1>Click <a href="${process.env.APP_BASE_URL}/api/users/verify/${token}">here</a> to verify your account</h1>`,
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
    //check if ban is expired
    if (user.banExpiresAt < Date.now()) {
      await User.findByIdAndUpdate(user._id, {
        isBanned: false,
        banExpiresAt: null,
      });
    }
    if (user.isBanned === true) {
      const remainingMilliseconds = user.banExpiresAt - Date.now();
      const remainingMinutes = Math.floor(remainingMilliseconds / (1000 * 60));
      const remainingSeconds = Math.floor(
        (remainingMilliseconds % (1000 * 60)) / 1000
      );

      return res.status(401).json({
        message: `Your account is banned. Come back after ${remainingMinutes} minutes and ${remainingSeconds} seconds.`,
        status: "fail",
      });
    }
    //check if frozen - unfreeze in login
    if (user.isFrozen === true) {
      await User.findByIdAndUpdate(user._id, { isFrozen: false });
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
    const { token } = req.params;
    const { id } = User.decodeToken(token);

    if (!token) {
      return res.status(400).json({
        message: "Token is required",
        status: "fail",
      });
    }

    const updatedUser = await User.findByIdAndUpdate(id, { isVerified: true });

    if (!updatedUser) {
      return res.status(404).json({
        message: "User not found",
        status: "fail",
      });
    }
    //check if verified
    if (updatedUser.isVerified === true) {
      return res.status(400).json({
        message: "Account already verified",
        status: "fail",
      });
    }

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
const forgotPassword = async function (req, res) {
  try {
    const { email } = req.body;
    const users = await User.find({ email: email, isDeleted: false });
    const user = users[0];

    if (!user) {
      return res.status(404).json({
        message: "User not found",
        status: "fail",
      });
    }

    const token = user.generateToken();

    await transporter
      .sendMail({
        from: process.env.MAIL_USER,
        to: email,
        subject: "Password Reset | Code Academy",
        html: `<h1>Click <a href="${process.env.APP_BASE_URL}/api/users/reset-password/${token}">here</a> to reset your password</h1> <h3>If you did not send a request, you can ignore this email</h3>`,
      })
      .catch((error) => {
        console.log("error: ", error);
      });

    return res.status(200).json({
      message: "Password reset link sent to your email",
      status: "success",
      token: token,
    });
  } catch (error) {
    res.status(500).json({
      message: error?.message || "Internal server error",
      status: "fail",
    });
  }
};

//reset password
const resetPassword = async function (req, res) {
  try {
    const { token } = req.params;
    const { id } = req.user;
    const { password, confirmPassword } = req.body;

    if (password !== confirmPassword) {
      return res.status(400).json({
        message: "Passwords do not match",
        status: "fail",
      });
    }
    if (!token) {
      return res.status(400).json({
        message: "Token is required",
        status: "fail",
      });
    }
    if (!password || !confirmPassword) {
      return res.status(400).json({
        message: "Both password and confirmPassword are required",
        status: "fail",
      });
    }

    const updatedUser = await User.findByIdAndUpdate(
      id,
      {
        password: await bcrypt.hash(password, 10),
      },
      { new: true }
    ).select("-password");

    return res.status(200).json({
      data: updatedUser,
      id: id,
      message: "Password reset successfully",
      status: "success",
    });
  } catch (error) {
    return res.status(500).json({
      message: error?.message || "Internal server error",
      status: "fail",
    });
  }
};

const updateUserInfo = async function (req, res) {
  try {
    const { id } = req.params;
    const { _id } = req.user;
    const { username, email, fullName } = req.body;

    const duplicate = await User.find({ $or: [{ username }, { email }] });

    if (id !== _id) {
      return res.status(401).json({
        message: "Unauthorized",
        status: "fail",
      });
    }

    //check duplicate username or email
    if (duplicate) {
      return res.status(400).json({
        message: "Username or email already exists!",
        status: "fail",
      });
    }

    const updatedUser = await User.findByIdAndUpdate(
      id,
      { username, email, fullName },
      { new: true }
    );

    if (!updatedUser) {
      return res.status(404).json({
        message: "User not found",
        status: "fail",
      });
    }

    return res.status(200).json({
      data: updatedUser,
      message: "User updated successfully",
      status: "success",
    });
  } catch (error) {
    res.status(500).json({
      message: error?.message || "Internal server error",
      status: "fail",
    });
  }
};

const updatePassword = async function (req, res) {
  try {
    const { id } = req.params;
    const { _id } = req.user;
    const { password, confirmPassword } = req.body;

    if (id !== _id) {
      return res.status(401).json({
        message: "Unauthorized",
        status: "fail",
      });
    }

    if (password !== confirmPassword) {
      return res.status(400).json({
        message: "Passwords do not match",
        status: "fail",
      });
    }

    User.findByIdAndUpdate(id, {
      password: await bcrypt.hash(this.password, 10),
    });
  } catch (error) {
    res.status(500).json({
      message: error?.message || "Internal server error",
      status: "fail",
    });
  }
};

const deleteAccount = function (req, res) {
  const { id } = req.params;
  const { _id } = req.user;

  if (id !== _id) {
    return res.status(401).json({
      message: "Unauthorized",
      status: "fail",
    });
  }

  User.findByIdAndUpdate(id, { isDeleted: true, email: null, username: null })
    .then((user) => {
      if (!user) {
        return res.status(404).json({
          message: "User not found",
          status: "fail",
        });
      }

      res.status(200).json({
        data: user,
        message: "User deleted successfully",
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

const freezeAccount = function (req, res) {
  const { id } = req.params;

  User.findByIdAndUpdate(id, { isFrozen: true })
    .then((user) => {
      if (!user) {
        return res.status(404).json({
          message: "User not found",
          status: "fail",
        });
      }

      res.status(200).json({
        data: user,
        message: "User frozen successfully",
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

const unfreezeAccount = function (req, res) {
  const { id } = req.params;

  User.findByIdAndUpdate(id, { isFrozen: false })
    .then((user) => {
      if (!user) {
        return res.status(404).json({
          message: "User not found",
          status: "fail",
        });
      }

      res.status(200).json({
        data: user,
        message: "User unfrozen successfully",
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

const banAccount = async function (req, res) {
  try {
    const { id } = req.params;
    const { duration } = req.body; //minutes

    const banExpiresAt = new Date(Date.now() + duration * 60 * 1000);
    const user = await User.findById(id);
    //validator
    if (!duration) {
      return res.status(400).json({
        message: "Duration is required",
        status: "fail",
      });
    }
    if (duration < 0) {
      return res.status(400).json({
        message: "Duration must be greater than 0",
        status: "fail",
      });
    }
    if (!id) {
      return res.status(400).json({
        message: "User id is required",
        status: "fail",
      });
    }
    if (!user) {
      return res.status(404).json({
        message: "User not found",
        status: "fail",
      });
    }

    const updated = await User.findByIdAndUpdate(
      id,
      {
        isBanned: true,
        banExpiresAt: banExpiresAt,
      },
      { new: true }
    );

    return res.status(200).json({
      data: updated,
      message: `User banned for ${duration} minutes`,
      status: "success",
    });
  } catch (error) {
    res.status(500).json({
      message: error?.message || "Internal server error",
      status: "fail",
    });
  }
};

const unBanAccount = function (req, res) {
  const { id } = req.params;

  User.findByIdAndUpdate(
    id,
    { isBanned: false, banExpiresAt: null },
    { new: true }
  )
    .then((user) => {
      if (!user) {
        return res.status(404).json({
          message: "User not found",
          status: "fail",
        });
      }

      res.status(200).json({
        data: user,
        message: "User unbanned successfully",
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

module.exports = {
  getAll,
  getOne,
  register,
  login,
  resetPassword,
  verifyAccount,
  forgotPassword,
  updateUserInfo,
  deleteAccount,
  freezeAccount,
  unfreezeAccount,
  banAccount,
  unBanAccount,
  updatePassword,
};
