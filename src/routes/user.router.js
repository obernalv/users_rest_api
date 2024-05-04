const { getAll, getById, search, create, update, deleteId } = require('../controllers/user.controllers');
const express = require ('express');

const userRouter = express.Router();

userRouter.route('/users/:id?')
    .get((req, res, next) => {
        if (req.params.id) {
            return getById(req, res, next);
        } else {
            return getAll(req, res, next);
        }
    })
    .post(create)
    .put(update)
    .delete(deleteId);



module.exports = userRouter;