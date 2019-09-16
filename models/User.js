import mongoose, { Schema } from "mongoose";

const UserSchema = new Schema({
  type: {
    type: String,
    enum: type
  },
  oauth: {
    google: {
      id: String,
      access_token: String
    }
  }
});

UserSchema.statics.findUserByGoogleId = function(id) {
  return this.findOne({ "o_auth.google.id": id });
};

export default mongoose.model("User", UserSchema);
