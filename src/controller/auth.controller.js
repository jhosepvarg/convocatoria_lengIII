
const passport = require('passport');

const controller = {};

controller.openView = function (req, res) {
    res.render('login/index')
}

controller.login = async (req, res, next)=> {

        passport.authenticate('local.login', {
            successRedirect: '/estudiante/',
            failureRedirect: '/login',
            failureFlash: true
        })(req, res, next);

    }

controller.cerrarSesion = async (req, res) => {
        req.logOut();
        res.redirect('/');

    }



module.exports = controller;