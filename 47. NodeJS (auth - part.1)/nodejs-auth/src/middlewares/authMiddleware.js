require("dotenv").config();
const tokenENV = process.env.TOKEN;

const authMiddleware = (req, res, next) => {
  const token = req.headers["authorization"];
  if (token === `Bearer ${tokenENV}`) {
    next();
  } else {
    res.status(401).send({
      message: "Unauthorized",
    });
  }
};

module.exports = authMiddleware;
