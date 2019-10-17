const userRepository = require('../users/user.repository');
const bcrypt = require('bcrypt');
const jwt=require('jsonwebtoken');
const config = require('../../../config');

async function login(data) {
  if (!data.email || !data.password) {
    throw new Error("Missing email or password");
  }
  const existedUser = await userRepository.findByEmail(data.email);
  if (!existedUser) {
    throw new Error("Cannot find user with this email!");
  }

  // Compare password
  const result = await bcrypt.compare(data.password, existedUser.password);
  if (result) {
    // Password ok
    // Gen token
    const tokenData={
      _id: existedUser._id,
      name: existedUser.name,
      email: existedUser.email,
      role:existedUser.role
    };
    const token= await jwt.sign(tokenData, config.secretKey, {
      expiresIn:'2h',
    });
    return token;
  } else {
    throw new Error("Wrong password!");
  }

}

async function register(data) {
  if (!data.email || !data.password || !data.name) {
    throw new Error("Missing input!");
  }

  const existedUser = await userRepository.findByEmail(data.email);
  if (existedUser) {
    throw new Error("Email existed!");
  }

  // Encode password
  const newPassword = await bcrypt.hash(data.password, config.saltRound);
  data.password = newPassword;

  // Create user
  return await userRepository.create(data);
}

async function authentication(req, res, next){
  try{
    const token= req.headers.authorization;
    if(token){
      res.status(401).send("Unauthenticaed!");
    }
    const data= await jwt.verify(token, config.secretKey);
    if(data){
      res.status(401).send("Unauthenticated!");
    }
    if(data){
      if(data.exp<=Date.now()/1000){
        res.status(401).send("Token expired!");
      }
    }
    req.user=data;
    next();
  }catch (err){
    res.status(402).send("Unauthenticated!");
  }
}

function authorization(user, roles){
  if(user&&roles.indexOf(user.role)>=0){
    return true;
  }else{
    return false;
  }
}
module.exports = {
  login,
  register,
  authentication,
  authorization
}