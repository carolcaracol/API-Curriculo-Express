import { Router } from "express";

const router = Router();

const gerarID = () => {
    let id = 1;
    id++;
    return id;
};

router.get('/', async (req, res) => {
    const usuarios = await req.context.models.Usuario.findAll();

    if(!usuarios){
        return res.send("Nenhum usuario encontrado");
    }

    return res.send(usuarios);
});

router.get('/:id', async (req, res) => {
    const id = req.params.id;
    const usuario = await req.context.models.Usuario.findByPk(id);

    if(!usuario){
        return res.send("usuario não encontrado");
    }

    return res.send(usuario);
});

router.post('/', async (req, res) => {
    const id = gerarID();
    const usuario = {
        id,
        nome: req.body.nome,
        bio: req.body.bio,
        email: req.body.email,
        github: req.body.github,
    };
    
    await req.context.models.Usuario.create(usuario);

    return res.send("usuario criado");
});

router.put('/:id', async (req, res) => {
    const id = req.params.id;

    if(!req.context.models.Usuario.findByPk(id)){
        return res.send("usuario não encontrado");
    }

    await req.context.models.Usuario.update(
        {
            nome: req.body.nome,
            bio: req.body.bio,
            email: req.body.email,
            github: req.body.github,
        },
        { where: { id }}
    );

    return res.send("usuario atualizado");
});

router.delete('/:id', async (req, res) => {
    const id = req.params.id;
    
    if(!req.context.models.Usuario.findByPk(id)){
        return res.send("usuario não encontrado");
    }

    await req.context.models.Usuario.destroy({ where: { id } });

    return res.send("usuario deletado");
});

export default router;