import { Schema, model, models } from "mongoose";

const UserSchema = new Schema({
  email: {
    type: String,
    // in the below, we say that if unique is not true than it will give us 2nd string
    unique: [true, "Email already exist"],
    required: [true, "Email is required"],
  },
  username: {
    type: String,
    required: [true, "User name is required"],
  },
  image: {
    type: String,
  },
});

// *** const User = model("User", UserSchema);
// the above commented code will create user models again & again from scratch
// to avoid this behaviour we use "models".
const User = models.User || model("User", UserSchema);

export default User;
