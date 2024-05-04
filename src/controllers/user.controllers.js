const catchError = require('../utils/catchError');
const User = require('../models/User');
const messages = require('../utils/infoMsj')

// Mostrar todos los registros
const getAll = catchError(async (req, res) => {
    // Operaciones...
    const usrs = await User.findAll();
    return res.json(usrs);
});

// Consultar por ID
const getById = catchError(async (req, res) => {
    const id = req.params.id;
    const user = await User.findByPk(id);
    if (!user) {
        return res.status(404).send({ message: messages.user.searchxid_Error });
    }
    res.json(user);
});

async function usuarioExiste(email) {
    const usuario = await User.findOne({ where: { email } });
    return usuario !== null; // Si encuentra un usuario, retorna true; de lo contrario, retorna false
}

// Crear nuevo registro
const create = catchError(async (req, res) => {
    // Operaciones...
    const { first_name, last_name, email, password, birthday } = req.body;
        
    // Primero, verificamos si el usuario ya existe
    if (await usuarioExiste(email)) {
        return res.status(400).json({ message: messages.user.existeid_Error});
    }

    // Si el usuario no existe, creamos el nuevo registro
    const user = await User.create({ first_name, last_name, email, password, birthday });
    return res.status(201).json({ message: messages.user.createdSuccessfully, data: user });


});

// Actualzar un registro por ID
const update = catchError(async (req, res) => {
    const id = req.params.id;
    const updatedData = req.body;
    const user = await User.findByPk(id);
    if (!user) {
        return res.status(404).send({ message: messages.user.searchxid_Error });
    }
    await user.update(updatedData);
    res.status(200).json({ message: messages.user.updatedSuccessfully, data: user});
});

// Eliminar un registro por ID
const deleteId = catchError(async (req, res) => {
    const id = req.params.id;
    const user = await User.findByPk(id);
    if (!user) {
        return res.status(404).send({ message: messages.user.searchxid_Error });
    }
    await user.destroy();
    res.status(204).send();
});

// Exportar EndPoints
module.exports = {
    getAll,
    getById,
    create,
    update,
    deleteId
};