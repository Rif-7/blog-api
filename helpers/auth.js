const bcrypt = require("bcryptjs");
const passportJWT = require("passport-jwt");
const passport = require("passport");
const User = require("../models/user");
const path = require("path");
require("dotenv").config({ path: path.resolve(__dirname, "../.env") });

exports.createHash = async (password) => {
  return await bcrypt.hash(password, 10);
};

exports.comparePassword = async (password, hashedPassword) => {
  const res = await bcrypt.compare(password, hashedPassword);
  return !!res;
};

const ExtractJWT = passportJWT.ExtractJwt;
const JWTStrategy = passportJWT.Strategy;
const JWTOptions = {
  jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken(),
  secretOrKey: process.env.JWT_SECRET,
};

passport.use(
  new JWTStrategy(JWTOptions, async (jwtPayload, done) => {
    try {
      const user = await User.findOne({ _id: jwtPayload.id });
      if (!user) {
        return done(null, false);
      }
      return done(null, user);
    } catch (err) {
      return done(err, false);
    }
  })
);
