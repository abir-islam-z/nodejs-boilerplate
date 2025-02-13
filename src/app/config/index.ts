import dotenv from 'dotenv';

dotenv.config();

const config = {
  port: process.env.PORT || 1337,
  db_url: process.env.DB_URL || '',
  bcrypt_salt_rounds: process.env.BCRYPT_SALT_ROUNDS,
  NODE_ENV: process.env.NODE_ENV,
  JWT_ACCESS_SECRET: process.env.JWT_ACCESS_SECRET,
  JWT_ACCESS_EXPIRES_IN: process.env.JWT_ACCESS_EXPIRES_IN,
};

export default config;
