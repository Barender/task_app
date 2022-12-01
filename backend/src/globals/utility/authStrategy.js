const passport = require('passport');
const { Strategy, ExtractJwt } = require('passport-jwt');
const config = require('../../config/config.js');
const User = require('../../models/user.model.js');

const jwtStrategy = new Strategy(
  {
    secretOrKey: config.JWT_SECRET,
    jwtFromRequest: ExtractJwt.fromAuthHeaderWithScheme('jwt')
  },
  async (req, payload, done) => {
    try {
      const user = await User.findById(payload.id);
      if (!user) return done(null, false);

      done(null, user);
    } catch (error) {
      done(error, false);
    }
  }
);

passport.use(JwtStrategy);

export default jwtStrategy;
