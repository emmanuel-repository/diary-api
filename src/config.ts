import dotenv from 'dotenv';
dotenv.config();

const config = {
	app: {
		port: process.env.PORT,
		jwtSecret: process.env.JWT_SECRET,
		corsAccess: process.env.CORS_ACCESS,
	},

	mysql: {
		host: process.env.DB_HOST || '',
		user: process.env.DB_USER || '',
		password: process.env.DB_PASSWORD || '',
		database: process.env.DB_NAME || '',
		port: process.env.DB_PORT || 0
	},
};

export default config;