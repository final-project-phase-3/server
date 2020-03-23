const jwt = require("jsonwebtoken");

function authentication(req, res, next) {

  if (req.headers.hasOwnProperty("token")) {
    const token = req.headers.token;
    try {
      const payload = jwt.verify(token, process.env.JWT_SECRET);
      console.log("bbbbb",payload)
      req.payload = payload;
      next();
    } catch (error) {
      next({ status: 401, error, message: "Failed to authenticate" });
    }
  } else {
    next({ status: 403, message: "Please login first" });
  }
}

module.exports = authentication;
