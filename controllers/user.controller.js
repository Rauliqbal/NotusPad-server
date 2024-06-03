const User = require('../models/user.model')


// REGISTER USER
const register = async (req,res) => {
  const {username,email,password} = req.body
  try {
    const newUser = new User({
      username,
      email,
      password
    })

    // VALIDATE 
    const checkUser = await User.findOne({email})
    if(checkUser) return res.status(400).json({message: "User telah digunakan"})
    
    // SAVED 
    const savedUser = await newUser.save()
    res.status(200).json({
      message: "Akun berhasil dibuat",
      data: savedUser
    })
  } catch (error) {
    res.status(500).json({message: error.message})
  }
}

// LOGIN USER
const login = async (req,res) => {
  const {email,password} = req.body
  try {
    // VALIDATE
    const user = await User.findOne({email});
    if(!user) res.status(401).json({message: "Email tidak ditemukan"})
  } catch (error) {
    
  }
}
module.exports = {register}