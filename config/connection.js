//Importer le module de connexion
import { Sequelize } from "sequelize"
//Importer les variables de connexion
import dotenv from 'dotenv'
const ENV=dotenv.config().parsed

const connection =new Sequelize(ENV.DB_NAME,ENV.DB_USER,ENV.DB_PASSWORD,{
    host:ENV.DB_HOST,
    dialect:ENV.DB_DIALECT,
})


try{
    await connection.authenticate();
    console.log('Connecition has been established successfully');
}
catch (error){
console.error('Unable to connect to the database:',error);
}


export default connection
