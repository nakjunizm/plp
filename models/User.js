const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  type: {
    type: String
  },
  google_id: {
    type: String
  },
  naver_id: {
    type: String
  },
  kakao_id: {
    type: String
  }
});

UserSchema.statics.findUserByGoogleId = function(id) {
  console.log(id);
  return this.findOne({ google_id: id });
};

UserSchema.statics.findUserByNaverId = function(id) {
  return this.findOne({ naver_id: id });
};

UserSchema.statics.findUserByKakaoId = function(id) {
  return this.findOne({ kakao_id: id });
};

module.exports = User = mongoose.model("user", UserSchema);
