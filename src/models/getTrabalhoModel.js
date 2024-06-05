import { DataTypes } from "sequelize";

const getTrabalhoModel = (sequelize, {DataTypes}) => {
    const Trabalho = sequelize.define('trabalho', {
        cargo: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                notEmpty: true,
            },
        },
        empresa: {
            type: DataTypes.STRING,
        },
        endereco: {
            type: DataTypes.STRING,
        },
    });

    Trabalho.associate = (models) => {
        Trabalho.belongsTo(models.Usuario);
    };

    Trabalho.findByPk = async (pk) => {
        let trabalho = await Trabalho.findOne({
            where: { id: pk },
        });

        return trabalho;
    }

    return Trabalho;
};

export default getTrabalhoModel;