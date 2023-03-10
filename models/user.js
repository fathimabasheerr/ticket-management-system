const mongoose = require("mongoose");
const { isEmail } = require("validator");
const bcrypt = require("bcrypt");

const Schema = mongoose.Schema;

const userSchema = new Schema({

  fname: {
    type: String,
    required: [true , "Please enter a first name"]
  },
  lname: {
    type: String,
    required:[true, "Please enter a last name"]
  },
  email: {
    type: String,
    required: [true ,"Please enter an email"],
    unique: [true],
    validate: [isEmail, "Please enter a valid email"]
  },
  password: {
    type: String,
    required: [true, "Please enter a password"],
    minlength: [6, "Minimum password length is 6 characters"]
  }
},{ timestamps: true }
);


//fire a function before saving to database 

userSchema.pre("save", async function(next){
  const salt = await bcrypt.genSalt();
  this.password = await bcrypt.hash(this.password,salt);
  next();
});

//static method to login user

userSchema.static.login() = async function(email,password){

  const user = await this.findOne({ email });

  if(user){
    const auth = await bcrypt.compare(password,user.password);

    if(auth){
      return user;
    }
    throw Error("Incorrect password");
  }
  throw Error("Incorrect email");
};


const user = mongoose.model("User",userSchema);

module.exports = User;




