const dotenv = require("dotenv");
dotenv.config({ path: `./.env.${process.env.NODE_ENV || 'development'}` });

module.exports = {
    PORT: process.env.PORT || 5000,
    MONGODB_URI: process.env.MONGODB_URI||"",
    SECRET_KEY: process.env.SECRET_KEY|| "",
    NODE_ENV: process.env.NODE_ENV || 'development',
};