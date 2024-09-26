import { Schema, model, models } from "mongoose";

const UserSchema = new Schema(
  {
    fullName: String,
    clerkId: String,
    email: String,
    picture: String,
    role: { type: String, default: "user" },
  },
  { timestamps: true }
);

const User = models.User || model("User", UserSchema);
export default User;
