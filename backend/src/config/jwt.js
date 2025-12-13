const jwt = require("jsonwebtoken");

exports.generateToken = (user) => {
  return jwt.sign(
    {
      id: user._id,
      role: user.role, // ⭐ THIS LINE FIXES EVERYTHING
    },
    process.env.JWT_SECRET,
    { expiresIn: "1d" }
  );
};
