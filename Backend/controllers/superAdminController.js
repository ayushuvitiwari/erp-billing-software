const superAdmin = require('../model/SuperAdmin')
const jwt = require('jsonwebtoken')


const loginSuperAdmin = async (req, res) => {
    try {
        const { email, password } = req.body;

        // Check required fields

        if (!email || !password) {
            return res.status(400).json({ success: false, message: 'Email And password are required' })
        };

        // Find SuperAdmin by email

        const SuperAdmin = await superAdmin.findOne({ email });

        if (!SuperAdmin) {
            return res.status(401).json({ message: 'Invalid Email And Password', success: false })
        };

        // Compare password

        const isMatch = await SuperAdmin.comparepassword(password);

        if (!isMatch) {
            return res.status(401).json({ message: 'Invalid Email or Password', success: false })
        };

        // Generate JWT Token

        const token = jwt.sign(
            {id: SuperAdmin._id, role: SuperAdmin.role,},
            process.env.JWT_SECRET,
            {expiresIn: '1d'}
        );

        return res.status(200).json({success: true, message: 'SuperAdmin login Sucessful', token,
            SuperAdmin: {
                id: SuperAdmin._id,
                name: SuperAdmin.role,
                email: SuperAdmin.email,
                role: SuperAdmin.role,
            }
        });
        

    } catch (error) {
        return res.status(500).json({ message: 'Invalid User', success: false })
    }
}


module.exports = {loginSuperAdmin}