import mongoose from 'mongoose'
import bcrypt from 'bcryptjs'

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        trim: true,
        unique: true
    },
     password: {
        type: String,
        required: true,
        trim: true
    },
    isAdmin: {
        type: Boolean,
        required: true,
        default: false
    }  
},{timestamp: true})

userSchema.methods.matchPassword = async function(enteredPassword) {
    return await bcrypt.compare(enteredPassword, this.password)
}

// Hash the plain text password before saving

// Hash the plain text password before saving
userSchema.pre('save', async function (next) {
    if (!this.isModified('password')) {
      next()
    }
  
    const salt = await bcrypt.genSalt(10)
    this.password = await bcrypt.hash(this.password, salt)
  })
  

  
  


const User = mongoose.model('User', userSchema)

export default User

