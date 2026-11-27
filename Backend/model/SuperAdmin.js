const mongoose = require('mongoose')


const superAdminSchema = new mongoose.Schema({
    name: {
        type: String,
        require: true,
        trim: true
    },
    email: {
        type: String,
        require: true,
        unique: true,
        lowercase: true,
        trim: true
    },
    password:{
        type:String,
        require: true
    },
    role:{
        type:String,
        default: 'SuperAdmin',
    }
},{
    timestamps: true,
})


//  password hashing 

superAdminSchema.pre('save', async function (){
    if(!this.isModified('password')) return;

    this.password = await bcrypt.hash(this.password,10);
});

//  password compare

superAdminSchema.methods.comparepassword = async function (password){
    return await bcrypt.compare(password,this.password);
};


module.exports = mongoose.model('SuperAdmin', superAdminSchema)