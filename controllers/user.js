const User = require('../models/user');

exports.postAddUser = async (req, res, next) => {

    try {
        const name = req.body.name;
        const mob = req.body.mob;
        const email = req.body.email;

        const data = await User.create({
            name: name,
            mob: mob,
            email: email
        })
        // res.send(data);
        res.status(201).json({ newUserDetail: data });
    }catch(err) {
        console.log(err);
    }
};

exports.getUser = async (req, res, next) => {
    try {
        const users = await User.findAll();
        // res.send(users);
        res.status(200).json({ allUsers: users});
    } catch(err) {
        console.log(err);
    }
};

exports.postDeleteUser = async (req, res) => {
    try {
        const uId = req.params.id;
        await User.destroy({ where: { id: uId } });
        res.sendStatus(200);
    } catch (err) {
        console.log(err);
    }
};
