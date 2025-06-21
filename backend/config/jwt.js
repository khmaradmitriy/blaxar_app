require('dotenv').config();

module.exports = {
  jwtSecret: process.env.JWT_SECRET,
  refreshSecret: process.env.REFRESH_TOKEN_SECRET,
  tokenExpire: process.env.TOKEN_EXPIRATION,
  refreshExpire: process.env.REFRESH_TOKEN_EXPIRATION,
};