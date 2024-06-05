import "dotenv/config";
import cors from 'cors';
import express from 'express';
import models, { sequelize } from './models';
import routes from './routes';

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use( async (req, res, next) => {
    req.context = {
        models,
        me: await models.Usuario.findByLogin('Carol'),
    };
    next();
});

app.use('/usuarios', routes.usuario);
app.use('/trabalhos', routes.trabalho);
app.use('/formacoes', routes.formacao);
app.use('/session', routes.session);

const eraseDatabaseOnSync = process.env.ERASE_DATABASE_ON_SYNC === "true";

sequelize.sync({ force: eraseDatabaseOnSync }).then(() => {
    if(eraseDatabaseOnSync){
        createInitialUsuario();
    }
    
    app.listen(process.env.PORT, () => {
        console.log(`the app is listening on port ${process.env.PORT}`)
    });
});

const createInitialUsuario = async () => {
    await models.Usuario.create(
        {  
            nome: 'Carol Costa',
            bio: 'Estudante apaixonada pelo mundo tech. Atualmente, estou cursando Administração de Empresas na UPE e Sistemas para Internet na Unicap, pelo programa Embarque Digital. Além disso, sou formada como técnica em multimídia pelo NAVE Recife. Comunicativa e criativa, busco constantemente expandir meus conhecimentos e habilidades nesse campo em constante evolução. Tenho grande interesse em colaborar em projetos desafiadores que envolvam a integração entre negócios e tecnologia.',
            email: 'anacarolalvescosta@gmail.com',
            github: 'https://github.com/carolcaracol',
            trabalhos: [
                {
                    cargo: "Estagiária",
                    empresa: "Banco do Nordeste do Brasil",
                    endereco: "Recife - PE",
                },
                {
                    cargo: "iOS Developer Student",
                    empresa: "Apple Developer Academy | UFPE",
                    endereco: "Recife - PE",
                },
            ],
            formacoes: [
                {
                    instituicao: "ETE Cícero Dias",
                    grau: "Técnico",
                    curso: "Multimídia",
                },
                {
                    instituicao: "Universidade de Pernambuco",
                    grau: "Bacharelado",
                    curso: "Administração",
                },
                {
                    instituicao: "Universidade Católica de Pernambuco",
                    grau: "Tecnólogo",
                    curso: "Sistemas para Internet",
                },
            ],
        },
        {
            include: [
                models.Trabalho,
                models.Formacao,
            ],
        },
    );
};