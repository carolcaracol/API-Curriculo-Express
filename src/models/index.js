import { Sequelize } from "sequelize"
import getUsuarioModel from "./getUsuarioModel"
import getTrabalhoModel from "./getTrabalhoModel"
import getFormacaoModel from "./getFormacaoModel";

const sequelize = new Sequelize(
    process.env.POSTGRESQL_DATABASE,
    process.env.POSTGRESQL_USER,
    process.env.POSTGRESQL_PASSWORD,
    {
        dialect: 'postgres',
        host: process.env.POSTGRESQL_HOST,
        dialectModule: require('pg'),
        dialectOptions: {
            ssl: true,
            sslmode: 'require'
        }
    }
)

const models = {
    Usuario: getUsuarioModel(sequelize, Sequelize),
    Trabalho: getTrabalhoModel(sequelize, Sequelize),
    Formacao: getFormacaoModel(sequelize, Sequelize),
};

Object.keys(models).forEach((key) => {
    if('associate' in models[key]){
        models[key].associate(models);
    }
});

export { sequelize };

export default models;