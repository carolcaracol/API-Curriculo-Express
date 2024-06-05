import { DataTypes } from "sequelize";

const getFormacaoModel = (sequelize, {DataTypes}) => {
    const Formacao = sequelize.define('formacoe', {
        instituicao: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                notEmpty: true,
            },
        },
        grau: {
            type: DataTypes.STRING,
        },
        curso: {
            type: DataTypes.STRING,
        },
    });

    Formacao.associate = (models) => {
        Formacao.belongsTo(models.Usuario);
    };

    Formacao.findByPk = async (pk) => {
        let formacao = await Formacao.findOne({
            where: { id: pk },
        });

        return formacao;
    };

    return Formacao;
};

export default getFormacaoModel;