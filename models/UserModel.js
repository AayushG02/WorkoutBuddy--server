const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const bcrypt = require("bcrypt");
const validator = require("validator");

const userSchema = new Schema({
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
});
// static signup method
userSchema.statics.signup = async function (email, password) {
  // validation
  if (!email || !password) {
    throw new Error("All fields are required!");
  }
  const exists = await this.findOne({ email });
  if (exists) {
    throw new Error("Email already exists!");
  }
  if (!validator.isEmail(email)) {
    throw new Error("Email is not valid!");
  }
  if (!validator.isStrongPassword(password)) {
    throw new Error("Password is not strong enough!");
  }
  // check if user exists
  // salt - random characters are added to the password before hashing
  // if two users have same passwords they will not have the same hash
  // it prevents hackers to password matching since the hash will be different for the same passwords
  const salt = await bcrypt.genSalt(10);

  const hash = await bcrypt.hash(password, salt);
  // create user
  const user = await this.create({ email, password: hash });

  return user;
};


// static login method
userSchema.statics.login = async function(email, password) {
  if (!email || !password) {
    throw new Error("All fields are required!");
  }
  const user = await this.findOne({ email });
  if (!user) {
    throw new Error("Incorrect email");
  } 

  // compare the two passwords
  const match = await bcrypt.compare(password, user.password)

  if(!match) {
    throw new Error('Incorrect password')
  }

  return user

}

module.exports = mongoose.model("User", userSchema);
