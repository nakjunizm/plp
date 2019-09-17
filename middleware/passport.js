const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const config = require("config");
const User = require("../models/User");

module.exports = () => {
  passport.serializeUser((user, done) => {
    // Strategy 성공 시 호출됨
    done(null, user); // 여기의 user가 deserializeUser의 첫 번째 매개변수로 이동
  });

  passport.deserializeUser((user, done) => {
    // 매개변수 user는 serializeUser의 done의 인자 user를 받은 것
    done(null, user); // 여기의 user가 req.user가 됨
  });

  passport.use(
    new GoogleStrategy(
      {
        clientID: config.get("google.clientID"),
        clientSecret: config.get("google.clientSecret"),
        callbackURL: config.get("google.callbackURL")
      },
      async (accessToken, refreshToken, profile, cb) => {
        try {
          const user = await User.findUserByGoogleId(profile.id);
          if (user) {
            return cb(null, user);
          } // 회원 정보가 있으면 로그인
          const newUser = new User({
            // 없으면 회원 생성
            type: "google",
            google_id: profile.id
          });
          newUser.save(user => {
            return cb(null, user); // 새로운 회원 생성 후 로그인
          });
        } catch (err) {
          return cb(err, false);
        }
      }
    )
  );
};
