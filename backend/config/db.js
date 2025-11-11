const mongoose = require('mongoose');

const connectdb = async () => {
    const uri = process.env.MONGO_URI || process.env.mongoURI;
    try {
        if (!uri) {
            throw new Error('Mongo connection string is not defined. Set MONGO_URI in your environment.');
        }
        await mongoose.connect(uri);
        console.log('Database connected successfully');
    } catch (error) {
        console.error('Database connection failed');
        console.error(error);
        throw error;
    }
};

module.exports = connectdb;