const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const userSchema = mongoose.Schema({
    name:{type:String,required:true},
    email:{type:String,required:true},
    password:{type:String,required:true},
    pic:{
        type:String,
        required:true,
        default:"https://img.freepik.com/premium-vector/user-profile-icon-flat-style-member-avatar-vector-illustration-isolated-background-human-permission-sign-business-concept_157943-15752.jpg"
    },

});

userSchema.methods.matchPassword = async function (enterdPassword){
    return await bcrypt.compare(enterdPassword,this.password)
}

userSchema.pre("save",async function(next){
    if(!this.isModified){
        next()
    }
    const salt = await bcrypt.genSalt(10);
    this.password=await bcrypt.hash(this.password,salt)
})

const User = mongoose.model("User",userSchema);

module.exports = User;