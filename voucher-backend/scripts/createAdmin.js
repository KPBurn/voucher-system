const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const User = require('../models/user');

const createAdmin = async () => {
    const adminUsername = 'admin'; // Change this as needed
    const adminEmail = 'admin@example.com'; // Change this as needed
    const adminPassword = 'admin123'; // Change this to a strong password

    await mongoose.connect(process.env.MONGO_URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    });

    // Check if admin user already exists
    const existingAdmin = await User.findOne({ email: adminEmail });
    if (existingAdmin) {
        console.log('Admin user already exists.');
        return;
    }

    // Hash the password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(adminPassword, salt);

    // Create new admin user
    const adminUser = new User({
        username: adminUsername,
        email: adminEmail,
        password: hashedPassword,
        role: 'admin',
    });

    await adminUser.save();
    console.log('Admin user created successfully.');
    mongoose.connection.close();
};

// Run the script
createAdmin().catch(console.error);
