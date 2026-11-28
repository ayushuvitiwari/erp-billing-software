const express = require('express')
const dotenv = require('dotenv')
const connectDb = require('./config/db')
const superAdminRoute = require('./routes/superAdminRoutes')

dotenv.config()
const app = express();

connectDb();

//  middleware 

app.use('/api/superadmin', superAdminRoute);



const PORT = 3000;

app.listen(PORT,()=>{
    console.log(`server is runing on Port ${PORT}`);
})