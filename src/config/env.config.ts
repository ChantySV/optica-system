export const EnvConfiguration = () =>({
        port: process.env.PORT || 4000,
        dbName: process.env.DB_NAME,
        dbPassword: process.env.DB_PASSWORD,
        dbHost: process.env.DB_HOST,
        dbUserName: process.env.DB_USERNAME,
        jwt: process.env.JWT_SECRET,
        jwt_time: process.env.JWT_REFRESH,        
        jwt_refresh: process.env.JWT_TIME,        
})