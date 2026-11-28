const mongoose = require('mongoose')
const SuperAdmin = require('./model/SuperAdmin') 
const dotenv = require('dotenv')

dotenv.config();

const createSuperAdmin = async ()=>{
    try {
        await mongoose.connect(process.env.MONGO_URI);

        const existingAdmin = await SuperAdmin.findOne({
            email: 'ayushuvitiwari9091@gmail.com'
        });

        if(existingAdmin){
            console.log('Super Admin is Alredy exists');
            process.exit(0);
        };

        const admin = new SuperAdmin({
            name: 'Ayush',
            email: 'ayushuvitiwari9091@gmail.com',
            password: 'Admin@123'
        });

        await admin.save();

        console.log('SuperAdmin Created Sucessfully');

        process.exit(0);
        
    } catch (error) {
        console.log('error:', error);
        process.exit(1);
    }
}


createSuperAdmin();