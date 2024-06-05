import { DataTypes } from "sequelize";

const getUsuarioModel = (sequelize, {DataTypes}) => {
    const Usuario = sequelize.define('usuario', {
        nome: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                notEmpty: true,
            },
        },
        bio: {
            type: DataTypes.TEXT,
        },
        email: {
            type: DataTypes.STRING,
            unique: true,
            allowNull: false,
            validate: {
                notEmpty: true,
            },
        },
        github: {
            type: DataTypes.STRING,
        },
    });

    Usuario.associate = (models) => {
        Usuario.hasMany(models.Trabalho, { onDelete: 'CASCADE' });
        Usuario.hasMany(models.Formacao, { onDelete: 'CASCADE' });
    };

    Usuario.findByLogin = async (login) => {
        let usuario = await Usuario.findOne({
            where: { nome: login },
        });

        if(!usuario) {
            usuario = await Usuario.findOne({
                where: { email: login },
            });
        }

        return usuario;
    }

    Usuario.findByPk = async (pk) => {
        let usuario = await Usuario.findOne({
            where: { id: pk },
        });

        return usuario;
    }

    return Usuario;
};

export default getUsuarioModel;