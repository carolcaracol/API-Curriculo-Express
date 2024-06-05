import { Router } from "express";

const router = Router();

const gerarID = () => {
    let id = 2;
    id++;
    return id;
};

router.get('/', async (req, res) => {
    const trabalhos = await req.context.models.Trabalho.findAll();

    if(!trabalhos){
        return res.send("Nenhum trabalho encontrado");
    }

    return res.send(trabalhos);
});

router.get('/:id', async (req, res) => {
    const id = req.params.id;
    const trabalho = await req.context.models.Trabalho.findByPk(id);

    if(!trabalho){
        return res.send("trabalho não encontrado");
    }

    return res.send(trabalho);
});

router.post('/', async (req, res) => {
    const id = gerarID();
    const trabalho = {
        id,
        cargo: req.body.cargo,
        empresa: req.body.empresa,
        endereco: req.body.endereco,
    };

    await req.context.models.Trabalho.create(trabalho);

    return res.send(trabalho);
});

router.put('/:id', async (req, res) => {
    const id = req.params.id;

    if(!req.context.models.Trabalho.findByPk(id)){
        return res.send("trabalho não encontrado");
    }

    await req.context.models.Trabalho.update(
        {
            cargo: req.body.cargo,
            endereco: req.body.endereco,
            endereco: req.body.endereco,
        },
        { where: { id }}
    );

    return res.send("trabalho atualizado");
});

router.delete('/:id', async (req, res) => {
    const id = req.params.id;

    if(!req.context.models.Trabalho.findByPk(id)){
        return res.send("trabalho não encontrado");
    }

    await req.context.models.Trabalho.destroy({ where: { id }});

    return res.send("trabalho deletado");
});

export default router;