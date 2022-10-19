/** Destruct environment variable to get database configuration */
const {
    DB_USERNAME = "postgres",
    DB_PASSWORD = "admin",
    DB_HOST = "localhost",
    DB_NAME = "car-management-api",
    DB_LOGGING = false
} = process.env;

module.exports = {
    development: {
        username: DB_USERNAME,
        password: DB_PASSWORD,
        database: `${DB_NAME}_development`,
        host: DB_HOST,
        dialect: "postgres",
        logging: DB_LOGGING
    },
    test: {
        username: DB_USERNAME,
        password: DB_PASSWORD,
        database: `${DB_NAME}_test`,
        host: DB_HOST,
        dialect: "postgres",
        logging: DB_LOGGING
    },
    production: {
        username: DB_USERNAME,
        password: DB_PASSWORD,
        database: `${DB_NAME}_production`,
        host: DB_HOST,
        dialect: "postgres",
        logging: false
    },
};
