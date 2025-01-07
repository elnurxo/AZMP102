const { isAuth } = require("../constants/index");

const authMiddleware = (req, res, next) => {
  if (isAuth) {
    next();
  } else {
    res.status(403).send({
      message: "Unauthorized",
    });
  }
};

module.exports = authMiddleware;
