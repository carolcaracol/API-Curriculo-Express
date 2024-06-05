import { Router } from "express";

const router = Router();

const gerarID = () => {
    let id = 3;
    id++;
    return id;
};

router.get('/', async (req, res) => {
    const formacoes = await req.context.models.Formacao.findAll();

    if(!formacoes){
        return res.send("Nenhuma formação encontrada");
    }

    return res.send(formacoes);
});

router.get('/id', async (req, res) => {
    const id = req.params.id;
    const formacao = await req.context.models.Formacao.findByPk(id);

    if(!formacao){
        return res.send("formação não encontrada");
    }

    return res.send(formacao);
})

router.post('/', async (req, res) => {
    const id = gerarID();
    const formacao = {
        id,
        instituicao: req.body.instituicao,
        grau: req.body.grau,
        curso: req.body.curso,
    }

    await req.context.models.Formacao.create(formacao);

    return res.send(formacao);
});

router.put('/:id', async (req, res) => {
    const id = req.params.id;

    if(!req.context.models.Formacao.findByPk(id)) {
        return res.send("formação não encontrada");
    }

    await req.context.models.Formacao.update(
        {
            id,
            instituicao: req.body.instituicao,
            grau: req.body.grau,
            curso: req.body.curso,
        },
        { where: { id }}
    );

    return res.send("formação atualizada");
});

router.delete('/:id', (req, res) => {
    const id = req.params.id;

    if(!req.context.models.Formacao.findByPk(id)) {
        return res.send("formação não encontrada");
    }

    req.context.models.Formacao.destroy({ where: { id }});

    return res.send("formação deletada");
});

export default router;